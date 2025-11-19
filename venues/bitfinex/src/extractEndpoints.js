/**
 * Bitfinex Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from Bitfinex API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://docs.bitfinex.com"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bitfinex/endpoints")

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
 * Generate filename from HTTP method and endpoint title
 */
const generateFilename = (method, title) => {
  const methodLower = method ? method.toLowerCase() : "unknown"
  const titlePart = sanitizeFilename(title)
  return `${methodLower}_${titlePart}.md`
}

/**
 * Extract endpoints from a documentation page
 */
const extractEndpointsFromPage = async (page, pageUrl) => {
  await page.goto(pageUrl, {
    waitUntil: "networkidle2",
    timeout: 30000
  })

  return await page.evaluate(() => {
    const endpoints = []

    // Method 1: Look for endpoint sections with strong tags
    const sections = document.querySelectorAll("p > strong")

    sections.forEach(section => {
      const sectionName = section.textContent.trim()

      // Find the list after this section
      let listElement = section.parentElement.nextElementSibling
      while (listElement && listElement.tagName !== "UL") {
        listElement = listElement.nextElementSibling
      }

      if (listElement) {
        const links = Array.from(listElement.querySelectorAll("a"))

        links.forEach(link => {
          const title = link.textContent.trim()
          const url = link.getAttribute("href")

          if (url && url.includes("/reference/")) {
            endpoints.push({
              title,
              url,
              section: sectionName
            })
          }
        })
      }
    })

    // Method 2: Look for all reference links in the main content (for pages without strong sections)
    if (endpoints.length === 0) {
      const main = document.querySelector(
        'main, article, .content-body, [role="main"]'
      )
      if (main) {
        const links = Array.from(
          main.querySelectorAll('a[href*="/reference/"]')
        )

        links.forEach(link => {
          const title = link.textContent.trim()
          const url = link.getAttribute("href")

          if (url && title) {
            endpoints.push({
              title,
              url,
              section: "General"
            })
          }
        })
      }
    }

    return endpoints
  })
}

/**
 * Extract content from an endpoint page
 */
const extractEndpointContent = async (page, endpointUrl, turndownService) => {
  const fullUrl = endpointUrl.startsWith("http")
    ? endpointUrl
    : `${BASE_URL}${endpointUrl}`

  await page.goto(fullUrl, {
    waitUntil: "networkidle2",
    timeout: 30000
  })

  const { html, httpMethod, apiPath } = await page.evaluate(() => {
    const main = document.querySelector(
      'main, article, .content-body, [role="main"]'
    )
    if (!main) return { html: "", httpMethod: null, apiPath: null }

    // Clone to avoid modifying original
    const clone = main.cloneNode(true)

    // Remove unwanted elements
    const elementsToRemove = clone.querySelectorAll(
      'nav, aside, .sidebar, .table-of-contents, .pagination, .jump-to, [class*="Navigation"], ' +
      'style, script, link, meta, iframe, noscript, ' +
      '.code-block-wrapper, .copy-button, button, ' +
      '[class*="Try"], [class*="Example"], [class*="Response"], [class*="RESPONSE"], ' +
      '[class*="Language"], [class*="Updated"], [class*="CodeBlock"]'
    )
    elementsToRemove.forEach(el => el.remove())

    // Remove any remaining style tags by content
    const allElements = clone.querySelectorAll('*')
    allElements.forEach(el => {
      // Remove elements that only contain CSS
      const text = el.textContent.trim()
      if (text.match(/^[@.][\w-]+\s*\{|\/\*!|tailwindcss/)) {
        el.remove()
      }
    })

    // Remove style attributes from all elements
    clone.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'))

    // Remove class attributes to avoid CSS-in-content issues
    clone.querySelectorAll('[class]').forEach(el => el.removeAttribute('class'))

    // Remove empty paragraphs and divs
    clone.querySelectorAll('p, div').forEach(el => {
      if (!el.textContent.trim() && !el.querySelector('table, ul, ol, pre, code')) {
        el.remove()
      }
    })

    // Try to extract HTTP method and path from code blocks
    let method = null
    let path = null

    const codeBlocks = clone.querySelectorAll("pre, code")
    for (const code of codeBlocks) {
      const text = code.textContent

      // Look for HTTP method
      const methodMatch = text.match(/\b(GET|POST|PUT|DELETE|PATCH)\b/)
      if (methodMatch && !method) {
        method = methodMatch[1]
      }

      // Look for API path
      const pathMatch = text.match(/\/v\d+\/[^\s\n"']+/)
      if (pathMatch && !path) {
        path = pathMatch[0]
      }

      if (method && path) break
    }

    return {
      html: clone.innerHTML,
      httpMethod: method,
      apiPath: path
    }
  })

  let markdown = turndownService.turndown(html)

  // Post-process markdown to clean up issues
  const lines = markdown.split('\n')
  const cleanedLines = []
  const seenH1 = new Set()
  let inCodeBlock = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Track code block state
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
    }

    // Skip processing inside code blocks
    if (!inCodeBlock) {
      // Remove CSS/style content
      if (line.match(/\/\*!|@layer|tailwindcss|^[@.][\w-]+\s*\{/)) {
        continue
      }

      // Remove broken table rows (just | or | with spaces)
      if (line.match(/^\s*\|\s*$/)) {
        continue
      }

      // Remove lines that are just numbers (from code examples)
      if (line.match(/^\s*\d+\s*$/)) {
        continue
      }

      // Remove duplicate H1 headings (normalize whitespace for comparison)
      if (line.startsWith('# ')) {
        const normalizedHeading = line.replace(/\s+/g, ' ').trim()
        if (seenH1.has(normalizedHeading)) {
          continue
        }
        seenH1.add(normalizedHeading)
      }

      // Remove empty headings (just # with spaces)
      if (line.match(/^#{1,6}\s*$/)) {
        continue
      }

      // Remove separator lines like [ . . . ]
      if (line.match(/^\s*\[\s*\.\s*\.\s*\.\s*\]\s*$/)) {
        continue
      }

      // Clean up escaped brackets
      line = line.replace(/\\\[/g, '[').replace(/\\\]/g, ']')

      // Remove empty anchor links
      line = line.replace(/\[\]\([^)]*\)/g, '')

      // Remove "xxxxxxxxxx" placeholder text
      if (line.trim() === 'xxxxxxxxxx') {
        continue
      }

      // Remove "Language" lines that appear before code blocks
      if (line.trim() === 'Language') {
        continue
      }
    }

    cleanedLines.push(line)
  }

  markdown = cleanedLines
    .join('\n')
    // Remove multiple consecutive empty lines
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return {
    markdown,
    httpMethod,
    apiPath
  }
}

/**
 * Determine if endpoint is public or private
 */
const isPublicEndpoint = (endpointUrl, content, apiPath) => {
  // Check API path first (most reliable)
  if (apiPath) {
    if (apiPath.includes("/auth/")) {
      return false
    }
  }

  // Check URL pattern
  if (endpointUrl.includes("rest-public") || endpointUrl.includes("public")) {
    return true
  }

  if (endpointUrl.includes("rest-auth") || endpointUrl.includes("auth")) {
    return false
  }

  // Check content for authentication requirements
  const contentLower = content.toLowerCase()
  if (
    contentLower.includes("authentication") ||
    contentLower.includes("api-key") ||
    contentLower.includes("api-secret")
  ) {
    return false
  }

  // Default to public if unclear
  return true
}

/**
 * Process all endpoints
 */
const processEndpoints = async (page, endpoints, turndownService) => {
  const results = {
    public: [],
    private: []
  }

  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i]
    console.log(`Processing (${i + 1}/${endpoints.length}): ${endpoint.title}`)

    try {
      const { markdown, httpMethod, apiPath } = await extractEndpointContent(
        page,
        endpoint.url,
        turndownService
      )

      const isPublic = isPublicEndpoint(endpoint.url, markdown, apiPath)
      const method = httpMethod || "get"
      const filename = generateFilename(method, endpoint.title)

      // Check if markdown already starts with the title heading
      const hasTitle = markdown.startsWith(`# ${endpoint.title}`)

      const fullMarkdown = `${hasTitle ? '' : `# ${endpoint.title}\n\n`}${markdown}

---
Section: ${endpoint.section}
Source: ${BASE_URL}${endpoint.url}
${apiPath ? `Path: ${apiPath}` : ""}
${httpMethod ? `Method: ${httpMethod}` : ""}
`

      const category = isPublic ? "public" : "private"
      results[category].push({
        filename,
        content: fullMarkdown,
        title: endpoint.title,
        section: endpoint.section
      })

      // Add a small delay to be polite
      await new Promise(resolve => setTimeout(resolve, 200))
    } catch (error) {
      console.error(`  Error processing ${endpoint.title}:`, error.message)
    }
  }

  return results
}

/**
 * Main extraction function
 */
const extractEndpoints = async () => {
  console.log("Starting Bitfinex endpoint documentation extraction...")

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page)

    // Create turndown service
    const turndownService = createTurndownBuilder().build()

    // Extract endpoints from both public and authenticated pages
    console.log("\nExtracting endpoint list from REST Public page...")
    const publicEndpoints = await extractEndpointsFromPage(
      page,
      `${BASE_URL}/docs/rest-public`
    )
    console.log(`Found ${publicEndpoints.length} public endpoints`)

    console.log("\nExtracting endpoint list from REST Auth page...")
    const authEndpoints = await extractEndpointsFromPage(
      page,
      `${BASE_URL}/docs/rest-auth`
    )
    console.log(`Found ${authEndpoints.length} authenticated endpoints`)

    // Combine all endpoints
    const allEndpoints = [...publicEndpoints, ...authEndpoints]
    console.log(`\nTotal endpoints to process: ${allEndpoints.length}`)

    // Process all endpoints
    console.log("\nProcessing endpoints...")
    const results = await processEndpoints(page, allEndpoints, turndownService)

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    // Write public endpoints
    console.log(`\nWriting ${results.public.length} public endpoints...`)
    results.public.forEach(endpoint => {
      const filePath = path.join(OUTPUT_DIR, "public", endpoint.filename)
      writeFile(filePath, endpoint.content)
    })

    // Write private endpoints
    console.log(`\nWriting ${results.private.length} private endpoints...`)
    results.private.forEach(endpoint => {
      const filePath = path.join(OUTPUT_DIR, "private", endpoint.filename)
      writeFile(filePath, endpoint.content)
    })

    console.log(
      "\n✅ Endpoint documentation extraction completed successfully!"
    )
    console.log(`   Public endpoints: ${results.public.length}`)
    console.log(`   Private endpoints: ${results.private.length}`)
  } finally {
    await browser.close()
  }
}

/**
 * Entry point with error handling
 */
const main = async () => {
  try {
    await extractEndpoints()
  } catch (error) {
    console.error("Error during extraction:", error)
    console.error(error.stack)
    process.exit(1)
  }
}

main()
