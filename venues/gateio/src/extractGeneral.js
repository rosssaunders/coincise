/**
 * Gate.io Exchange - General Documentation Extraction
 * Extracts core documentation sections from Gate.io API docs
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
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/gateio");

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
 * Extract section by ID from the page
 */
const extractSectionById = async (page, sectionId, turndownService) => {
  console.log(`Extracting section: ${sectionId}...`);

  const html = await page.evaluate((id) => {
    const content = document.createElement("div");

    // Find the heading with the matching ID
    const allHeadings = document.querySelectorAll("div.content-block h1[id]");
    const targetHeading = Array.from(allHeadings).find((h) => {
      const headingId = h.getAttribute("id") || "";
      return headingId === id || headingId.startsWith(`${id}-`);
    });

    if (!targetHeading) {
      console.log(`Section not found: ${id}`);
      return "";
    }

    // Get the container element for the heading
    const contentContainer =
      targetHeading.parentElement.parentElement.parentElement.parentElement;

    // Add the current container's content
    content.appendChild(contentContainer.cloneNode(true));

    // Collect content until we find the next H1 tag
    let nextElement = contentContainer.nextElementSibling;
    let elementsAdded = 0;
    const maxElements = 50; // Safety limit to prevent over-extraction

    while (nextElement && elementsAdded < maxElements) {
      // Stop at next H1
      const hasH1Child = nextElement.querySelector("h1");
      if (hasH1Child) {
        // Make sure this isn't just a sub-section H1
        const h1 = nextElement.querySelector("h1");
        const h1Id = h1 ? h1.getAttribute("id") : "";
        
        // Stop if we hit a different major section (not a subsection of authentication)
        if (h1Id && !h1Id.startsWith(`${id}-`)) {
          break;
        }
      }

      content.appendChild(nextElement.cloneNode(true));
      nextElement = nextElement.nextElementSibling;
      elementsAdded++;
    }

    // Remove Python code blocks (we only want language-agnostic examples)
    const pythonCodeBlocks = content.querySelectorAll("div.language-python");
    pythonCodeBlocks.forEach((codeBlock) => {
      codeBlock.parentNode.removeChild(codeBlock);
    });

    // Remove shell code blocks with extra-class
    const shellCodeBlocks = content.querySelectorAll(
      "div.language-shell.extra-class"
    );
    shellCodeBlocks.forEach((codeBlock) => {
      codeBlock.parentNode.removeChild(codeBlock);
    });

    return content.innerHTML;
  }, sectionId);

  if (!html) {
    return `# ${sectionId}\n\nNo content found for this section.\n`;
  }

  return turndownService.turndown(html);
};

/**
 * Extract Network Connectivity section
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...");

  const html = await page.evaluate(() => {
    const content = document.createElement("div");

    // Add heading
    const heading = document.createElement("h1");
    heading.textContent = "Network Connectivity";
    content.appendChild(heading);

    // Find Access URL section
    const accessUrlHeading = Array.from(
      document.querySelectorAll("h2[id]")
    ).find((h) => h.getAttribute("id") === "access-url");

    if (accessUrlHeading) {
      content.appendChild(accessUrlHeading.cloneNode(true));

      // Get the content after the heading
      let nextElement = accessUrlHeading.nextElementSibling;
      while (nextElement && nextElement.tagName !== "H2") {
        content.appendChild(nextElement.cloneNode(true));
        nextElement = nextElement.nextElementSibling;
      }
    }

    // Find Data Center section
    const dataCenterHeading = Array.from(
      document.querySelectorAll("h2[id]")
    ).find((h) => h.getAttribute("id") === "data-center");

    if (dataCenterHeading) {
      content.appendChild(dataCenterHeading.cloneNode(true));

      let nextElement = dataCenterHeading.nextElementSibling;
      while (nextElement && nextElement.tagName !== "H2") {
        content.appendChild(nextElement.cloneNode(true));
        nextElement = nextElement.nextElementSibling;
      }
    }

    return content.innerHTML;
  });

  const markdown = turndownService.turndown(html);
  return (
    markdown ||
    "# Network Connectivity\n\nPlease refer to the API documentation for network information.\n"
  );
};

/**
 * Extract Authentication section - targeted approach for specific H2 subsections
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...");

  const html = await page.evaluate(() => {
    const content = document.createElement("div");

    // Add main heading
    const mainHeading = document.createElement("h1");
    mainHeading.textContent = "Authentication";
    content.appendChild(mainHeading);

    // Extract specific authentication-related H2 sections
    const authSectionIds = [
      "generate-api-key",
      "apiv4-permissions",
      "apiv4-signed-request-requirements",
      "api-signature-string-generation"
    ];

    for (const sectionId of authSectionIds) {
      const allHeadings = document.querySelectorAll("div.content-block h2[id]");
      const heading = Array.from(allHeadings).find((h) => {
        const id = h.getAttribute("id") || "";
        return id === sectionId;
      });

      if (!heading) {
        console.log(`Section not found: ${sectionId}`);
        continue;
      }

      // Get the parent container
      const contentContainer =
        heading.parentElement.parentElement.parentElement.parentElement;

      // Add this container's content
      content.appendChild(contentContainer.cloneNode(true));

      // Collect content until we hit the next H2 or H1
      let nextElement = contentContainer.nextElementSibling;
      let elementsAdded = 0;
      const maxElements = 10; // Safety limit per section

      while (nextElement && elementsAdded < maxElements) {
        // Stop if we hit another H1 or H2
        const hasH1 = nextElement.querySelector("h1");
        const hasH2 = nextElement.querySelector("h2");
        if (hasH1 || hasH2) {
          break;
        }

        content.appendChild(nextElement.cloneNode(true));
        nextElement = nextElement.nextElementSibling;
        elementsAdded++;
      }
    }

    // Remove Python code blocks
    const pythonCodeBlocks = content.querySelectorAll("div.language-python");
    pythonCodeBlocks.forEach((codeBlock) => {
      codeBlock.parentNode.removeChild(codeBlock);
    });

    const shellCodeBlocks = content.querySelectorAll(
      "div.language-shell.extra-class"
    );
    shellCodeBlocks.forEach((codeBlock) => {
      codeBlock.parentNode.removeChild(codeBlock);
    });

    return content.innerHTML;
  });

  if (!html || html.trim() === "<h1>Authentication</h1>") {
    return "# Authentication\n\nPlease refer to the API documentation for authentication information.\n";
  }

  return turndownService.turndown(html);
};

/**
 * Extract Rate Limits section
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits...");

  const html = await page.evaluate(() => {
    const content = document.createElement("div");

    // Add heading
    const heading = document.createElement("h1");
    heading.textContent = "Rate Limits";
    content.appendChild(heading);

    // Find frequency limit rule section (H2)
    const freqLimitHeading = Array.from(
      document.querySelectorAll("h2[id]")
    ).find((h) => h.getAttribute("id") === "frequency-limit-rule");

    if (freqLimitHeading) {
      content.appendChild(freqLimitHeading.cloneNode(true));

      // Get content until next H2
      let nextElement = freqLimitHeading.nextElementSibling;
      while (nextElement && !nextElement.querySelector("h2")) {
        content.appendChild(nextElement.cloneNode(true));
        nextElement = nextElement.nextElementSibling;
      }
    }

    // Also get rate limit based on fill ratio
    const fillRatioHeading = Array.from(
      document.querySelectorAll("h2[id]")
    ).find((h) => h.getAttribute("id") === "rate-limit-based-on-fill-ratio");

    if (fillRatioHeading) {
      content.appendChild(fillRatioHeading.cloneNode(true));

      // Get content until next H2
      let nextElement = fillRatioHeading.nextElementSibling;
      let elementsAdded = 0;
      while (nextElement && !nextElement.querySelector("h2") && elementsAdded < 30) {
        content.appendChild(nextElement.cloneNode(true));
        nextElement = nextElement.nextElementSibling;
        elementsAdded++;
      }
    }

    // If no specific rate limit section found, add a note
    if (!freqLimitHeading && !fillRatioHeading) {
      const note = document.createElement("p");
      note.textContent =
        "Gate.io uses rate limiting on API requests. Please check the API documentation for current rate limit policies.";
      content.appendChild(note);
    }

    return content.innerHTML;
  });

  const markdown = turndownService.turndown(html);
  return (
    markdown ||
    "# Rate Limits\n\nPlease refer to the API documentation for rate limit information.\n"
  );
};

/**
 * Extract Error Codes section - stop at label-list H2
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes...");

  const html = await page.evaluate(() => {
    const content = document.createElement("div");

    // Add main heading
    const mainHeading = document.createElement("h1");
    mainHeading.textContent = "Error Codes";
    content.appendChild(mainHeading);

    // Find error handling H2
    const errorHandlingHeading = Array.from(
      document.querySelectorAll("h2[id]")
    ).find((h) => h.getAttribute("id") === "error-handling");

    if (!errorHandlingHeading) {
      return content.innerHTML;
    }

    // Get the container for this H2
    const container =
      errorHandlingHeading.parentElement.parentElement.parentElement.parentElement;

    // Add this container
    content.appendChild(container.cloneNode(true));

    // Now look for the label-list H2 which is the next major section
    const labelListHeading = Array.from(
      document.querySelectorAll("h2[id]")
    ).find((h) => h.getAttribute("id") === "label-list");

    if (labelListHeading) {
      // Get its container
      const labelContainer =
        labelListHeading.parentElement.parentElement.parentElement.parentElement;

      // Add it
      content.appendChild(labelContainer.cloneNode(true));

      // Add elements after label-list until we hit the next H2
      let nextElement = labelContainer.nextElementSibling;
      let elementsAdded = 0;
      const maxElements = 30;

      while (nextElement && elementsAdded < maxElements) {
        const hasH2 = nextElement.querySelector("h2");
        if (hasH2) {
          break;
        }
        content.appendChild(nextElement.cloneNode(true));
        nextElement = nextElement.nextElementSibling;
        elementsAdded++;
      }
    }

    return content.innerHTML;
  });

  const markdown = turndownService.turndown(html);
  return (
    markdown ||
    "# Error Codes\n\nPlease refer to the API documentation for error code information.\n"
  );
};

/**
 * Extract Response Formats section
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats...");

  const html = await page.evaluate(() => {
    const content = document.createElement("div");

    // Add main heading
    const heading = document.createElement("h1");
    heading.textContent = "Response Formats";
    content.appendChild(heading);

    // Find return format section (H2)
    const returnFormatHeading = Array.from(
      document.querySelectorAll("h2[id]")
    ).find((h) => h.getAttribute("id") === "return-format");

    if (returnFormatHeading) {
      content.appendChild(returnFormatHeading.cloneNode(true));

      let nextElement = returnFormatHeading.nextElementSibling;
      while (nextElement && !nextElement.querySelector("h2")) {
        content.appendChild(nextElement.cloneNode(true));
        nextElement = nextElement.nextElementSibling;
      }
    }

    // Find data type section (H2)
    const dataTypeHeading = Array.from(
      document.querySelectorAll("h2[id]")
    ).find((h) => h.getAttribute("id") === "data-type");

    if (dataTypeHeading) {
      content.appendChild(dataTypeHeading.cloneNode(true));

      let nextElement = dataTypeHeading.nextElementSibling;
      while (nextElement && !nextElement.querySelector("h2")) {
        content.appendChild(nextElement.cloneNode(true));
        nextElement = nextElement.nextElementSibling;
      }
    }

    // Add general info if no specific section found
    if (!returnFormatHeading && !dataTypeHeading) {
      const para = document.createElement("p");
      para.textContent =
        "All responses from the Gate.io API follow standard JSON format.";
      content.appendChild(para);
    }

    return content.innerHTML;
  });

  const markdown = turndownService.turndown(html);
  return markdown;
};

/**
 * Extract Changelog section
 */
const extractChangelog = async (page, turndownService) => {
  console.log("Extracting changelog...");

  const html = await page.evaluate(() => {
    const content = document.createElement("div");

    // Find changelog or updates section
    const changelogHeading = Array.from(
      document.querySelectorAll("h1[id], h2[id]")
    ).find((h) => {
      const text = h.textContent.toLowerCase();
      return text.includes("change") || text.includes("update");
    });

    if (changelogHeading) {
      // Make it H1 if it's not already
      if (changelogHeading.tagName === "H2") {
        const h1 = document.createElement("h1");
        h1.textContent = changelogHeading.textContent;
        content.appendChild(h1);
      } else {
        content.appendChild(changelogHeading.cloneNode(true));
      }

      let nextElement = changelogHeading.nextElementSibling;
      while (nextElement) {
        if (nextElement.tagName === "H1") {
          break;
        }
        content.appendChild(nextElement.cloneNode(true));
        nextElement = nextElement.nextElementSibling;
      }
    } else {
      // Create a basic changelog section
      const heading = document.createElement("h1");
      heading.textContent = "Changelog";
      content.appendChild(heading);

      const para = document.createElement("p");
      para.textContent =
        "Please check the Gate.io API documentation for the latest updates and changes.";
      content.appendChild(para);
    }

    return content.innerHTML;
  });

  const markdown = turndownService.turndown(html);
  return markdown || "# Changelog\n\nNo changelog information available.\n";
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting Gate.io general documentation extraction...");
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
    const networkConnectivity = await extractNetworkConnectivity(
      page,
      turndownService
    );
    writeFile(
      path.join(OUTPUT_DIR, "network_connectivity.md"),
      networkConnectivity
    );

    const authentication = await extractAuthentication(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "authentication.md"), authentication);

    const rateLimits = await extractRateLimits(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits);

    const errorCodes = await extractErrorCodes(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "error_codes.md"), errorCodes);

    const responseFormats = await extractResponseFormats(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "response_formats.md"), responseFormats);

    const changelog = await extractChangelog(page, turndownService);
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changelog);

    console.log(
      "\n✅ General documentation extraction completed successfully!"
    );
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
