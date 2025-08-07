'use strict';

import { launchBrowser, configurePage } from "../../shared/puppeteer.js";
import TurndownService from "turndown";
import { gfm, tables, strikethrough } from "turndown-plugin-gfm";
import fs from "fs";
import process from "process";
import { formatMarkdown } from "../../shared/format-markdown.js";
import { JSDOM } from "jsdom";

const configs = {
  rest: () => import('../config/rest.json', { with: { type: 'json' } }),
  fix: () => import('../config/fix.json', { with: { type: 'json' } }),
  websocket: () => import('../config/websocket.json', { with: { type: 'json' } })
};

async function getConfig(type) {
  if (!configs[type]) {
    throw new Error(`Invalid configuration type: ${type}. Valid types are: ${Object.keys(configs).join(', ')}`);
  }
  const module = await configs[type]();
  return module.default;
}

async function loadBrowser() {
  const browser = await launchBrowser();
  return browser;
}

async function getPageHTML(pageURL, browser) {
  const page = await browser.newPage();
  await configurePage(page);

  // Set a normal browser user-agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
  );

  // Enable request interception for resource optimization
  await page.setRequestInterception(true);
  page.on("request", request => {
    const resourceType = request.resourceType();
    
    // Block unnecessary resources
    if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
      request.abort();
    } else {
      // Add origin and referer headers
      const headers = request.headers();
      headers["Origin"] = new URL(pageURL).origin;
      headers["Referer"] = pageURL;
      request.continue({ headers });
    }
  });

  // Add console event listener
  page.on("console", msg => {
    if (
      msg.text() !== "JSHandle@object" &&
      !msg.text().startsWith("A preload for ") &&
      !msg.text().startsWith("The resource ")
    ) {
      console.log("Browser Console:", msg.text());
    }
  });

  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto(pageURL, { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait for content to load
  await page.waitForSelector('main', { timeout: 30000 });
  
  const html = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) {
      throw new Error('Main content not found');
    }

    // Remove navigation elements
    const navElements = main.querySelectorAll('nav, .navigation, .sidebar');
    navElements.forEach(el => el.remove());

    // Remove interactive elements
    const interactiveElements = main.querySelectorAll('button, .copy-button, .code-copy');
    interactiveElements.forEach(el => el.remove());

    // Clean up code blocks
    const codeBlocks = main.querySelectorAll('pre code');
    codeBlocks.forEach(code => {
      // Remove line numbers if present
      const lineNumbers = code.querySelectorAll('.line-number');
      lineNumbers.forEach(ln => ln.remove());
    });

    // Extract endpoint information from the page
    const endpointSections = main.querySelectorAll('.endpoint-section, .api-endpoint, [class*="endpoint"]');
    endpointSections.forEach(section => {
      // Ensure HTTP methods are properly formatted
      const methods = section.querySelectorAll('.method, .http-method, [class*="method"]');
      methods.forEach(method => {
        const text = method.textContent.trim().toUpperCase();
        if (['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(text)) {
          method.textContent = text;
        }
      });
    });

    // Clean up tables
    const tables = main.querySelectorAll('table');
    tables.forEach(table => {
      // Remove unnecessary attributes
      table.removeAttribute('class');
      table.removeAttribute('style');
      
      // Clean table cells
      const cells = table.querySelectorAll('td, th');
      cells.forEach(cell => {
        cell.removeAttribute('class');
        cell.removeAttribute('style');
      });
    });

    return main.innerHTML;
  });

  await page.close();
  return html;
}

function convertToMarkdown(html) {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    fence: "```",
    bulletListMarker: "-",
    emDelimiter: "_",
    strongDelimiter: "**",
    br: "\n",
    preformattedCode: true
  });
  
  turndownService.use([gfm, tables, strikethrough]);

  // Custom rule for code blocks to preserve language
  turndownService.addRule('codeBlock', {
    filter: function (node) {
      return (
        node.nodeName === 'PRE' &&
        node.firstChild &&
        node.firstChild.nodeName === 'CODE'
      );
    },
    replacement: function (content, node) {
      const codeNode = node.firstChild;
      const language = codeNode.getAttribute('class') || '';
      const langMatch = language.match(/language-(\w+)/);
      const lang = langMatch ? langMatch[1] : '';
      
      return '\n```' + lang + '\n' + codeNode.textContent + '\n```\n';
    }
  });

  // Custom rule for inline code
  turndownService.addRule('inlineCode', {
    filter: ['code'],
    replacement: function (content, node) {
      if (node.parentNode.nodeName === 'PRE') {
        return content;
      }
      return '`' + content + '`';
    }
  });

  const originalEscape = turndownService.escape;
  turndownService.escape = function (string) {
    return originalEscape(string).replace(/\$/g, "\\$");
  };

  return turndownService.turndown(html);
}

// Generic heading demotion utility (descending order)
const demoteHeadings = dom => {
  for (let level = 6; level >= 1; level--) {
    const selector = `h${level}`;
    if (level < 6) {
      const headings = dom.window.document.querySelectorAll(selector);
      headings.forEach(heading => {
        const newHeading = dom.window.document.createElement(`h${level + 1}`);
        newHeading.textContent = heading.textContent;
        heading.parentNode.replaceChild(newHeading, heading);
      });
    }
  }
};

async function main() {
  let browser;

  try {
    browser = await loadBrowser();
    const result = [];

    // Get configuration based on command line argument
    const arg = process.argv[2];
    if (!arg) {
      throw new Error('Please specify configuration type: rest, fix, or websocket');
    }

    const config = await getConfig(arg);
    const { urls, outputConfig, title } = config;

    console.log(`\x1b[34m%s\x1b[0m`, `📚 Generating ${arg} API documentation`);

    // Process all URLs from the configuration
    for (const url of urls) {
      console.log("\x1b[34m%s\x1b[0m", `🌐 Processing URL: ${url}`);
      const startTime = Date.now();

      const html = await getPageHTML(url, browser);

      if (!html || html.trim() === "") {
        throw new Error(`Failed to get HTML content from ${url}`);
      }

      const endTime = Date.now();
      console.log(
        "\x1b[36m%s\x1b[0m",
        `⏱️ Time taken: ${(endTime - startTime) / 1000} seconds`
      );

      result.push(html);
    }

    // Create docs directory if it doesn't exist
    const { docsDir, outputFileName } = outputConfig;
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    // Convert all the html to markdown and combine into a single file
    let combinedMarkdown = "";

    if (title) {
      console.log(`\x1b[34m%s\x1b[0m`, `📄 Adding title: ${title}`);
      combinedMarkdown += `# ${title}\n\n`;
    }

    for (let i = 0; i < result.length; i++) {
      const html = result[i];
      const url = urls[i];
      
      // Demote all headings by one level using JSDOM
      const dom = new JSDOM(html);
      demoteHeadings(dom);
      
      const markdown = await convertToMarkdown(
        dom.window.document.body.innerHTML
      );
      
      combinedMarkdown += `${markdown}\n\n> **Source:** [${url}](${url})\n\n---\n\n`;
    }

    // Save the combined markdown to a single file
    const outputPath = `${docsDir}/${outputFileName}`;
    fs.writeFileSync(outputPath, combinedMarkdown);

    // Format the markdown file
    await formatMarkdown(outputPath);
    console.log(`Formatted: ${outputPath}`);

    // Print a visually appealing success message
    console.log(
      "\x1b[32m%s\x1b[0m",
      "✅ Success: Combined markdown file created successfully!"
    );
    console.log(`📄 File: ${outputPath}`);
    console.log(`📦 Size: ${(combinedMarkdown.length / 1024).toFixed(2)} KB`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  });
}