import FireCrawlApp from '@mendable/firecrawl-js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// List of endpoints to scrape
const endpoints = [
    "apiv4/ws/en/",
];

async function run() {
  const app = new FireCrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});
  let combinedContent = '';

  // Iterate through each endpoint
  for (const endpoint of endpoints) {
    console.log(`Scraping endpoint: ${endpoint}`);
    const url = `https://www.gate.io/docs/developers/${endpoint}`;
  
    const scrapeResult = await app.scrapeUrl(url, {
      formats: [ "markdown" ],
      onlyMainContent: false,
      includeTags: [ "div.page__container" ],
    });

    // Extract the content
    let content = '';
    if (scrapeResult.markdown) {
      content = scrapeResult.markdown;
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
    const outputPath = '../../../docs/gateio/websocket_spot_api.md';
    fs.writeFileSync(outputPath, combinedContent);
    console.log('All documentation combined and saved successfully.');
  } else {
    console.error('No content found in any of the scrape results.');
  }
}

run().catch(console.error);
