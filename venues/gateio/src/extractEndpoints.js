/**
 * Gate.io Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from Gate.io API docs
 */
"use strict";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { launchBrowser, configurePage } from "../../shared/puppeteer.js";
import { createTurndownBuilder } from "../../shared/turndown.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.gate.io/docs/developers/apiv4/en/";
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/gateio/endpoints");

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
  console.log(`  Writing ${path.basename(filePath)}...`);
  fs.writeFileSync(filePath, content, "utf8");
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
 * Detect code block language
 */
const detectCodeLanguage = (code) => {
  const trimmed = code.trim();

  // Check for JSON
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      JSON.parse(trimmed);
      return "json";
    } catch (e) {
      if (
        trimmed.includes('"') &&
        (trimmed.includes(":") || trimmed.includes(","))
      ) {
        return "json";
      }
    }
  }

  // Check for Python
  if (
    /^(import|from)\s+/.test(trimmed) ||
    /\bdef\s+\w+\(/.test(trimmed) ||
    /\bprint\(/.test(trimmed)
  ) {
    return "python";
  }

  // Check for JavaScript/TypeScript
  if (
    /^(const|let|var)\s+/.test(trimmed) ||
    /require\(['"']/.test(trimmed) ||
    /^import\s+.*from/.test(trimmed) ||
    /=>\s*{/.test(trimmed)
  ) {
    return "javascript";
  }

  // Check for shell/bash
  if (/^(curl|wget|http|GET|POST|PUT|DELETE|PATCH)\s+/i.test(trimmed)) {
    return "bash";
  }

  return null;
};

/**
 * Clean up markdown content and tag code blocks
 */
const cleanMarkdown = (content) => {
  const lines = content.split("\n");
  const cleanedLines = [];
  let inCodeBlock = false;
  let codeBlockContent = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Handle code block detection and language tagging
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        // Starting a code block
        inCodeBlock = true;
        codeBlockContent = [];
        if (line.trim() === "```") {
          cleanedLines.push(line);
        } else {
          cleanedLines.push(line);
        }
      } else {
        // Closing a code block
        inCodeBlock = false;

        // If the opening was untagged, detect language and add it
        const openingLineIndex =
          cleanedLines.length - codeBlockContent.length - 1;
        if (
          openingLineIndex >= 0 &&
          cleanedLines[openingLineIndex].trim() === "```"
        ) {
          const codeContent = codeBlockContent.join("\n");
          const detectedLang = detectCodeLanguage(codeContent);
          if (detectedLang) {
            cleanedLines[openingLineIndex] = "```" + detectedLang;
          }
        }

        cleanedLines.push(line);
        codeBlockContent = [];
      }
      continue;
    }

    // Track code block content for language detection
    if (inCodeBlock) {
      codeBlockContent.push(line);
      cleanedLines.push(line);
      continue;
    }

    // Skip processing inside code blocks
    if (!inCodeBlock) {
      // Remove anchor links from headings like ## [#](#anchor) Text
      line = line.replace(/^(#{1,6})\s*\[#\]\([^)]*\)\s*/, "$1 ");

      // Remove standalone anchor links like [#](#anchor)
      if (line.match(/^\s*\[#\]\([^)]*\)\s*$/)) {
        continue;
      }

      // Clean up inline anchor links
      line = line.replace(/\[#\]\([^)]*\)/g, "");

      // Clean up escaped brackets
      line = line.replace(/\\\[/g, "[").replace(/\\\]/g, "]");

      // Remove empty headings (just # with spaces)
      if (line.match(/^#{1,6}\s*$/)) {
        continue;
      }

      // Remove lines that are just "Source:" without content
      if (line.trim() === "**Source:**") {
        // Check if next line is a link, if not skip this line
        if (i + 1 < lines.length && !lines[i + 1].trim().startsWith("[")) {
          continue;
        }
      }
    }

    cleanedLines.push(line);
  }

  return cleanedLines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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
 * Extract all endpoints from the documentation
 */
const extractEndpoints = async (page, turndownService) => {
  console.log("Extracting endpoint information...");

  const endpoints = await page.evaluate(async () => {
    const results = {
      public: [],
      private: []
    };

    // Gate.io documentation structure: Each endpoint is in an H2 heading
    // followed by content until the next H2
    const contentBlock = document.querySelector("div.content-block");
    if (!contentBlock) {
      console.log("Content block not found");
      return results;
    }

    const allElements = Array.from(contentBlock.children);

    let currentEndpoint = null;
    let currentContent = [];

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];

      // Check if this is an endpoint heading
      // Endpoint headings have an H2 followed by a code block with method and path
      if (element.tagName === "H2") {
        // Save previous endpoint if exists
        if (currentEndpoint) {
          // Create a div to hold the content
          const contentDiv = document.createElement("div");
          currentContent.forEach((el) => contentDiv.appendChild(el.cloneNode(true)));

          // Determine if public or private based on authentication requirement
          const authText = contentDiv.textContent.toLowerCase();
          const requiresAuth =
            !authText.includes("this operation does not require authentication") &&
            !authText.includes("authentication is not required");

          const endpoint = {
            method: currentEndpoint.method,
            path: currentEndpoint.path,
            title: currentEndpoint.title,
            sourceUrl: currentEndpoint.sourceUrl,
            content: contentDiv.innerHTML,
            isPublic: !requiresAuth
          };

          if (endpoint.isPublic) {
            results.public.push(endpoint);
          } else {
            results.private.push(endpoint);
          }

          currentContent = [];
        }

        // Look for the next code block that contains the method and path
        let nextElement = allElements[i + 1];
        let methodPath = null;

        if (nextElement && nextElement.tagName === "BLOCKQUOTE") {
          // Skip "Code samples" blockquote
          nextElement = allElements[i + 2];
        }

        if (nextElement && nextElement.querySelector("code")) {
          const codeElement = nextElement.querySelector("code");
          const codeText = codeElement ? codeElement.textContent : "";

          // Parse method and path (e.g., "GET /spot/currencies")
          const match = codeText.match(/^(GET|POST|PUT|DELETE|PATCH)\s+(.+)$/);
          if (match) {
            methodPath = {
              method: match[1],
              path: match[2]
            };
          }
        }

        if (methodPath) {
          const headingId = element.getAttribute("id") || "";
          const sourceUrl = headingId
            ? `https://www.gate.io/docs/developers/apiv4/en/#${headingId}`
            : "https://www.gate.io/docs/developers/apiv4/en/";

          currentEndpoint = {
            method: methodPath.method,
            path: methodPath.path,
            title: element.textContent.trim(),
            sourceUrl: sourceUrl
          };

          // Add the heading to content
          currentContent.push(element);
        } else {
          // This is a non-endpoint heading, add to current content if we're tracking an endpoint
          if (currentEndpoint) {
            currentContent.push(element);
          }
        }
      } else if (currentEndpoint) {
        // Add content to current endpoint
        currentContent.push(element);
      }
    }

    // Don't forget the last endpoint
    if (currentEndpoint && currentContent.length > 0) {
      const contentDiv = document.createElement("div");
      currentContent.forEach((el) => contentDiv.appendChild(el.cloneNode(true)));

      const authText = contentDiv.textContent.toLowerCase();
      const requiresAuth =
        !authText.includes("this operation does not require authentication") &&
        !authText.includes("authentication is not required");

      const endpoint = {
        method: currentEndpoint.method,
        path: currentEndpoint.path,
        title: currentEndpoint.title,
        sourceUrl: currentEndpoint.sourceUrl,
        content: contentDiv.innerHTML,
        isPublic: !requiresAuth
      };

      if (endpoint.isPublic) {
        results.public.push(endpoint);
      } else {
        results.private.push(endpoint);
      }
    }

    return results;
  });

  return endpoints;
};

/**
 * Process and save endpoint documentation
 */
const processEndpoint = (endpoint, turndownService, isPublic) => {
  const { method, path: endpointPath, title, content, sourceUrl } = endpoint;

  // Convert HTML to Markdown
  let markdown = turndownService.turndown(content);

  // Clean markdown to remove artifacts and tag code blocks
  markdown = cleanMarkdown(markdown);

  // Create standard header
  const header = `# ${method} ${endpointPath}\n\n**Source:** [${title}](${sourceUrl})\n\n## Authentication\n\n${isPublic ? "Not Required (Public Endpoint)" : "Required (Private Endpoint)"}\n\n`;

  // Prepend header if markdown doesn't start with a heading
  if (!markdown.startsWith("# ")) {
    markdown = header + markdown;
  } else {
    // Replace the first heading with our standardized header
    markdown = markdown.replace(/^#[^\n]*\n+/, header);
  }

  // Generate filename
  const filename = generateFilename(method, endpointPath);
  const folder = isPublic ? "public" : "private";
  const filePath = path.join(OUTPUT_DIR, folder, filename);

  // Write file
  writeFile(filePath, markdown);

  return filename;
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting Gate.io endpoint documentation extraction...");
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

    const turndownService = createTurndownBuilder()
      .withTablesWithoutHeaders()
      .build();

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"));
    ensureDir(path.join(OUTPUT_DIR, "private"));

    // Extract endpoints
    const endpoints = await extractEndpoints(page, turndownService);

    console.log(
      `\n📊 Found ${endpoints.public.length} public endpoints and ${endpoints.private.length} private endpoints`
    );

    // Process public endpoints
    if (endpoints.public.length > 0) {
      console.log("\n📝 Processing public endpoints...");
      endpoints.public.forEach((endpoint) => {
        processEndpoint(endpoint, turndownService, true);
      });
    }

    // Process private endpoints
    if (endpoints.private.length > 0) {
      console.log("\n📝 Processing private endpoints...");
      endpoints.private.forEach((endpoint) => {
        processEndpoint(endpoint, turndownService, false);
      });
    }

    const totalEndpoints = endpoints.public.length + endpoints.private.length;

    if (totalEndpoints === 0) {
      console.warn(
        "\n⚠️  Warning: No endpoints were extracted. The documentation structure may have changed."
      );
      console.warn("Please review the extraction logic or extract manually.");
    } else {
      console.log(
        `\n✅ Endpoint documentation extraction completed successfully!`
      );
      console.log(`📁 Files written to: ${OUTPUT_DIR}`);
      console.log(`   - Public endpoints: ${endpoints.public.length}`);
      console.log(`   - Private endpoints: ${endpoints.private.length}`);
    }
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
