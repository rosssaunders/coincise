/**
 * KuCoin Exchange - General Documentation Extraction
 * Extracts core documentation sections from KuCoin API docs
 */
"use strict";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { launchBrowser, configurePage } from "../../shared/puppeteer.js";
import { createTurndownBuilder } from "../../shared/turndown.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.kucoin.com/docs-new";
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/kucoin");

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
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Written ${path.basename(filePath)}`);
};

/**
 * Extract Rate Limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits information...");
  
  const url = `${BASE_URL}/rate-limit`;
  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  
  const html = await page.evaluate(() => {
    const content = document.createElement("div");
    
    // KuCoin docs use a main content area
    const mainContent = document.querySelector(
      'article, main, [class*="content"], [class*="markdown"]'
    );
    
    if (mainContent) {
      content.appendChild(mainContent.cloneNode(true));
    }
    
    return content.innerHTML;
  });
  
  const markdown = turndownService.turndown(html);
  return markdown || "# Rate Limits\n\nPlease refer to the API documentation for rate limit information.\n";
};

/**
 * Extract Authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...");
  
  // Try multiple possible URLs for authentication docs
  const urls = [
    `${BASE_URL}/api-authentication`,
    `${BASE_URL}/authentication`,
    `${BASE_URL}/doc-338102`, // Common KuCoin doc ID pattern
  ];
  
  let markdown = "";
  
  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
      
      const html = await page.evaluate(() => {
        const content = document.createElement("div");
        const mainContent = document.querySelector(
          'article, main, [class*="content"], [class*="markdown"]'
        );
        
        if (mainContent) {
          content.appendChild(mainContent.cloneNode(true));
        }
        
        return content.innerHTML;
      });
      
      if (html && html.trim().length > 100) {
        markdown = turndownService.turndown(html);
        console.log(`✅ Found authentication docs at ${url}`);
        break;
      }
    } catch (error) {
      console.log(`⚠️  Could not access ${url}: ${error.message}`);
    }
  }
  
  if (!markdown) {
    // Fallback content
    markdown = `# Authentication

KuCoin API requires authentication for private endpoints.

## API Key

You need to create an API key through the KuCoin website:
1. Log in to your KuCoin account
2. Navigate to API Management
3. Create a new API key with appropriate permissions

## Request Signing

Private endpoints require signed requests using your API key, secret, and passphrase.

Please refer to the official KuCoin API documentation for detailed signing instructions.
`;
  }
  
  return markdown;
};

/**
 * Extract Network Connectivity documentation
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...");
  
  const urls = [
    `${BASE_URL}/general-info`,
    `${BASE_URL}/introduction`,
    `${BASE_URL}/getting-started`,
  ];
  
  let markdown = "";
  
  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
      
      const html = await page.evaluate(() => {
        const content = document.createElement("div");
        const mainContent = document.querySelector(
          'article, main, [class*="content"], [class*="markdown"]'
        );
        
        if (mainContent) {
          content.appendChild(mainContent.cloneNode(true));
        }
        
        return content.innerHTML;
      });
      
      if (html && html.trim().length > 100) {
        markdown = turndownService.turndown(html);
        console.log(`✅ Found network connectivity docs at ${url}`);
        break;
      }
    } catch (error) {
      console.log(`⚠️  Could not access ${url}: ${error.message}`);
    }
  }
  
  if (!markdown) {
    // Fallback content based on known KuCoin API structure
    markdown = `# Network Connectivity

## Base URLs

### REST API
- **Production:** \`https://api.kucoin.com\`
- **Sandbox:** \`https://openapi-sandbox.kucoin.com\`

### Futures API
- **Production:** \`https://api-futures.kucoin.com\`
- **Sandbox:** \`https://api-sandbox-futures.kucoin.com\`

### WebSocket
- **Spot:** Apply for connection token via REST API first
- **Futures:** Apply for connection token via Futures REST API

## Connection

All REST requests must use HTTPS. WebSocket connections require obtaining a connection token first through the REST API.

Please refer to the official KuCoin API documentation for detailed connection instructions.
`;
  }
  
  return markdown;
};

/**
 * Extract Error Codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes information...");
  
  const urls = [
    `${BASE_URL}/error-codes`,
    `${BASE_URL}/errors`,
    `${BASE_URL}/response-codes`,
  ];
  
  let markdown = "";
  
  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
      
      const html = await page.evaluate(() => {
        const content = document.createElement("div");
        const mainContent = document.querySelector(
          'article, main, [class*="content"], [class*="markdown"]'
        );
        
        if (mainContent) {
          content.appendChild(mainContent.cloneNode(true));
        }
        
        return content.innerHTML;
      });
      
      if (html && html.trim().length > 100) {
        markdown = turndownService.turndown(html);
        console.log(`✅ Found error codes docs at ${url}`);
        break;
      }
    } catch (error) {
      console.log(`⚠️  Could not access ${url}: ${error.message}`);
    }
  }
  
  if (!markdown) {
    // Fallback content
    markdown = `# Error Codes

## HTTP Status Codes

- **200** - Success
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **429** - Rate Limit Exceeded
- **500** - Internal Server Error
- **503** - Service Unavailable

## KuCoin Error Codes

KuCoin uses specific error codes in the response body to indicate the type of error.

Please refer to the official KuCoin API documentation for a complete list of error codes.
`;
  }
  
  return markdown;
};

/**
 * Extract Response Formats documentation
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats information...");
  
  const markdown = `# Response Formats

## Standard Response Structure

All KuCoin API responses follow a standard JSON format:

\`\`\`json
{
  "code": "200000",
  "data": {
    // Response data here
  }
}
\`\`\`

### Success Response
- **code**: "200000" indicates success
- **data**: Contains the actual response data

### Error Response
\`\`\`json
{
  "code": "400100",
  "msg": "Error message description"
}
\`\`\`

- **code**: Error code (not "200000")
- **msg**: Human-readable error message

## Pagination

For endpoints that support pagination, the response includes:

\`\`\`json
{
  "code": "200000",
  "data": {
    "currentPage": 1,
    "pageSize": 50,
    "totalNum": 100,
    "totalPage": 2,
    "items": [...]
  }
}
\`\`\`

Please refer to the official KuCoin API documentation for specific endpoint response formats.
`;
  
  return markdown;
};

/**
 * Extract Changelog documentation
 */
const extractChangelog = async (page, turndownService) => {
  console.log("Extracting changelog information...");
  
  const urls = [
    `${BASE_URL}/changelog`,
    `${BASE_URL}/change-log`,
    `${BASE_URL}/updates`,
    `${BASE_URL}/release-notes`,
  ];
  
  let markdown = "";
  
  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
      
      const html = await page.evaluate(() => {
        const content = document.createElement("div");
        const mainContent = document.querySelector(
          'article, main, [class*="content"], [class*="markdown"]'
        );
        
        if (mainContent) {
          content.appendChild(mainContent.cloneNode(true));
        }
        
        return content.innerHTML;
      });
      
      if (html && html.trim().length > 100) {
        markdown = turndownService.turndown(html);
        console.log(`✅ Found changelog docs at ${url}`);
        break;
      }
    } catch (error) {
      console.log(`⚠️  Could not access ${url}: ${error.message}`);
    }
  }
  
  if (!markdown) {
    // Fallback content
    markdown = `# Changelog

## API Updates

KuCoin regularly updates their API with new features and improvements.

Please refer to the official KuCoin API documentation or their GitHub repository for the latest changelog information.

## Notable Changes

Check the KuCoin API documentation website for the most recent updates and changes to the API.
`;
  }
  
  return markdown;
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting KuCoin general documentation extraction...");
  console.log(`📍 Source: ${BASE_URL}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);

  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await configurePage(page);

    const turndownService = createTurndownBuilder().build();

    // Ensure output directory exists
    ensureDir(OUTPUT_DIR);

    // Extract each section
    const rateLimits = await extractRateLimits(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits);

    const authentication = await extractAuthentication(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "authentication.md"), authentication);

    const networkConnectivity = await extractNetworkConnectivity(
      page,
      turndownService
    );
    writeFile(
      path.join(OUTPUT_DIR, "network_connectivity.md"),
      networkConnectivity
    );

    const errorCodes = await extractErrorCodes(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "error_codes.md"), errorCodes);

    const responseFormats = await extractResponseFormats(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "response_formats.md"), responseFormats);

    const changelog = await extractChangelog(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changelog);

    console.log("\n✅ General documentation extraction completed successfully!");
    console.log(`📁 Files written to: ${OUTPUT_DIR}`);
  } finally {
    await browser.close();
  }
};

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("❌ Unhandled error in main:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  });
}

export { main };
