"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { JSDOM } from "jsdom"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"
import { launchBrowser, configurePage } from "./utils.js"
import { formatMarkdown } from "../../shared/format-markdown.js"

// Set up directory paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get config file name from command line arguments
const configFileName = process.argv[2] || "ws_private.json"
console.log(`Using config file: ${configFileName}`)

// Load configuration
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, `../config/${configFileName}`), "utf8")
)

/**
 * Fetch content from a URL using Puppeteer
 * @param {string} url - URL to fetch
 * @returns {Promise<string>} HTML content of the page
 */
const fetchContent = async url => {
  console.log(`Fetching content from: ${url}`)
  let browser = null
  let page = null

  try {
    browser = await launchBrowser()

    page = await browser.newPage()
    await configurePage(page)

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000
    })

    // Wait for the content to load
    await page.waitForSelector("body", {
      timeout: 60000 // Increased timeout to 60 seconds
    })

    // Extract the page content
    const content = await page.evaluate(() => {
      return document.body.innerHTML
    })

    if (!content) {
      throw new Error(`No content found on ${url}`)
    }

    return content
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error)
    throw error // Re-throw the error to be handled by the caller
  } finally {
    try {
      if (page) {
        await page.close()
      }
    } catch (error) {
      console.error("Error closing page:", error)
    }

    try {
      if (browser) {
        await browser.close()
      }
    } catch (error) {
      console.error("Error closing browser:", error)
    }
  }
}

/**
 * Configure Turndown for HTML to Markdown conversion
 * @returns {TurndownService} Configured Turndown service
 */
const configureTurndown = () => {
  // Set up Turndown for HTML to Markdown conversion
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced"
  })

  // Add GitHub Flavored Markdown plugin
  turndownService.use(gfm)

  // Configure turndown for code blocks
  turndownService.addRule("codeBlocks", {
    filter: ["pre"],
    replacement: function (content, node) {
      const language =
        node.querySelector("code")?.className.replace("language-", "") || ""
      return `\n\`\`\`${language}\n${content.trim()}\n\`\`\`\n`
    }
  })

  return turndownService
}

/**
 * Extract links from the main documentation page
 * @param {string} htmlContent - Raw HTML content to process
 * @returns {Array} Array of endpoint objects with title and URL
 */
const extractLinks = htmlContent => {
  const { document } = new JSDOM(htmlContent).window
  const links = []

  // Find all section headers
  const sections = Array.from(document.querySelectorAll("h1, h2, h3"))

  for (const section of sections) {
    // Find the specific section we're looking for
    if (section.textContent.trim().includes(config.section)) {
      let element = section.nextElementSibling

      // Look for lists after the section header
      while (element && !element.matches("h1, h2, h3")) {
        if (element.tagName === "UL") {
          // Extract links from this list
          const listLinks = Array.from(element.querySelectorAll("a")).map(
            a => ({
              title: a.textContent.trim(),
              url: a.getAttribute("href")
            })
          )

          links.push(...listLinks)
        }
        element = element.nextElementSibling
      }
    }
  }

  return links
}

/**
 * Fetch and process content from a specific URL
 * @param {string} url - URL to fetch
 * @param {string} baseUrl - Base URL for relative links
 * @param {TurndownService} turndownService - Configured Turndown service
 * @returns {Promise<string>} Markdown content
 */
const processUrl = async (url, baseUrl, turndownService) => {
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`

  try {
    const content = await fetchContent(fullUrl)

    // Extract main content
    const { document } = new JSDOM(content).window
    const mainContent = document.querySelector(".content-body") || document.body

    if (!mainContent) {
      throw new Error(`No main content found on ${fullUrl}`)
    }

    // Convert HTML to Markdown
    return turndownService.turndown(mainContent.innerHTML)
  } catch (error) {
    console.error(`Failed to process URL ${fullUrl}:`, error)
    throw error // Re-throw to be handled by the main function
  }
}

/**
 * Main function to extract WebSocket documentation
 */
const main = async () => {
  try {
    // Configure Turndown
    const turndownService = configureTurndown()

    let markdown = `# ${config.title}\n\n`

    // Process each URL in the configuration
    for (const url of config.urls) {
      console.log(`Processing URL: ${url}`)

      // Fetch content from the URL
      const content = await fetchContent(url)
      if (!content) {
        console.error(`Failed to fetch content from ${url}`)
        process.exit(1)
      }

      // Extract the main content
      const { document } = new JSDOM(content).window
      const mainContent =
        document.querySelector(".content-body") || document.body

      // Convert to markdown and add to the output
      const pageMarkdown = turndownService.turndown(mainContent.innerHTML)
      markdown += `${pageMarkdown}\n\n---\n\n`

      // If this is the main page with links to other pages, extract and process those links
      if (url === config.mainDocsUrl) {
        const links = extractLinks(content)
        if (links.length === 0) {
          console.error("No links found in the main documentation page")
          process.exit(1)
        }

        // Process each linked page
        for (const link of links) {
          console.log(`Processing endpoint: ${link.title}`)

          const endpointMarkdown = await processUrl(
            link.url,
            config.baseUrl,
            turndownService
          )
          if (!endpointMarkdown) {
            console.error(`Failed to process endpoint: ${link.title}`)
            process.exit(1)
          }
          markdown += `## ${link.title}\n\n${endpointMarkdown}\n\n---\n\n`
        }
      }
    }

    // Ensure output directory exists
    const outputDir = path.dirname(path.join(__dirname, config.output))
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write the markdown file
    const outputPath = path.join(__dirname, config.output)
    fs.writeFileSync(outputPath, markdown)

    // Format the markdown file
    try {
      await formatMarkdown(outputPath)
      console.log(`Formatted: ${outputPath}`)
    } catch (err) {
      console.error(`Error formatting markdown:`, err)
      process.exit(1)
    }

    console.log(
      `Successfully extracted WebSocket documentation to ${config.output}`
    )
  } catch (error) {
    console.error("Error extracting WebSocket documentation:", error)
    process.exit(1)
  }
}

// Execute the main function
main().catch(error => {
  console.error("Fatal error:", error)
  process.exit(1)
})
