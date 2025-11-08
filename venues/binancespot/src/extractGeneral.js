/**
 * Binance Spot - General Documentation Extraction
 * Extracts core documentation sections from Binance Spot API docs
 */
'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import { launchBrowser } from '../../shared/puppeteer.js';
import { createTurndownBuilder } from '../../shared/turndown.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://developers.binance.com/docs';
const OUTPUT_DIR = path.resolve(__dirname, '../../../docs/binance/spot');

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
 * Configure Turndown for HTML to Markdown conversion
 */
const configureTurndown = () => {
  return createTurndownBuilder().withTablesWithoutHeaders().build();
};

/**
 * Helper to adjust heading levels down by one
 */
const adjustHeadingLevels = (document) => {
  // Clean heading content by removing anchor links
  const cleanHeadingContent = (element) => {
    const anchors = element.querySelectorAll('a');
    for (const anchor of anchors) {
      if (
        anchor.getAttribute('href')?.includes('#') ||
        anchor.classList.contains('hash-link') ||
        anchor.textContent.trim() === '' ||
        anchor.textContent === '\u200B'
      ) {
        anchor.parentNode.removeChild(anchor);
      } else {
        const text = anchor.textContent;
        const textNode = document.createTextNode(text);
        anchor.parentNode.replaceChild(textNode, anchor);
      }
    }
    return element.innerHTML;
  };

  // Process headings from highest to lowest
  ['h5', 'h4', 'h3', 'h2', 'h1'].forEach((tag, index) => {
    const nextTag = `h${6 - index}`;
    const elements = document.querySelectorAll(tag);
    for (const element of elements) {
      const newElement = document.createElement(nextTag);
      newElement.innerHTML = cleanHeadingContent(element);
      element.parentNode.replaceChild(newElement, element);
    }
  });
};

/**
 * Extract Rate Limits section
 */
const extractRateLimits = async (page, turndownService) => {
  console.log('Extracting rate limits information...');

  await page.goto(`${BASE_URL}/binance-spot-api-docs/rest-api/limits`, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const html = await page.evaluate(() => {
    const content = document.querySelector('.theme-doc-markdown.markdown');
    return content ? content.innerHTML : '';
  });

  if (!html) {
    return '# Rate Limits\n\nInformation not available.\n';
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  adjustHeadingLevels(document);
  const cleanedHtml = dom.serialize();
  const markdown = turndownService.turndown(cleanedHtml);

  return `# Rate Limits\n\n${markdown}\n\n> Source: [${BASE_URL}/binance-spot-api-docs/rest-api/limits](${BASE_URL}/binance-spot-api-docs/rest-api/limits)\n`;
};

/**
 * Extract Authentication section
 */
const extractAuthentication = async (page, turndownService) => {
  console.log('Extracting authentication information...');

  await page.goto(`${BASE_URL}/binance-spot-api-docs/rest-api/request-security`, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const html = await page.evaluate(() => {
    const content = document.querySelector('.theme-doc-markdown.markdown');
    return content ? content.innerHTML : '';
  });

  if (!html) {
    return '# Authentication\n\nInformation not available.\n';
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  adjustHeadingLevels(document);
  const cleanedHtml = dom.serialize();
  const markdown = turndownService.turndown(cleanedHtml);

  return `# Authentication\n\n${markdown}\n\n> Source: [${BASE_URL}/binance-spot-api-docs/rest-api/request-security](${BASE_URL}/binance-spot-api-docs/rest-api/request-security)\n`;
};

/**
 * Extract Network Connectivity section
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log('Extracting network connectivity information...');

  await page.goto(`${BASE_URL}/binance-spot-api-docs/rest-api/general-api-information`, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const html = await page.evaluate(() => {
    const content = document.querySelector('.theme-doc-markdown.markdown');
    return content ? content.innerHTML : '';
  });

  if (!html) {
    return '# Network Connectivity\n\nInformation not available.\n';
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  adjustHeadingLevels(document);
  const cleanedHtml = dom.serialize();
  const markdown = turndownService.turndown(cleanedHtml);

  return `# Network Connectivity\n\n${markdown}\n\n> Source: [${BASE_URL}/binance-spot-api-docs/rest-api/general-api-information](${BASE_URL}/binance-spot-api-docs/rest-api/general-api-information)\n`;
};

/**
 * Extract Error Codes section
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log('Extracting error codes information...');

  await page.goto(`${BASE_URL}/binance-spot-api-docs/rest-api/error-codes`, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const html = await page.evaluate(() => {
    const content = document.querySelector('.theme-doc-markdown.markdown');
    return content ? content.innerHTML : '';
  });

  if (!html) {
    return '# Error Codes\n\nInformation not available.\n';
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  adjustHeadingLevels(document);
  const cleanedHtml = dom.serialize();
  const markdown = turndownService.turndown(cleanedHtml);

  return `# Error Codes\n\n${markdown}\n\n> Source: [${BASE_URL}/binance-spot-api-docs/rest-api/error-codes](${BASE_URL}/binance-spot-api-docs/rest-api/error-codes)\n`;
};

/**
 * Extract Response Formats section
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log('Extracting response formats information...');

  await page.goto(`${BASE_URL}/binance-spot-api-docs/rest-api/http-return-codes`, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const html = await page.evaluate(() => {
    const content = document.querySelector('.theme-doc-markdown.markdown');
    return content ? content.innerHTML : '';
  });

  if (!html) {
    return '# Response Formats\n\nInformation not available.\n';
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  adjustHeadingLevels(document);
  const cleanedHtml = dom.serialize();
  const markdown = turndownService.turndown(cleanedHtml);

  return `# Response Formats\n\n${markdown}\n\n> Source: [${BASE_URL}/binance-spot-api-docs/rest-api/http-return-codes](${BASE_URL}/binance-spot-api-docs/rest-api/http-return-codes)\n`;
};

/**
 * Extract Change Log section
 */
const extractChangeLog = async (page, turndownService) => {
  console.log('Extracting change log information...');

  await page.goto(`${BASE_URL}/changelog/binance-spot`, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const html = await page.evaluate(() => {
    const content = document.querySelector('.theme-doc-markdown.markdown');
    return content ? content.innerHTML : '';
  });

  if (!html) {
    return '# Change Log\n\nInformation not available.\n';
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  adjustHeadingLevels(document);
  const cleanedHtml = dom.serialize();
  const markdown = turndownService.turndown(cleanedHtml);

  return `# Change Log\n\n${markdown}\n\n> Source: [${BASE_URL}/changelog/binance-spot](${BASE_URL}/changelog/binance-spot)\n`;
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log('Starting general documentation extraction for Binance Spot...');

  const browser = await launchBrowser();
  const page = await browser.newPage();
  const turndownService = configureTurndown();

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

    const changeLog = await extractChangeLog(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, 'change_log.md'), changeLog);

    console.log('✅ General documentation extraction completed successfully');
  } finally {
    await browser.close();
  }
};

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Unhandled error in main:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  });
}

export { main };
