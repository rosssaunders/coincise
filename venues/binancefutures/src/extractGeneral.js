/**
 * Binance Futures - General Documentation Extraction
 * Extracts core documentation sections for USD-M, COIN-M, and Options
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
const DOCS_ROOT = path.resolve(__dirname, '../../../docs/binance');

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
 * Extract general information section
 */
const extractSection = async (page, url, turndownService) => {
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const html = await page.evaluate(() => {
    const content = document.querySelector('.theme-doc-markdown.markdown');
    return content ? content.innerHTML : '';
  });

  if (!html) {
    return null;
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  adjustHeadingLevels(document);
  const cleanedHtml = dom.serialize();
  const markdown = turndownService.turndown(cleanedHtml);

  return markdown;
};

/**
 * Extract general docs for a specific futures type
 */
const extractGeneralForType = async (page, turndownService, type, outputDir) => {
  console.log(`\nExtracting general documentation for ${type}...`);
  
  ensureDir(outputDir);

  const basePathMap = {
    'usdm': 'derivatives/usds-margined-futures',
    'coinm': 'derivatives/coin-margined-futures',
    'options': 'derivatives/option'
  };

  const basePath = basePathMap[type];

  // Extract General Info (covers rate limits, connectivity, etc.)
  console.log(`  Extracting general information for ${type}...`);
  const generalInfo = await extractSection(
    page,
    `${BASE_URL}/${basePath}/general-info`,
    turndownService
  );

  if (generalInfo) {
    // Rate Limits
    const rateLimits = `# Rate Limits\n\n${generalInfo}\n\n> Source: [${BASE_URL}/${basePath}/general-info](${BASE_URL}/${basePath}/general-info)\n`;
    await writeFile(path.join(outputDir, 'rate_limits.md'), rateLimits);

    // Network Connectivity (same content, different heading)
    const networkConnectivity = `# Network Connectivity\n\n${generalInfo}\n\n> Source: [${BASE_URL}/${basePath}/general-info](${BASE_URL}/${basePath}/general-info)\n`;
    await writeFile(path.join(outputDir, 'network_connectivity.md'), networkConnectivity);

    // Authentication (included in general-info for futures)
    const authentication = `# Authentication\n\n${generalInfo}\n\n> Source: [${BASE_URL}/${basePath}/general-info](${BASE_URL}/${basePath}/general-info)\n`;
    await writeFile(path.join(outputDir, 'authentication.md'), authentication);
  }

  // Extract Error Codes
  console.log(`  Extracting error codes for ${type}...`);
  const errorCodes = await extractSection(
    page,
    `${BASE_URL}/${basePath}/error-code`,
    turndownService
  );

  if (errorCodes) {
    const errorCodesDoc = `# Error Codes\n\n${errorCodes}\n\n> Source: [${BASE_URL}/${basePath}/error-code](${BASE_URL}/${basePath}/error-code)\n`;
    await writeFile(path.join(outputDir, 'error_codes.md'), errorCodesDoc);
  }

  // Extract Common Definitions (if exists)
  console.log(`  Extracting common definitions for ${type}...`);
  try {
    const commonDefs = await extractSection(
      page,
      `${BASE_URL}/${basePath}/common-definition`,
      turndownService
    );

    if (commonDefs) {
      const responseFormats = `# Response Formats\n\n${commonDefs}\n\n> Source: [${BASE_URL}/${basePath}/common-definition](${BASE_URL}/${basePath}/common-definition)\n`;
      await writeFile(path.join(outputDir, 'response_formats.md'), responseFormats);
    }
  } catch (e) {
    console.log(`  Note: Common definitions not available for ${type}`);
    // Create minimal response_formats file
    const responseFormats = `# Response Formats\n\nRefer to general information for response format details.\n\n> Source: [${BASE_URL}/${basePath}/general-info](${BASE_URL}/${basePath}/general-info)\n`;
    await writeFile(path.join(outputDir, 'response_formats.md'), responseFormats);
  }

  console.log(`✅ Completed general documentation extraction for ${type}`);
};

/**
 * Extract Change Log (shared across all futures types)
 */
const extractChangeLog = async (page, turndownService) => {
  console.log('\nExtracting change log...');

  const changeLog = await extractSection(
    page,
    `${BASE_URL}/derivatives/change-log`,
    turndownService
  );

  if (changeLog) {
    const changeLogDoc = `# Change Log\n\n${changeLog}\n\n> Source: [${BASE_URL}/derivatives/change-log](${BASE_URL}/derivatives/change-log)\n`;
    
    // Write to futures directory (shared)
    const futuresDir = path.join(DOCS_ROOT, 'futures');
    ensureDir(futuresDir);
    await writeFile(path.join(futuresDir, 'change_log.md'), changeLogDoc);
    
    console.log('✅ Change log extraction completed');
  }
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log('Starting general documentation extraction for Binance Futures...');

  const browser = await launchBrowser();
  const page = await browser.newPage();
  const turndownService = configureTurndown();

  try {
    // Extract for USD-M Futures
    await extractGeneralForType(
      page,
      turndownService,
      'usdm',
      path.join(DOCS_ROOT, 'usdm')
    );

    // Extract for COIN-M Futures
    await extractGeneralForType(
      page,
      turndownService,
      'coinm',
      path.join(DOCS_ROOT, 'coinm')
    );

    // Extract for Options
    await extractGeneralForType(
      page,
      turndownService,
      'options',
      path.join(DOCS_ROOT, 'options')
    );

    // Extract Change Log (shared)
    await extractChangeLog(page, turndownService);

    console.log('\n✅ All general documentation extraction completed successfully');
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
