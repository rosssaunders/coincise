"use strict"

import fs from "fs"
import path from "path"
import process from "process"
import { fileURLToPath } from "url"
import { JSDOM } from "jsdom"
import TurndownService from "turndown"
import { gfm, tables, strikethrough } from "turndown-plugin-gfm"
import puppeteer from "puppeteer"
import { formatMarkdown } from "../../shared/format-markdown.js"
import fetch from "node-fetch"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Get configuration from command line argument or default to private.json
function getConfig() {
  const configFile = process.argv[2] || "private.json"

  // Handle both relative paths (config/assets.json) and just filenames (assets.json)
  let configPath
  if (configFile.includes("/")) {
    configPath = path.resolve(path.join(__dirname, "..", configFile))
  } else {
    configPath = path.resolve(path.join(__dirname, "../config", configFile))
  }

  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found: ${configPath}`)
  }

  const configData = fs.readFileSync(configPath, "utf8")
  return JSON.parse(configData)
}

/**
 * Configure Turndown for HTML to Markdown conversion
 * @returns {TurndownService} Configured Turndown service
 */
function configureTurndown() {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    fence: "```",
    bulletListMarker: "-",
    emDelimiter: "_",
    strongDelimiter: "**",
    br: "\n",
    preformattedCode: true
  })

  turndownService.use([gfm, tables, strikethrough])

  // Custom table rule to ensure proper markdown table formatting
  turndownService.addRule("improvedTable", {
    filter: "table",
    replacement: function (content, node) {
      // Extract all rows from the table
      const rows = Array.from(node.querySelectorAll("tr"))
      if (rows.length === 0) return content

      // Collect all valid rows with content
      const validRows = []
      rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll("td, th"))
        if (cells.length > 0) {
          const cellTexts = cells.map(cell => {
            const cellText = cell.textContent.trim().replace(/\s+/g, " ")
            return cellText || " "
          })
          // Only include rows that have actual content (not all empty)
          if (cellTexts.some(text => text.trim() !== "")) {
            validRows.push(cellTexts)
          }
        }
      })

      if (validRows.length === 0) return content

      let tableMarkdown = "\n"

      validRows.forEach((cellTexts, rowIndex) => {
        // Create the row content
        const rowContent = cellTexts.join(" | ")
        tableMarkdown += "| " + rowContent + " |\n"

        // Add header separator after first row
        if (rowIndex === 0) {
          const separator = cellTexts.map(() => "---").join(" | ")
          tableMarkdown += "| " + separator + " |\n"
        }
      })

      return tableMarkdown + "\n"
    }
  })

  // Handle parameter lists that should be converted to tables
  turndownService.addRule("parameterList", {
    filter: function (node) {
      // Look for parameter list containers in API docs
      return (
        node.classList &&
        (node.classList.contains("parameter") ||
          node.classList.contains("param") ||
          node.classList.contains("query-param") ||
          node.classList.contains("request-param") ||
          (node.tagName === "DIV" &&
            node.querySelector &&
            node.querySelector('[data-testid*="param"]')))
      )
    },
    replacement: function (content, node) {
      // Try to extract parameter information and format as table
      const params = []

      // Look for parameter entries
      const paramElements = node.querySelectorAll(
        '[data-testid*="param"], .parameter-item, .param-item'
      )

      if (paramElements.length > 0) {
        paramElements.forEach(param => {
          const name = param
            .querySelector(
              '.param-name, .parameter-name, [data-testid*="name"]'
            )
            ?.textContent?.trim()
          const type = param
            .querySelector(
              '.param-type, .parameter-type, [data-testid*="type"]'
            )
            ?.textContent?.trim()
          const description = param
            .querySelector(
              '.param-description, .parameter-description, [data-testid*="description"]'
            )
            ?.textContent?.trim()
          const required = param
            .querySelector(
              '.param-required, .parameter-required, [data-testid*="required"]'
            )
            ?.textContent?.trim()

          if (name) {
            params.push({
              name,
              type: type || "string",
              required:
                required === "true" || required === "required" ? "Yes" : "No",
              description: description || ""
            })
          }
        })
      }

      if (params.length > 0) {
        let table = "\n## Query Parameters\n\n"
        table += "| Parameter | Type | Required | Description |\n"
        table += "| --------- | ---- | -------- | ----------- |\n"

        params.forEach(param => {
          table += `| ${param.name} | ${param.type} | ${param.required} | ${param.description} |\n`
        })

        return table + "\n"
      }

      return content
    }
  })

  // Also handle table-like structures that might not be in proper table tags
  turndownService.addRule("tableRowFix", {
    filter: function (node) {
      return node.nodeName === "P" && node.textContent.includes("|")
    },
    replacement: function (content) {
      // If it looks like a broken table row, try to fix it
      if (content.match(/^\s*\|\s*[\w\s]+\s*\|/)) {
        return content + "\n"
      }
      return content
    }
  })

  // Post-processing to fix parameter lists and code blocks in the final markdown
  const originalTurndown = turndownService.turndown
  turndownService.turndown = function (html) {
    let markdown = originalTurndown.call(this, html)

    // Look for parameter patterns and convert to table
    markdown = fixParameterLists(markdown)

    // Fix code blocks that aren't properly formatted
    markdown = fixCodeBlocks(markdown)

    return markdown
  }

  // Handle dollar signs in code blocks
  const originalEscape = turndownService.escape
  turndownService.escape = function (string) {
    return originalEscape(string).replace(/\$/g, "\\$")
  }

  return turndownService
}

/**
 * Fix code blocks that aren't properly formatted
 * @param {string} markdown - The markdown content
 * @returns {string} Fixed markdown with proper code blocks
 */
function fixCodeBlocks(markdown) {
  // Remove existing single-line code blocks and group consecutive code lines
  let lines = markdown.split("\n")
  let result = []
  let codeBuffer = []
  let inCodeSequence = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Skip line numbers between code blocks
    if (trimmedLine.match(/^\d+$/)) {
      continue
    }

    // Check if this is a single-line code block
    if (
      trimmedLine.startsWith("```javascript") &&
      i + 2 < lines.length &&
      lines[i + 2] === "```"
    ) {
      const codeLine = lines[i + 1]
      if (!inCodeSequence) {
        // Start new code sequence
        inCodeSequence = true
        codeBuffer = ["```javascript", codeLine]
      } else {
        // Add to existing sequence
        codeBuffer.push(codeLine)
      }
      i += 2 // Skip the code line and closing ```
      continue
    }

    // Check if we should end the code sequence
    if (
      inCodeSequence &&
      !trimmedLine.startsWith("```") &&
      trimmedLine !== ""
    ) {
      // End the code sequence
      codeBuffer.push("```")
      result.push(...codeBuffer)
      codeBuffer = []
      inCodeSequence = false
    }

    // Add regular lines if not in code sequence
    if (!inCodeSequence) {
      result.push(line)
    }
  }

  // Close any remaining code block
  if (inCodeSequence && codeBuffer.length > 0) {
    codeBuffer.push("```")
    result.push(...codeBuffer)
  }

  return result.join("\n")
}

/**
 * Fix parameter lists that weren't captured as tables
 * @param {string} markdown - The markdown content
 * @returns {string} Fixed markdown with parameter tables
 */
function fixParameterLists(markdown) {
  // Pattern to match parameter sequences like:
  // market
  // string
  // required
  // Market ID (ex. SGD-BTC, BTC-XRP)
  const parameterPattern =
    /^([a-zA-Z_][a-zA-Z0-9_]*)\s*\n\s*(string|int32|integer|boolean|number|array|object)\s*\n\s*(required|optional)?\s*\n\s*([^#\n]+(?:\n(?![a-zA-Z_][a-zA-Z0-9_]*\s*\n\s*(?:string|int32|integer|boolean|number|array|object))[^#\n]+)*?)(?=\n\n|$|#|\n[a-zA-Z_][a-zA-Z0-9_]*\s*\n\s*(?:string|int32|integer|boolean|number|array|object))/gm

  const parameters = []
  let match

  // Extract all parameters
  while ((match = parameterPattern.exec(markdown)) !== null) {
    const [fullMatch, name, type, required, description] = match

    // Skip if this parameter name already exists (avoid duplicates)
    if (parameters.some(p => p.name === name.trim())) {
      continue
    }

    // Skip if description looks like it might be a response field or other content
    const cleanDescription = description.trim().replace(/\n/g, " ")
    if (
      cleanDescription.length > 200 ||
      cleanDescription.match(/^(Defaults to|Format:|Example:|Response)/)
    ) {
      continue
    }

    parameters.push({
      name: name.trim(),
      type: type.trim(),
      required: required
        ? required.trim() === "required"
          ? "Yes"
          : "No"
        : "No",
      description: cleanDescription
    })
  }

  // If we found parameters, create a table and replace the original text
  if (parameters.length > 0) {
    let table = "\n## Query Parameters\n\n"
    table += "| Parameter | Type | Required | Description |\n"
    table += "| --------- | ---- | -------- | ----------- |\n"

    parameters.forEach(param => {
      table += `| ${param.name} | ${param.type} | ${param.required} | ${param.description} |\n`
    })

    // Remove the original parameter text and replace with table
    const cleanedMarkdown = markdown.replace(parameterPattern, "").trim()

    // Insert the table after the first heading or at the beginning
    const headingMatch = cleanedMarkdown.match(
      /^(# [^\n]+\n(?:[^\n]+\n)*?)(?=##|$)/m
    )
    if (headingMatch) {
      return cleanedMarkdown.replace(
        headingMatch[0],
        headingMatch[0] + table + "\n"
      )
    } else {
      return table + "\n" + cleanedMarkdown
    }
  }

  return markdown
}

/**
 * Launch Puppeteer browser with optimized configuration for scraping
 * @returns {Promise<Browser>} Puppeteer browser instance
 */
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

/**
 * Configure page with optimized settings for scraping
 * @param {Page} page - Puppeteer page instance
 */
async function configurePage(page, browser) {
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setDefaultTimeout(30000)
  await page.setDefaultNavigationTimeout(30000)

  // Grant clipboard permissions
  const context = browser.defaultBrowserContext()
  await context.overridePermissions("https://global-docs.upbit.com", [
    "clipboard-read",
    "clipboard-write"
  ])

  // Enable request interception for performance optimization
  await page.setRequestInterception(true)
  page.on("request", request => {
    const resourceType = request.resourceType()
    if (["image", "stylesheet", "font", "media"].includes(resourceType)) {
      request.abort()
    } else {
      request.continue()
    }
  })
}

/**
 * Extract content from a single URL using Puppeteer
 * @param {Page} page - Puppeteer page instance
 * @param {string} url - URL to extract content from
 * @returns {Promise<string>} Extracted HTML content
 */
async function extractContent(page, url) {
  console.log(`🌐 Fetching content from: ${url}`)

  try {
    await page.goto(url, { waitUntil: "networkidle0" })

    // Wait for main content to load
    await page.waitForSelector('main, .main, #main, [role="main"]', {
      timeout: 10000
    })

    // Try to get raw content by simulating copy button functionality
    let rawContent = null
    try {
      // Wait a bit more for dynamic content to load
      await new Promise(resolve => setTimeout(resolve, 2000))

      rawContent = await page.evaluate(() => {
        // Find ALL copy buttons on the page
        const copyButtons = Array.from(
          document.querySelectorAll('button[aria-label="Copy to clipboard"]')
        )
          .concat(
            Array.from(
              document.querySelectorAll('button[class*="CopyToClipboard"]')
            )
          )
          .concat(
            Array.from(
              document.querySelectorAll(
                'button[class*="APIResponse-copyButton"]'
              )
            )
          )

        console.log(`Found ${copyButtons.length} copy buttons`)

        if (copyButtons.length > 0) {
          // Override clipboard API to capture what would be copied
          let capturedContents = []
          const originalWriteText = navigator.clipboard?.writeText

          if (originalWriteText) {
            navigator.clipboard.writeText = function (text) {
              if (text && text.trim().length > 10) {
                capturedContents.push(text.trim())
                console.log(
                  `Captured content ${capturedContents.length}: ${text.substring(0, 100)}...`
                )
              }
              return Promise.resolve()
            }

            // Click each copy button to capture their content
            copyButtons.forEach((button, index) => {
              console.log(`Clicking copy button ${index + 1}`)
              button.click()
            })

            // Wait for all copy operations to complete
            setTimeout(() => {
              navigator.clipboard.writeText = originalWriteText
            }, 500)

            if (capturedContents.length > 0) {
              // Combine all captured content with proper sections
              let result = []

              capturedContents.forEach((content, index) => {
                // Try to identify what type of content this is
                if (
                  content.includes("curl") ||
                  content.includes("request") ||
                  content.includes("const ")
                ) {
                  result.push(
                    `## Request Example\n\n\`\`\`javascript\n${content}\n\`\`\``
                  )
                } else if (
                  content.startsWith("{") ||
                  content.includes('"data"') ||
                  content.includes('"result"')
                ) {
                  result.push(
                    `## Response Example\n\n\`\`\`json\n${content}\n\`\`\``
                  )
                } else {
                  result.push(
                    `## Example ${index + 1}\n\n\`\`\`\n${content}\n\`\`\``
                  )
                }
              })

              return result.join("\n\n")
            }
          }

          // Fallback: Look for content near each button
          let allCapturedContent = []
          for (let i = 0; i < copyButtons.length; i++) {
            const copyButton = copyButtons[i]
            console.log(`Analyzing content near copy button ${i + 1}`)

            // Look for nearby code blocks
            const container =
              copyButton.closest(
                '[class*="response"], [class*="example"], [class*="code"]'
              ) ||
              copyButton.parentElement.querySelector("pre, code") ||
              copyButton.parentElement.closest("div").querySelector("pre, code")

            if (container) {
              const text = container.textContent || container.innerText
              if (text && text.trim().length > 50) {
                console.log(
                  `Found content near button ${i + 1}: ${text.substring(0, 100)}...`
                )
                if (text.startsWith("{") || text.includes('"data"')) {
                  allCapturedContent.push(
                    `## Response Example\n\n\`\`\`json\n${text.trim()}\n\`\`\``
                  )
                } else {
                  allCapturedContent.push(
                    `## Request Example\n\n\`\`\`javascript\n${text.trim()}\n\`\`\``
                  )
                }
              }
            }
          }

          if (allCapturedContent.length > 0) {
            return allCapturedContent.join("\n\n")
          }
        }

        return null
      })

      if (rawContent && rawContent.trim().length > 100) {
        console.log(
          `✅ Successfully extracted content from multiple copy buttons (${rawContent.length} chars)`
        )
        return rawContent
      } else {
        console.log(
          `⚠️ Multiple copy button approach yielded limited content: ${rawContent?.length || 0} chars`
        )
      }
    } catch (error) {
      console.log(`❌ Copy button extraction failed: ${error.message}`)
    }

    // Extract the main content using HTML scraping
    const content = await page.evaluate(() => {
      // Try to find the main content area
      const selectors = [
        "main",
        ".main-content",
        ".content",
        "#main",
        '[role="main"]',
        ".docs-content",
        ".reference-content"
      ]

      let mainElement = null
      for (const selector of selectors) {
        mainElement = document.querySelector(selector)
        if (mainElement) break
      }

      // If no main element found, use body but exclude navigation and headers
      if (!mainElement) {
        mainElement = document.body
      }

      // Clone the element to avoid modifying the original page
      const clonedElement = mainElement.cloneNode(true)

      // Remove unwanted elements from the cloned content
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
          "[data-nav]",
          '[class*="nav"]',
          '[class*="menu"]',
          '[class*="sidebar"]',
          ".api-navigation",
          ".docs-navigation",
          ".reference-navigation",
          "script",
          "style",
          "noscript"
        ].join(", ")
      )

      elementsToRemove.forEach(el => el.remove())

      // Basic cleanup - just remove navigation and unwanted elements
      // Keep most content intact for better extraction

      // Also remove any lists that seem to be navigation (containing many links)
      const lists = clonedElement.querySelectorAll("ul, ol")
      lists.forEach(list => {
        const links = list.querySelectorAll("a")
        const listItems = list.querySelectorAll("li")
        // If more than 70% of list items contain links, it's likely navigation
        if (links.length > 5 && links.length / listItems.length > 0.7) {
          list.remove()
        }
      })

      return clonedElement ? clonedElement.innerHTML : ""
    })

    return content
  } catch (error) {
    console.error(`Error extracting content from ${url}:`, error)
    throw error
  }
}

/**
 * Extract content using simple fetch for changelog-style pages
 * @param {string} url - URL to fetch
 * @returns {Promise<string>} HTML content
 */
async function getChangelogHTML(url) {
  console.log(`🌐 Fetching changelog from: ${url}`)

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
      }
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`
      )
    }

    const html = await response.text()

    if (!html || html.trim() === "") {
      throw new Error(`Empty content received from ${url}`)
    }

    // Use JSDOM to extract the main content
    const dom = new JSDOM(html)
    const mainContent = dom.window.document.querySelector("main")

    if (!mainContent) {
      console.warn("Main content not found, using body instead")
      return dom.window.document.body.innerHTML
    }

    return mainContent.innerHTML
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error)
    throw error
  }
}

/**
 * Process API documentation extraction for endpoint-based configs
 * @param {Object} config - Configuration object
 * @param {TurndownService} turndownService - Turndown service instance
 */
async function processApiDocumentation(config, turndownService) {
  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page, browser)

    const { section, title, endpoints, outputConfig } = config
    const { docsDir, subDir } = outputConfig

    // Create output directory
    const outputDir = path.resolve(path.join(__dirname, "..", docsDir, subDir))
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    console.log(`📂 Processing ${title} (${endpoints.length} endpoints)`)

    for (const endpoint of endpoints) {
      const startTime = Date.now()

      try {
        // Extract content using Puppeteer
        const htmlContent = await extractContent(page, endpoint.url)

        if (!htmlContent || htmlContent.trim() === "") {
          console.warn(`⚠️ No content extracted from ${endpoint.url}`)
          continue
        }

        // Convert to markdown
        const markdown = turndownService.turndown(htmlContent)

        // Add source reference
        const finalMarkdown = `# ${endpoint.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\n\n${markdown}\n\n> **Source:** [${endpoint.name}](${endpoint.url})\n`

        // Save to file
        const outputPath = path.join(outputDir, endpoint.filename)
        fs.writeFileSync(outputPath, finalMarkdown)

        // Format the markdown
        await formatMarkdown(outputPath)

        const endTime = Date.now()
        console.log(
          `✅ ${endpoint.name} (${((endTime - startTime) / 1000).toFixed(2)}s)`
        )

        // Polite delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`❌ Error processing ${endpoint.name}:`, error)
        // Continue with next endpoint rather than failing completely
      }
    }
  } finally {
    await browser.close()
  }
}

/**
 * Process changelog-style extraction for simple configs
 * @param {Object} config - Configuration object
 * @param {TurndownService} turndownService - Turndown service instance
 */
async function processChangelog(config, turndownService) {
  const { urls, outputConfig, title } = config
  const { docsDir, outputFileName } = outputConfig

  // Create docs directory if it doesn't exist
  const outputDir = path.resolve(path.join(__dirname, "..", docsDir))
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  let combinedMarkdown = ""

  // Add title if provided
  if (title) {
    console.log(`📝 Adding title: ${title}`)
    combinedMarkdown += `# ${title}\n\n`
  }

  // Process each URL
  for (const url of urls) {
    const startTime = Date.now()

    // Fetch and process HTML content
    const html = await getChangelogHTML(url)

    // Create DOM from HTML to process content
    const dom = new JSDOM(`<div>${html}</div>`)

    // Convert HTML to Markdown
    const markdown = turndownService.turndown(
      dom.window.document.body.innerHTML
    )

    // Add source reference
    combinedMarkdown += `${markdown}\n\n> **Source:** [Upbit Changelog](${url})\n\n`

    const endTime = Date.now()
    console.log(`⏱️ Processing time: ${(endTime - startTime) / 1000} seconds`)
  }

  // Save the combined markdown to file
  const outputPath = path.join(outputDir, outputFileName)
  fs.writeFileSync(outputPath, combinedMarkdown)

  // Format the markdown file
  await formatMarkdown(outputPath)
  console.log(`✅ Successfully generated and formatted: ${outputPath}`)
  console.log(`📦 Size: ${(combinedMarkdown.length / 1024).toFixed(2)} KB`)
}

async function main() {
  try {
    console.log(`🚀 Starting Upbit documentation extraction...`)

    // Get configuration
    const config = getConfig()

    // Setup Turndown
    const turndownService = configureTurndown()

    // Determine processing method based on config structure
    if (config.endpoints && Array.isArray(config.endpoints)) {
      // API documentation extraction
      await processApiDocumentation(config, turndownService)
    } else if (config.urls && Array.isArray(config.urls)) {
      // Changelog-style extraction
      await processChangelog(config, turndownService)
    } else {
      throw new Error(
        'Invalid configuration format. Expected either "endpoints" or "urls" array.'
      )
    }

    console.log(`🎉 Extraction completed successfully!`)
  } catch (error) {
    console.error("❌ Error in main process:", error)
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
