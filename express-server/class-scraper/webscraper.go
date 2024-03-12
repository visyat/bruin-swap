package webscraper

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"
	"sync"
)

// my first go function to check if I set up environment properly
func BestMascot() string {
	return "Tux"
}

// converting data to be go friendly - from Javascript objects with the following properties to a struct
type SubjectArea struct {
	ID    string `json:"id"`
	Label string `json:"label"`
	Value string `json:"value"`
}

// function that scrapes the subject areas from the registrar main page
func ScrapeSubjectAreas() []SubjectArea {
	// Make request
	const url = "https://sa.ucla.edu/ro/public/soc"
	response, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer response.Body.Close()

	// Convert response into parsable formate
	content, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	// Find the subjects line in response HTML
	prefix := "var subjects = "
	re := regexp.MustCompile(prefix + ".*")
	match := re.Find(content)
	// Convert it into a valid json string
	replacer := strings.NewReplacer(prefix, "", "&quot;", "\"", "'", "", ";", "")
	jsonString := replacer.Replace(string(match))
	// Convert the json string into a Go struct
	var subjectAreas []SubjectArea
	err = json.Unmarshal([]byte(jsonString), &subjectAreas)
	if err != nil {
		log.Fatal(err)
	}

	// TODO: save subjectAreas to database
	return subjectAreas
}

// the following code will attempt to scrape courses now in parallel (the primary reason to use go)
// this section copied from tutorial but I am unsure how to get it properly running
var subjectAreas = ScrapeSubjectAreas()

type Course struct {
	ID            string
	SubjectAreaID string
	Title         string
	Number        string
	Model         string
}

func ScrapeCourses() {
	var wg sync.WaitGroup
	maxConnections, err := strconv.Atoi(os.Getenv("MAX_CONNECTIONS"))
	if err != nil {
		log.Fatal(err)
	}
	sem := make(chan struct{}, maxConnections)

	for _, subjectArea := range subjectAreas {
		wg.Add(1)
		go func(subjectArea registrar.SubjectArea) {
			sem <- struct{}{}
			defer func() { <-sem }()
			defer wg.Done()
			courses, err := FetchAndParseCourses(subjectArea)
			if err != nil {
				return
			}
			// TODO: save courses
		}(subjectArea)
	}

	wg.Wait()
}

// straight forward - fetches the first page results of a given subject area (unfixed errors present)
func FetchFirstPage(subjectArea registrar.SubjectArea, term string) (*goquery.Document, error) {
	const url = "https://sa.ucla.edu/ro/Public/SOC/Results"

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	// Encode query parameters
	query := req.URL.Query()
	query.Add("t", term)
	query.Add("sBy", "subject")
	query.Add("subj", subjectArea.Value)
	req.URL.RawQuery = query.Encode()

	// Make request
	response, err := client.Do(req)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	defer response.Body.Close()

	doc, err := goquery.NewDocumentFromReader(response.Body)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	return doc, nil
}

// proceeds to parse the courses for relevenat info (unfixed errors present)
func ParseCourses(subjectAreaID string, doc *goquery.Document) []Course {
	results := doc.Find("#resultsTitle")
	titles := results.Find(".class-title")
	links := results.Find("h3 > a")
	scripts := results.Find("script")

	headerRegex := regexp.MustCompile(`(\S*) - (.*)`)
	modelRegex := regexp.MustCompile(`\{(.*?)\}`)

	for i := range links.Nodes {
		link := links.Eq(i).Text()
		script := scripts.Eq(i).Text()

		header := headerRegex.FindStringSubmatch(link)
		model := modelRegex.FindString(script)

		number := header[1]
		title := header[2]

		course := Course{
			Title:  title,
			Number: number,
			Model:  modelStr,
		}

		courses := append(courses, course)
	}

	return courses
}

// a "wrapper" for the above two functions
func FetchAndParseCourses(subjectArea registrar.SubjectArea) (courses []Course, err error) {

	doc, err := FetchFirstPage(subjectArea, term)
	if err != nil {
		return courses, err
	}

	// Check that there are results
	noSearchResults := doc.Find("#spanNoSearchResults")
	if len(noSearchResults.Nodes) > 0 {
		return courses, errors.New("No search results found")
	}

	// Extract courses into array
	courses := ParseCourses(subjectArea.ID, doc)

	pageCountStr, exists := doc.Find("#pageCount").Attr("value")
	if !exists {
		return courses, errors.New("Page count couldn't be found")
	}
	pageCount, err := strconv.Atoi(pageCountStr)
	if err != nil {
		return courses, err
	}

	//appended function to get additional pages
	if pageCount > 1 {
		coursesMux := &sync.Mutex{}
		var wg sync.WaitGroup

		body, err := goquery.OuterHtml(doc.Selection)
		if err != nil {
			log.Error(err)
		}

		// Extract the model to fetch additional pages
		modelRegex := regexp.MustCompile(`(SearchPanel\.SearchData = JSON\.stringify\()({.*})`)
		matches := modelRegex.FindStringSubmatch(body)
		model := matches[2]

		for page := 2; page <= pageCount; page++ {
			wg.Add(1)
			go func(page int) {
				defer wg.Done()

				pageDoc := FetchAdditionalPage(model, page)
				if pageDoc == nil {
					return
				}

				newCourses, err := FetchAndParseCourses(pageDoc)
				if err != nil {
					log.Error(err)
				}
				coursesMux.Lock()
				courses = courses.append(courses, newCourses...)
				coursesMux.Unlock()
			}(page)
		}
	}

	return courses, nil
}

//function using urls to fetch additional pages (unresolved errors exist)

const FilterFlags = `{"enrollment_status":"O,W,C,X,T,S","advanced":"y","meet_days":"M,T,W,R,F,S,U","start_time":"2:00 am","end_time":"11:00 pm","meet_locations":null,"meet_units":null,"instructor":null,"class_career":null,"impacted":null,"enrollment_restrictions":null,"enforced_requisites":null,"individual_studies":null,"summer_session":null}`

func FetchAdditionalPage(model string, pageNumber int) *goquery.Document {
	const url = "https://sa.ucla.edu/ro/Public/SOC/Results/CourseTitlesView"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Error(err)
	}

	// This header is required, otherwise we get a 404
	req.Header.Add("X-Requested-With", "XMLHttpRequest")
	query := req.URL.Query()
	query.Add("model", model)
	query.Add("search_by", "subject")
	query.Add("filterFlags", FilterFlags)
	query.Add("pageNumber", strconv.Itoa(pageNumber))
	req.URL.RawQuery = query.Encode()

	pageRes, err := client.Do(req)
	if err != nil {
		log.Error(err)
	}
	defer pageRes.Body.Close()

	pageDoc, err := goquery.NewDocumentFromReader(pageRes.Body)
	if err != nil {
		log.Error(err)
	}

	return pageDoc
}
