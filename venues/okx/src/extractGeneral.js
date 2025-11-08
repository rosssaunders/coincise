/**
 * OKX Exchange - General Documentation Extraction
 * Extracts core documentation sections from OKX API docs
 */
"use strict";

import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import { launchBrowser, configurePage } from "../../shared/puppeteer.js";
import { createTurndownBuilder } from "../../shared/turndown.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.okx.com/docs-v5/en/#overview";
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/okx");

/**
 * Ensure directory exists
 */
const ensureDir = dirPath => {
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
 * Extract section content by heading ID until next major heading
 */
const extractSectionById = async (page, headingId, turndownService) => {
  const html = await page.evaluate(id => {
    const heading = document.getElementById(id);
    if (!heading) return "";

    const content = document.createElement("div");
    content.appendChild(heading.cloneNode(true));

    let sibling = heading.nextElementSibling;
    while (sibling) {
      // Stop at next H1 or H2
      if (sibling.tagName === "H1" || sibling.tagName === "H2") {
        break;
      }
      content.appendChild(sibling.cloneNode(true));
      sibling = sibling.nextElementSibling;
    }

    // Remove dark boxes and example code blocks
    const darkBoxes = content.querySelectorAll("div.dark-box");
    darkBoxes.forEach(box => box.remove());

    const highlights = content.querySelectorAll("div.highlight");
    highlights.forEach(highlight => highlight.remove());

    const blockquotes = content.querySelectorAll("blockquote");
    blockquotes.forEach(blockquote => {
      const text = blockquote.textContent.trim().toLowerCase();
      if (text.includes("example") || text.includes("format description")) {
        blockquote.remove();
      }
    });

    return content.innerHTML;
  }, headingId);

  return turndownService.turndown(html);
};

/**
 * Extract Rate Limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits information...");
  return await extractSectionById(page, "overview-rate-limits", turndownService);
};

/**
 * Extract Authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...");

  // Combine API Key Creation and REST Authentication sections
  const apiKeySection = await extractSectionById(
    page,
    "overview-api-key-creation",
    turndownService
  );
  const restAuthSection = await extractSectionById(
    page,
    "overview-rest-authentication",
    turndownService
  );

  return `# Authentication\n\n${apiKeySection}\n\n${restAuthSection}`;
};

/**
 * Extract Network Connectivity documentation
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...");

  // Combine Production Services, Demo Services, WebSocket, and General Info
  const productionSection = await extractSectionById(
    page,
    "overview-production-trading-services",
    turndownService
  );
  const demoSection = await extractSectionById(
    page,
    "overview-demo-trading-services",
    turndownService
  );
  const websocketSection = await extractSectionById(
    page,
    "overview-websocket",
    turndownService
  );
  const generalInfoSection = await extractSectionById(
    page,
    "overview-general-info",
    turndownService
  );
  const timeoutsSection = await extractSectionById(
    page,
    "overview-transaction-timeouts",
    turndownService
  );

  return `# Network Connectivity\n\n${productionSection}\n\n${demoSection}\n\n${websocketSection}\n\n${generalInfoSection}\n\n${timeoutsSection}`;
};

/**
 * Extract Error Codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes information...");

  const html = await page.evaluate(() => {
    const errorCode = document.getElementById("error-code");
    if (!errorCode) return "";

    const content = document.createElement("div");
    content.appendChild(errorCode.cloneNode(true));

    let sibling = errorCode.nextElementSibling;
    let h2Count = 0;
    let h3Count = 0;

    while (sibling) {
      // Stop at next H1
      if (sibling.tagName === "H1") {
        break;
      }

      // Count H2 sections to limit extraction
      if (sibling.tagName === "H2") {
        h2Count++;
        // Only extract first H2 section (REST API)
        if (h2Count > 1) {
          break;
        }
      }

      // Within REST API section, limit to first 3 H3 subsections to keep under 1000 lines
      if (sibling.tagName === "H3") {
        h3Count++;
        if (h3Count > 3) {
          break;
        }
      }

      content.appendChild(sibling.cloneNode(true));
      sibling = sibling.nextElementSibling;
    }

    // Remove dark boxes and example code blocks
    const darkBoxes = content.querySelectorAll("div.dark-box");
    darkBoxes.forEach(box => box.remove());

    const highlights = content.querySelectorAll("div.highlight");
    highlights.forEach(highlight => highlight.remove());

    return content.innerHTML;
  });

  return turndownService.turndown(html);
};

/**
 * Extract Response Formats documentation
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats information...");

  const html = await page.evaluate(() => {
    // Look for response format information in the General Info section
    const generalInfo = document.getElementById("overview-general-info");
    if (!generalInfo) return "";

    const content = document.createElement("div");
    let sibling = generalInfo.nextElementSibling;

    while (sibling) {
      if (sibling.tagName === "H1" || sibling.tagName === "H2") break;

      // Look for paragraphs or tables that mention response structure
      const text = sibling.textContent.toLowerCase();
      if (
        text.includes("response") ||
        text.includes("format") ||
        text.includes("json")
      ) {
        content.appendChild(sibling.cloneNode(true));
      }

      sibling = sibling.nextElementSibling;
    }

    // If we found content, return it; otherwise, return a basic structure
    if (content.children.length > 0) {
      return content.innerHTML;
    }

    // Fallback: create basic response format documentation
    return `<h1>Response Formats</h1>
<p>All responses from the OKX API are in JSON format.</p>
<p>Successful responses contain a "code" field with value "0" and a "data" field with the response payload.</p>
<p>Error responses contain a "code" field with an error code and a "msg" field with the error message.</p>`;
  });

  return turndownService.turndown(html);
};

/**
 * Extract Change Log documentation
 */
const extractChangeLog = async (page, turndownService) => {
  console.log("Extracting change log information...");

  // Try to find announcement or changelog section
  const html = await page.evaluate(() => {
    const announcement = document.getElementById("announcement");
    if (!announcement) {
      return `<h1>Change Log</h1>
<p>For the latest API updates and changes, please visit the OKX API documentation website.</p>
<p>Source: <a href="https://www.okx.com/docs-v5/en/#overview">https://www.okx.com/docs-v5/en/#overview</a></p>`;
    }

    const content = document.createElement("div");
    content.appendChild(announcement.cloneNode(true));

    let sibling = announcement.nextElementSibling;
    let count = 0;
    while (sibling && count < 20) {
      if (sibling.tagName === "H1") break;
      content.appendChild(sibling.cloneNode(true));
      sibling = sibling.nextElementSibling;
      count++;
    }

    return content.innerHTML;
  });

  return turndownService.turndown(html);
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting OKX general documentation extraction...");
  console.log(`📍 Source: ${BASE_URL}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);

  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await configurePage(page);

    console.log(`Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 60000 });
    console.log("✅ Page loaded");

    // Wait for content to render
    await page.waitForSelector("h1", { timeout: 10000 });

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

    const changeLog = await extractChangeLog(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changeLog);

    console.log("\n✅ General documentation extraction completed successfully!");
    console.log(`📁 Files written to: ${OUTPUT_DIR}`);
  } finally {
    await browser.close();
  }
};

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("❌ Unhandled error in main:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  });
}

export { main };
