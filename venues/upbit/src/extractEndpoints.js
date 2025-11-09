/**
 * Upbit Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from Upbit API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/upbit/endpoints")

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
 * Since Upbit docs don't expose HTTP methods clearly, we'll use the endpoint name
 */
const generateFilename = endpointName => {
  const sanitized = sanitizeFilename(endpointName)
  return `${sanitized}.md`
}

/**
 * Extract content from a single endpoint page
 */
const extractEndpointContent = async (page, url, turndownService) => {
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 30000
  })

  // Wait for content to load
  await page.waitForSelector('main, [role="main"], .main-content', {
    timeout: 10000
  })

  // Add delay for dynamic content
  await new Promise(resolve => setTimeout(resolve, 2000))

  const html = await page.evaluate(() => {
    const mainElement =
      document.querySelector("main") ||
      document.querySelector('[role="main"]') ||
      document.querySelector(".main-content") ||
      document.body

    const clonedElement = mainElement.cloneNode(true)

    // Remove unwanted elements
    const elementsToRemove = clonedElement.querySelectorAll(
      [
        "nav",
        "header",
        ".navigation",
        ".nav",
        ".header",
        ".sidebar",
        ".footer",
        ".breadcrumb",
        ".toc",
        ".table-of-contents",
        ".menu",
        ".search",
        ".search-box",
        '[class*="nav"]',
        '[class*="menu"]',
        '[class*="sidebar"]',
        "script",
        "style",
        "noscript"
      ].join(", ")
    )

    elementsToRemove.forEach(el => el.remove())

    // Remove navigation lists
    const lists = clonedElement.querySelectorAll("ul, ol")
    lists.forEach(list => {
      const links = list.querySelectorAll("a")
      const listItems = list.querySelectorAll("li")
      if (links.length > 5 && links.length / listItems.length > 0.7) {
        list.remove()
      }
    })

    return clonedElement.innerHTML
  })

  return turndownService.turndown(html)
}

/**
 * Determine if an endpoint is public or private
 * Quotation endpoints are public, others require authentication
 */
const isPublicEndpoint = section => {
  const publicSections = ["quotation", "service"]
  return publicSections.includes(section.toLowerCase())
}

/**
 * Load endpoint configurations from config files
 */
const loadEndpointConfigs = () => {
  const configDir = path.resolve(__dirname, "../config")
  const configFiles = [
    "assets.json",
    "order.json",
    "withdrawal.json",
    "deposit.json",
    "service.json",
    "quotation.json"
  ]

  const allEndpoints = []

  for (const configFile of configFiles) {
    try {
      const configPath = path.join(configDir, configFile)
      if (fs.existsSync(configPath)) {
        const configData = fs.readFileSync(configPath, "utf8")
        const config = JSON.parse(configData)

        allEndpoints.push({
          section: config.section,
          endpoints: config.endpoints
        })
      }
    } catch (error) {
      console.error(`Error loading ${configFile}:`, error.message)
    }
  }

  return allEndpoints
}

/**
 * Extract all endpoints
 */
const extractEndpoints = async (page, turndownService) => {
  console.log("Extracting endpoint documentation...")

  const configs = loadEndpointConfigs()
  const publicEndpoints = []
  const privateEndpoints = []

  for (const config of configs) {
    const isPublic = isPublicEndpoint(config.section)
    const targetDir = isPublic ? "public" : "private"

    console.log(
      `\nProcessing ${config.section} (${config.endpoints.length} endpoints) - ${targetDir}`
    )

    for (const endpoint of config.endpoints) {
      try {
        console.log(`  Extracting ${endpoint.name}...`)

        const content = await extractEndpointContent(
          page,
          endpoint.url,
          turndownService
        )

        const filename = generateFilename(endpoint.name)
        const markdown = `# ${endpoint.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\n\n${content}\n\n---\n\n**Source:** [${endpoint.name}](${endpoint.url})\n`

        if (isPublic) {
          publicEndpoints.push({ filename, content: markdown })
        } else {
          privateEndpoints.push({ filename, content: markdown })
        }

        // Polite delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`  ❌ Error extracting ${endpoint.name}:`, error.message)
      }
    }
  }

  return { publicEndpoints, privateEndpoints }
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting endpoint documentation extraction for Upbit...")

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  const turndownService = createTurndownBuilder().build()

  try {
    // Clean up old directory structure (migration from old format)
    const oldDirs = [
      "assets",
      "order",
      "withdrawal",
      "deposit",
      "service",
      "quotation"
    ]
    const upbitDocsDir = path.resolve(__dirname, "../../../docs/upbit")

    for (const oldDir of oldDirs) {
      const dirPath = path.join(upbitDocsDir, oldDir)
      if (fs.existsSync(dirPath)) {
        console.log(`Removing old directory: ${oldDir}/`)
        fs.rmSync(dirPath, { recursive: true, force: true })
      }
    }

    // Create output directories
    const publicDir = path.join(OUTPUT_DIR, "public")
    const privateDir = path.join(OUTPUT_DIR, "private")
    ensureDir(publicDir)
    ensureDir(privateDir)

    // Extract all endpoints
    const { publicEndpoints, privateEndpoints } = await extractEndpoints(
      page,
      turndownService
    )

    // Write public endpoints
    console.log(`\nWriting ${publicEndpoints.length} public endpoints...`)
    for (const endpoint of publicEndpoints) {
      writeFile(path.join(publicDir, endpoint.filename), endpoint.content)
    }

    // Write private endpoints
    console.log(`\nWriting ${privateEndpoints.length} private endpoints...`)
    for (const endpoint of privateEndpoints) {
      writeFile(path.join(privateDir, endpoint.filename), endpoint.content)
    }

    console.log("\n✅ Endpoint documentation extraction completed successfully")
    console.log(`   Public endpoints: ${publicEndpoints.length}`)
    console.log(`   Private endpoints: ${privateEndpoints.length}`)
  } catch (error) {
    console.error("Error during endpoint documentation extraction:", error)
    throw error
  } finally {
    await browser.close()
  }
}

// Standard entry point with error handling
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Fatal error:", error)
    console.error(error.stack)
    process.exit(1)
  })
}

export { main }
