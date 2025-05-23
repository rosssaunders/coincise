"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { JSDOM } from "jsdom"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"
import { launchBrowser, configurePage } from "./utils.js"
import { formatMarkdown } from "../../shared/format-markdown.js"
import process from "process"

// Set up directory paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get config file name from command line arguments
const configFileName = process.argv[2] || "extraction.json"
console.log(`Using config file: ${configFileName}`)

// Load configuration
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, `../config/${configFileName}`), "utf8")
)

/**
 * Fetch the main documentation page content using Puppeteer
 * @param {string} url - URL of the documentation page
 * @returns {Promise<string>} HTML content of the page
 */
const fetchMainDocContent = async url => {
  console.log(`Fetching main documentation from: ${url}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page)

    await page.goto(url, { waitUntil: "networkidle2" })

    // Wait for the content to load
    await page.waitForSelector("body", { timeout: 5000 })

    // Extract the page content
    const content = await page.evaluate(() => {
      return document.body.innerHTML
    })

    return content
  } finally {
    await browser.close()
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

  // Add custom rule for tables without headers
  turndownService.addRule("tablesWithoutHeaders", {
    filter: ["table"],
    replacement: function (content, node) {
      const rows = Array.from(node.querySelectorAll("tr"))
      if (rows.length === 0) return ""

      // If there's no thead, create a markdown table with empty headers
      if (!node.querySelector("thead")) {
        const firstRow = rows[0]
        const cells = Array.from(firstRow.querySelectorAll("td"))
        const headerRow = cells.map(() => "---").join(" | ")
        const contentRows = rows
          .map(row => {
            const cells = Array.from(row.querySelectorAll("td"))
            return cells.map(cell => cell.textContent.trim()).join(" | ")
          })
          .join("\n")

        return `\n| ${headerRow} |\n| ${contentRows} |\n`
      }

      return content
    }
  })

  return turndownService
}

/**
 * Extract endpoint links by sections from the main documentation page
 * @param {string} htmlContent - Raw HTML content to process
 * @returns {Object} Object with sections as keys and arrays of endpoint links as values
 */
const extractEndpointsBySection = htmlContent => {
  const { document } = new JSDOM(htmlContent).window
  const sections = {}

  // Find all section headers (strong tags) that are direct children of paragraphs
  const sectionHeaders = Array.from(document.querySelectorAll("p > strong"))

  sectionHeaders.forEach(header => {
    const sectionName = header.textContent.trim()
    if (!sectionName) return

    // Find the unordered list that follows this section header
    let listElement = header.parentElement.nextElementSibling
    while (listElement && listElement.tagName !== "UL") {
      listElement = listElement.nextElementSibling
    }

    if (!listElement) return

    // Extract links from this section
    const links = Array.from(listElement.querySelectorAll("a")).map(a => ({
      title: a.textContent.trim(),
      url: a.getAttribute("href")
    }))

    if (links.length > 0) {
      sections[sectionName] = links
    }
  })

  return sections
}

/**
 * Fetch content from an endpoint page using Puppeteer
 * @param {string} url - URL of the endpoint page
 * @param {string} baseUrl - Base URL of the documentation site
 * @returns {Promise<string>} HTML content of the page
 */
const fetchEndpointContent = async (url, baseUrl) => {
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`
  let browser = null
  let page = null

  try {
    browser = await launchBrowser()

    page = await browser.newPage()
    await configurePage(page)

    await page.goto(fullUrl, {
      waitUntil: "networkidle2",
      timeout: 30000
    })

    // Wait for the main content to load
    await page
      .waitForSelector(".content-body", {
        timeout: 60000 // Increased timeout to 60 seconds
      })
      .catch(() => {
        console.warn(`Warning: Content not found on ${fullUrl}`)
      })

    // Extract the main content
    const content = await page.evaluate(() => {
      const contentEl = document.querySelector(".content-body")
      return contentEl ? contentEl.innerHTML : null
    })

    if (!content) {
      throw new Error(`No content found on ${fullUrl}`)
    }

    return content
  } finally {
    if (page) {
      await page.close().catch(console.error)
    }
    if (browser) {
      await browser.close().catch(console.error)
    }
  }
}

/**
 * Process an endpoint and convert it to markdown
 * @param {Object} endpoint - Endpoint object with title and url
 * @param {string} baseUrl - Base URL of the documentation site
 * @param {TurndownService} turndownService - Configured Turndown service
 * @returns {Promise<Object>} Processed endpoint with markdown content
 */
const processEndpoint = async (endpoint, baseUrl, turndownService) => {
  console.log(`Processing endpoint: ${endpoint.title}`)

  const content = await fetchEndpointContent(endpoint.url, baseUrl)

  // Convert HTML to Markdown
  const markdown = turndownService.turndown(content)

  return {
    ...endpoint,
    markdown
  }
}

/**
 * Main function to extract endpoints and generate markdown
 */
const main = async () => {
  // Determine the URL to fetch from
  const docUrl = config.docUrl || "https://docs.bitfinex.com/docs/rest-auth"

  // Fetch HTML content from the URL instead of reading local file
  const htmlContent = await fetchMainDocContent(docUrl)
  if (!htmlContent) {
    console.error("Failed to fetch main documentation content")
    process.exit(1)
  }

  // Extract endpoints by section
  const sections = extractEndpointsBySection(htmlContent)
  if (Object.keys(sections).length === 0) {
    console.error("No sections found in the documentation")
    process.exit(1)
  }

  // Configure Turndown
  const turndownService = configureTurndown()

  // Generate markdown for URL and Authentication sections
  const { document } = new JSDOM(htmlContent).window
  const urlSection =
    document.querySelector("#url")?.parentElement.nextElementSibling
  const authSection =
    document.querySelector("#authentication")?.parentElement.nextElementSibling

  let markdown = `# ${config.title}\n\n`

  // Add URL information
  if (urlSection) {
    markdown += `## URL\n\n${turndownService.turndown(urlSection.outerHTML)}\n\n`
  } else {
    markdown += `## URL\n\nAuthenticated endpoints should use the following domain: \`https://api.bitfinex.com\`.\n\n`
  }

  // Add Authentication information
  if (authSection) {
    markdown += `## Authentication\n\n${turndownService.turndown(authSection.outerHTML)}\n\n`
  } else {
    markdown += `## Authentication\n\nAuthenticated endpoints require users to sign their requests using a pair of API-KEY and API-SECRET.\n\n`
  }

  // Process each section and its endpoints
  for (const [sectionName, endpoints] of Object.entries(sections)) {
    console.log(
      `Processing section: ${sectionName} (${endpoints.length} endpoints)`
    )

    markdown += `## ${sectionName}\n\n`

    // Process each endpoint in the section
    for (const endpoint of endpoints) {
      const processedEndpoint = await processEndpoint(
        endpoint,
        config.baseUrl,
        turndownService
      )
      markdown += `### ${processedEndpoint.title}\n\n${processedEndpoint.markdown}\n\n`
    }
  }

  // Write the markdown to a file
  const outputPath = path.join(__dirname, "../output.md")
  fs.writeFileSync(outputPath, markdown)
  console.log(`Documentation written to ${outputPath}`)

  // Format the markdown file
  await formatMarkdown(outputPath)
  console.log(`Formatted: ${outputPath}`)
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
