/**
 * BingX Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from BingX API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://bingx-api.github.io/docs/"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bingx/endpoints")

// URLs for different API sections
const ENDPOINT_URLS = [
  // Spot APIs
  `${BASE_URL}#/en-us/spot/trade-api.html`,
  `${BASE_URL}#/en-us/spot/account-api.html`,
  `${BASE_URL}#/en-us/spot/wallet-api.html`,
  // USDT Futures
  `${BASE_URL}#/en-us/swapV2/market-api.html`,
  `${BASE_URL}#/en-us/swapV2/trade-api.html`,
  `${BASE_URL}#/en-us/swapV2/account-api.html`,
  // Coin Futures
  `${BASE_URL}#/en-us/cswap/market-api.html`,
  `${BASE_URL}#/en-us/cswap/trade-api.html`,
  // Standard Futures
  `${BASE_URL}#/en-us/standard/contract-api.html`,
  // Account & Wallet
  `${BASE_URL}#/en-us/common/account-api.html`,
  `${BASE_URL}#/en-us/common/wallet-api.html`
]

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
 * Generate filename from HTTP method and endpoint path
 */
const generateFilename = (method, path) => {
  const methodLower = method.toLowerCase()
  const pathPart = sanitizeFilename(path.replace(/^\//, "").replace(/\//g, "_"))
  return `${methodLower}_${pathPart}.md`
}

/**
 * Process H2 section and extract endpoint details
 * This function is based on the existing BingX extraction logic in index.js
 */
const processH2Section = async (sectionElement, sourceUrl) => {
  return await sectionElement.evaluate(async (section, url) => {
    // Helper to process tables
    const processTable = container => {
      if (!container) return null

      const tables = container.querySelectorAll("table")
      if (tables.length < 2) return null

      const headerTable = tables[0].cloneNode(true)
      const bodyTable = tables[1].cloneNode(true)
      const thead = headerTable.querySelector("thead")
      const tbody = bodyTable.querySelector("tbody")

      if (!thead || !tbody) return null

      bodyTable.insertBefore(thead, tbody)
      headerTable.remove()

      // Clean up table attributes
      const colgroup = bodyTable.querySelector("colgroup")
      if (colgroup) colgroup.remove()

      const rows = bodyTable.querySelectorAll("tr")
      rows.forEach(row => {
        row.querySelectorAll("td, th").forEach(cell => {
          cell.removeAttribute("class")
          cell.removeAttribute("style")
          cell.removeAttribute("data-v-")
          cell.removeAttribute("rowspan")
          cell.removeAttribute("colspan")
        })
        row.removeAttribute("class")
        row.removeAttribute("style")
        row.removeAttribute("data-v-")
      })

      tbody.removeAttribute("class")
      tbody.removeAttribute("style")
      tbody.removeAttribute("data-v-")

      bodyTable.removeAttribute("class")
      bodyTable.removeAttribute("style")
      bodyTable.removeAttribute("data-v-")
      bodyTable.removeAttribute("cellspacing")
      bodyTable.removeAttribute("cellpadding")

      // Check if first column needs to be removed (arrow indicators)
      let removeFirstColumn = false
      const bodyRows = tbody.querySelectorAll("tr")
      bodyRows.forEach(row => {
        const firstCell = row.querySelector("td")
        if (
          firstCell &&
          firstCell.innerHTML.includes(
            '<i class="el-icon el-icon-arrow-right"></i>'
          )
        ) {
          removeFirstColumn = true
        }
      })

      if (removeFirstColumn) {
        const bodyHead = bodyTable.querySelector("thead")
        if (bodyHead) {
          const headerRow = bodyHead.querySelector("tr")
          if (headerRow) {
            const firstHeaderCell = headerRow.querySelector("th")
            if (firstHeaderCell) firstHeaderCell.remove()
          }
        }

        bodyRows.forEach(row => {
          const firstCell = row.querySelector("td")
          if (
            firstCell &&
            firstCell.innerHTML.includes(
              '<i class="el-icon el-icon-arrow-right"></i>'
            )
          ) {
            firstCell.remove()
          }
        })
      }

      // Clean up cell content
      bodyTable.querySelectorAll("tr").forEach(row => {
        row.querySelectorAll("td").forEach(cell => {
          cell.querySelectorAll("span.el-link--inner").forEach(span => {
            span.innerHTML = ""
          })
          cell.innerHTML = cell.textContent.trim()
        })
        row.querySelectorAll("th").forEach(cell => {
          if (cell.textContent.trim() === "description") {
            cell.innerHTML = "Description"
          } else {
            cell.innerHTML = cell.textContent.trim()
          }
        })
      })

      return bodyTable
    }

    // Create output container
    const detailDiv = document.createElement("div")

    // Extract heading
    const heading = section.querySelector("h2")
    if (heading) {
      const h2 = document.createElement("h2")
      h2.textContent = heading.textContent.trim()
      detailDiv.appendChild(h2)
      heading.remove()
    }

    // Extract HTTP method and path
    section.querySelectorAll("p.item-code-content").forEach(p => {
      if (
        p &&
        (p.textContent.trim().startsWith("POST") ||
          p.textContent.trim().startsWith("GET"))
      ) {
        const methodPath = document.createElement("p")
        methodPath.textContent = p.textContent.trim()
        detailDiv.appendChild(methodPath)
        p.remove()
      }
    })

    // Extract rate limiting info
    section.querySelectorAll("div").forEach(div => {
      const buttonChild = Array.from(div.children).find(
        child => child.tagName === "BUTTON"
      )
      if (
        buttonChild &&
        div.textContent.trim().startsWith("rate limitation by UID")
      ) {
        const rateLimitText = document.createElement("p")
        rateLimitText.textContent = div.textContent.trim()
        detailDiv.appendChild(rateLimitText)
        div.remove()
      }

      const aLink = Array.from(div.children).find(
        child => child.tagName === "A"
      )
      if (aLink && div.textContent.trim().startsWith("API KEY permission")) {
        const authText = document.createElement("p")
        authText.textContent = div.textContent.trim()
        detailDiv.appendChild(authText)
        div.remove()
      }
    })

    // Extract content-type
    section.querySelectorAll("label").forEach(label => {
      if (label && label.textContent.trim() === "Content-Type:") {
        const nextLabel = label.nextElementSibling
        if (nextLabel) {
          nextLabel.querySelectorAll("button").forEach(button => {
            if (button && button.textContent.trim().startsWith("Form")) {
              button.remove()
            }
          })

          const contentTypeText = document.createElement("p")
          contentTypeText.textContent =
            label.textContent.trim() + nextLabel.textContent.trim()
          detailDiv.appendChild(contentTypeText)

          nextLabel.remove()
          label.remove()
        }
      }
    })

    // Add description section
    const contentDiv = section.querySelector(".el-collapse-item__content")
    if (contentDiv) {
      const descriptionTitle = document.createElement("h3")
      descriptionTitle.textContent = "Description"
      detailDiv.appendChild(descriptionTitle)
      detailDiv.appendChild(contentDiv)
    }

    // Process request parameters tab
    const requestTab = section.querySelector("#tab-request")
    if (requestTab) {
      requestTab.click()
      await new Promise(resolve => setTimeout(resolve, 100))

      const requestPanel = section.querySelector("#pane-request")
      if (requestPanel) {
        const h3 = document.createElement("h3")
        h3.textContent = "Request Parameters"
        detailDiv.appendChild(h3)

        const table = processTable(requestPanel)
        if (table) detailDiv.appendChild(table)
      }
    }

    // Process response parameters tab
    const responseTab = section.querySelector("#tab-response")
    if (responseTab) {
      responseTab.click()
      await new Promise(resolve => setTimeout(resolve, 100))

      const responsePanel = section.querySelector("#pane-response")
      if (responsePanel) {
        const h3 = document.createElement("h3")
        h3.textContent = "Response Parameters"
        detailDiv.appendChild(h3)

        const table = processTable(responsePanel)
        if (table) detailDiv.appendChild(table)
      }
    }

    // Add source link
    const sourceDiv = document.createElement("div")
    sourceDiv.innerHTML = `<blockquote><p><strong>Source:</strong> <a href="${url}">${url}</a></p></blockquote>`
    detailDiv.appendChild(sourceDiv)

    return detailDiv.innerHTML
  }, sourceUrl)
}

/**
 * Extract all endpoints from a URL
 */
const extractEndpointsFromUrl = async (page, url, turndownService) => {
  console.log(`\n🌐 Processing URL: ${url}`)

  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 30000
  })

  await page.waitForSelector(".app-content", { timeout: 10000 })

  // Find all H2 sections (endpoints)
  const sections = await page.$$(".app-content h2")
  console.log(`  Found ${sections.length} potential endpoints`)

  const endpoints = []

  for (const sectionHeading of sections) {
    try {
      // Get the section container
      const sectionContainer = await page.evaluateHandle(h2 => {
        // Find the parent that contains this H2 and all its content
        let parent = h2.parentElement
        while (parent && !parent.classList.contains("section-container")) {
          parent = parent.parentElement
        }
        return parent || h2.parentElement
      }, sectionHeading)

      // Extract the HTML for this section
      const html = await processH2Section(sectionContainer, url)
      const markdown = turndownService.turndown(html)

      // Parse the markdown to extract endpoint info
      const lines = markdown.split("\n")
      let method = null
      let endpointPath = null
      let isPublic = false

      for (const line of lines) {
        const trimmed = line.trim()

        // Extract HTTP method and path
        if (
          !method &&
          (trimmed.startsWith("GET ") ||
            trimmed.startsWith("POST ") ||
            trimmed.startsWith("PUT ") ||
            trimmed.startsWith("DELETE "))
        ) {
          const parts = trimmed.split(" ")
          method = parts[0]
          endpointPath = parts[1] || ""
        }

        // Check if endpoint is public
        if (
          trimmed.includes("API KEY permission") &&
          trimmed.includes("No API KEY signature required")
        ) {
          isPublic = true
        }
      }

      if (method && endpointPath) {
        endpoints.push({
          method,
          path: endpointPath,
          markdown,
          isPublic
        })
      }
    } catch (error) {
      console.warn(`  ⚠️  Error processing section:`, error.message)
    }
  }

  return endpoints
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting BingX endpoint documentation extraction...")
  console.log(`📍 Source: ${BASE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page)

    const turndownService = createTurndownBuilder().build()

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    let allEndpoints = []

    // Extract endpoints from each URL
    for (const url of ENDPOINT_URLS) {
      const endpoints = await extractEndpointsFromUrl(
        page,
        url,
        turndownService
      )
      allEndpoints = allEndpoints.concat(endpoints)
    }

    console.log(`\n📊 Extracted ${allEndpoints.length} total endpoints`)

    // Process and save endpoints
    let publicCount = 0
    let privateCount = 0
    const filenameConflicts = new Map()

    for (const endpoint of allEndpoints) {
      const { method, path: endpointPath, markdown, isPublic } = endpoint

      const filename = generateFilename(method, endpointPath)
      const folder = isPublic ? "public" : "private"
      const targetDir = path.join(OUTPUT_DIR, folder)

      // Handle filename conflicts
      let finalFilename = filename
      let counter = 1
      const conflictKey = `${folder}:${filename}`

      if (filenameConflicts.has(conflictKey)) {
        const baseName = filename.replace(/\.md$/, "")
        finalFilename = `${baseName}_${counter}.md`
        while (
          fs.existsSync(path.join(targetDir, finalFilename)) ||
          filenameConflicts.has(`${folder}:${finalFilename}`)
        ) {
          counter++
          finalFilename = `${baseName}_${counter}.md`
        }
      }

      filenameConflicts.set(`${folder}:${finalFilename}`, true)

      const outputPath = path.join(targetDir, finalFilename)

      // Add standard header to markdown
      const header =
        `# ${method} ${endpointPath}\n\n` +
        `**Source:** [${endpointPath}](${BASE_URL})\n\n` +
        `## Authentication\n\n` +
        `${isPublic ? "Not Required (Public Endpoint)" : "Required (Private Endpoint)"}\n\n`

      let finalMarkdown = markdown
      if (!markdown.startsWith("# ")) {
        finalMarkdown = header + markdown
      }

      // Write file
      writeFile(outputPath, finalMarkdown)
      await formatMarkdown(outputPath)

      if (isPublic) {
        publicCount++
        console.log(
          `  📄 Public:  ${method} ${endpointPath} → ${finalFilename}`
        )
      } else {
        privateCount++
        console.log(
          `  🔒 Private: ${method} ${endpointPath} → ${finalFilename}`
        )
      }
    }

    console.log(
      `\n✅ Endpoint documentation extraction completed successfully!`
    )
    console.log(`📁 Files written to: ${OUTPUT_DIR}`)
    console.log(`   - Public endpoints: ${publicCount}`)
    console.log(`   - Private endpoints: ${privateCount}`)
  } finally {
    await browser.close()
  }
}

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("❌ Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}

export { main }
