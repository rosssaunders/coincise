import FireCrawlApp from '@mendable/firecrawl-js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// List of endpoints to scrape
const endpoints = [ 
    "reference/exchangerestapi_getaccounts"
    // "docs/welcome",
    // "docs/getting-started",
    // "docs/sandbox",
    // "docs/matching-engine",
    // "docs/rate-limits",
    // "docs/runbook",
    // "docs/rest-requests",
    // "docs/rest-auth",
    // "docs/rest-rate-limits",
    // "docs/rest-pagination",
    // "docs/profiles",
    // "docs/types"
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
      formats: [ "markdown" ],
      includeTags: [ "article" ],
      timeout: 30000,
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
    await sleep(3000);
  }

  // Write the combined content to a single file
  if (combinedContent) {
    fs.writeFileSync('coinbase_rest_client_docs.md', combinedContent);
    console.log('All documentation combined and saved successfully.');
  } else {
    console.error('No content found in any of the scrape results.');
  }
}

run().catch(console.error);
