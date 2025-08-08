"use strict"

import puppeteer from "puppeteer"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { buildLlmsContent, writeLlmsTxt, makeLink } from "../../shared/llms.js"

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

function sanitizeFileName(method, apiPath) {
  const safePath = apiPath
    .replace(/\{([^}]+)\}/g, "$1")
    .replace(/\//g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "-")
    .replace(/_+/g, "_")
    .replace(/-+/g, "-")
    .replace(/^_+|_+$/g, "")
    .toLowerCase()
  return `${method.toLowerCase()}_${safePath || "root"}.md`
}

// Build endpoint markdown files from HTML fragments and write llms.txt linking to them
async function generatePerEndpointDocsFromHtmlFragments(fragments) {
  const docsRoot = path.join(__dirname, "..", "..", "..", "docs", "backpack")
  const endpointsDir = path.join(docsRoot, "endpoints")
  await fs.mkdir(endpointsDir, { recursive: true })

  const links = []

  for (const frag of fragments) {
    const { title, method = "get", path: apiPath = "", html } = frag
    const fileName = sanitizeFileName(method, apiPath || title)
    const filePath = path.join(endpointsDir, fileName)
    const markdown = turndownService.turndown(html)
    const content = `# ${title}\n\n${markdown}\n`
    await fs.writeFile(filePath, content, "utf8")
    links.push(makeLink(title, `./endpoints/${fileName}`))
  }

  links.sort((a, b) => a.name.localeCompare(b.name))

  const llms = buildLlmsContent(
    "Backpack Exchange",
    "Curated links to per-endpoint Backpack Exchange API documentation.",
    [
      { title: "Endpoints", links },
      {
        title: "Official Docs",
        links: [makeLink("Backpack Docs", "https://docs.backpack.exchange/")]
      }
    ]
  )
  writeLlmsTxt(docsRoot, llms)
}

// Preferred path: split the docs HTML by structure into endpoint fragments
async function extractAndSplitByStructure() {
  console.log("Starting Backpack Exchange structured extraction...")

  let browser
  try {
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
    await page.setViewport({ width: 1920, height: 1080 })
    page.setDefaultNavigationTimeout(30000)
    page.setDefaultTimeout(30000)

    await page.setRequestInterception(true)
    page.on("request", req => {
      const type = req.resourceType()
      if (["document", "script", "xhr", "fetch"].includes(type)) req.continue()
      else req.abort()
    })

    console.log("Navigating to Backpack Exchange docs...")
    await page.goto("https://docs.backpack.exchange/", {
      waitUntil: "networkidle2",
      timeout: 30000
    })

    await new Promise(r => setTimeout(r, 1500))

    const fragments = await page.evaluate(() => {
      const SELECTORS = [
        "main",
        '[role="main"]',
        ".main-content",
        ".content",
        ".documentation",
        ".docs-content",
        "article",
        ".article"
      ]

      const methodRegex = /^(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)\s+\//i

      const getMain = () => {
        for (const s of SELECTORS) {
          const el = document.querySelector(s)
          if (el) return el
        }
        return document.body
      }

      const getHeadingLevel = tag => {
        if (!tag) return 7
        const m = tag.match(/^H(\d)$/i)
        return m ? parseInt(m[1], 10) : 7
      }

      const main = getMain()
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_ELEMENT)
      const headings = []

      while (walker.nextNode()) {
        const el = walker.currentNode
        const tag = el.tagName
        if (!/^H[1-6]$/.test(tag)) continue
        const text = el.textContent.trim()
        const codeEl = el.querySelector("code, pre code")
        const codeText = codeEl ? codeEl.textContent.trim() : ""

        const raw = methodRegex.test(text)
          ? text
          : methodRegex.test(codeText)
            ? codeText
            : ""
        if (!raw) continue

        const m = raw.match(
          /^(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)\s+(\S+)/i
        )
        if (!m) continue
        const method = m[1]
        const apiPath = m[2]
        headings.push({
          el,
          level: getHeadingLevel(tag),
          method,
          apiPath,
          title: `${method.toUpperCase()} ${apiPath}`
        })
      }

      if (headings.length === 0) {
        // Fallback: split by H2
        const h2s = Array.from(main.querySelectorAll("h2"))
        for (const el of h2s) {
          const text = el.textContent.trim()
          headings.push({
            el,
            level: 2,
            method: "GET",
            apiPath: text,
            title: text
          })
        }
      }

      const results = []
      for (let i = 0; i < headings.length; i++) {
        const { el, level, method, apiPath, title } = headings[i]
        const endEl = (() => {
          for (let j = i + 1; j < headings.length; j++) {
            if (headings[j].level <= level) return headings[j].el
          }
          return null
        })()

        const container = document.createElement("div")
        let current = el
        while (current && current !== endEl) {
          container.appendChild(current.cloneNode(true))
          current = current.nextElementSibling
        }
        results.push({
          title,
          method,
          path: apiPath,
          html: container.innerHTML
        })
      }

      return results
    })

    if (!fragments || fragments.length === 0) {
      console.warn(
        "No structured endpoint sections detected; generating a basic llms.txt."
      )
      const docsRoot = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "docs",
        "backpack"
      )
      await fs.mkdir(docsRoot, { recursive: true })
      const content = buildLlmsContent(
        "Backpack Exchange",
        "Curated links to Backpack Exchange documentation.",
        [
          {
            title: "Documentation",
            links: [
              makeLink("Backpack Docs", "https://docs.backpack.exchange/")
            ]
          }
        ]
      )
      writeLlmsTxt(docsRoot, content)
      return
    }

    await generatePerEndpointDocsFromHtmlFragments(fragments)
  } catch (error) {
    console.error("Error during structured extraction:", error)
    console.error("Stack trace:", error.stack)
    throw error
  } finally {
    if (browser) await browser.close()
  }
}

async function generatePerEndpointDocs(spec) {
  const docsRoot = path.join(__dirname, "..", "..", "..", "docs", "backpack")
  const endpointsDir = path.join(docsRoot, "endpoints")
  await fs.mkdir(endpointsDir, { recursive: true })

  const links = []

  const addLine = (buf, line = "") => buf.push(line)
  const ensureArray = v => (Array.isArray(v) ? v : v ? [v] : [])

  if (spec?.paths) {
    for (const [apiPath, methods] of Object.entries(spec.paths)) {
      for (const [method, operation] of Object.entries(methods)) {
        if (!operation || typeof operation !== "object") continue
        const parts = []
        addLine(parts, `# ${method.toUpperCase()} ${apiPath}`)
        addLine(parts)
        if (operation.summary)
          addLine(parts, `**Summary:** ${operation.summary}`)
        if (operation.description) {
          addLine(parts)
          addLine(parts, operation.description)
        }
        if (operation.tags && operation.tags.length) {
          addLine(parts)
          addLine(parts, `**Tags:** ${operation.tags.join(", ")}`)
        }
        if (operation.parameters && operation.parameters.length) {
          addLine(parts)
          addLine(parts, `## Parameters`)
          for (const p of operation.parameters) {
            addLine(
              parts,
              `- \`${p.name}\` (${p.in})${p.required ? " — required" : ""}: ${p.description || ""}`
            )
          }
        }
        const requestBodies = operation.requestBody?.content || {}
        const requestBodyTypes = Object.keys(requestBodies)
        if (requestBodyTypes.length) {
          addLine(parts)
          addLine(parts, `## Request Body`)
          for (const ct of requestBodyTypes) {
            const schema = requestBodies[ct]?.schema
            addLine(parts, `- Content-Type: ${ct}`)
            if (schema)
              addLine(parts, `  - Schema: \`${JSON.stringify(schema)}\``)
          }
        }
        const responses = operation.responses || {}
        const responseCodes = Object.keys(responses)
        if (responseCodes.length) {
          addLine(parts)
          addLine(parts, `## Responses`)
          for (const code of responseCodes) {
            const resp = responses[code]
            addLine(parts, `- \`${code}\`: ${resp?.description || ""}`)
          }
        }

        const fileName = sanitizeFileName(method, apiPath)
        const filePath = path.join(endpointsDir, fileName)
        await fs.writeFile(filePath, parts.join("\n") + "\n", "utf8")
        links.push(
          makeLink(
            `${method.toUpperCase()} ${apiPath}`,
            `./endpoints/${fileName}`
          )
        )
      }
    }
  }

  links.sort((a, b) => a.name.localeCompare(b.name))

  const llms = buildLlmsContent(
    "Backpack Exchange",
    "Curated links to per-endpoint Backpack Exchange API documentation.",
    [{ title: "Endpoints", links }]
  )
  writeLlmsTxt(docsRoot, llms)
}

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

        // Generate per-endpoint markdown files and llms.txt
        const spec = JSON.parse(specContent)
        await generatePerEndpointDocs(spec)
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
    // Even without OpenAPI, emit an llms.txt that links to the official docs and the general md as a fallback
    const links = [
      makeLink("Backpack Docs", "https://docs.backpack.exchange/"),
      makeLink("General Documentation (scraped)", "./general_documentation.md")
    ]
    const content = buildLlmsContent(
      "Backpack Exchange",
      "Curated links to Backpack Exchange documentation.",
      [{ title: "Documentation", links }]
    )
    writeLlmsTxt(docsDir, content)

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
    await extractAndSplitByStructure()
    console.log("\n🎉 Backpack Exchange links generated (per-endpoint if detected)! 🎉\n")
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
