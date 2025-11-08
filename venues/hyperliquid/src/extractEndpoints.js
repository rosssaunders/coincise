/**
 * Hyperliquid Exchange - Endpoints Documentation Extraction
 * Extracts endpoint documentation from GitBook-based API docs
 */
'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { launchBrowser, configurePage } from '../../shared/puppeteer.js';
import { createTurndownBuilder } from '../../shared/turndown.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api';
const OUTPUT_DIR = path.resolve(__dirname, '../../../docs/hyperliquid');

/**
 * Ensure directory exists
 */
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Write content to file
 */
const writeFile = (filePath, content) => {
  console.log(`Writing ${filePath}...`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Written ${filePath}`);
};

/**
 * Sanitize filename
 */
const sanitizeFilename = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

/**
 * Extract endpoints from Info endpoint page
 */
const extractInfoEndpoints = async (page, turndownService) => {
  console.log('Extracting Info endpoints...');
  
  const url = `${BASE_URL}/info-endpoint`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  
  const endpoints = await page.evaluate((pageUrl) => {
    const results = [];
    const h2Headings = document.querySelectorAll('h2');
    
    h2Headings.forEach((h2) => {
      const endpointName = h2.textContent.trim();
      
      // Create a container for this endpoint's content
      const contentDiv = document.createElement('div');
      let currentElement = h2.nextElementSibling;
      
      // Collect all content until the next h2 or end
      while (currentElement && currentElement.tagName !== 'H2') {
        contentDiv.appendChild(currentElement.cloneNode(true));
        currentElement = currentElement.nextElementSibling;
      }
      
      if (contentDiv.innerHTML.trim()) {
        results.push({
          name: endpointName,
          content: contentDiv.innerHTML,
          sourceUrl: pageUrl
        });
      }
    });
    
    return results;
  }, url);
  
  return endpoints.map(endpoint => ({
    ...endpoint,
    content: turndownService.turndown(endpoint.content)
  }));
};

/**
 * Extract endpoints from Exchange endpoint page
 */
const extractExchangeEndpoints = async (page, turndownService) => {
  console.log('Extracting Exchange endpoints...');
  
  const url = `${BASE_URL}/exchange-endpoint`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  
  const endpoints = await page.evaluate((pageUrl) => {
    const results = [];
    const h2Headings = document.querySelectorAll('h2');
    
    h2Headings.forEach((h2) => {
      const endpointName = h2.textContent.trim();
      
      // Create a container for this endpoint's content
      const contentDiv = document.createElement('div');
      let currentElement = h2.nextElementSibling;
      
      // Collect all content until the next h2 or end
      while (currentElement && currentElement.tagName !== 'H2') {
        contentDiv.appendChild(currentElement.cloneNode(true));
        currentElement = currentElement.nextElementSibling;
      }
      
      if (contentDiv.innerHTML.trim()) {
        results.push({
          name: endpointName,
          content: contentDiv.innerHTML,
          sourceUrl: pageUrl
        });
      }
    });
    
    return results;
  }, url);
  
  return endpoints.map(endpoint => ({
    ...endpoint,
    content: turndownService.turndown(endpoint.content)
  }));
};

/**
 * Extract WebSocket endpoints
 */
const extractWebSocketEndpoints = async (page, turndownService) => {
  console.log('Extracting WebSocket endpoints...');
  
  const url = `${BASE_URL}/websocket`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  
  const content = await page.evaluate(() => {
    const mainContent = document.querySelector('main, article, [role="main"], .content');
    if (mainContent) {
      return mainContent.innerHTML;
    }
    return '';
  });
  
  return [{
    name: 'WebSocket API',
    content: turndownService.turndown(content),
    sourceUrl: url
  }];
};

/**
 * Determine if endpoint is public or private
 */
const classifyEndpoint = (name, content) => {
  const lowerName = name.toLowerCase();
  const lowerContent = content.toLowerCase();
  
  // Check for authentication-related keywords in content
  const hasAuthKeywords = 
    lowerContent.includes('signature') ||
    lowerContent.includes('signing') ||
    lowerContent.includes('private key') ||
    lowerContent.includes('wallet') ||
    lowerContent.includes('authorization');
  
  // Public endpoints typically include these terms
  const isPublicEndpoint = 
    lowerName.includes('retrieve mids') ||
    lowerName.includes('l2 book') ||
    lowerName.includes('candle') ||
    lowerName.includes('snapshot') ||
    (lowerName.includes('websocket') && !hasAuthKeywords);
  
  // If it's explicitly public, classify as public
  if (isPublicEndpoint) {
    return 'public';
  }
  
  // If it has auth keywords, it's private
  if (hasAuthKeywords) {
    return 'private';
  }
  
  // Default to private for exchange endpoints and authenticated info endpoints
  if (lowerName.includes('order') || 
      lowerName.includes('cancel') ||
      lowerName.includes('modify') ||
      lowerName.includes('leverage') ||
      lowerName.includes('transfer') ||
      lowerName.includes('withdraw') ||
      lowerName.includes('user')) {
    return 'private';
  }
  
  // Default to public if uncertain
  return 'public';
};

/**
 * Save endpoint to file
 */
const saveEndpoint = (endpoint, category) => {
  const filename = `${sanitizeFilename(endpoint.name)}.md`;
  const outputPath = path.join(OUTPUT_DIR, 'endpoints', category, filename);
  
  const content = `# ${endpoint.name}

**Source:** ${endpoint.sourceUrl}

${endpoint.content}
`;
  
  writeFile(outputPath, content);
};

const main = async () => {
  console.log('Starting endpoint documentation extraction for Hyperliquid...\n');
  
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await configurePage(page);
  
  const turndownService = createTurndownBuilder().build();
  
  try {
    ensureDir(OUTPUT_DIR);
    ensureDir(path.join(OUTPUT_DIR, 'endpoints', 'public'));
    ensureDir(path.join(OUTPUT_DIR, 'endpoints', 'private'));
    
    // Extract all endpoints
    const infoEndpoints = await extractInfoEndpoints(page, turndownService);
    const exchangeEndpoints = await extractExchangeEndpoints(page, turndownService);
    const wsEndpoints = await extractWebSocketEndpoints(page, turndownService);
    
    const allEndpoints = [...infoEndpoints, ...exchangeEndpoints, ...wsEndpoints];
    
    console.log(`\nExtracted ${allEndpoints.length} total endpoints`);
    
    let publicCount = 0;
    let privateCount = 0;
    
    // Classify and save each endpoint
    allEndpoints.forEach(endpoint => {
      const category = classifyEndpoint(endpoint.name, endpoint.content);
      saveEndpoint(endpoint, category);
      
      if (category === 'public') {
        publicCount++;
      } else {
        privateCount++;
      }
    });
    
    console.log(`\n📊 Endpoint Classification Summary:`);
    console.log(`   Public endpoints: ${publicCount}`);
    console.log(`   Private endpoints: ${privateCount}`);
    console.log(`   Total: ${allEndpoints.length}`);
    
    console.log('\n✅ Endpoint documentation extraction completed successfully');
  } finally {
    await browser.close();
  }
};

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Unhandled error in main:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  });
}

export { main };
