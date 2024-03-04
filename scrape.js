const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the webpage
  await page.goto('https://sa.ucla.edu/ro/public/soc/Results?SubjectAreaName=Computer+Science+(COM+SCI)&t=23W&sBy=subject&subj=COM+SCI&catlg=&cls_no=&undefined=Go&btnIsInIndex=btn_inIndex');


  // Extract course information
  const courseData = await page.evaluate(() => {
    const courses = [];
    // Find all course elements
    const courseElements = document.querySelectorAll('[id^="COMSCI"]');

    // Iterate over each course element
    courseElements.forEach(courseElement => {
      // Extract course details from the button textContent
      const courseName = courseElement.textContent.trim();

      // Add course details to the array
      courses.push({
        name: courseName
      });
    });

    return courses;
  });

  console.log('Course Data:', courseData);

  await browser.close();
})();
