"use strict"

import fs from "fs"
import { JSDOM } from "jsdom"
import TurndownService from "turndown"
import { gfm, tables, strikethrough } from "turndown-plugin-gfm"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { formatMarkdown } from "../../shared/format-markdown.js"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Get configuration
function getConfig(type = "private") {
  const configPath = path.resolve(
    path.join(__dirname, "../config", `${type}.json`)
  )
  const configData = fs.readFileSync(configPath, "utf8")
  return JSON.parse(configData)
}

/**
 * Converts HTML content to Markdown format
 * @param {string} html - The HTML content to convert
 * @returns {string} The converted Markdown content
 */
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
  })
  turndownService.use([gfm, tables, strikethrough])

  // Handle dollar signs in code blocks
  const originalEscape = turndownService.escape
  turndownService.escape = function (string) {
    return originalEscape(string).replace(/\$/g, "\\$")
  }

  return turndownService.turndown(html)
}

/**
 * Fetch the HTML content of the Upbit changelog page
 * @param {string} url - URL of the Upbit changelog
 * @param {object} browser - Puppeteer browser instance
 * @returns {Promise<string>} - HTML content of the page
 */
async function getChangelogHTML(url, browser) {
  console.log(`🌐 Fetching content from: ${url}`)
  const page = await browser.newPage()
  await configurePage(page)
  
  // Set a normal browser user-agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
  )
  
  try {
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000
    })
    
    // Wait for the main content to load
    await page.waitForSelector("main", { timeout: 10000 })
    
    // Extract the HTML content
    const html = await page.evaluate(() => {
      // Target the main content area which contains the changelog
      const mainContent = document.querySelector("main")
      return mainContent ? mainContent.innerHTML : document.body.innerHTML
    })
    
    if (!html || html.trim() === "") {
      throw new Error(`Failed to extract content from ${url}`)
    }
    
    return html
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error)
    throw error
  } finally {
    await page.close()
  }
}

async function main() {
  let browser

  try {
    // Get configuration
    const { urls, outputConfig, title } = getConfig()
    
    // Initialize browser
    browser = await launchBrowser()
    console.log("🌐 Browser launched successfully")
    
    // Create docs directory if it doesn't exist
    const { docsDir, outputFileName } = outputConfig
    const outputDir = path.resolve(path.join(__dirname, "..", docsDir))
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    // Process URL
    let combinedMarkdown = ""
    
    // Add title if provided
    if (title) {
      console.log(`📝 Adding title: ${title}`)
      combinedMarkdown += `# ${title}\n\n`
    }
    
    // Process each URL (typically just one for changelog)
    for (const url of urls) {
      const startTime = Date.now()
      
      // Fetch and process HTML content
      const html = await getChangelogHTML(url, browser)
      
      // Create DOM from HTML to process content
      const dom = new JSDOM(html)
      
      // Convert HTML to Markdown
      const markdown = convertToMarkdown(dom.window.document.body.innerHTML)
      
      // Add source reference
      combinedMarkdown += `${markdown}\n\n> **Source:** [Upbit Changelog](${url})\n\n`
      
      const endTime = Date.now()
      console.log(`⏱️ Processing time: ${(endTime - startTime) / 1000} seconds`)
    }
    
    // Save the combined markdown to file
    const outputPath = path.join(outputDir, outputFileName)
    fs.writeFileSync(outputPath, combinedMarkdown)
    
    // Format the markdown file
    await formatMarkdown(outputPath)
    console.log(`✅ Successfully generated and formatted: ${outputPath}`)
    console.log(`📦 Size: ${(combinedMarkdown.length / 1024).toFixed(2)} KB`)
    
  } catch (error) {
    console.error("❌ Error in main process:", error)
    process.exit(1)
  } finally {
    // Clean up browser
    if (browser) {
      await browser.close()
      console.log("🌐 Browser closed")
    }
  }
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("❌ Unhandled error:", error)
    process.exit(1)
  })
}