const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

// URL of the page we want to scrape
const url = "https://webscraper.io/test-sites/e-commerce/allinone";

axios
  .get(url)
  .then((response) => {
    // Load the web page's HTML into cheerio
    const $ = cheerio.load(response.data);

    // Extract the title of the web page
    const title = $("title").text();

    // Extract all links on the page
    const links = [];
    $("a").each((index, element) => {
      const link = $(element).attr("href");
      links.push({ link });
    });

    // Create a new workbook and add a worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(links);

    // Append the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, "Links");

    // Write the workbook to a file
    xlsx.writeFile(workbook, "scraped_data.xlsx");

    console.log("Scraping and export completed successfully.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
