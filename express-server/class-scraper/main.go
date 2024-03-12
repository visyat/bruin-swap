package main

import (
	"fmt"

	//placeholder
	"example.com/go-demo-1/webscraper"
)

func main() {

	fmt.Println(webscraper.BestMascot())

	/*
		slightly modified psuedo-code from tutorial that I am following:

		fetch page with all subject areas
		parse all subject areas
		for subject_area in subject_areas:
			fetch 1st courses page for subject_area
			parse courses from page
			fetch and parse additional course pages if needed (via /CourseTitlesView)
			for course in courses:
				fetch section data for course (via /GetCourseSummary) //unnecessary for our purposes
				for section in sections:
					parse section
					print section (TODO: save section in database)
	*/
}
