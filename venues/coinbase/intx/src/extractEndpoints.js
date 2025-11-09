/**
 * Coinbase International Exchange (INTX) - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from reference pages
 */
"use strict";

import { launchBrowser, configurePage } from "../../../shared/puppeteer.js";
import { createTurndownBuilder } from "../../../shared/turndown.js";
import { KNOWN_ENDPOINTS } from "./endpoints-config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://docs.cdp.coinbase.com/api-reference/international-exchange-api/reference";
const OUTPUT_DIR = path.join(__dirname, "../../../../docs/coinbase/intx/endpoints");

// Allow limiting number of endpoints for testing via environment variable
const MAX_ENDPOINTS = process.env.MAX_ENDPOINTS ? parseInt(process.env.MAX_ENDPOINTS, 10) : KNOWN_ENDPOINTS.length;

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
 * Sanitize filename by removing special characters
 */
const sanitizeFilename = name => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
};

/**
 * Generate filename from HTTP method and endpoint path, with fallback to operation ID
 */
const generateFilename = (method, endpointPath, operationId) => {
  const methodLower = method.toLowerCase();
  
  // If path is unknown or invalid, use operation ID as filename
  if (!endpointPath || endpointPath === "/unknown" || endpointPath.length < 2) {
    // Convert intxrestapi_getorder to get_order
    const cleanOperationId = operationId
      .replace(/^intxrestapi_/, "")
      .toLowerCase();
    return `${cleanOperationId}.md`;
  }
  
  const pathPart = sanitizeFilename(endpointPath.replace(/^\//, "").replace(/\//g, "_"));
  return `${methodLower}_${pathPart}.md`;
};

/**
 * Determine if endpoint is public or private based on authentication requirements
 */
const isPublicEndpoint = content => {
  // Check for authentication headers in the content
  const hasCBAccessKey = content.includes("CB-ACCESS-KEY") || content.includes("CB-ACCESS-Key");
  const hasCBAccessSign = content.includes("CB-ACCESS-SIGN") || content.includes("CB-ACCESS-Signature");
  const hasCBAccessTimestamp = content.includes("CB-ACCESS-TIMESTAMP") || content.includes("CB-ACCESS-Timestamp");
  const hasCBAccessPassphrase = content.includes("CB-ACCESS-PASSPHRASE") || content.includes("CB-ACCESS-Passphrase");
  
  const hasAuthHeaders = hasCBAccessKey || hasCBAccessSign || hasCBAccessTimestamp || hasCBAccessPassphrase;
  
  // Also check for explicit mentions of authentication
  const requiresAuth = content.includes("API Key Permissions") || 
                       content.toLowerCase().includes("authentication required") ||
                       content.toLowerCase().includes("requires authentication");
  
  return !hasAuthHeaders && !requiresAuth;
};

/**
 * Extract endpoint documentation
 */
const extractEndpoint = async (page, turndownService, operationId) => {
  const url = `${BASE_URL}/${operationId}`;
  
  console.log(`  Extracting ${operationId}...`);
  
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 90000
  });

  await page.waitForSelector("#content", { timeout: 90000 });

  const endpointData = await page.evaluate(() => {
    const content = document.querySelector("#content");
    const title = document.querySelector("#page-title, h1");
    
    // Check if this is a 404 page
    const bodyText = content ? content.textContent : "";
    const is404 = title && title.textContent.includes("Page Not Found") && 
                  bodyText.includes("We couldn't find the page");
    
    // Try to find the endpoint method and path
    const methodMatch = bodyText.match(/(GET|POST|PUT|DELETE|PATCH)\s+(\/[^\s\n]*)/i);
    
    // Clean up Coinbase documentation structure to create proper GFM tables
    const cleanupCoinbaseParams = () => {
      if (!content) return;
      
      // Find all h4 headers
      const headers = Array.from(content.querySelectorAll("h4"));
      
      // Find all api-section divs (they contain the actual parameter data)
      const apiSections = Array.from(content.querySelectorAll(".api-section"));
      
      // Match h4 headers to api-sections by order
      let apiSectionIndex = 0;
      
      headers.forEach(header => {
        const headerText = header.textContent.trim();
        
        // Only process parameter/response sections
        if (!headerText.includes("Authorization") && 
            !headerText.includes("Parameter") && 
            !headerText.includes("Response")) {
          return;
        }
        
        // Get the corresponding api-section for this header
        const apiSection = apiSections[apiSectionIndex];
        apiSectionIndex++;
        
        if (!apiSection) return;
        
        // Extract parameters from this section
        const tableData = [];
        const paramDivs = apiSection.querySelectorAll(".font-semibold.text-primary");
        
        paramDivs.forEach(paramDiv => {
          const paramName = paramDiv.textContent.trim();
          
          // Find the parent row that contains all the parameter information
          let currentElement = paramDiv.parentElement;
          while (currentElement && !currentElement.classList.contains("grid")) {
            currentElement = currentElement.parentElement;
          }
          
          if (!currentElement) return;
          
          // Extract type and description from siblings
          const typeElement = currentElement.querySelector('[class*="type"]');
          const descElement = currentElement.querySelector('p, [class*="description"]');
          const requiredElement = currentElement.querySelector('[class*="required"]');
          
          const type = typeElement ? typeElement.textContent.trim() : "string";
          const description = descElement ? descElement.textContent.trim() : "";
          const required = requiredElement ? "required" : "optional";
          
          tableData.push({
            parameter: paramName,
            required: required,
            type: type,
            description: description
          });
        });
        
        // Rebuild table with proper thead/tbody structure for GFM conversion
        if (tableData.length > 0) {
          const newTable = document.createElement("table");
          const thead = document.createElement("thead");
          const tbody = document.createElement("tbody");
          
          // Create header row
          const headerRow = document.createElement("tr");
          ["Parameter", "Required", "Type", "Description"].forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
          });
          thead.appendChild(headerRow);
          
          // Create data rows
          tableData.forEach(data => {
            const tr = document.createElement("tr");
            ["parameter", "required", "type", "description"].forEach(key => {
              const td = document.createElement("td");
              td.textContent = data[key];
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          
          newTable.appendChild(thead);
          newTable.appendChild(tbody);
          
          // Insert the new table after the header
          header.parentNode.insertBefore(newTable, header.nextSibling);
        }
      });
    };
    
    // Clean up tables before extraction
    cleanupCoinbaseParams();
    
    return {
      html: content ? content.innerHTML : "",
      method: methodMatch ? methodMatch[1].toUpperCase() : "GET",
      path: methodMatch ? methodMatch[2] : "/unknown",
      is404: is404
    };
  });

  // Skip if 404
  if (endpointData.is404) {
    console.log(`  ⚠️  Skipping ${operationId} (404 Not Found)`);
    return null;
  }

  const markdown = turndownService.turndown(endpointData.html);
  
  return {
    method: endpointData.method,
    path: endpointData.path,
    operationId: operationId,
    content: markdown
  };
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting endpoint documentation extraction for Coinbase INTX...");
  console.log(`Extracting ${Math.min(MAX_ENDPOINTS, KNOWN_ENDPOINTS.length)} of ${KNOWN_ENDPOINTS.length} endpoints`);

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await configurePage(page);

  // Set longer timeouts for Coinbase
  await page.setDefaultNavigationTimeout(90000);
  await page.setDefaultTimeout(90000);

  const turndownBuilder = createTurndownBuilder();
  const turndownService = turndownBuilder.build();

  try {
    // Ensure output directories exist
    await ensureDir(path.join(OUTPUT_DIR, "public"));
    await ensureDir(path.join(OUTPUT_DIR, "private"));

    let extractedCount = 0;
    let skippedCount = 0;
    let publicCount = 0;
    let privateCount = 0;

    // Extract each endpoint
    for (let i = 0; i < Math.min(MAX_ENDPOINTS, KNOWN_ENDPOINTS.length); i++) {
      const operationId = KNOWN_ENDPOINTS[i];
      
      const endpoint = await extractEndpoint(page, turndownService, operationId);
      
      if (!endpoint) {
        skippedCount++;
        continue;
      }

      // Determine if public or private
      const isPublic = isPublicEndpoint(endpoint.content);
      const category = isPublic ? "public" : "private";
      
      if (isPublic) {
        publicCount++;
      } else {
        privateCount++;
      }

      // Generate filename
      const filename = generateFilename(endpoint.method, endpoint.path, endpoint.operationId);
      const outputPath = path.join(OUTPUT_DIR, category, filename);

      // Write endpoint documentation
      writeFile(outputPath, endpoint.content);
      extractedCount++;
    }

    console.log("\n✅ Endpoint documentation extraction completed successfully");
    console.log(`  Extracted: ${extractedCount} endpoints`);
    console.log(`  Skipped: ${skippedCount} endpoints (404)`);
    console.log(`  Public: ${publicCount} endpoints`);
    console.log(`  Private: ${privateCount} endpoints`);
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
