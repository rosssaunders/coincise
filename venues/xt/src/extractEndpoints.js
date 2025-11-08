/**
 * XT.com Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from Docusaurus-based API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://doc.xt.com/docs/spot"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/xt/endpoints")

// Delay between requests to avoid overwhelming the server (in milliseconds)
const REQUEST_DELAY_MS = 500

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
  console.log(`  Writing ${path.basename(filePath)}...`)
  fs.writeFileSync(filePath, content, "utf8")
}

/**
 * Sanitize filename by removing special characters
 */
const sanitizeFilename = name => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_")
}

/**
 * Generate filename from endpoint name
 */
const generateFilename = (method, name) => {
  const methodLower = method.toLowerCase()
  const namePart = sanitizeFilename(name)
  return `${methodLower}_${namePart}.md`
}

/**
 * Determine if endpoint requires authentication based on content
 */
const isPrivateEndpoint = content => {
  // Check for authentication headers commonly used by XT.com
  const hasValidateSignature = content.includes("validate-signature")
  const hasValidateTimestamp = content.includes("validate-timestamp")
  const hasValidateAppkey = content.includes("validate-appkey")
  const hasAuthHeaders =
    hasValidateSignature || hasValidateTimestamp || hasValidateAppkey

  // Check for rate limit patterns that indicate API key is required
  const hasApiKeyRateLimit =
    content.includes("/apikey") || content.includes("/apiKey")

  // Also check for explicit authentication requirement mentions
  const hasAuthMention =
    content.toLowerCase().includes("authentication required") ||
    content.toLowerCase().includes("need to sign") ||
    content.toLowerCase().includes("signature required")

  return hasAuthHeaders || hasAuthMention || hasApiKeyRateLimit
}

/**
 * Extract all endpoints from the documentation
 */
const extractEndpoints = async (page, turndownService) => {
  console.log("Extracting endpoint information...")

  // Navigate to the main spot trading page
  await page.goto(
    `${BASE_URL}/Access%20Description/BasicInformationOfTheInterface`,
    {
      waitUntil: "networkidle2",
      timeout: 30000
    }
  )

  // Wait for the sidebar to be populated
  await page.waitForSelector(".menu__list", { timeout: 10000 })

  // Expand all collapsed categories
  await page.evaluate(() => {
    const collapsedItems = document.querySelectorAll(
      ".menu__list-item--collapsed"
    )
    collapsedItems.forEach(item => {
      const link = item.querySelector("a")
      if (link) link.click()
    })
  })

  // Wait for expansion
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Get all endpoint links from the sidebar
  const endpointLinks = await page.evaluate(() => {
    const getAllMenuItems = listElement => {
      const items = []
      const directChildren = Array.from(listElement.children)

      directChildren.forEach(child => {
        if (child.classList.contains("menu__list-item")) {
          const link = child.querySelector(":scope > .menu__link, :scope > a")
          const nestedList = child.querySelector(":scope > ul")

          if (link) {
            items.push({
              text: link.textContent.trim(),
              href: link.href
            })
          }

          if (nestedList) {
            const children = getAllMenuItems(nestedList)
            items.push(...children)
          }
        }
      })

      return items
    }

    const mainMenu = document.querySelector(".menu__list")
    const allItems = mainMenu ? getAllMenuItems(mainMenu) : []

    // Filter to get only endpoint pages (exclude general documentation)
    const excludePatterns = [
      "Access%20Description",
      "WebSocket%20Private",
      "WebSocket%20Public"
    ]

    return allItems.filter(item => {
      if (!item.href) return false

      // Must be in Balance, Deposit&Withdrawal, Market, Order, Trade, or Transfer sections
      const isEndpointSection =
        item.href.includes("/Balance/") ||
        item.href.includes("/Deposit&Withdrawal/") ||
        item.href.includes("/Market/") ||
        item.href.includes("/Order/") ||
        item.href.includes("/Trade/") ||
        item.href.includes("/Transfer/")

      return isEndpointSection
    })
  })

  console.log(`Found ${endpointLinks.length} endpoints to extract`)

  const endpoints = []

  // Extract each endpoint
  for (const link of endpointLinks) {
    console.log(`  Processing: ${link.text}...`)

    try {
      await page.goto(link.href, {
        waitUntil: "networkidle2",
        timeout: 30000
      })

      const endpointData = await page.evaluate(url => {
        const article = document.querySelector(
          'article, main, [class*="docMainContainer"]'
        )
        if (!article) return null

        // Clone the article to avoid modifying the original
        const clone = article.cloneNode(true)

        // Remove navigation elements, TOC, etc.
        const elementsToRemove = clone.querySelectorAll(
          '.table-of-contents, [class*="tocCollapsible"], nav, .pagination-nav, [class*="lastUpdated"]'
        )
        elementsToRemove.forEach(el => el.remove())

        // Extract HTTP method from the page content
        const content = clone.innerHTML
        let method = "GET" // Default

        // Look for the Type field which contains the actual HTTP method
        // Two formats:
        // 1. <p><strong>Type:</strong> post <strong>Description:</strong> /v4/order</p>
        // 2. <p><strong>Type</strong> POST</p>
        const textContent = clone.textContent
        const typeMatch = textContent.match(/Type:?\s+(get|post|put|delete)/i)
        if (typeMatch) {
          method = typeMatch[1].toUpperCase()
        }

        return {
          content: content,
          method: method,
          sourceUrl: url
        }
      }, link.href)

      if (endpointData) {
        const markdown = turndownService.turndown(endpointData.content)

        endpoints.push({
          name: link.text,
          method: endpointData.method,
          sourceUrl: endpointData.sourceUrl,
          content: markdown
        })
      }

      // Polite delay between requests
      await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY_MS))
    } catch (error) {
      console.error(`  Error extracting ${link.text}:`, error.message)
    }
  }

  return endpoints
}

/**
 * Write endpoints to files
 */
const writeEndpoints = endpoints => {
  console.log("\nWriting endpoint files...")

  const publicDir = path.join(OUTPUT_DIR, "public")
  const privateDir = path.join(OUTPUT_DIR, "private")

  ensureDir(publicDir)
  ensureDir(privateDir)

  let publicCount = 0
  let privateCount = 0

  endpoints.forEach(endpoint => {
    const isPrivate = isPrivateEndpoint(endpoint.content)
    const dir = isPrivate ? privateDir : publicDir
    const filename = generateFilename(endpoint.method, endpoint.name)
    const filePath = path.join(dir, filename)

    // Add source URL and method to the content
    const contentWithMetadata = `# ${endpoint.method} ${endpoint.name}

Source: [${endpoint.sourceUrl}](${endpoint.sourceUrl})

${endpoint.content}`

    writeFile(filePath, contentWithMetadata)

    if (isPrivate) {
      privateCount++
    } else {
      publicCount++
    }
  })

  console.log(`\n✅ Written ${publicCount} public endpoints`)
  console.log(`✅ Written ${privateCount} private endpoints`)
  console.log(`✅ Total: ${endpoints.length} endpoints`)
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting endpoint documentation extraction for XT.com...\n")

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  const turndownService = createTurndownBuilder().build()

  try {
    const endpoints = await extractEndpoints(page, turndownService)
    writeEndpoints(endpoints)

    console.log("\n✅ Endpoint documentation extraction completed successfully")
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
