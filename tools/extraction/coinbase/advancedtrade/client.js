import FireCrawlApp from '@mendable/firecrawl-js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// List of endpoints to scrape
const endpoints = [
    // "docs/welcome",
    // "docs/getting-started",
    // "docs/rest-api-orders",
    // "docs/rest-api-portfolios",
    // "docs/futures",
    // "docs/perpetuals",
    // "docs/api-overview",
    // "docs/rest-api-auth",
    // "docs/rest-api-scopes",
    // "docs/rest-api-rate-limits",
    // "docs/rest-api-sandbox",
    
    "reference/retailbrokerageapi_getaccounts",
    // "retailbrokerageapi_getaccount",
    // "retailbrokerageapi_getbestbidask",
    // "retailbrokerageapi_getproductbook",
    // "retailbrokerageapi_getproducts",
    // "retailbrokerageapi_getproduct",
    // "retailbrokerageapi_getcandles",
    // "retailbrokerageapi_getmarkettrades",
    // "retailbrokerageapi_postorder",
    // "retailbrokerageapi_cancelorders",
    // "retailbrokerageapi_editorder",
    // "retailbrokerageapi_previeweditorder",
    // "retailbrokerageapi_gethistoricalorders",
    // "retailbrokerageapi_getfills",
    // "retailbrokerageapi_gethistoricalorder",
    // "retailbrokerageapi_previeworder",
    // "retailbrokerageapi_closeposition",
];

// Sleep function to delay between requests
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  const app = new FireCrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});
  let combinedContent = '';

  // Iterate through each endpoint
  for (const endpoint of endpoints) {
    const url = `https://docs.cdp.coinbase.com/advanced-trade/${endpoint}`;
    console.log(`Scraping endpoint: ${url}`);
    
    const scrapeResult = await app.scrapeUrl(url, {
      formats: [ "markdown" ],
      includeTags: [ "article" ],
      //excludeTags: [ "footer" ],
      onlyMainContent: false,
    });

    // Extract the content
    let content = '';
    if (scrapeResult.markdown) {
      content = scrapeResult.markdown;
    } else if (scrapeResult.formats && scrapeResult.formats.markdown) {
      content = scrapeResult.formats.markdown;
    } else if (Array.isArray(scrapeResult) && scrapeResult.length > 0) {
      content = JSON.stringify(scrapeResult, null, 2);
    } else {
      content = JSON.stringify(scrapeResult, null, 2);
    }

    if (content) {
      // Add a header for each section
      combinedContent += `\n\n# ${endpoint.toUpperCase()}\n\n`;
      combinedContent += content;
      console.log(`Successfully scraped ${endpoint}`);
    } else {
      console.error(`No content found for endpoint: ${endpoint}`);
    }

    // Add 3 second delay between requests
    console.log('Waiting 3 seconds before next request...');
    await sleep(1500);
  }

  // Write the combined content to a single file
  if (combinedContent) {
    fs.writeFileSync('coinbase_rest_api_docs.md', combinedContent);
    console.log('All documentation combined and saved successfully.');
  } else {
    console.error('No content found in any of the scrape results.');
  }
}

run().catch(console.error);
