/**
 * Main scraper for Coinbase Exchange API documentation
 */

import { launchBrowser } from "../../../shared/puppeteer.js"
import fs from "fs"
import path from "path"
import { delay, ensureDirectoryExists } from "./utils/utils.js"
import { detectPageType, extractApiDocumentation, extractGeneralDocumentation } from "./processors/extractors.js"
import { convertToMarkdown, convertGeneralDocToMarkdown } from "./processors/formatters.js"
import { formatMarkdown } from "../../../shared/format-markdown.js"

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

    // Wait for content to be dynamically loaded (Next.js takes time)
    console.log("Waiting for dynamic content to load...")
    await delay(8000)
    console.log("Page loaded successfully")

    // Handle cookie banner if present
    await page.evaluate(() => {
      const acceptButton = Array.from(document.querySelectorAll("button")).find(
        button => button.textContent.trim() === "Accept all"
      )
      if (acceptButton) {
        acceptButton.click()
        console.log("Cookie banner accepted")
      }
    })

    // Detect page type
    console.log("Detecting page type...")
    const pageType = await detectPageType(page)
    console.log(`Page type: ${pageType}`)

    let markdownContent = ''

    if (pageType === 'api') {
      // Extract API documentation
      console.log("Extracting API documentation...")
      const apiDoc = await extractApiDocumentation(page)

      // Validate that we got meaningful data
      if (!apiDoc.title || !apiDoc.endpoint || !apiDoc.method) {
        throw new Error("Failed to extract API documentation - missing required fields")
      }

      console.log("Successfully extracted API documentation")
      markdownContent = convertToMarkdown(apiDoc, url)
    } else {
      // Extract general documentation
      console.log("Extracting general documentation...")
      const generalDoc = await extractGeneralDocumentation(page)

      // Validate that we got meaningful data
      if (!generalDoc.title && !generalDoc.content && (!generalDoc.sections || generalDoc.sections.length === 0)) {
        throw new Error("Failed to extract documentation - no content found")
      }

      console.log("Successfully extracted general documentation")
      markdownContent = convertGeneralDocToMarkdown(generalDoc, url)
    }

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