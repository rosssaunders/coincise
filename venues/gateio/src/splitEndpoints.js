/**
 * Gate.io - Split Legacy Documentation into Individual Endpoint Files
 * Parses existing legacy documentation files and creates individual endpoint files
 * in the standardized structure: docs/gateio/endpoints/public/ and /private/
 */
"use strict";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, "../../../docs/gateio");
const OUTPUT_DIR = path.resolve(DOCS_DIR, "endpoints");

// Legacy files that contain endpoint documentation
const LEGACY_FILES = [
  "private_rest_api_spot.md",
  "private_rest_api_futures.md",
  "private_rest_api_delivery.md",
  "private_rest_api_options.md",
  "private_rest_api_margin.md",
  "private_rest_api_wallet.md",
  "private_rest_api_withdrawal.md",
  "private_rest_api_account.md",
  "private_rest_api_subaccount.md",
  "private_rest_api_unified.md",
  "private_rest_api_collateral_loan.md",
  "private_rest_api_multi_collateral_loan.md",
  "private_rest_api_isolated_margin.md",
  "private_rest_api_earn.md",
  "private_rest_api_earnuni.md",
  "private_rest_api_flash_swap.md",
  "private_rest_api_rebate.md"
];

/**
 * Ensure directory exists
 */
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Sanitize filename by removing special characters
 */
const sanitizeFilename = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
};

/**
 * Generate filename from HTTP method and endpoint path
 */
const generateFilename = (method, path) => {
  const methodLower = method.toLowerCase();
  const pathPart = sanitizeFilename(path.replace(/^\//, "").replace(/\//g, "_"));
  return `${methodLower}_${pathPart}.md`;
};

/**
 * Parse a legacy markdown file and extract individual endpoints
 */
const parseEndpoints = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const endpoints = [];
  
  let currentEndpoint = null;
  let currentContent = [];
  let inEndpoint = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for endpoint definition lines like: `GET /spot/currencies`
    const methodMatch = line.match(/^`(GET|POST|PUT|DELETE|PATCH)\s+([^`]+)`$/);
    
    if (methodMatch) {
      // Save previous endpoint if exists
      if (currentEndpoint && currentContent.length > 0) {
        endpoints.push({
          ...currentEndpoint,
          content: currentContent.join("\n")
        });
      }

      // Start new endpoint
      currentEndpoint = {
        method: methodMatch[1],
        path: methodMatch[2].trim()
      };
      currentContent = [];
      inEndpoint = true;
      
      // Start collecting content from the heading before this line
      // Find the H2 heading before this endpoint
      for (let j = i - 1; j >= 0 && j > i - 10; j--) {
        if (lines[j].match(/^## /)) {
          currentContent.push(lines[j]);
          break;
        }
      }
      
      currentContent.push("");
      currentContent.push(line);
      continue;
    }

    // If we're in an endpoint, collect content
    if (inEndpoint) {
      // Check if we hit the next endpoint (another H2 followed by method line within a few lines)
      if (line.match(/^## /) && i < lines.length - 5) {
        // Look ahead to see if there's a method line soon
        let foundMethod = false;
        for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
          if (lines[j].match(/^`(GET|POST|PUT|DELETE|PATCH)\s+/)) {
            foundMethod = true;
            break;
          }
        }
        
        if (foundMethod) {
          // This is the next endpoint, save current and stop
          if (currentEndpoint && currentContent.length > 0) {
            endpoints.push({
              ...currentEndpoint,
              content: currentContent.join("\n")
            });
          }
          currentEndpoint = null;
          currentContent = [];
          inEndpoint = false;
          continue;
        }
      }
      
      currentContent.push(line);
    }
  }

  // Don't forget the last endpoint
  if (currentEndpoint && currentContent.length > 0) {
    endpoints.push({
      ...currentEndpoint,
      content: currentContent.join("\n")
    });
  }

  return endpoints;
};

/**
 * Determine if endpoint is public or private based on authentication text
 */
const isPublicEndpoint = (content) => {
  const lowerContent = content.toLowerCase();
  return (
    lowerContent.includes("this operation does not require authentication") ||
    lowerContent.includes("authentication is not required") ||
    lowerContent.includes("no authentication required")
  );
};

/**
 * Extract source URL from content
 */
const extractSourceUrl = (content) => {
  const match = content.match(/\*\*Source:\*\*\s*\[([^\]]+)\]\(([^)]+)\)/);
  if (match) {
    return match[2];
  }
  return "https://www.gate.io/docs/developers/apiv4/en/";
};

/**
 * Process a single endpoint and save to file
 */
const saveEndpoint = (endpoint) => {
  const { method, path: endpointPath, content } = endpoint;
  
  // Determine if public or private
  const isPublic = isPublicEndpoint(content);
  const folder = isPublic ? "public" : "private";
  
  // Extract source URL
  const sourceUrl = extractSourceUrl(content);
  
  // Create header for the endpoint file
  const header = `# ${method} ${endpointPath}\n\n**Source:** [${endpointPath}](${sourceUrl})\n\n## Authentication\n\n${isPublic ? "Not Required (Public Endpoint)" : "Required (Private Endpoint)"}\n\n`;
  
  // Combine header with content
  const finalContent = header + content;
  
  // Generate filename
  const filename = generateFilename(method, endpointPath);
  const filePath = path.join(OUTPUT_DIR, folder, filename);
  
  // Write file
  fs.writeFileSync(filePath, finalContent, "utf8");
  
  return { filename, folder };
};

/**
 * Main function
 */
const main = () => {
  console.log("🚀 Starting Gate.io endpoint splitting...");
  console.log(`📁 Source: ${DOCS_DIR}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);

  // Ensure output directories exist
  ensureDir(path.join(OUTPUT_DIR, "public"));
  ensureDir(path.join(OUTPUT_DIR, "private"));

  let totalEndpoints = 0;
  let publicCount = 0;
  let privateCount = 0;

  // Process each legacy file
  for (const filename of LEGACY_FILES) {
    const filePath = path.join(DOCS_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${filename} (not found)`);
      continue;
    }

    console.log(`\n📄 Processing ${filename}...`);
    
    try {
      const endpoints = parseEndpoints(filePath);
      console.log(`  Found ${endpoints.length} endpoints`);

      for (const endpoint of endpoints) {
        const { folder } = saveEndpoint(endpoint);
        totalEndpoints++;
        
        if (folder === "public") {
          publicCount++;
        } else {
          privateCount++;
        }
      }
    } catch (error) {
      console.error(`  ❌ Error processing ${filename}:`, error.message);
    }
  }

  console.log("\n✅ Endpoint splitting completed!");
  console.log(`📊 Total endpoints: ${totalEndpoints}`);
  console.log(`   - Public: ${publicCount}`);
  console.log(`   - Private: ${privateCount}`);
  console.log(`📁 Files written to: ${OUTPUT_DIR}`);
};

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
