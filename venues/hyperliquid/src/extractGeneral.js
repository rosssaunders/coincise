/**
 * Hyperliquid Exchange - General Documentation Extraction
 * Extracts core documentation sections from GitBook-based API docs
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
 * Extract content from a page
 */
const extractPageContent = async (page, url, turndownService) => {
  console.log(`Extracting content from ${url}...`);
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  
  const html = await page.evaluate(() => {
    const mainContent = document.querySelector('main, article, [role="main"], .content');
    if (mainContent) {
      return mainContent.innerHTML;
    }
    return document.body.innerHTML;
  });
  
  const markdown = turndownService.turndown(html);
  return markdown;
};

/**
 * Extract Network Connectivity information
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log('Extracting network connectivity information...');
  
  const mainPageUrl = BASE_URL;
  await page.goto(mainPageUrl, { waitUntil: 'networkidle0', timeout: 60000 });
  
  const html = await page.evaluate(() => {
    const content = document.createElement('div');
    const heading = document.createElement('h1');
    heading.textContent = 'Network Connectivity';
    content.appendChild(heading);
    
    const intro = document.createElement('p');
    intro.textContent = 'Hyperliquid API provides public REST and WebSocket endpoints for trading and market data.';
    content.appendChild(intro);
    
    const h2Rest = document.createElement('h2');
    h2Rest.textContent = 'REST API Endpoints';
    content.appendChild(h2Rest);
    
    const restList = document.createElement('ul');
    restList.innerHTML = `
      <li><strong>Mainnet API:</strong> https://api.hyperliquid.xyz</li>
      <li><strong>Testnet API:</strong> https://api.hyperliquid-testnet.xyz</li>
    `;
    content.appendChild(restList);
    
    const h2Ws = document.createElement('h2');
    h2Ws.textContent = 'WebSocket Endpoints';
    content.appendChild(h2Ws);
    
    const wsList = document.createElement('ul');
    wsList.innerHTML = `
      <li><strong>Mainnet WebSocket:</strong> wss://api.hyperliquid.xyz/ws</li>
      <li><strong>Testnet WebSocket:</strong> wss://api.hyperliquid-testnet.xyz/ws</li>
    `;
    content.appendChild(wsList);
    
    return content.innerHTML;
  });
  
  return turndownService.turndown(html);
};

/**
 * Extract Authentication section
 */
const extractAuthentication = async (page, turndownService) => {
  console.log('Extracting authentication information...');
  
  const signingUrl = `${BASE_URL}/signing`;
  const content = await extractPageContent(page, signingUrl, turndownService);
  
  return content;
};

/**
 * Extract Rate Limits section
 */
const extractRateLimits = async (page, turndownService) => {
  console.log('Extracting rate limits information...');
  
  const rateLimitsUrl = `${BASE_URL}/rate-limits-and-user-limits`;
  const content = await extractPageContent(page, rateLimitsUrl, turndownService);
  
  return content;
};

/**
 * Extract Error Codes section
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log('Extracting error codes information...');
  
  const errorUrl = `${BASE_URL}/error-responses`;
  const content = await extractPageContent(page, errorUrl, turndownService);
  
  return content;
};

/**
 * Extract Response Formats section
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log('Extracting response formats information...');
  
  const notationUrl = `${BASE_URL}/notation`;
  const content = await extractPageContent(page, notationUrl, turndownService);
  
  return content;
};

/**
 * Extract Change Log section
 */
const extractChangeLog = async (page, turndownService) => {
  console.log('Extracting change log information...');
  
  // GitBook sites typically don't have a changelog in the API docs
  // Create a minimal placeholder
  const html = `
    <h1>Change Log</h1>
    <p>For the latest changes and updates to the Hyperliquid API, please refer to the official documentation at <a href="https://hyperliquid.gitbook.io/hyperliquid-docs">https://hyperliquid.gitbook.io/hyperliquid-docs</a></p>
    <p>Hyperliquid API is currently at version v0. A breaking v1 API change is planned for standardization.</p>
  `;
  
  return turndownService.turndown(html);
};

const main = async () => {
  console.log('Starting general documentation extraction for Hyperliquid...\n');
  
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await configurePage(page);
  
  const turndownService = createTurndownBuilder().build();
  
  try {
    ensureDir(OUTPUT_DIR);
    
    // Extract network connectivity
    const networkConnectivity = await extractNetworkConnectivity(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'network_connectivity.md'), networkConnectivity);
    
    // Extract authentication
    const authentication = await extractAuthentication(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'authentication.md'), authentication);
    
    // Extract rate limits
    const rateLimits = await extractRateLimits(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'rate_limits.md'), rateLimits);
    
    // Extract error codes
    const errorCodes = await extractErrorCodes(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'error_codes.md'), errorCodes);
    
    // Extract response formats
    const responseFormats = await extractResponseFormats(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'response_formats.md'), responseFormats);
    
    // Extract change log
    const changeLog = await extractChangeLog(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'change_log.md'), changeLog);
    
    console.log('\n✅ General documentation extraction completed successfully');
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
