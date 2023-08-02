
const db = require("../volunteerverse-api/dist/src/db");


const scraperObject = {
  url: "https://www.democracylab.org/projects",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    for (let i = 0; i <= 5; i++) {
      console.log(i);
      await page.click(
        "#MainController > div.SectionBody > div.FindProjectsController-root.container > div > div.ProjectCardContainer.col > div:nth-child(4) > div > button"
      );
      await page.waitForTimeout(2000);
    }

    let urls = await page.$$eval(
      ".ProjectCardContainer.col .ProjectCard-root > a",
      (links) => {
        links = links.map((el) => el.href);
        return links;
      }
    );
    console.log(urls);

    // Loop through each of those links, open a new page instance and get the relevant data from them
    let pagePromise = (link) =>
      new Promise(async (resolve, reject) => {
        let dataObj = {};
        let newPage = await browser.newPage();
        await newPage.goto(link);

        dataObj["projectTitle"] = await scrapeDataWithSelector(
          newPage,
          "div.Profile-top-details > h1"
        );

        dataObj["problem"] = await scrapeDataWithSelector(
          newPage,
          "#AboutProject-tabs-tabpane-proj-details > div.markdown-container >p "
        );

        let descriptionText = await newPage.$$eval(
          "#AboutProject-tabs-tabpane-proj-details > div > div.markdown-container",
          (desc) => {
            desc = desc.map((el) => el.textContent);
            return desc;
          }
        );

        dataObj["action"] = descriptionText;

        dataObj["founder"] = await scrapeDataWithSelector(
          newPage,
          "div.AboutProject-staff.AboutProject-secondary-section > div > div > div > a:nth-child(2)"
        );

        let technologies = await newPage.$$eval(
          "div.AboutProject-technologies > span",
          (tags) => {
            tags = tags.map((el) => el.textContent);
            return tags;
          }
        );


        dataObj["technologies"] = technologies;

        dataObj["website"] = await scrapeDataWithSelector(
          newPage,
          ".AboutProject-url-text > a"
        );

        try {
          dataObj["image"] = await newPage.$eval(
            "div.container.Profile-root > div > div > div > div.Profile-top-logo > img",
            (el) => el.src
          );
        } catch (error) {
          dataObj["image"] = null;
        }

        resolve(dataObj);

        const insertQuery = `INSERT INTO projects (org_name, org_website, project_name, project_description, image_url) VALUES ($1, $2, $3, $4, $5)`
        const values = [dataObj.projectTitle, dataObj.website, dataObj.projectTitle, dataObj.action, dataObj.image]

        try {
          await db.query(insertQuery, values);
          console.log('Data inserted successfully.');
        } catch (error) {
          console.error('Error inserting data:', error);
        }



        await newPage.close();
      });

    for (link in urls) {
      let currentPageData = await pagePromise(urls[link]);
      // scrapedData.push(currentPageData);
      console.log(currentPageData);
    }
  },
};

async function scrapeDataWithSelector(newPage, selector) {
  try {
    return await newPage.$eval(selector, (el) => el.textContent);
  } catch (error) {
    return null;
  }
}

module.exports = scraperObject;
