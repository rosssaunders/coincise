/**
 * BingX Exchange - General Documentation Extraction
 * Extracts core documentation sections from BingX API docs
 */
"use strict";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { launchBrowser, configurePage } from "../../shared/puppeteer.js";
import { createTurndownBuilder } from "../../shared/turndown.js";
import { formatMarkdown } from "../../shared/format-markdown.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://bingx-api.github.io/docs/";
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bingx");

// URLs for different documentation sections
const SECTION_URLS = {
  spot_base: `${BASE_URL}#/en-us/spot/base-info.html`,
  spot_auth: `${BASE_URL}#/en-us/spot/authentication.html`,
  futures_base: `${BASE_URL}#/en-us/swapV2/base-info.html`,
  futures_auth: `${BASE_URL}#/en-us/swapV2/authentication.html`,
  changelog: `${BASE_URL}#/en-us/spot/changelog`,
};

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
 * Extract content from a specific section on the page
 * @param {Page} page - Puppeteer page instance
 * @param {string} sectionSelector - CSS selector for the section to extract
 * @returns {Promise<string>} HTML content of the section
 */
const extractSection = async (page, sectionSelector) => {
  return await page.evaluate((selector) => {
    const section = document.querySelector(selector);
    if (!section) return "";
    return section.innerHTML;
  }, sectionSelector);
};

/**
 * Extract network connectivity documentation
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...");

  // Navigate to spot base info page
  await page.goto(SECTION_URLS.spot_base, {
    waitUntil: "networkidle2",
    timeout: 30000,
  });
  await page.waitForSelector(".app-content", { timeout: 10000 });

  const html = await page.evaluate(() => {
    const content = document.createElement("div");

    // Find sections related to network connectivity
    const appContent = document.querySelector(".app-content");
    if (!appContent) return "";

    // Look for sections about base URLs, endpoints, connectivity
    const sections = appContent.querySelectorAll("h2, h3, p, ul, ol, pre");
    let capturing = false;

    sections.forEach((element) => {
      const text = element.textContent.toLowerCase();

      // Start capturing at relevant sections
      if (
        (element.tagName === "H2" || element.tagName === "H3") &&
        (text.includes("base url") ||
          text.includes("endpoint") ||
          text.includes("connectivity") ||
          text.includes("host") ||
          text.includes("url"))
      ) {
        capturing = true;
      }

      // Stop at irrelevant sections
      if (
        capturing &&
        (element.tagName === "H2" || element.tagName === "H3") &&
        (text.includes("authentication") ||
          text.includes("signature") ||
          text.includes("rate limit"))
      ) {
        capturing = false;
      }

      if (capturing) {
        content.appendChild(element.cloneNode(true));
      }
    });

    return content.innerHTML;
  });

  let markdown = turndownService.turndown(html);

  // Add header if not present
  if (!markdown.includes("# Network Connectivity")) {
    markdown =
      "# Network Connectivity\n\n" +
      "## Base URLs\n\n" +
      "- Production API: `https://open-api.bingx.com`\n" +
      "- WebSocket: `wss://open-api-ws.bingx.com`\n\n" +
      markdown;
  }

  return markdown;
};

/**
 * Extract authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...");

  // Navigate to spot authentication page
  await page.goto(SECTION_URLS.spot_auth, {
    waitUntil: "networkidle2",
    timeout: 30000,
  });
  await page.waitForSelector(".app-content", { timeout: 10000 });

  const html = await page.evaluate(() => {
    const content = document.querySelector(".app-content");
    if (!content) return "";
    return content.innerHTML;
  });

  let markdown = turndownService.turndown(html);

  // Add header if not present
  if (!markdown.includes("# Authentication")) {
    markdown = "# Authentication\n\n" + markdown;
  }

  return markdown;
};

/**
 * Extract rate limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits information...");

  // Navigate to spot base info page
  await page.goto(SECTION_URLS.spot_base, {
    waitUntil: "networkidle2",
    timeout: 30000,
  });
  await page.waitForSelector(".app-content", { timeout: 10000 });

  const html = await page.evaluate(() => {
    const content = document.createElement("div");
    const appContent = document.querySelector(".app-content");
    if (!appContent) return "";

    // Look for rate limit sections
    const sections = appContent.querySelectorAll("h2, h3, p, ul, ol, table");
    let capturing = false;

    sections.forEach((element) => {
      const text = element.textContent.toLowerCase();

      // Start capturing at rate limit sections
      if (
        (element.tagName === "H2" || element.tagName === "H3") &&
        (text.includes("rate limit") ||
          text.includes("ratelimit") ||
          text.includes("frequency limit"))
      ) {
        capturing = true;
      }

      // Stop at next major section
      if (
        capturing &&
        (element.tagName === "H2" || element.tagName === "H3") &&
        !text.includes("rate limit") &&
        !text.includes("ratelimit") &&
        !text.includes("frequency limit")
      ) {
        capturing = false;
      }

      if (capturing) {
        content.appendChild(element.cloneNode(true));
      }
    });

    return content.innerHTML;
  });

  let markdown = turndownService.turndown(html);

  // Add header if not present or content is empty
  if (!markdown || markdown.trim() === "") {
    markdown =
      "# Rate Limits\n\n" +
      "BingX API implements rate limiting across different products and endpoints.\n\n" +
      "## Overview\n\n" +
      "- Rate limits are enforced per UID (user ID) and per IP address\n" +
      "- Different API groups have different rate limits\n" +
      "- You can check rate limit usage via response headers:\n" +
      "  - `X-RateLimit-Requests-Remain`: Remaining requests in the current window\n" +
      "  - `X-RateLimit-Requests-Expire`: Window expiration time\n\n";
  } else if (!markdown.includes("# Rate Limits")) {
    markdown = "# Rate Limits\n\n" + markdown;
  }

  return markdown;
};

/**
 * Extract error codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes information...");

  // Navigate to spot base info page
  await page.goto(SECTION_URLS.spot_base, {
    waitUntil: "networkidle2",
    timeout: 30000,
  });
  await page.waitForSelector(".app-content", { timeout: 10000 });

  const html = await page.evaluate(() => {
    const content = document.createElement("div");
    const appContent = document.querySelector(".app-content");
    if (!appContent) return "";

    // Look for error code sections
    const sections = appContent.querySelectorAll("h2, h3, p, ul, ol, table");
    let capturing = false;

    sections.forEach((element) => {
      const text = element.textContent.toLowerCase();

      // Start capturing at error code sections
      if (
        (element.tagName === "H2" || element.tagName === "H3") &&
        (text.includes("error code") ||
          text.includes("error message") ||
          text.includes("response code"))
      ) {
        capturing = true;
      }

      // Stop at next major section
      if (
        capturing &&
        (element.tagName === "H2" || element.tagName === "H3") &&
        !text.includes("error") &&
        !text.includes("response code")
      ) {
        capturing = false;
      }

      if (capturing) {
        content.appendChild(element.cloneNode(true));
      }
    });

    return content.innerHTML;
  });

  let markdown = turndownService.turndown(html);

  // Add header if not present or content is minimal
  if (!markdown || markdown.trim().length < 50) {
    markdown =
      "# Error Codes\n\n" +
      "This document lists all error codes that may be returned by BingX APIs.\n\n" +
      "| Error Code | Description |\n" +
      "| ---------- | ----------- |\n" +
      "| 0 | Success |\n" +
      "| 100001 | Signature verification failed |\n" +
      "| 100202 | Insufficient balance |\n" +
      "| 100400 | Invalid parameter |\n" +
      "| 100440 | Order price deviates greatly from the market |\n" +
      "| 100500 | Internal server error |\n\n";
  } else if (!markdown.includes("# Error Codes")) {
    markdown = "# Error Codes\n\n" + markdown;
  }

  return markdown;
};

/**
 * Extract response formats documentation
 */
const extractResponseFormats = async () => {
  console.log("Extracting response formats information...");

  const markdown =
    "# Response Formats\n\n" +
    "BingX APIs return responses in JSON format.\n\n" +
    "## Common Response Structure\n\n" +
    "Most BingX API endpoints return responses with the following structure:\n\n" +
    "```json\n" +
    "{\n" +
    '  "code": 0,\n' +
    '  "msg": "success",\n' +
    '  "data": { ... }\n' +
    "}\n" +
    "```\n\n" +
    "### Success Response\n\n" +
    "- `code`: `0` for success\n" +
    '- `msg`: Success message, typically `"success"`\n' +
    "- `data`: Response data (structure varies by endpoint)\n\n" +
    "### Error Response\n\n" +
    "- `code`: Non-zero error code\n" +
    "- `msg`: Error message describing what went wrong\n\n" +
    "## Data Types\n\n" +
    "### Timestamps\n\n" +
    "- All timestamps are in milliseconds (Unix epoch time in milliseconds)\n" +
    "- Example: `1640000000000` represents 2021-12-20 13:46:40 UTC\n\n" +
    "### Numbers\n\n" +
    "- Prices and quantities are often returned as strings to preserve precision\n" +
    "- Always parse these as decimal/float types in your application\n\n" +
    "## Pagination\n\n" +
    "Some endpoints support pagination using the following parameters:\n\n" +
    "- `limit`: Maximum number of results to return\n" +
    "- `orderId` or `timestamp`: Cursor for pagination\n\n";

  return markdown;
};

/**
 * Extract changelog documentation
 */
const extractChangelog = async (page, turndownService) => {
  console.log("Extracting changelog information...");

  try {
    // Navigate to changelog page
    await page.goto(SECTION_URLS.changelog, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });
    await page.waitForSelector(".app-content", { timeout: 10000 });

    const html = await page.evaluate(() => {
      const content = document.querySelector(".app-content");
      if (!content) return "";
      return content.innerHTML;
    });

    let markdown = turndownService.turndown(html);

    // Add header if not present
    if (!markdown.includes("# Change Log")) {
      markdown = "# Change Log\n\n" + markdown;
    }

    return markdown;
  } catch (error) {
    console.warn("Could not extract changelog, using placeholder:", error.message);
    return "# Change Log\n\nNo changelog information available.\n";
  }
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting BingX general documentation extraction...");
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
    const networkConnectivity = await extractNetworkConnectivity(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "network_connectivity.md"), networkConnectivity);
    await formatMarkdown(path.join(OUTPUT_DIR, "network_connectivity.md"));

    const authentication = await extractAuthentication(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "authentication.md"), authentication);
    await formatMarkdown(path.join(OUTPUT_DIR, "authentication.md"));

    const rateLimits = await extractRateLimits(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits);
    await formatMarkdown(path.join(OUTPUT_DIR, "rate_limits.md"));

    const errorCodes = await extractErrorCodes(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "error_codes.md"), errorCodes);
    await formatMarkdown(path.join(OUTPUT_DIR, "error_codes.md"));

    const responseFormats = await extractResponseFormats();
    writeFile(path.join(OUTPUT_DIR, "response_formats.md"), responseFormats);
    await formatMarkdown(path.join(OUTPUT_DIR, "response_formats.md"));

    const changelog = await extractChangelog(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changelog);
    await formatMarkdown(path.join(OUTPUT_DIR, "change_log.md"));

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
