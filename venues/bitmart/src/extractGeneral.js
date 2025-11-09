/**
 * Bitmart Exchange - General Documentation Extraction
 * Extracts core documentation sections from Bitmart API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL_SPOT = "https://developer-pro.bitmart.com/en/spot/"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bitmart")

/**
 * Ensure directory exists
 */
const ensureDir = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Write content to file
 */
const writeFile = (filePath, content) => {
  console.log(`Writing ${filePath}...`)
  fs.writeFileSync(filePath, content, "utf8")
  console.log(`✅ Written ${filePath}`)
}

/**
 * Extract content from a section by H1 title
 */
const extractSectionByTitle = async (page, sectionTitle) => {
  console.log(`Extracting ${sectionTitle}...`)

  const html = await page.evaluate(title => {
    const headings = Array.from(document.querySelectorAll("h1"))
    let targetHeading = null

    // Find the heading that matches our title
    for (const heading of headings) {
      if (heading.textContent.trim() === title) {
        targetHeading = heading
        break
      }
    }

    if (!targetHeading) {
      return null
    }

    const content = document.createElement("div")
    let currentElement = targetHeading.nextElementSibling

    // Collect all elements until the next h1 or end of document
    while (currentElement) {
      // Stop if we hit another h1
      if (
        currentElement.tagName &&
        currentElement.tagName.toLowerCase() === "h1"
      ) {
        break
      }

      content.appendChild(currentElement.cloneNode(true))
      currentElement = currentElement.nextElementSibling
    }

    return content.innerHTML
  }, sectionTitle)

  return html
}

/**
 * Extract authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  const html = await extractSectionByTitle(page, "Introduction")

  if (!html) {
    return "# Authentication\n\n_Documentation not found._\n"
  }

  const markdown = turndownService.turndown(html)
  return `# Authentication\n\n${markdown}\n`
}

/**
 * Extract rate limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits information...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")
    const headings = Array.from(document.querySelectorAll("h2, h3, h4"))

    let capturing = false

    for (const heading of headings) {
      const text = heading.textContent.toLowerCase()

      if (text.includes("rate limit") || text.includes("request limit")) {
        capturing = true
        content.appendChild(heading.cloneNode(true))
      } else if (capturing) {
        // Stop if we hit another major section
        if (heading.tagName === "H2" && !text.includes("limit")) {
          break
        }
        content.appendChild(heading.cloneNode(true))
      }

      // Get content between headings
      if (capturing) {
        let sibling = heading.nextElementSibling
        while (sibling && !["H1", "H2", "H3", "H4"].includes(sibling.tagName)) {
          content.appendChild(sibling.cloneNode(true))
          sibling = sibling.nextElementSibling
        }
      }
    }

    return content.innerHTML || null
  })

  if (!html) {
    return "# Rate Limits\n\n_Documentation not found. Please refer to the Basic Information section._\n"
  }

  const markdown = turndownService.turndown(html)
  return `# Rate Limits\n\n${markdown}\n`
}

/**
 * Extract network connectivity documentation
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")

    // Look for REST API Base URL and endpoint information
    const allElements = Array.from(document.querySelectorAll("*"))

    for (const element of allElements) {
      const text = element.textContent

      if (
        text &&
        (text.includes("Base URL") ||
          text.includes("Request URL") ||
          text.includes("REST API"))
      ) {
        if (element.tagName === "H2" || element.tagName === "H3") {
          content.appendChild(element.cloneNode(true))

          let sibling = element.nextElementSibling
          let count = 0
          while (
            sibling &&
            count < 5 &&
            !["H1", "H2"].includes(sibling.tagName)
          ) {
            content.appendChild(sibling.cloneNode(true))
            sibling = sibling.nextElementSibling
            count++
          }

          if (content.children.length > 0) {
            break
          }
        }
      }
    }

    return content.innerHTML || null
  })

  if (!html) {
    return "# Network Connectivity\n\n**REST API Base URL:**\n\n- Spot: `https://api-cloud.bitmart.com`\n- Futures: `https://api-cloud-v2.bitmart.com`\n\n_Please refer to the official documentation for complete endpoint details._\n"
  }

  const markdown = turndownService.turndown(html)
  return `# Network Connectivity\n\n${markdown}\n`
}

/**
 * Extract error codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes information...")

  const html = await extractSectionByTitle(page, "Error Code")

  if (!html) {
    return "# Error Codes\n\n_Documentation not found._\n"
  }

  const markdown = turndownService.turndown(html)
  return `# Error Codes\n\n${markdown}\n`
}

/**
 * Extract changelog documentation
 */
const extractChangeLog = async (page, turndownService) => {
  console.log("Extracting changelog information...")

  const html = await extractSectionByTitle(page, "Change Log")

  if (!html) {
    return "# Change Log\n\n_Documentation not found._\n"
  }

  const markdown = turndownService.turndown(html)
  return `# Change Log\n\n${markdown}\n`
}

/**
 * Extract response formats documentation
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats information...")

  const html = await page.evaluate(() => {
    const content = document.createElement("div")
    const sections = Array.from(document.querySelectorAll("h2, h3, p, pre"))
    let capturing = false

    for (const element of sections) {
      const text = element.textContent.toLowerCase()

      if (
        text.includes("response") &&
        (text.includes("format") || text.includes("structure"))
      ) {
        capturing = true
        content.appendChild(element.cloneNode(true))
      } else if (capturing) {
        if (element.tagName === "H2" || element.tagName === "H1") {
          break
        }
        content.appendChild(element.cloneNode(true))

        if (content.children.length > 10) {
          break
        }
      }
    }

    return content.innerHTML || null
  })

  if (!html) {
    return "# Response Formats\n\n_Standard JSON response format used throughout the API._\n"
  }

  const markdown = turndownService.turndown(html)
  return `# Response Formats\n\n${markdown}\n`
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting Bitmart general documentation extraction...")

  const browser = await launchBrowser()
  const turndownService = createTurndownBuilder().build()

  try {
    ensureDir(OUTPUT_DIR)

    // Extract from spot documentation
    console.log("\n📄 Extracting from Spot API documentation...")
    const spotPage = await browser.newPage()
    await configurePage(spotPage)
    await spotPage.goto(BASE_URL_SPOT, {
      waitUntil: "networkidle2",
      timeout: 30000
    })

    const authentication = await extractAuthentication(
      spotPage,
      turndownService
    )
    await writeFile(path.join(OUTPUT_DIR, "authentication.md"), authentication)

    const rateLimits = await extractRateLimits(spotPage, turndownService)
    await writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits)

    const networkConnectivity = await extractNetworkConnectivity(
      spotPage,
      turndownService
    )
    await writeFile(
      path.join(OUTPUT_DIR, "network_connectivity.md"),
      networkConnectivity
    )

    const errorCodes = await extractErrorCodes(spotPage, turndownService)
    await writeFile(path.join(OUTPUT_DIR, "error_codes.md"), errorCodes)

    const changeLog = await extractChangeLog(spotPage, turndownService)
    await writeFile(path.join(OUTPUT_DIR, "change_log.md"), changeLog)

    const responseFormats = await extractResponseFormats(
      spotPage,
      turndownService
    )
    await writeFile(
      path.join(OUTPUT_DIR, "response_formats.md"),
      responseFormats
    )

    await spotPage.close()

    console.log("\n✅ General documentation extraction completed successfully")
  } catch (error) {
    console.error("Error during extraction:", error)
    throw error
  } finally {
    await browser.close()
  }
}

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}

export { main }
