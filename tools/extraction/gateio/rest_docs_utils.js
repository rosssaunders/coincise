import FireCrawlApp from '@mendable/firecrawl-js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define product type markers in the documentation
const PRODUCT_MARKERS = {
  spot: ['spot', 'SPOT', 'Spot'],
  futures: ['futures', 'FUTURES', 'Futures'],
  delivery: ['delivery', 'DELIVERY', 'Delivery'],
  options: ['options', 'OPTIONS', 'Options']
};

export async function scrapeRestDocs(endpoints, outputPath, productType) {
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
      excludeTags: [ "div.language-python" ],
      timeout: 10000,
    });

    // Extract the content
    let content = '';
    if (scrapeResult.markdown) {
      content = scrapeResult.markdown;
    }

    if (content) {
      // Filter content based on product type
      const filteredContent = filterContentByProduct(content, productType);
      
      if (filteredContent) {
        // Add a header for each section
        combinedContent += `\n\n# ${endpoint.toUpperCase()}\n\n`;
        combinedContent += filteredContent;
        console.log(`Successfully scraped and filtered ${endpoint} for ${productType}`);
      } else {
        console.log(`No relevant content found for ${productType} in ${endpoint}`);
      }
    } else {
      console.error(`No content found for endpoint: ${endpoint}`);
    }
  }

  // Write the combined content to a single file
  if (combinedContent) {
    fs.writeFileSync(outputPath, combinedContent);
    console.log(`All ${productType} documentation combined and saved successfully.`);
  } else {
    console.error(`No content found for ${productType} in any of the scrape results.`);
  }
}

function filterContentByProduct(content, productType) {
  if (!PRODUCT_MARKERS[productType]) {
    console.error(`Invalid product type: ${productType}`);
    return null;
  }

  // Split content into sections based on headers
  const sections = content.split(/(?=^# )/m);
  const relevantSections = [];

  for (const section of sections) {
    // Skip sections that are Changelog or Code samples
    if (section.toLowerCase().includes('changelog') || 
        section.toLowerCase().includes('code samples')) {
      continue;
    }

    // Check if section contains any of the product markers
    const isRelevant = PRODUCT_MARKERS[productType].some(marker => 
      section.toLowerCase().includes(marker.toLowerCase())
    );

    isRelevant = true;

    if (isRelevant) {
      relevantSections.push(section);
    }
  }

  return relevantSections.join('\n\n');
}