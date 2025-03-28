import FireCrawlApp from '@mendable/firecrawl-js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// List of endpoints to scrape
const endpoints = [ 
    "reference/exchangerestapi_getaccounts"
];

// Sleep function to delay between requests
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  const app = new FireCrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});
  let combinedContent = '';

  // Iterate through each endpoint
  for (const endpoint of endpoints) {
    const url = `https://docs.cdp.coinbase.com/exchange/${endpoint}`;
    console.log(`Scraping endpoint: ${url}`);
    
    const scrapeResult = await app.scrapeUrl(url, {
      formats: [ "html" ],
      includeTags: [ "article" ],
      timeout: 30000,
      //excludeTags: [ "footer" ],
      onlyMainContent: true,
    });

    // Extract the content
    let content = '';
    if (scrapeResult.markdown) {
      content = scrapeResult.markdown;
    } else if (scrapeResult.html) {
      content = scrapeResult.html;
    } else {
      content = "NO CONTENT";
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
    await sleep(3000);
  }

  // Write the combined content to a single file
  if (combinedContent) {
    fs.writeFileSync('coinbase_rest_client_endpoints_docs.md', combinedContent);
    console.log('All documentation combined and saved successfully.');
  } else {
    console.error('No content found in any of the scrape results.');
  }
}

run().catch(console.error);
