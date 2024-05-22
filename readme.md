# Web Scraper to Excel

A simple Node.js application to scrape web page data and output it into an Excel document. This example extracts all links from a given web page.

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Quentinkin/web-scraper-to-excel.git
   cd web-scraper-to-excel
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

## Usage

1. **Edit the script:**

   Open `scrape-to-excel.js` and set the `url` variable to the web page you want to scrape:

   ```js
   const url = "https://example.com";
   ```

2. **Run the script:**

   ```sh
   node scrape-to-excel.js
   ```

3. **Check the output:**

   The script generates `scraped_data.xlsx` in the project directory.

## Customization

To scrape different data, modify the selectors in `scrape-to-excel.js`:

```js
axios
  .get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];

    $(".article").each((index, element) => {
      const title = $(element).find(".article-title").text();
      const url = $(element).find(".article-title a").attr("href");
      articles.push({ title, url });
    });

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(articles);

    xlsx.utils.book_append_sheet(workbook, worksheet, "Articles");
    xlsx.writeFile(workbook, "scraped_data.xlsx");

    console.log("Scraping and export completed successfully.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
```
