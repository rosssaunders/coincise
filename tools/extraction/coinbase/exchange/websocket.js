import FireCrawlApp from '@mendable/firecrawl-js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// List of endpoints to scrape
const endpoints = [
    "docs/websocket-overview",
    "docs/websocket-best-practices",
    "docs/websocket-auth",
    "docs/websocket-channels",
    "docs/websocket-rate-limits",
    "docs/websocket-errors",
];

async function run() {
  const app = new FireCrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});
  let combinedContent = '';

  // Iterate through each endpoint
  for (const endpoint of endpoints) {
    console.log(`Scraping endpoint: ${endpoint}`);
    const url = `https://docs.cdp.coinbase.com/exchange/${endpoint}`;
    
    const scrapeResult = await app.scrapeUrl(url, {
      formats: [ "markdown" ],
      includeTags: [ "article" ],
      excludeTags: [ "footer" ],
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
  }

  // Write the combined content to a single file
  if (combinedContent) {
    fs.writeFileSync('coinbase_websocket_docs.md', combinedContent);
    console.log('All documentation combined and saved successfully.');
  } else {
    console.error('No content found in any of the scrape results.');
  }
}

run().catch(console.error);
