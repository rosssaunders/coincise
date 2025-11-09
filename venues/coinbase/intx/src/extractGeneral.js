/**
 * Coinbase International Exchange (INTX) - General Documentation Extraction
 * Extracts core documentation files like rate limits, authentication, etc.
 */
"use strict";

import { launchBrowser, configurePage } from "../../../shared/puppeteer.js";
import { createTurndownBuilder } from "../../../shared/turndown.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_BASE_URL = "https://docs.cdp.coinbase.com/intx";
const API_REF_BASE_URL = "https://docs.cdp.coinbase.com/api-reference/international-exchange-api";
const OUTPUT_DIR = path.join(__dirname, "../../../../docs/coinbase/intx");

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
  console.log(`  Writing ${path.basename(filePath)}...`);
  fs.writeFileSync(filePath, content, "utf8");
};

/**
 * Extract content from #content div and convert to markdown
 */
const extractContent = async (page, turndownService, url) => {
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 90000
  });

  await page.waitForSelector("#content", { timeout: 90000 });

  const html = await page.evaluate(() => {
    const content = document.querySelector("#content");
    return content ? content.innerHTML : "";
  });

  const markdown = turndownService.turndown(html);
  return markdown;
};

/**
 * Extract authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("  Extracting authentication documentation...");
  const url = `${API_REF_BASE_URL}/rest-api/authentication`;
  return await extractContent(page, turndownService, url);
};

/**
 * Extract rate limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("  Extracting rate limits documentation...");
  
  // Try the intx docs page first
  try {
    const url = `${DOCS_BASE_URL}/docs/rate-limits`;
    return await extractContent(page, turndownService, url);
  } catch (error) {
    console.log("  Rate limits page not found, using placeholder");
    return "# Rate Limits\n\nNo specific rate limit information found. Please refer to the main API documentation.";
  }
};

/**
 * Extract network connectivity documentation
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("  Extracting network connectivity documentation...");
  
  // Try the intx docs page
  try {
    const url = `${DOCS_BASE_URL}/docs/rest-api`;
    return await extractContent(page, turndownService, url);
  } catch (error) {
    console.log("  Network connectivity page not found, using placeholder");
    return "# Network Connectivity\n\nNo specific network connectivity information found. Please refer to the main API documentation.";
  }
};

/**
 * Extract error codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("  Extracting error codes documentation...");
  const url = `${DOCS_BASE_URL}/docs/rest-api`;
  const fullContent = await extractContent(page, turndownService, url);
  
  // Extract only the errors section
  const lines = fullContent.split("\n");
  const startIdx = lines.findIndex(line => 
    line.toLowerCase().includes("error") && 
    (line.startsWith("#") || line.startsWith("Error"))
  );
  const endIdx = lines.findIndex((line, idx) => 
    idx > startIdx && line.startsWith("##")
  );
  
  if (startIdx !== -1 && endIdx !== -1) {
    return lines.slice(startIdx, endIdx).join("\n");
  } else if (startIdx !== -1) {
    return lines.slice(startIdx).join("\n");
  }
  
  return "# Error Codes\n\nNo specific error code information found. Please refer to the main API documentation.";
};

/**
 * Extract response formats documentation
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("  Extracting response formats documentation...");
  const url = `${DOCS_BASE_URL}/docs/rest-api`;
  const fullContent = await extractContent(page, turndownService, url);
  
  // Extract response format section if it exists
  const lines = fullContent.split("\n");
  const startIdx = lines.findIndex(line => 
    line.toLowerCase().includes("response") && 
    (line.toLowerCase().includes("format") || line.toLowerCase().includes("structure"))
  );
  
  if (startIdx !== -1) {
    const endIdx = lines.findIndex((line, idx) => 
      idx > startIdx + 5 && line.startsWith("##")
    );
    
    if (endIdx !== -1) {
      return lines.slice(startIdx, endIdx).join("\n");
    }
    return lines.slice(startIdx).join("\n");
  }
  
  return "# Response Formats\n\nNo specific response format information found. Please refer to the main API documentation.";
};

/**
 * Extract change log documentation
 */
const extractChangeLog = async (page, turndownService) => {
  console.log("  Extracting change log documentation...");
  const url = `${DOCS_BASE_URL}/docs/changelog`;
  
  try {
    return await extractContent(page, turndownService, url);
  } catch (error) {
    console.log("  Change log not found, using placeholder");
    return "# Change Log\n\nNo change log available. Please refer to the main API documentation.";
  }
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting general documentation extraction for Coinbase INTX...");

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await configurePage(page);

  // Set longer timeouts for Coinbase
  await page.setDefaultNavigationTimeout(90000);
  await page.setDefaultTimeout(90000);

  const turndownBuilder = createTurndownBuilder();
  const turndownService = turndownBuilder.build();

  try {
    await ensureDir(OUTPUT_DIR);

    // Extract each section
    const authentication = await extractAuthentication(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, "authentication.md"), authentication);

    const rateLimits = await extractRateLimits(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits);

    const networkConnectivity = await extractNetworkConnectivity(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, "network_connectivity.md"), networkConnectivity);

    const errorCodes = await extractErrorCodes(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, "error_codes.md"), errorCodes);

    const responseFormats = await extractResponseFormats(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, "response_formats.md"), responseFormats);

    const changeLog = await extractChangeLog(page, turndownService);
    await writeFile(path.join(OUTPUT_DIR, "change_log.md"), changeLog);

    console.log("✅ General documentation extraction completed successfully");
  } finally {
    await browser.close();
  }
};

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  });
}

export { main };
