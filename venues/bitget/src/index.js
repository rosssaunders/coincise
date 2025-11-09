"use strict"

import * as fs from "fs"
import { existsSync, mkdirSync, writeFileSync } from "fs"
import puppeteer from "puppeteer"
import * as cheerio from "cheerio"
import path, { join } from "path"
import TurndownService from "turndown"
import { gfm, tables } from "turndown-plugin-gfm"
import { argv } from "process"
import process from "process"

// Add delay between requests
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Initialize Turndown service with GFM plugin
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced"
})
turndownService.use(gfm)
turndownService.use(tables)

// Add a custom rule to handle <td> elements and preserve <br> tags
turndownService.addRule("tableCellWithBr", {
  filter: "td",
  replacement: function (content, node) {
    const cellContent = node.innerHTML.replace(/<br\s*\/?>/gi, "<br>")
    return `| ${cellContent} `
  }
})

// Retry function with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 5000) {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt === maxRetries) {
        throw error
      }

      const delayTime = initialDelay * Math.pow(2, attempt - 1)
      console.log(
        `Attempt ${attempt} failed. Retrying in ${delayTime / 1000} seconds...`
      )
      await delay(delayTime)
    }
  }

  throw lastError
}

async function scrapePageContent(browser, url) {
  return retryWithBackoff(
    async () => {
      const page = await browser.newPage()

      try {
        // Set a standard user agent to avoid blocking
        await page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        )

        console.log(`Navigating to: ${url}`)

        await page.goto(url, {
          waitUntil: "networkidle2",
          timeout: 30000
        })

        // Wait for content to load
        await page.waitForSelector("body", { timeout: 15000 })

        // Extract the main content
        const content = await page.evaluate(() => {
          // Try to find the main documentation content
          const selectors = [
            ".theme-doc-markdown.markdown",
            "main",
            ".content",
            ".documentation",
            ".doc-content",
            ".main-content",
            "#content",
            "article",
            ".article-content",
            "body"
          ]

          for (const selector of selectors) {
            const element = document.querySelector(selector)
            if (element && element.innerHTML.trim()) {
              return element.innerHTML
            }
          }

          // Fallback to body if nothing else found
          return document.body.innerHTML
        })

        if (!content || content.trim() === "") {
          throw new Error(`No content found on ${url}`)
        }

        console.log(`Successfully scraped content from: ${url}`)
        return content
      } finally {
        await page.close()
      }
    },
    3,
    5000
  )
}

/**
 * Generate filename from URL path
 * @param {string} urlPath - URL path like "/common/intro"
 * @returns {string} - Filename like "intro.md"
 */
function urlToFilename(urlPath) {
  // Remove leading/trailing slashes and split
  const parts = urlPath.replace(/^\/+|\/+$/g, "").split("/")
  // Remove the first part (e.g., "common", "spot", "future") and use the rest
  const nameParts = parts.slice(1)
  if (nameParts.length === 0) {
    return parts[0].replace(/\//g, "_") + ".md"
  }
  return nameParts.join("_").replace(/\//g, "_") + ".md"
}

async function processConfig(configFile) {
  console.log(`Processing config file: ${configFile}`)
  const configPath = path.resolve(configFile)
  if (!fs.existsSync(configPath)) {
    console.error(`Config file not found: ${configPath}`)
    process.exit(1)
  }
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
  console.log(`Starting Bitget documentation extraction for: ${config.title}`)
  console.log(`Number of URLs to process: ${config.urls.length}`)

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--single-process",
      "--no-first-run",
      "--no-zygote",
      "--disable-extensions"
    ]
  })

  let processedUrls = 0

  // Ensure output directory exists
  const outputDir = config.output_dir
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
    console.info(`Created output directory: ${outputDir}`)
  }

  try {
    // Process each URL separately and create individual markdown files
    for (const urlPath of config.urls) {
      const fullUrl = `${config.base_url}${urlPath}`
      try {
        console.log(`\nProcessing: ${fullUrl}`)
        const html = await scrapePageContent(browser, fullUrl)

        // Extract the main content and convert to markdown
        const $ = cheerio.load(html)

        // Get the first H1 as the title
        const h1 = $("h1").first()
        const title = h1.text().trim() || urlPath.split("/").pop()

        // Remove 'Copy Success' and 'Copy to Clipboard' text
        let cleanHtml = html.replace(/(Copy Success|Copy to Clipboard)/gi, "")

        // Convert to markdown
        let markdown = turndownService.turndown(cleanHtml)

        // Ensure the document starts with an H1 if it doesn't have one
        if (!markdown.startsWith("# ")) {
          markdown = `# ${title}\n\n${markdown}`
        }

        // Add source URL at the end
        markdown += `\n\n> **Source:** ${fullUrl}\n`

        // Generate filename from URL
        const fileName = urlToFilename(urlPath)
        const filePath = join(outputDir, fileName)

        // Write file
        writeFileSync(filePath, markdown, "utf8")
        console.info(`✓ Wrote: ${filePath}`)

        processedUrls++
        await delay(2000)
      } catch (error) {
        console.error(`✗ Error scraping ${fullUrl}:`, error.message)
      }
    }
  } finally {
    await browser.close()
  }

  console.log(`\n${"=".repeat(60)}`)
  console.log(`Extraction completed!`)
  console.log(`Processed URLs: ${processedUrls}/${config.urls.length}`)
  console.log(`Output directory: ${outputDir}`)
  console.log(`${"=".repeat(60)}`)
  return outputDir
}

// Main execution
async function main() {
  const configFile = argv[2] || "config/spot.json"

  try {
    await processConfig(configFile)
  } catch (error) {
    console.error("Extraction failed:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
