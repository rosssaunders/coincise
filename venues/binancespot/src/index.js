// Simplified Binance Spot extraction script
"use strict"

import fs from "fs"
import path from "path"
import process from "process"
import { fileURLToPath } from "url"
import { JSDOM } from "jsdom"
import { getPage, politeDelay, launchBrowser } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"
import { formatMarkdown } from "../../shared/format-markdown.js"
import { buildLlmsContent, writeLlmsTxt, makeLink } from "../../shared/llms.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONFIG_PATH = process.argv[2] ? path.resolve(process.argv[2]) : null
const DOCS_ROOT = path.resolve(__dirname, "../../../docs")
const BASE_URL = "https://developers.binance.com/docs"

/**
 * Configure Turndown for HTML to Markdown conversion
 * @returns {TurndownService} Configured Turndown service
 */
function configureTurndown() {
  return createTurndownBuilder().withTablesWithoutHeaders().build()
}

// Setup Turndown (legacy mode only uses this)
const turndownService = configureTurndown()

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function listConfigFiles() {
  const configDir = path.resolve(__dirname, "../config")
  return fs
    .readdirSync(configDir)
    .filter(f => f.endsWith(".json"))
    .map(f => path.join(configDir, f))
}

async function generateLlms() {
  const files = listConfigFiles()
  const links = []
  const changelogLinks = []
  let outputDir = path.join(DOCS_ROOT, "binance/spot")

  for (const fp of files) {
    try {
      const cfg = readJson(fp)
      if (cfg.output_file) {
        outputDir = path.join(DOCS_ROOT, path.dirname(cfg.output_file))
      }
      const title = cfg.title || path.basename(fp, ".json")
      const firstEndpoint =
        Array.isArray(cfg.endpoints) && cfg.endpoints.length
          ? cfg.endpoints[0]
          : "binance-spot-api-docs"
      const url = `${BASE_URL}/${firstEndpoint}`
      const link = makeLink(title, url)
      const lower = title.toLowerCase()
      if (lower.includes("change")) {
        changelogLinks.push(link)
      } else {
        links.push(link)
      }
    } catch (error) {
      console.error("Error processing config for llms:", fp)
      console.error("Error:", error)
      console.error("Stack trace:", error.stack)
    }
  }

  // Deduplicate by URL
  const dedupe = arr => {
    const seen = new Set()
    return arr.filter(l => {
      if (seen.has(l.url)) return false
      seen.add(l.url)
      return true
    })
  }

  const docLinks = dedupe(links).sort((a, b) => a.name.localeCompare(b.name))
  const changelog = dedupe(changelogLinks).sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  const title = "Binance Spot"
  const summary = "Curated links to official Binance Spot API documentation."
  const sections = []
  if (docLinks.length)
    sections.push({ title: "Documentation", links: docLinks })
  if (changelog.length) sections.push({ title: "Changelogs", links: changelog })

  const content = buildLlmsContent(title, summary, sections)
  writeLlmsTxt(outputDir, content)
}

/**
 * Inserts a separator element (e.g., <hr>) between adjacent <table> elements in the document.
 * @param {Document} document - The JSDOM document object.
 */
const insertTableSeparators = document => {
  const tables = Array.from(document.querySelectorAll("table"))
  for (let i = 0; i < tables.length - 1; i++) {
    const currentTable = tables[i]
    const nextTable = tables[i].nextElementSibling
    if (nextTable && nextTable.tagName === "TABLE") {
      const hr = document.createElement("br")
      currentTable.parentNode.insertBefore(hr, nextTable)
      const hr2 = document.createElement("br")
      currentTable.parentNode.insertBefore(hr2, nextTable)
    }
  }
}

/*
<table><thead><tr><th>Status</th><th>Description</th></tr></thead><tbody><tr><td><code>GTC</code></td><td>Good Til Canceled <br> An order will be on the book unless the order is canceled.</td></tr><tr><td><code>IOC</code></td><td>Immediate Or Cancel <br> An order will try to fill the order as much as it can before the order expires.</td></tr><tr><td><code>FOK</code></td><td>Fill or Kill <br> An order will expire if the full order cannot be filled upon execution.</td></tr></tbody></table>
*/
function removeBRFromTDsAndReplaceWithDash(document) {
  const tds = document.querySelectorAll("td")
  for (const td of tds) {
    const brs = td.querySelectorAll("br")
    for (const br of brs) {
      br.parentNode.removeChild(br)
    }
    const text = td.innerHTML.trim()
    if (text !== "") {
      td.innerHTML = "-" + text
    }
  }
}

/**
 * Finds error code definitions (h3 followed by ul) within a JSDOM document,
 * converts them into an HTML table, and replaces the original elements.
 *
 * @param {Document} document The JSDOM document object.
 */
function convertErrorCodesToHtmlTable(document) {
  // Find the H1 heading that indicates the start of the error codes section
  const errorHeading = Array.from(document.querySelectorAll("h1")).find(
    h1 => h1.textContent.toLowerCase().trim().startsWith("error codes") // More robust check
  )

  if (!errorHeading) {
    return // No error codes section found
  }

  let errors = []
  const elementsToRemove = []
  let firstH2AfterErrorHeading = null // To find insertion point

  // Start searching for errors from the element *after* the H1 heading
  let currentElement = errorHeading.nextElementSibling

  while (currentElement) {
    // Stop if we hit another H1 or a non-relevant section
    if (currentElement.tagName === "H1") {
      break
    }

    // Find the first H2 after the H1, this marks the start of categories
    if (!firstH2AfterErrorHeading && currentElement.tagName === "H2") {
      firstH2AfterErrorHeading = currentElement
    }

    // Check if the current element is an H3 and the next is a UL
    if (
      currentElement.tagName === "H3" &&
      currentElement.nextElementSibling &&
      currentElement.nextElementSibling.tagName === "UL"
    ) {
      const h3 = currentElement
      const ul = h3.nextElementSibling

      // Clean H3 text content (remove potential anchor links inside)
      const h3TextContent = h3.textContent.trim()
      const parts = h3TextContent.split(" ")

      // Expecting format like "-1000 UNKNOWN" or similar
      if (parts.length >= 2) {
        const code = parts[0].replace(/^-/, "") // Remove leading '-'
        const name = parts.slice(1).join(" ") // Join remaining parts for name

        let descriptions = []
        const liElements = ul.querySelectorAll("li")
        const addDash = liElements.length > 1
        for (const li of liElements) {
          descriptions.push((addDash ? " - " : "") + li.innerHTML.trim())
        }

        errors.push({
          code: code,
          name: name,
          descriptions: descriptions.join("\n")
        })

        // Mark H3 and UL for removal
        elementsToRemove.push(h3)
        elementsToRemove.push(ul)

        // Move to the element after the UL
        currentElement = ul.nextElementSibling
        continue // Skip the standard increment at the end of the loop
      } else {
        console.warn(`Skipping H3 with unexpected format: ${h3TextContent}`)
      }
    }
    // Move to the next sibling
    currentElement = currentElement.nextElementSibling
  }

  if (errors.length === 0) {
    console.log("No error code definitions (H3 followed by UL) found after H1.")
    return // No errors found to convert
  }

  // Build the HTML table element
  const table = document.createElement("table")
  const thead = table.createTHead()
  const headerRow = thead.insertRow()
  ;["Code", "Name", "Description"].forEach(text => {
    const th = document.createElement("th")
    th.textContent = text
    headerRow.appendChild(th)
  })

  const tbody = table.createTBody()
  errors.forEach(error => {
    const row = tbody.insertRow()
    const cellCode = row.insertCell()
    cellCode.textContent = error.code
    const cellName = row.insertCell()
    cellName.textContent = error.name
    const cellDesc = row.insertCell()
    cellDesc.innerHTML = error.descriptions // Use innerHTML for descriptions
  })

  // Remove the original H3 and UL elements
  elementsToRemove.forEach(el => {
    // Check if parentNode exists before attempting removal
    if (el.parentNode) {
      el.parentNode.removeChild(el)
    } else {
      console.warn("Attempted to remove an element with no parentNode:", el)
    }
  })

  // Insert the table.
  // If we found an H2 category heading, insert before it.
  // Otherwise, insert it after the H1 heading's parent (or adjust as needed).
  const insertionPoint = firstH2AfterErrorHeading || null // Insert before first H2 if found
  const parent = errorHeading.parentNode

  if (!parent) {
    console.error(
      "Could not find parent node of the H1 Error Heading to insert table."
    )
    return
  }

  if (insertionPoint) {
    parent.insertBefore(table, insertionPoint)
    console.log("Error codes processed.")
  } else {
    // Fallback: Insert after the H1 heading if no H2 was found after it.
    // This assumes the H1 is directly within the container where the table should go.
    parent.insertBefore(table, errorHeading.nextSibling)
    console.warn(
      "No H2 category heading found after H1. Inserting table directly after H1 heading."
    )
  }
}

// Function to adjust heading levels down by one
function adjustHeadingLevels(document) {
  // Helper function to clean heading content by removing anchor links
  const cleanHeadingContent = element => {
    // Remove any anchor tags that might be inside the heading
    const anchors = element.querySelectorAll("a")
    for (const anchor of anchors) {
      // If it's a hash link or empty link, just remove it entirely
      if (
        anchor.getAttribute("href")?.includes("#") ||
        anchor.classList.contains("hash-link") ||
        anchor.textContent.trim() === "" ||
        anchor.textContent === "\u200B" // Zero-width space
      ) {
        anchor.parentNode.removeChild(anchor)
      } else {
        // Otherwise, keep the text content but remove the anchor tag
        const text = anchor.textContent
        const textNode = document.createTextNode(text)
        anchor.parentNode.replaceChild(textNode, anchor)
      }
    }
    return element.innerHTML
  }

  // Process headings from highest to lowest to avoid duplicate processing
  // h5 -> h6
  const h5Elements = document.querySelectorAll("h5")
  for (const h5 of h5Elements) {
    const h6 = document.createElement("h6")
    h6.innerHTML = cleanHeadingContent(h5)
    h5.parentNode.replaceChild(h6, h5)
  }

  // h4 -> h5
  const h4Elements = document.querySelectorAll("h4")
  for (const h4 of h4Elements) {
    const h5 = document.createElement("h5")
    h5.innerHTML = cleanHeadingContent(h4)
    h4.parentNode.replaceChild(h5, h4)
  }

  // h3 -> h4
  const h3Elements = document.querySelectorAll("h3")
  for (const h3 of h3Elements) {
    const h4 = document.createElement("h4")
    h4.innerHTML = cleanHeadingContent(h3)
    h3.parentNode.replaceChild(h4, h3)
  }

  // h2 -> h3
  const h2Elements = document.querySelectorAll("h2")
  for (const h2 of h2Elements) {
    const h3 = document.createElement("h3")
    h3.innerHTML = cleanHeadingContent(h2)
    h2.parentNode.replaceChild(h3, h2)
  }

  // h1 -> h2
  const h1Elements = document.querySelectorAll("h1")
  for (const h1 of h1Elements) {
    const h2 = document.createElement("h2")
    h2.innerHTML = cleanHeadingContent(h1)
    h1.parentNode.replaceChild(h2, h1)
  }
}

async function processAll() {
  if (!CONFIG_PATH) {
    throw new Error(
      "Config file path must be specified for legacy markdown generation"
    )
  }
  const config = readJson(CONFIG_PATH)
  const { endpoints, output_file, title } = config
  let content = `# ${title}\n\n`
  let browser = null

  try {
    browser = await launchBrowser()

    for (const endpoint of endpoints) {
      const url = `${BASE_URL}/${endpoint}`
      console.log(`Fetching: ${url}`)

      const page = await getPage(url, {
        selector: ".theme-doc-markdown.markdown",
        timeout: 30000,
        browser
      })

      // Extract the page content
      const html = await page.evaluate(async sel => {
        const el = document.querySelector(sel)
        if (!el) {
          window.puppeteerError(`Selector '${sel}' not found on page.`)
          return document.body.innerHTML // Or throw an error
        }

        // Find all code block containers where class starts with 'codeBlock'
        const codeBlockContainers = Array.from(
          el.querySelectorAll("div")
        ).filter(div =>
          Array.from(div.classList).some(cls =>
            cls.startsWith("codeBlockContainer")
          )
        )

        for (const container of codeBlockContainers) {
          // Find the code element and the copy button within the container
          const codeElement = container.querySelector("pre code")
          if (codeElement) {
            // If the code block uses .token-line spans, join them with newlines
            const tokenLines = codeElement.querySelectorAll(".token-line")
            let codeText
            if (tokenLines.length > 0) {
              codeText = Array.from(tokenLines)
                .map(line => line.textContent)
                .join("\n")
            } else {
              codeText = codeElement.textContent
            }
            codeElement.textContent = codeText

            // workout what language it is
            // <div class="language-shell">
            // <div class="language-javascript">
            const classList = container.className.split(" ")
            const languageClass = classList.find(cls =>
              cls.startsWith("language-")
            )

            // split the class name to get the language
            const language = languageClass ? languageClass.split("-")[1] : null

            // if language is not found, check the code text
            // and set it to JSON if it looks like JSON
            if (language) {
              if (language === "bash") {
                codeElement.className = "language-bash"
              } else if (language === "console" || language === "shell") {
                codeElement.className = "language-shell"
              } else if (language === "json") {
                codeElement.className = "language-json"
              } else if (language === "javascript") {
                if (
                  codeText.trim().startsWith("{") ||
                  codeText.trim().startsWith("[")
                ) {
                  codeElement.className = "language-json"
                } else {
                  codeElement.className = "language-javascript"
                }
              } else {
                window.puppeteerLog(`Language '${language}`)
                codeElement.className = `language-${language}`
              }
            } else {
              window.puppeteerLog(`Language '${language}'`)
              codeElement.className = `language-${language}`
            }
          }
        }

        return el.innerHTML
      }, ".theme-doc-markdown.markdown")

      const dom = new JSDOM(html)
      const document = dom.window.document

      // Convert error codes section to table BEFORE adjusting headings
      convertErrorCodesToHtmlTable(document)

      // in the source HTML, tables are stacked without a seperator. write a function that
      // uses the JSDOM to detect when table elements are next to each other and add a seperator
      insertTableSeparators(document)

      // Adjust heading levels down by one
      adjustHeadingLevels(document)

      removeBRFromTDsAndReplaceWithDash(document)

      const cleanedHtml = dom.serialize()

      // Convert to markdown
      const md = turndownService.turndown(cleanedHtml)

      // Add source URL link at the beginning of the section
      const sourceLink = `> Source: [${url}](${url})\n\n`

      if (md) content += md + "\n\n" + sourceLink
      await politeDelay(1000) // polite delay
    }

    const outPath = path.join(DOCS_ROOT, output_file)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, content)
    formatMarkdown(outPath)
    console.log(`Wrote: ${outPath}`)

    // Format the output file
    await formatMarkdown(outPath)
    console.log(`Formatted: ${outPath}`)
  } finally {
    if (browser) await browser.close().catch(console.error)
  }
}

async function main() {
  // Always generate links-only llms.txt
  await generateLlms()
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
