/**
 * XT.com Exchange - General Documentation Extraction
 * Extracts core documentation sections from Docusaurus-based API docs
 */
'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { launchBrowser, configurePage } from '../../shared/puppeteer.js';
import { createTurndownBuilder } from '../../shared/turndown.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://doc.xt.com/docs/spot';
const OUTPUT_DIR = path.resolve(__dirname, '../../../docs/xt');

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
  console.log(`Writing ${path.basename(filePath)}...`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Written ${path.basename(filePath)}`);
};

/**
 * Extract page content from a URL
 */
const extractPageContent = async (page, url, turndownService) => {
  console.log(`Navigating to ${url}...`);
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const html = await page.evaluate(() => {
    const article = document.querySelector('article, main, [class*="docMainContainer"]');
    if (!article) return '';
    
    // Clone the article to avoid modifying the original
    const clone = article.cloneNode(true);
    
    // Remove navigation elements, TOC, etc.
    const elementsToRemove = clone.querySelectorAll(
      '.table-of-contents, [class*="tocCollapsible"], nav, .pagination-nav, [class*="lastUpdated"]'
    );
    elementsToRemove.forEach(el => el.remove());
    
    return clone.innerHTML;
  });

  return turndownService.turndown(html);
};

/**
 * Extract Rate Limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log('Extracting rate limits information...');
  const url = `${BASE_URL}/Access%20Description/FrequencyLimitingRules`;
  return await extractPageContent(page, url, turndownService);
};

/**
 * Extract Authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log('Extracting authentication information...');
  
  // Combine multiple pages for authentication
  const signatureUrl = `${BASE_URL}/Access%20Description/SignatureInstructions`;
  const signatureGenUrl = `${BASE_URL}/Access%20Description/SignatureGeneration`;
  const apiKeyUrl = `${BASE_URL}/Access%20Description/ApiKeyApplicationSteps`;
  
  const signatureContent = await extractPageContent(page, signatureUrl, turndownService);
  const signatureGenContent = await extractPageContent(page, signatureGenUrl, turndownService);
  const apiKeyContent = await extractPageContent(page, apiKeyUrl, turndownService);
  
  return `# Authentication\n\n${signatureContent}\n\n${signatureGenContent}\n\n${apiKeyContent}`;
};

/**
 * Extract Network Connectivity documentation
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log('Extracting network connectivity information...');
  const url = `${BASE_URL}/Access%20Description/BasicInformationOfTheInterface`;
  return await extractPageContent(page, url, turndownService);
};

/**
 * Extract Error Codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log('Extracting error codes information...');
  const url = `${BASE_URL}/Access%20Description/ResponseCode`;
  return await extractPageContent(page, url, turndownService);
};

/**
 * Extract Response Formats documentation
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log('Extracting response formats information...');
  const url = `${BASE_URL}/Access%20Description/ResponseFormat`;
  return await extractPageContent(page, url, turndownService);
};

/**
 * Extract Change Log - XT.com doesn't have a dedicated changelog in the main docs
 */
const extractChangeLog = async () => {
  console.log('Creating placeholder for change log...');
  return `# Change Log

XT.com does not provide a dedicated API changelog in their documentation.
Please check the XT.com official announcements or GitHub repository for API updates:
- GitHub: https://github.com/XtApis/api
`;
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log('Starting general documentation extraction for XT.com...\n');

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await configurePage(page);

  const turndownService = createTurndownBuilder().build();

  try {
    await ensureDir(OUTPUT_DIR);

    // Extract each section
    const rateLimits = await extractRateLimits(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'rate_limits.md'), rateLimits);

    const authentication = await extractAuthentication(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'authentication.md'), authentication);

    const networkConnectivity = await extractNetworkConnectivity(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'network_connectivity.md'), networkConnectivity);

    const errorCodes = await extractErrorCodes(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'error_codes.md'), errorCodes);

    const responseFormats = await extractResponseFormats(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'response_formats.md'), responseFormats);

    const changeLog = await extractChangeLog();
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
