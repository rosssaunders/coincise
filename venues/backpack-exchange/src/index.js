"use strict"

import puppeteer from "puppeteer"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure Turndown service
const turndownService = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced"
})
turndownService.use(gfm)

// Remove unwanted elements like style tags, scripts, and other noise
turndownService.remove([
  "style",
  "script",
  "noscript",
  "meta",
  "link",
  "nav",
  "header",
  "footer"
])

// Add custom rule to ignore CSS and other unwanted content
turndownService.addRule("removeStyles", {
  filter: [
    "style",
    "script",
    "noscript",
    "head",
    "meta",
    "link",
    "nav",
    "header",
    "footer"
  ],
  replacement: () => ""
})

// Clean up CSS blocks that might leak through
turndownService.addRule("removeCSSBlocks", {
  filter: node => {
    if (node.nodeType === 3) {
      // Text node
      const text = node.textContent || ""
      // Remove CSS-like content
      return (
        text.includes("{") &&
        text.includes("}") &&
        (text.includes("padding:") ||
          text.includes("margin:") ||
          text.includes("overflow:") ||
          text.includes("background-color:") ||
          text.includes("position:"))
      )
    }
    return false
  },
  replacement: () => ""
})

// Remove HTML tables completely
turndownService.addRule("removeTables", {
  filter: "table",
  replacement: () => ""
})

async function extractOpenAPISpec() {
  console.log("Starting Backpack Exchange OpenAPI spec extraction...")

  let browser
  try {
    // Launch browser with proper configuration
    browser = await puppeteer.launch({
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

    const page = await browser.newPage()

    // Set viewport and timeouts
    await page.setViewport({ width: 1920, height: 1080 })
    page.setDefaultNavigationTimeout(30000)
    page.setDefaultTimeout(30000)

    // Enable request interception for optimization
    await page.setRequestInterception(true)
    page.on("request", req => {
      const resourceType = req.resourceType()
      if (["document", "script", "xhr", "fetch"].includes(resourceType)) {
        req.continue()
      } else {
        req.abort()
      }
    })

    console.log("Navigating to Backpack Exchange docs...")

    // Navigate to the main docs page first
    await page.goto("https://docs.backpack.exchange/", {
      waitUntil: "networkidle2",
      timeout: 30000
    })

    // Wait for page to load and look for OpenAPI/Swagger content
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Try to find OpenAPI spec content or links
    const openAPIContent = await page.evaluate(() => {
      // Look for common OpenAPI indicators
      const specElements = document.querySelectorAll(
        [
          '[data-testid*="openapi"]',
          '[class*="openapi"]',
          '[id*="openapi"]',
          'pre[class*="json"]',
          'code[class*="json"]',
          ".swagger-ui",
          "#swagger-ui"
        ].join(",")
      )

      if (specElements.length > 0) {
        return Array.from(specElements).map(el => ({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          textContent: el.textContent.substring(0, 500)
        }))
      }

      // Check for any JSON content that might be the spec
      const preElements = document.querySelectorAll("pre")
      for (const pre of preElements) {
        const text = pre.textContent.trim()
        if (
          text.startsWith("{") &&
          (text.includes("openapi") || text.includes("swagger"))
        ) {
          return [
            {
              tagName: "pre",
              textContent: text
            }
          ]
        }
      }

      return null
    })

    if (openAPIContent) {
      console.log(
        "Found potential OpenAPI content:",
        openAPIContent.length,
        "elements"
      )

      // Extract the actual spec if found
      const specContent = await page.evaluate(() => {
        const preElements = document.querySelectorAll("pre")
        for (const pre of preElements) {
          const text = pre.textContent.trim()
          if (
            text.startsWith("{") &&
            (text.includes("openapi") || text.includes("swagger"))
          ) {
            try {
              JSON.parse(text)
              return text
            } catch (e) {
              // Not valid JSON, continue
            }
          }
        }
        return null
      })

      if (specContent) {
        // Save the raw OpenAPI spec
        const configDir = path.join(__dirname, "..", "config")
        await fs.writeFile(
          path.join(configDir, "openapi-spec.json"),
          specContent,
          "utf8"
        )
        console.log("✅ OpenAPI spec saved to config/openapi-spec.json")

        // Convert to markdown documentation
        const spec = JSON.parse(specContent)
        const markdown = await convertOpenAPIToMarkdown(spec)

        const docsDir = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "docs",
          "backpack"
        )
        await fs.mkdir(docsDir, { recursive: true })
        await fs.writeFile(
          path.join(docsDir, "api_documentation.md"),
          markdown,
          "utf8"
        )
        console.log(
          "✅ API documentation saved to docs/backpack/api_documentation.md"
        )

        return true
      }
    }

    // If we can't find OpenAPI spec directly, try to extract general API documentation
    console.log(
      "OpenAPI spec not found directly, extracting general documentation..."
    )

    // Extract content and clean it in the browser first
    const mainContent = await page.evaluate(() => {
      // Remove unwanted elements from the entire document first
      const unwantedElements = document.querySelectorAll(
        "style, script, noscript, link, meta, nav, header, footer"
      )
      unwantedElements.forEach(el => el.remove())

      // Try to find the main content area
      const selectors = [
        "main",
        '[role="main"]',
        ".main-content",
        ".content",
        ".documentation",
        ".docs-content",
        "article",
        ".article"
      ]

      for (const selector of selectors) {
        const element = document.querySelector(selector)
        if (element) {
          return element.textContent || element.innerText
        }
      }

      // Fallback to body text content only
      return document.body.textContent || document.body.innerText
    })

    // Since we're now getting plain text, we need to format it as markdown
    const lines = mainContent.split("\n").filter(line => line.trim().length > 0)
    let cleanMarkdown = ""

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // Skip lines that look like CSS or unwanted content
      if (
        line.includes("{") &&
        line.includes("}") &&
        (line.includes("padding:") ||
          line.includes("margin:") ||
          line.includes("overflow:") ||
          line.includes("background-color:") ||
          line.includes("position:"))
      ) {
        continue
      }

      // Skip lines with CSS class names
      if (/^[a-zA-Z-]+\s*{/.test(line) || /sc-[a-zA-Z0-9]+/.test(line)) {
        continue
      }

      // Format as markdown
      if (line.length > 0) {
        // If it looks like a heading (short line, followed by content)
        if (
          line.length < 50 &&
          i < lines.length - 1 &&
          !line.includes(".") &&
          !line.includes(",")
        ) {
          cleanMarkdown += `## ${line}\n\n`
        } else {
          cleanMarkdown += `${line}\n\n`
        }
      }
    }

    cleanMarkdown = cleanMarkdown.trim()

    const docsDir = path.join(__dirname, "..", "..", "..", "docs", "backpack")
    await fs.mkdir(docsDir, { recursive: true })
    await fs.writeFile(
      path.join(docsDir, "general_documentation.md"),
      cleanMarkdown,
      "utf8"
    )
    console.log(
      "✅ General documentation saved to docs/backpack/general_documentation.md"
    )

    return false
  } catch (error) {
    console.error("Error extracting Backpack Exchange documentation:", error)
    console.error("Stack trace:", error.stack)
    throw error
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

async function convertOpenAPIToMarkdown(spec) {
  let markdown = `# ${spec.info?.title || "Backpack Exchange API"}\n\n`

  if (spec.info?.description) {
    markdown += `${spec.info.description}\n\n`
  }

  if (spec.info?.version) {
    markdown += `**Version:** ${spec.info.version}\n\n`
  }

  if (spec.servers && spec.servers.length > 0) {
    markdown += `## Base URLs\n\n`
    spec.servers.forEach(server => {
      markdown += `- ${server.url}`
      if (server.description) {
        markdown += ` - ${server.description}`
      }
      markdown += "\n"
    })
    markdown += "\n"
  }

  if (spec.paths) {
    markdown += `## Endpoints\n\n`

    Object.entries(spec.paths).forEach(([path, methods]) => {
      markdown += `### ${path}\n\n`

      Object.entries(methods).forEach(([method, operation]) => {
        if (typeof operation === "object" && operation.summary) {
          markdown += `#### ${method.toUpperCase()}\n\n`

          if (operation.summary) {
            markdown += `**Summary:** ${operation.summary}\n\n`
          }

          if (operation.description) {
            markdown += `**Description:** ${operation.description}\n\n`
          }

          if (operation.parameters && operation.parameters.length > 0) {
            markdown += `**Parameters:**\n\n`
            operation.parameters.forEach(param => {
              markdown += `- \`${param.name}\` (${param.in}) - ${param.description || "No description"}`
              if (param.required) markdown += " **Required**"
              markdown += "\n"
            })
            markdown += "\n"
          }

          if (operation.responses) {
            markdown += `**Responses:**\n\n`
            Object.entries(operation.responses).forEach(([code, response]) => {
              markdown += `- \`${code}\` - ${response.description || "No description"}\n`
            })
            markdown += "\n"
          }
        }
      })
    })
  }

  return markdown
}

async function main() {
  try {
    await extractOpenAPISpec()
    console.log(
      "\n🎉 Backpack Exchange documentation extraction completed! 🎉\n"
    )
  } catch (error) {
    console.error("Failed to extract documentation:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
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
