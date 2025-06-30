"use strict"

import puppeteer from "puppeteer"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"
import { writeFileSync, mkdirSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import prettier from "prettier"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Initialize Turndown service
const turndownService = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  fence: "```"
})
turndownService.use(gfm)

const DIGIFINEX_DOCS_URL = "https://docs.digifinex.com/en-ww/spot/v3/rest.html"

async function launchBrowser() {
  return await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--single-process",
      "--no-first-run",
      "--no-zygote",
      "--disable-extensions",
      "--disable-component-extensions-with-background-pages",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--password-store=basic"
    ],
    timeout: 30000,
    ignoreHTTPSErrors: true
  })
}

async function extractDocumentation(page) {
  console.log("Extracting DigiFinex documentation...")

  await page.goto(DIGIFINEX_DOCS_URL, {
    waitUntil: "networkidle2",
    timeout: 30000
  })

  // Wait for content to load
  await page.waitForSelector("body", { timeout: 30000 })
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Extract the full page content
  const content = await page.evaluate(() => {
    // Remove unnecessary elements
    const elementsToRemove = [
      "script",
      "style",
      "nav.navbar",
      ".sidebar",
      "footer",
      ".ads",
      ".advertisement"
    ]

    elementsToRemove.forEach(selector => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => el.remove())
    })

    // Get the main content area
    const mainContent =
      document.querySelector(".main-content") ||
      document.querySelector(".content") ||
      document.querySelector("main") ||
      document.body

    return mainContent ? mainContent.innerHTML : document.body.innerHTML
  })

  return content
}

function categorizeContent(htmlContent) {
  const categories = {
    public: [],
    private: [],
    websocket: []
  }

  // Convert to markdown first
  const markdown = turndownService.turndown(htmlContent)

  // Split content by sections using improved regex
  const sections = markdown.split(/^(#{1,6}\s.*$)/m).filter(s => s.trim())

  for (let i = 0; i < sections.length; i += 2) {
    const header = sections[i]
    const content = sections[i + 1] || ""

    if (!header || !header.startsWith("#")) continue

    const fullSection = header + "\n\n" + content
    const lowerSection = fullSection.toLowerCase()

    // Enhanced categorization
    if (
      lowerSection.includes("websocket") ||
      lowerSection.includes("websoket") || // Handle typo in source
      lowerSection.includes("ws ") ||
      lowerSection.includes("socket") ||
      lowerSection.includes("stream") ||
      lowerSection.includes("real-time") ||
      lowerSection.includes("live")
    ) {
      categories.websocket.push(fullSection)
    } else if (
      lowerSection.includes("authentication") ||
      lowerSection.includes("signature") ||
      lowerSection.includes("sign") ||
      lowerSection.includes("access-key") ||
      lowerSection.includes("private") ||
      lowerSection.includes("account") ||
      lowerSection.includes("balance") ||
      lowerSection.includes("assets") ||
      lowerSection.includes("order") ||
      lowerSection.includes("trade") ||
      lowerSection.includes("trading") ||
      lowerSection.includes("withdraw") ||
      lowerSection.includes("deposit") ||
      lowerSection.includes("transfer") ||
      lowerSection.includes("position") ||
      lowerSection.includes("margin") ||
      lowerSection.includes("finance") ||
      lowerSection.includes("mytrades") ||
      lowerSection.includes("new") ||
      lowerSection.includes("cancel") ||
      lowerSection.includes("current") ||
      lowerSection.includes("history")
    ) {
      categories.private.push(fullSection)
    } else if (
      lowerSection.includes("market") ||
      lowerSection.includes("ticker") ||
      lowerSection.includes("orderbook") ||
      lowerSection.includes("order_book") ||
      lowerSection.includes("kline") ||
      lowerSection.includes("candle") ||
      lowerSection.includes("public") ||
      lowerSection.includes("symbols") ||
      lowerSection.includes("depth") ||
      lowerSection.includes("ping") ||
      lowerSection.includes("time") ||
      lowerSection.includes("server") ||
      lowerSection.includes("currencies") ||
      lowerSection.includes("common")
    ) {
      categories.public.push(fullSection)
    } else {
      // Default sections (intro, general info, etc.) go to public
      categories.public.push(fullSection)
    }
  }

  return categories
}

function generateMarkdownFile(category, sections) {
  let content = `# DigiFinex ${category.charAt(0).toUpperCase() + category.slice(1)} API Documentation\n\n`
  content += `This documentation covers the ${category} endpoints of the DigiFinex API.\n\n`
  content += `Source: ${DIGIFINEX_DOCS_URL}\n\n`
  content += "---\n\n"

  // Add special note for WebSocket category
  if (category === "websocket" && sections.length <= 2) {
    content += `## Note\n\n`
    content += `The main DigiFinex REST API documentation contains limited WebSocket information. `
    content += `For comprehensive WebSocket API documentation, refer to the external GitHub repository `
    content += `linked below.\n\n`
  }

  sections.forEach(section => {
    if (section.trim()) {
      // Clean up section formatting
      let cleanSection = section.trim()

      // Remove extra newlines and normalize spacing
      cleanSection = cleanSection.replace(/\n{3,}/g, "\n\n")
      cleanSection = cleanSection.replace(/\n\s+\n/g, "\n\n")

      content += cleanSection + "\n\n"
    }
  })

  return content
}

async function formatMarkdown(content) {
  try {
    // Load Prettier config from config/prettier.config.json
    const { readFileSync } = await import("fs")
    const { join } = await import("path")
    const configPath = join(
      __dirname,
      "..",
      "..",
      "..",
      "config",
      "prettier.config.json"
    )
    let prettierConfig = {}
    try {
      const configContent = readFileSync(configPath, "utf8")
      prettierConfig = JSON.parse(configContent)
    } catch (err) {
      console.warn(
        "Could not load Prettier config, using defaults:",
        err.message
      )
    }
    const formatted = await prettier.format(content, {
      parser: "markdown",
      ...prettierConfig
    })
    return formatted
  } catch (error) {
    console.warn("Failed to format markdown with prettier:", error.message)
    return content
  }
}

async function saveDocumentation(categories) {
  const docsDir = join(__dirname, "..", "..", "..", "docs", "digifinex")

  // Create docs directory if it doesn't exist
  mkdirSync(docsDir, { recursive: true })

  // Save each category to separate files
  for (const [category, sections] of Object.entries(categories)) {
    if (sections.length > 0) {
      const filename = `${category}_rest_api.md`
      const filepath = join(docsDir, filename)
      let content = generateMarkdownFile(category, sections)

      // Format with prettier
      content = await formatMarkdown(content)

      writeFileSync(filepath, content, "utf8")
      console.log(`Saved ${category} documentation to ${filename}`)
    }
  }
}

async function main() {
  const extractType = process.argv[2] || "all"

  console.log(`Starting DigiFinex documentation extraction for: ${extractType}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()

    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 })

    // Set request interception
    await page.setRequestInterception(true)
    page.on("request", req => {
      const resourceType = req.resourceType()
      if (["document", "script", "xhr", "fetch"].includes(resourceType)) {
        req.continue()
      } else {
        req.abort()
      }
    })

    // Extract documentation
    const htmlContent = await extractDocumentation(page)

    // Categorize content
    const categories = categorizeContent(htmlContent)

    console.log("Content categorization complete:")
    console.log(`- Public sections: ${categories.public.length}`)
    console.log(`- Private sections: ${categories.private.length}`)
    console.log(`- WebSocket sections: ${categories.websocket.length}`)

    // Save based on extract type
    if (extractType === "all") {
      await saveDocumentation(categories)
    } else if (categories[extractType]) {
      const filteredCategories = { [extractType]: categories[extractType] }
      await saveDocumentation(filteredCategories)
    } else {
      console.error(
        `Invalid extract type: ${extractType}. Use: public, private, websocket, or all`
      )
      process.exit(1)
    }

    console.log("DigiFinex documentation extraction completed successfully")
  } catch (error) {
    console.error("Error during extraction:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
