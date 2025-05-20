"use strict"

import fs from "fs"
import process from "process"
import { JSDOM } from "jsdom"
import TurndownService from "turndown"
import { gfm, tables, strikethrough } from "turndown-plugin-gfm"
import { formatMarkdown } from "../../shared/format-markdown.js"
import path from "path"
import { fileURLToPath } from "url"
import fetch from "node-fetch"

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
 * @returns {Promise<string>} - HTML content of the page
 */
async function getChangelogHTML(url) {
  console.log(`🌐 Fetching content from: ${url}`)

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
      }
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`
      )
    }

    const html = await response.text()

    if (!html || html.trim() === "") {
      throw new Error(`Empty content received from ${url}`)
    }

    // Use JSDOM to extract the main content
    const dom = new JSDOM(html)
    const mainContent = dom.window.document.querySelector("main")

    if (!mainContent) {
      console.warn("Main content not found, using body instead")
      return dom.window.document.body.innerHTML
    }

    return mainContent.innerHTML
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error)
    throw error
  }
}

async function main() {
  try {
    // Get configuration
    const { urls, outputConfig, title } = getConfig()

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
      const html = await getChangelogHTML(url)

      // Create DOM from HTML to process content
      const dom = new JSDOM(`<div>${html}</div>`)

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
  }
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("❌ Unhandled error:", error)
    process.exit(1)
  })
}
