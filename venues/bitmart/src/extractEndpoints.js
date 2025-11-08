/**
 * Bitmart Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation into separate files
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
const BASE_URL_FUTURES = "https://developer-pro.bitmart.com/en/futuresv2/"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bitmart/endpoints")

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
  fs.writeFileSync(filePath, content, "utf8")
}

/**
 * Clean filename for filesystem
 */
const cleanFilename = filename => {
  return filename
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase()
}

/**
 * Extract endpoints from a page
 */
const extractEndpoints = async (page, sourceUrl, apiType) => {
  console.log(`\n🔍 Extracting endpoints from ${apiType} API...`)

  const endpoints = await page.evaluate(
    (srcUrl, type) => {
      const results = { public: [], private: [] }

      // Find all h2 elements that represent endpoints
      const headings = Array.from(document.querySelectorAll("h2"))

      for (const heading of headings) {
        const headingText = heading.textContent.trim()

        // Skip non-endpoint headings
        if (
          !headingText ||
          headingText.toLowerCase().includes("overview") ||
          headingText.toLowerCase().includes("introduction") ||
          headingText.toLowerCase().includes("change log") ||
          headingText.toLowerCase().includes("error code") ||
          headingText.toLowerCase().includes("websocket")
        ) {
          continue
        }

        // Collect content for this endpoint
        const content = document.createElement("div")
        content.appendChild(heading.cloneNode(true))

        let currentElement = heading.nextElementSibling

        // Collect elements until next h1 or h2
        while (currentElement) {
          if (
            currentElement.tagName === "H1" ||
            currentElement.tagName === "H2"
          ) {
            break
          }
          content.appendChild(currentElement.cloneNode(true))
          currentElement = currentElement.nextElementSibling
        }

        // Clean up the content HTML
        let contentHtml = content.innerHTML
        // Remove 'Copy Success' and 'Copy to Clipboard' text
        contentHtml = contentHtml.replace(
          /(Copy Success|Copy to Clipboard)/gi,
          ""
        )

        // Skip if no substantial content
        if (contentHtml.length < 100) {
          continue
        }

        // Try to extract HTTP method and path from content
        let method = "GET"
        let endpointPath = ""

        // Look for Request URL section
        const urlMatch = contentHtml.match(
          /(?:GET|POST|DELETE|PUT)\s+(https?:\/\/[^\s<]+)/i
        )
        if (urlMatch) {
          const fullUrl = urlMatch[0]
          const methodMatch = fullUrl.match(/^(GET|POST|DELETE|PUT)/i)
          if (methodMatch) {
            method = methodMatch[1].toUpperCase()
          }

          // Extract path from URL
          const pathMatch = fullUrl.match(/\.com(\/[^\s<]*)/)
          if (pathMatch) {
            endpointPath = pathMatch[1]
          }
        }

        // If we couldn't extract the path, try to create one from the heading
        if (!endpointPath) {
          endpointPath =
            "/" +
            headingText
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "_")
              .replace(/^_|_$/g, "")
        }

        // Classify as public or private based on authentication requirements
        // Check if the content mentions KEYED or SIGNED authentication
        const hasKeyedAuth =
          contentHtml.toUpperCase().includes("KEYED") ||
          contentHtml.includes("X-BM-KEY") ||
          contentHtml.includes("X-BM-SIGN") ||
          contentHtml.includes("X-BM-TIMESTAMP")

        const hasSignedAuth =
          contentHtml.toUpperCase().includes("SIGNED") ||
          contentHtml.toLowerCase().includes("authentication") ||
          contentHtml.toLowerCase().includes("private")

        const isPublic = !hasKeyedAuth && !hasSignedAuth

        const endpoint = {
          method,
          path: endpointPath,
          title: headingText,
          content: contentHtml,
          isPublic,
          sourceUrl: srcUrl,
          apiType: type
        }

        if (isPublic) {
          results.public.push(endpoint)
        } else {
          results.private.push(endpoint)
        }
      }

      return results
    },
    sourceUrl,
    apiType
  )

  return endpoints
}

/**
 * Generate markdown content for an endpoint
 */
const generateEndpointMarkdown = (endpoint, turndownService) => {
  const authStatus = endpoint.isPublic
    ? "Not Required (Public Endpoint)"
    : "Required (Private Endpoint)"

  let markdown = `# ${endpoint.method} ${endpoint.title}\n\n`
  markdown += `**Source:** [${endpoint.title}](${endpoint.sourceUrl})\n\n`
  markdown += `**API Type:** ${endpoint.apiType}\n\n`
  markdown += `## Authentication\n\n${authStatus}\n\n`

  // Convert HTML content to markdown
  const contentMarkdown = turndownService.turndown(endpoint.content)
  markdown += contentMarkdown

  return markdown
}

/**
 * Save endpoints to files
 */
const saveEndpoints = (endpoints, turndownService, apiType) => {
  const publicDir = path.join(OUTPUT_DIR, "public")
  const privateDir = path.join(OUTPUT_DIR, "private")

  ensureDir(publicDir)
  ensureDir(privateDir)

  console.log(`\n📝 Saving ${apiType} endpoints...`)
  console.log(`   Public endpoints: ${endpoints.public.length}`)
  console.log(`   Private endpoints: ${endpoints.private.length}`)

  // Save public endpoints
  for (const endpoint of endpoints.public) {
    const filename = `${endpoint.method}_${cleanFilename(endpoint.title)}.md`
    const filepath = path.join(publicDir, filename)
    const markdown = generateEndpointMarkdown(endpoint, turndownService)
    writeFile(filepath, markdown)
    console.log(`   ✅ ${filename}`)
  }

  // Save private endpoints
  for (const endpoint of endpoints.private) {
    const filename = `${endpoint.method}_${cleanFilename(endpoint.title)}.md`
    const filepath = path.join(privateDir, filename)
    const markdown = generateEndpointMarkdown(endpoint, turndownService)
    writeFile(filepath, markdown)
    console.log(`   ✅ ${filename}`)
  }
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting Bitmart endpoint documentation extraction...")

  const browser = await launchBrowser()
  const turndownService = createTurndownBuilder().build()

  try {
    // Clear existing endpoint files
    const publicDir = path.join(OUTPUT_DIR, "public")
    const privateDir = path.join(OUTPUT_DIR, "private")

    if (fs.existsSync(publicDir)) {
      fs.rmSync(publicDir, { recursive: true })
    }
    if (fs.existsSync(privateDir)) {
      fs.rmSync(privateDir, { recursive: true })
    }

    ensureDir(publicDir)
    ensureDir(privateDir)

    // Extract spot endpoints
    console.log("\n📄 Processing Spot API...")
    const spotPage = await browser.newPage()
    await configurePage(spotPage)
    await spotPage.goto(BASE_URL_SPOT, {
      waitUntil: "networkidle2",
      timeout: 30000
    })

    const spotEndpoints = await extractEndpoints(
      spotPage,
      BASE_URL_SPOT,
      "Spot"
    )
    saveEndpoints(spotEndpoints, turndownService, "Spot")
    await spotPage.close()

    // Extract futures endpoints
    console.log("\n📄 Processing Futures API...")
    const futuresPage = await browser.newPage()
    await configurePage(futuresPage)
    await futuresPage.goto(BASE_URL_FUTURES, {
      waitUntil: "networkidle2",
      timeout: 30000
    })

    const futuresEndpoints = await extractEndpoints(
      futuresPage,
      BASE_URL_FUTURES,
      "Futures"
    )
    saveEndpoints(futuresEndpoints, turndownService, "Futures")
    await futuresPage.close()

    console.log("\n✅ Endpoint documentation extraction completed successfully")
    console.log(`\nTotal endpoints extracted:`)
    console.log(
      `  Spot - Public: ${spotEndpoints.public.length}, Private: ${spotEndpoints.private.length}`
    )
    console.log(
      `  Futures - Public: ${futuresEndpoints.public.length}, Private: ${futuresEndpoints.private.length}`
    )
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
