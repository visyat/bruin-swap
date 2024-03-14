
//most of the code is edited out - attempts to follow a tutorial but ran into issues interacting with the dynamic javascript on the course registrar website.  
//We think that UCLA has something in place to prevent scraping :(

/*const puppeteer = require('puppeteer') 

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    'https://sa.ucla.edu/ro/Public/SOC/Results?t=19F&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex'
  )


  await page.click('#UserInfoTooltip--t1_fwwqt0y > a');

  //const name = await page.$eval('#expandAll.linkLikeButton', el => el.innerText)
  await browser.close()
/*
  const buttonText = 'Expand All Classes';
  const buttonSelector = `button:contains("${buttonText}")`;
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector)
  await page.waitFor(5000)

  await page.screenshot({ path: 'test2.png', fullPage: true })
  await browser.close()

  const data = await page.evaluate(() => {
    const rawEnrollmentStatuses = document.querySelectorAll('.statusColumn[id]')
    return Array.from(rawEnrollmentStatuses).map(rawStatus => {
      const id = rawStatus.getAttribute('id')
      const course = id.match(/COMSCI\d{4}/)  
      return { course }
    })
  })

  console.table(data)

  await browser.close()
  *
})()

*/


const puppeteer = require('puppeteer')

async function scrapeDepartment(page, link) {
  await page.goto(link, { timeout: 0 })
  const pageCount = await page.$eval('#pageCount', count =>
    parseInt(count.getAttribute('value'))
  )
  for (let i = 0; i < pageCount; i++) {
    await scrapePage(page)
    if (i !== pageCount - 1) {
      const nextLink = await page.$('#divPagination .jPag-snext-img')
      nextLink.click()
    }
  }
}

function getUrlsForSubjects(subjects) {
  return subjects.map(subject => {
    // Spaces are encoded in the url with `+` instead of `%20`
    const formattedCode = encodeURIComponent(subject.value).replace('%20', '+')
    const link = `https://sa.ucla.edu/ro/Public/SOC/Results?t=19F&sBy=subject&subj=${subj}`
    return link
  })
}

const data = await page.evaluate(() => {
  const courses = document.querySelectorAll('.primarySection')
  return Array.from(courses).map(course => {
    const id = rawSection.getAttribute('id')
    const [course] = id.match(/[A-Z]+\d+[A-Z]*\d*/)
    const container = document.querySelector(`[id$='${course}-children']`)
    const rows = container.querySelectorAll('.data_row')
    return Array.from(rows).map(section => {
      const lectureNumber = section.querySelector('.sectionColumn p').innerText
     
      const days = section.querySelector('.dayColumn p').innerText
      const time = section.querySelector('.timeColumn > p').innerText
      const location = section.querySelector('.locationColumn p').innerText
      const instructor = section.querySelector('.instructorColumn p').innerText
      return {
        course,
        lectureNumber,
        days,
        time,
        location,
        instructor,
      }
    })
  })
})

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    'https://sa.ucla.edu/ro/Public/SOC/Results?t=19F&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex'
  )

  //WE COULD NOT CLICK THE BUTTON - TRIED MANY DIFFERENT METHODS AND SELENIUM - DECIDED TO USE PDF SCRAPER INSTEAD 
  await page.click('#expandAll')
  await page.waitFor(5000)

  const data = await page.evaluate(() => {
    const rawEnrollmentStatuses = document.querySelectorAll('.statusColumn[id]')
    return Array.from(rawEnrollmentStatuses).map(rawStatus => {
      const id = rawStatus.getAttribute('id')
      const course = id.match(/COMSCI\d{4}/) // e.g., COMSCI0032
      return { course }
    })
  })

  console.table(data)

  await browser.close()
})()