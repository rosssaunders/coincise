/**
 * Main scraper for Coinbase Exchange API documentation
 */

import { launchBrowser } from "../../../shared/puppeteer.js"
import fs from "fs"
import path from "path"
import { delay, ensureDirectoryExists } from "./utils/utils.js"
import {
  extractArticleContent,
  extractAuthSection,
  extractRequestParams,
  extractModalContent,
  extractPathAndQueryParams
} from "./processors/extractors.js"
import {
  processAuthSection,
  processRequestParams,
  generateMarkdownDocument
} from "./processors/formatters.js"
import TurndownService from "turndown"
import { formatMarkdown } from "../../../shared/format-markdown.js"

/**
 * Convert HTML content to Markdown
 * @param {string} html - HTML content to convert
 * @returns {string} - Converted Markdown
 */
const convertHtmlToMarkdown = html => {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced"
  })

  // Add custom rule for code tags
  turndownService.addRule("code", {
    filter: "code",
    replacement: function (content) {
      return "`" + content + "`"
    }
  })

  // Add a custom table processing rule that handles complex nested tables
  turndownService.addRule("table", {
    filter: "table",
    replacement: function (content, node) {
      // Extract table HTML
      const tableHtml = node.outerHTML

      // Use regex to extract table data instead of DOM manipulation
      // which can be tricky across Node.js and browser environments

      // First, try to detect table headers
      let tableMarkdown = ""
      let headers = []

      // Look for th elements to build header row
      const thRegex = /<th[^>]*>([\s\S]*?)<\/th>/gi
      let thMatch
      while ((thMatch = thRegex.exec(tableHtml)) !== null) {
        // Clean up the content (remove nested divs, etc.)
        let headerContent = thMatch[1]
          .replace(/<div[^>]*>([\s\S]*?)<\/div>/g, "$1")
          .replace(/<[^>]+>/g, "")
          .trim()
        headers.push(headerContent)
      }

      // If we found headers, create the header row
      if (headers.length > 0) {
        tableMarkdown += "| " + headers.join(" | ") + " |\n"
        tableMarkdown += "| " + headers.map(() => "---").join(" | ") + " |\n"
      }

      // Now extract the table rows using tr and td elements
      const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
      let trMatch

      while ((trMatch = trRegex.exec(tableHtml)) !== null) {
        // Skip header rows (already processed)
        if (trMatch[1].includes("<th")) continue

        // Process td elements in this row
        const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi
        let cells = []
        let tdMatch

        while ((tdMatch = tdRegex.exec(trMatch[1])) !== null) {
          // Process cell content
          let cellContent = tdMatch[1]

          // Handle code tags
          cellContent = cellContent.replace(/<code>(.*?)<\/code>/g, "`$1`")

          // Handle links
          cellContent = cellContent.replace(
            /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/g,
            "[$2]($1)"
          )

          // Clean up remaining HTML and trim
          cellContent = cellContent
            .replace(/<div[^>]*>([\s\S]*?)<\/div>/g, "$1")
            .replace(/<[^>]+>/g, "")
            .trim()

          cells.push(cellContent)
        }

        // Only add non-empty rows
        if (cells.length > 0) {
          tableMarkdown += "| " + cells.join(" | ") + " |\n"
        }
      }

      return "\n\n" + tableMarkdown + "\n"
    }
  })

  // Remove default table rules to avoid conflicts
  if (turndownService.rules.tableCell) {
    turndownService.remove("tableCell")
  }
  if (turndownService.rules.tableRow) {
    turndownService.remove("tableRow")
  }

  return turndownService.turndown(html)
}

/**
 * Scrape a Coinbase API documentation page and convert to markdown
 * @param {string} url - URL of the API doc page to scrape
 * @param {string} outputPath - Path to save the markdown output
 * @returns {Promise<void>}
 */
const scrapeApiDocumentation = async (url, outputPath) => {
  let browser = null

  try {
    // Launch a headless browser with appropriate options
    browser = await launchBrowser()

    const page = await browser.newPage()

    // Navigate to the Coinbase Exchange API documentation page
    console.log(`Navigating to ${url}...`)
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000
    })

    // Wait for article element
    await page.waitForSelector("article", { timeout: 60000 })
    console.log("Page loaded successfully")

    page.evaluate(() => {
      // Click the cookie banner button by looking for the button with the specific text
      // <button class="sc-aXZVg bkHjSZ">Accept all</button>
      // This is a more robust way to find the button
      const acceptButton = Array.from(document.querySelectorAll("button")).find(
        button => button.textContent.trim() === "Accept all"
      )
      if (acceptButton) {
        acceptButton.click()
        console.log("Cookie banner accepted")
      } else {
        console.log("Cookie banner button not found")
      }
    })

    // Extract content from the <article> tag
    console.log("Extracting article content...")
    const articleHtml = await extractArticleContent(page, { html: true })
    const articleContent = convertHtmlToMarkdown(articleHtml)
    console.log("Article content converted to markdown")

    // Extract authentication section if it exists
    console.log("Extracting authentication section...")
    const authSectionHtml = await extractAuthSection(page)
    let authMarkdown = null

    if (authSectionHtml) {
      // Process the auth section HTML to create markdown
      authMarkdown = processAuthSection(authSectionHtml)
    }

    // Extract path and query parameters sections if they exist
    console.log("Extracting path and query parameters...")
    const paramsResults = await extractPathAndQueryParams(page)
    let pathParamsMarkdown = null
    let queryParamsMarkdown = null

    if (paramsResults.pathParams) {
      // Process the path params HTML to create markdown
      pathParamsMarkdown = processRequestParams(paramsResults.pathParams)
    }

    if (paramsResults.queryParams) {
      // Process the query params HTML to create markdown
      queryParamsMarkdown = processRequestParams(paramsResults.queryParams)
    }

    // Extract request parameters section if it exists
    console.log("Extracting request parameters...")
    const requestParamsHtml = await extractRequestParams(page)
    let requestParamsMarkdown = null

    if (requestParamsHtml) {
      // Process the request params HTML to create markdown
      requestParamsMarkdown = processRequestParams(requestParamsHtml)
    }

    // Save all modal content
    console.log("Extracting response details...")
    const modalResults = []

    // Without this the page is not full loaded. I can't a better way to wait
    await delay(5000)

    // Scroll to the last H3
    const headings = await page.$$("h3")
    for (const heading of headings) {
      await heading.scrollIntoView()
    }

    // Select all the buttons related to HTTP codes
    const buttons = await page.$$(".apiResponseSchemaPickerOption_OMBh")
    console.log(`Found ${buttons.length} response schema buttons`)

    for (const [index, button] of Array.from(buttons.entries())) {
      //Get button text for identification
      const buttonText = await page.evaluate(el => el.textContent, button)
      console.log(
        `Processing response schema ${index + 1}/${buttons.length}: ${buttonText}`
      )

      await button.click()

      // Wait for modal content to be visible - hard fail if not found
      await page.waitForSelector(".cds-modal", {
        visible: true,
        timeout: 5000
      })

      const modal = await page.$(".cds-modal") // Changed from querySelector to $
      if (!modal) {
        console.error("Modal not found")
        continue
      }

      await page.click(".cds-interactable-i9xooc6") // Changed from querySelector to $

      //Extract information from the modal
      const modalContent = await extractModalContent(page)

      modalResults.push({
        buttonText,
        modalContent
      })

      // Wait for modal content to be visible - hard fail if not found
      await page.waitForSelector(".cds-modal", {
        hidden: true,
        timeout: 2000
      })

      //await delay(1000) // Wait for 1 second to ensure the modal is closed
    }

    // Generate markdown and save to file
    console.log("Generating markdown document...")
    const markdownContent = generateMarkdownDocument(
      articleContent,
      modalResults,
      authMarkdown,
      requestParamsMarkdown,
      pathParamsMarkdown,
      queryParamsMarkdown
    )

    // Ensure the output directory exists
    ensureDirectoryExists(path.dirname(outputPath))

    // Write the markdown file
    fs.writeFileSync(outputPath, markdownContent, "utf8")
    console.log(`Markdown documentation saved to: ${outputPath}`)

    // Format the markdown file
    await formatMarkdown(outputPath)
    console.log(`Formatted: ${outputPath}`)

    return outputPath
  } finally {
    // Close the browser if it was opened
    if (browser) {
      await browser.close()
      console.log("Browser closed")
    }
  }
}

export { scrapeApiDocumentation }
