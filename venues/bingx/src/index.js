import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import TurndownService from "turndown"
import { gfm, tables, strikethrough } from "turndown-plugin-gfm"
import fs from "fs"
import { getConfig } from "./config.js"
import process from "process"
import { formatMarkdown } from "../../shared/format-markdown.js"
import { JSDOM } from "jsdom"

async function loadBrowser() {
  // Only return the browser instance, not an object
  const browser = await launchBrowser()
  return browser
}

// Retry utility for handling transient network errors
async function retryOperation(operation, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    retryableErrors = [
      "ERR_CERT_VERIFIER_CHANGED",
      "ERR_CONNECTION_RESET",
      "ERR_CONNECTION_REFUSED",
      "ERR_NETWORK_CHANGED",
      "ERR_INTERNET_DISCONNECTED",
      "TimeoutError",
      "net::ERR"
    ]
  } = options

  let lastError
  let delay = initialDelay

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error

      // Check if this is a retryable error
      const isRetryable = retryableErrors.some(errType =>
        error.message?.includes(errType)
      )

      // If this is the last attempt or not a retryable error, throw
      if (attempt > maxRetries || !isRetryable) {
        throw error
      }

      console.warn(
        `\x1b[33m%s\x1b[0m`,
        `⚠️  Attempt ${attempt} failed: ${error.message}`
      )
      console.log(
        `\x1b[36m%s\x1b[0m`,
        `🔄 Retrying in ${delay}ms... (${attempt}/${maxRetries})`
      )

      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay))
      delay = Math.min(delay * backoffMultiplier, maxDelay)
    }
  }

  throw lastError
}

async function getPageHTML(pageURL, browser) {
  let page = null

  try {
    page = await browser.newPage()
    await configurePage(page)

    // Set a normal browser user-agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    )

    // Bypass CORS issues by intercepting requests that might fail
    await page.setRequestInterception(true)
    page.on("request", request => {
      // Add origin and referer headers to make requests look legitimate
      const headers = request.headers()
      headers["Origin"] = new URL(pageURL).origin
      headers["Referer"] = pageURL

      request.continue({ headers })
    })

    // Add console event listener
    page.on("console", msg => {
      if (
        msg.text() !== "JSHandle@object" &&
        !msg.text().startsWith("A preload for ") &&
        !msg.text().startsWith("The resource ")
      ) {
        console.log("Browser Console:", msg.text())
      }
    })

    // Set viewport to browser window size
    await page.setViewport({ width: 1400, height: 1200 })

    // Use retry logic for page navigation and waiting for content
    await retryOperation(async () => {
      await page.goto(pageURL, { waitUntil: "networkidle2" })
      await page.waitForSelector(".app-content")
    })
    const html = await page.evaluate(async sourceUrl => {
      async function processH2(sectionElement) {
        console.log(
          "Processing",
          sectionElement.querySelector("h2").textContent.trim()
        )

        // Create DIV to hold the details we want to keep
        const detailDiv = document.createElement("div")
        detailDiv.className = "convert-to-markdown"
        sectionElement.parentElement.insertBefore(
          detailDiv,
          sectionElement.nextSibling
        )

        // Copy the heading
        const heading = sectionElement.querySelector("h2")
        if (heading) {
          const headingText = document.createElement("h2")
          headingText.textContent = heading.textContent.trim()
          detailDiv.appendChild(headingText)
          heading.remove()
        }

        // Grab the URL
        sectionElement.querySelectorAll("p.item-code-content").forEach(p => {
          if (
            p &&
            (p.textContent.trim().startsWith("POST") ||
              p.textContent.trim().startsWith("GET"))
          ) {
            const urlText = document.createElement("p")
            urlText.textContent = p.textContent.trim()
            detailDiv.appendChild(urlText)
            p.remove()
          }
        })

        // Move the Rate Limiting info
        // <div><div style="font-weight: bold; margin-bottom: 9px;">
        //     rate limitation by UID: 5/s &amp; rate limitation by IP
        //     in group Number:
        //     <button type="button" class="el-button el-button--text"><!----><!----><span>3</span></button></div></div>
        sectionElement.querySelectorAll("div").forEach(div => {
          if (div) {
            const buttonChild = Array.from(div.children).find(
              child => child.tagName === "BUTTON"
            )
            if (buttonChild) {
              if (div.textContent.trim().startsWith("rate limitation by UID")) {
                const rateLimitText = document.createElement("p")
                rateLimitText.textContent = div.textContent.trim()
                detailDiv.appendChild(rateLimitText)
                div.remove()
              }
            }

            const aLink = Array.from(div.children).find(
              child => child.tagName === "A"
            )
            if (aLink) {
              if (div.textContent.trim().startsWith("API KEY permission")) {
                const rateLimitText = document.createElement("p")
                rateLimitText.textContent = div.textContent.trim()
                detailDiv.appendChild(rateLimitText)
                div.remove()
              }
            }
          }
        })

        // <label style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Sans Unicode&quot;, &quot;Lucida Grande&quot;, &quot;Lucida Sans&quot;, Arial, sans-serif;">Content-Type:</label>
        // <label><button disabled="disabled" type="button" class="el-button el-button--text is-disabled"><!----><!----><span>request
        //body(application/json)</span></button> <button type="button" class="el-button el-button--text"><!----><!----><span>Form</span></button></label>
        sectionElement.querySelectorAll("label").forEach(label => {
          if (label && label.textContent.trim() === "Content-Type:") {
            label.nextElementSibling
              .querySelectorAll("button")
              .forEach(button => {
                if (button && button.textContent.trim().startsWith("Form")) {
                  button.remove()
                }
              })

            const contentTypeText = document.createElement("p")
            contentTypeText.textContent =
              label.textContent.trim() +
              label.nextElementSibling.textContent.trim()
            detailDiv.appendChild(contentTypeText)

            label.nextElementSibling.remove()
            label.remove()
          }
        })

        // add a empty DIV for anycontent left at the end
        const emptyDiv = document.createElement("div")
        detailDiv.appendChild(emptyDiv)

        sectionElement.querySelectorAll("label").forEach(label => {
          if (label.textContent.trim() === "Sample code") {
            label.parentElement.remove()
          }
        })

        sectionElement.querySelectorAll("div.item-normal p").forEach(p => {
          if (p && p.textContent.trim() === "Key steps for using the API") {
            p.parentElement.nextElementSibling?.remove()
            p.parentElement.remove()
          }
        })

        const contentDiv = sectionElement.querySelector(
          ".el-collapse-item__content"
        )
        if (contentDiv) {
          const descriptionTitle = document.createElement("h3")
          descriptionTitle.textContent = "Description"
          detailDiv.appendChild(descriptionTitle)
          detailDiv.appendChild(contentDiv)

          const contentItem = sectionElement.querySelector(".content-item")
          if (contentItem) {
            contentItem.remove()
          }
        }

        function processTable(table) {
          if (!table) return

          const tables = table.querySelectorAll("table")
          console.log(`Found ${tables.length} tables in the Payload section`)
          if (tables.length >= 2) {
            const headerTable = tables[0].cloneNode(true)
            const bodyTable = tables[1].cloneNode(true)
            const thead = headerTable.querySelector("thead")
            const tbody = bodyTable.querySelector("tbody")

            if ((thead && tbody) === false) {
              console.log("No thead or tbody found")
              return
            }

            if (thead && tbody) {
              bodyTable.insertBefore(thead, tbody)
              headerTable.remove()
            }

            const colgroup = bodyTable.querySelector("colgroup")
            if (colgroup) {
              colgroup.remove()
            }

            const rows = bodyTable.querySelectorAll("tr")
            rows.forEach(row => {
              const datacells = row.querySelectorAll("td")
              datacells.forEach(cell => {
                cell.removeAttribute("class")
                cell.removeAttribute("style")
                cell.removeAttribute("data-v-")
                cell.removeAttribute("rowspan")
                cell.removeAttribute("colspan")
              })
              const headercells = row.querySelectorAll("th")
              headercells.forEach(cell => {
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

            let removeFirstColumn = false
            if (tbody) {
              const rows = tbody.querySelectorAll("tr")
              // Check if any first cell contains the specific HTML
              rows.forEach(row => {
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
                // Remove first header cell if it contains the icon in tbody cells
                const bodyHead = bodyTable.querySelector("thead")
                if (bodyHead) {
                  const headerRow = bodyHead.querySelector("tr")
                  if (headerRow) {
                    const firstHeaderCell = headerRow.querySelector("th")
                    if (firstHeaderCell) {
                      firstHeaderCell.remove()
                    }
                  }
                }

                // Remove the first cell from each tbody row if it contains the icon
                rows.forEach(row => {
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
            }

            const dataRows = bodyTable.querySelectorAll("tr")
            dataRows.forEach(row => {
              const datacells = row.querySelectorAll("td")
              datacells.forEach(cell => {
                const spans = cell.querySelectorAll("span.el-link--inner")
                spans.forEach(span => {
                  span.innerHTML = ""
                })
                cell.innerHTML = cell.textContent.trim()
              })
              const headercells = row.querySelectorAll("th")
              headercells.forEach(cell => {
                if (cell.textContent.trim() == "description") {
                  cell.innerHTML = "Description"
                } else {
                  cell.innerHTML = cell.textContent.trim()
                }
              })
            })

            return bodyTable
          }
        }

        async function processTableSection(tab, pane, header) {
          const tabElement = sectionElement.querySelector(tab)
          if (tabElement) {
            tabElement.click()
            await new Promise(resolve => setTimeout(resolve, 100))

            const panel = sectionElement.querySelector(pane)
            if (panel) {
              const h3 = document.createElement("h3")
              h3.textContent = header
              detailDiv.appendChild(h3)

              detailDiv.appendChild(processTable(panel))
            }

            panel.remove()
          }
        }

        await processTableSection(
          "#tab-request",
          "#pane-request",
          "Request Parameters"
        )
        await processTableSection(
          "#tab-response",
          "#pane-response",
          "Response Parameters"
        )
        await processTableSection("#tab-key1", "#pane-key1", "Data Parameters")
        await processTableSection("#tab-key2", "#pane-key2", "Order Parameters")
        await processTableSection(
          "#tab-response1",
          "#pane-response1",
          "Order Parameters"
        )

        const errorLabel = Array.from(
          sectionElement.querySelectorAll("label span")
        ).find(span => span.textContent.includes("errors"))

        if (errorLabel) {
          console.log("Found the errors section")
          const label = errorLabel.parentElement
          if (label) {
            label.click()

            await new Promise(resolve => setTimeout(resolve, 100))

            const section = label.parentElement.parentElement.parentElement

            const tablist = section.querySelector('[role="tablist"]')

            const errors = []
            const errorItems = tablist.querySelectorAll(".el-collapse-item")

            // Process error items sequentially
            for (const item of errorItems) {
              const button = item.querySelector('[role="button"]')
              if (button) {
                button.click()
                // Wait briefly for potential content to load
                await new Promise(resolve => setTimeout(resolve, 100))
              }

              const descriptionElement = item.querySelector(
                ".el-collapse-item__content"
              )

              if (descriptionElement) {
                const errorData = JSON.parse(
                  descriptionElement.textContent.trim()
                )
                const code = errorData.code
                const description = errorData.msg
                errors.push({ code: code, description })
              }
            }

            let html = "<table>\n"
            html += "  <thead>\n"
            html += "    <tr>\n"
            html += "      <th>Error Code</th>\n"
            html += "      <th>Description</th>\n"
            html += "    </tr>\n"
            html += "  </thead>\n"
            html += "  <tbody>\n"

            errors.forEach(error => {
              html += "    <tr>\n"
              html += `      <td>${error.code}</td>\n`
              html += `      <td>${error.description}</td>\n`
              html += "    </tr>\n"
            })

            html += "  </tbody>\n"
            html += "</table>"

            const h3 = document.createElement("h3")
            h3.textContent = "Errors"
            detailDiv.appendChild(h3)

            const errorCodeDiv = document.createElement("div")
            errorCodeDiv.innerHTML = html
            detailDiv.appendChild(errorCodeDiv)
          }
        }

        sectionElement
          .querySelectorAll('[role="radiogroup"]')
          .forEach(el => el.remove())

        sectionElement
          .querySelectorAll("div.el-tabs__header.is-top")
          .forEach(el => el.remove())

        sectionElement
          .querySelectorAll("div.item-demo-content")
          .forEach(el => el.remove())

        // Remove any remaining content-item divs that contain the "Key steps" numbered list
        sectionElement.querySelectorAll("div.content-item").forEach(div => {
          const text = div.textContent
          if (
            text.includes("1. Create Account") &&
            text.includes("2. Pass KYC/KYB") &&
            text.includes("3. Create API KEY")
          ) {
            console.log("Removing Key steps content-item from catch-all")
            div.remove()
          }
        })

        // Copy any remaining content to the empty placeholder div
        sectionElement.querySelectorAll("div.content-item").forEach(div => {
          console.log("Moving all remaining content to the catch all div")
          emptyDiv.appendChild(div)
        })

        // Add source link at the end of each endpoint section
        const sourceDiv = document.createElement("div")
        sourceDiv.innerHTML = `<blockquote><p><strong>Source:</strong> <a href="${sourceUrl}">${sourceUrl}</a></p></blockquote>`
        detailDiv.appendChild(sourceDiv)
      }

      const body = document.querySelector(".app-content")

      const h2Elements = body.querySelectorAll("h2")

      // Process each H2 and its content
      h2Elements.forEach((h2, index) => {
        // Create a container div for this section
        const sectionDiv = document.createElement("div")
        sectionDiv.className = "section-container"

        // Insert the new div right after the H2
        h2.parentNode.insertBefore(sectionDiv, h2.nextSibling)

        // Move the H2 into the new div
        sectionDiv.appendChild(h2)

        // Get the next H2 element (if any)
        const nextH2 = h2Elements[index + 1]

        // Move all elements between this H2 and the next H2 into the section div
        let currentElement = sectionDiv.nextSibling
        while (currentElement && currentElement !== nextH2) {
          const nextElement = currentElement.nextSibling
          sectionDiv.appendChild(currentElement)
          currentElement = nextElement
        }
      })

      // Process each section-container sequentially
      const sectionContainers = Array.from(
        body.querySelectorAll(".section-container")
      )
      for (const section of sectionContainers) {
        await processH2(section)
      }

      return body.innerHTML
    }, pageURL)

    return html
  } finally {
    if (page) {
      await page.close()
    }
  }
}

function convertToMarkdown(html) {
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

  const originalEscape = turndownService.escape
  turndownService.escape = function (string) {
    return originalEscape(string).replace(/\$/g, "\\$")
  }

  return turndownService.turndown(html)
}


async function main() {
  let browser

  try {
    browser = await loadBrowser()
    const result = []

    // Get configuration based on command line argument
    const arg = process.argv[2] || "private"
    let type = arg

    // Map command line arguments to configuration types
    if (arg === "privateWs") {
      type = "privateWebSocket"
    } else if (arg === "publicWs") {
      type = "publicWebSocket"
    }

    const { urls, outputConfig } = getConfig(type)

    console.log(`\x1b[34m%s\x1b[0m`, `📚 Generating ${type} API documentation`)

    // Process all URLs from the configuration
    for (const url of urls) {
      console.log("\x1b[34m%s\x1b[0m", `🌐 Processing URL: ${url}`)
      const startTime = Date.now()

      // Wrap the entire page processing with retry logic
      const html = await retryOperation(async () => {
        const content = await getPageHTML(url, browser)
        if (!content || content.trim() === "") {
          throw new Error(`Failed to get HTML content from ${url}`)
        }
        return content
      })

      const endTime = Date.now()
      console.log(
        "\x1b[36m%s\x1b[0m",
        `⏱️ Time taken: ${(endTime - startTime) / 1000} seconds`
      )

      result.push(html)
    }

    // Create docs directory structure using new layout
    const { docsDir } = outputConfig

    // Create endpoints directories for public and private
    const publicDir = `${docsDir}/endpoints/public`
    const privateDir = `${docsDir}/endpoints/private`
    const coreDir = `${docsDir}/core`

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }
    if (!fs.existsSync(privateDir)) {
      fs.mkdirSync(privateDir, { recursive: true })
    }
    if (!fs.existsSync(coreDir)) {
      fs.mkdirSync(coreDir, { recursive: true })
    }

    // Helper function to extract endpoint info from content
    const extractEndpointInfo = content => {
      const lines = content.split("\n")
      let method = null
      let path = null
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
          path = parts[1] || ""
        }

        // Check if endpoint is public
        if (
          trimmed.includes("API KEY permission") &&
          trimmed.includes("No API KEY signature required")
        ) {
          isPublic = true
        }
      }

      return { method, path, isPublic }
    }

    // Helper function to generate filename from endpoint path
    const generateFilename = (method, path) => {
      if (!method || !path) return null

      // Remove query parameters and extract path segments
      const cleanPath = path.split("?")[0]
      const segments = cleanPath.split("/").filter(s => s.length > 0)

      // Take the last 3-4 meaningful segments
      const relevantSegments = segments.slice(-4)

      // Convert to snake_case filename
      let filename = relevantSegments
        .join("_")
        .replace(/[^a-zA-Z0-9_]/g, "_")
        .replace(/_+/g, "_")
        .toLowerCase()

      // Prepend method
      filename = `${method.toLowerCase()}_${filename}.md`

      return filename
    }

    // Process each URL's HTML and extract individual endpoints
    let totalFilesCreated = 0
    let publicCount = 0
    let privateCount = 0
    let coreCount = 0
    let totalSize = 0

    const filenameConflicts = new Map()

    for (let i = 0; i < result.length; i++) {
      const html = result[i]
      const url = urls[i]

      // Parse the HTML to find all H2 sections (endpoints)
      const dom = new JSDOM(html)
      const convertDivs = dom.window.document.querySelectorAll(
        ".convert-to-markdown"
      )

      console.log(
        `\x1b[34m%s\x1b[0m`,
        `📝 Found ${convertDivs.length} sections in ${url}`
      )

      // Process each endpoint section
      for (const div of convertDivs) {
        // Get the H2 heading for this section
        const h2 = div.querySelector("h2")
        if (!h2) continue

        const sectionName = h2.textContent.trim()

        // Create a temporary DOM with just this section's content
        const endpointDom = new JSDOM(`<div>${div.innerHTML}</div>`)

        // Convert this section's HTML to markdown
        const markdown = convertToMarkdown(
          endpointDom.window.document.body.innerHTML
        )

        // Extract endpoint info to determine where to save it
        const { method, path, isPublic } = extractEndpointInfo(markdown)

        let outputPath

        // Check if this is an endpoint or core documentation
        if (method && path) {
          // This is an endpoint - save to public or private folder
          const filename = generateFilename(method, path)

          if (!filename) {
            console.log(
              `\x1b[33m%s\x1b[0m`,
              `  ⚠️  Skipping ${sectionName} (couldn't generate filename)`
            )
            continue
          }

          // Handle filename conflicts
          const targetDir = isPublic ? publicDir : privateDir
          let finalFilename = filename
          let counter = 1

          const conflictKey = `${isPublic ? "public" : "private"}:${filename}`
          if (filenameConflicts.has(conflictKey)) {
            const baseName = filename.replace(/\.md$/, "")
            finalFilename = `${baseName}_${counter}.md`
            while (
              fs.existsSync(path.join(targetDir, finalFilename)) ||
              filenameConflicts.has(
                `${isPublic ? "public" : "private"}:${finalFilename}`
              )
            ) {
              counter++
              finalFilename = `${baseName}_${counter}.md`
            }
          }

          filenameConflicts.set(
            `${isPublic ? "public" : "private"}:${finalFilename}`,
            true
          )

          outputPath = `${targetDir}/${finalFilename}`

          if (isPublic) {
            publicCount++
            console.log(`  📄 Public:  ${sectionName} → ${finalFilename}`)
          } else {
            privateCount++
            console.log(`  🔒 Private: ${sectionName} → ${finalFilename}`)
          }
        } else {
          // This is core documentation - save to core folder
          const sanitizedName = sectionName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "")
          const filename = `${sanitizedName}.md`

          outputPath = `${coreDir}/${filename}`
          coreCount++

          console.log(`  📚 Core:    ${sectionName} → ${filename}`)
        }

        // Save the file
        fs.writeFileSync(outputPath, markdown)

        // Format the markdown file
        await formatMarkdown(outputPath)

        totalFilesCreated++
        totalSize += markdown.length
      }
    }

    // Print a visually appealing success message
    console.log(
      "\x1b[32m%s\x1b[0m",
      `\n✅ Success: Created ${totalFilesCreated} files!`
    )
    console.log(`  📄 Public endpoints:  ${publicCount}`)
    console.log(`  🔒 Private endpoints: ${privateCount}`)
    console.log(`  📚 Core documentation: ${coreCount}`)
    console.log(`📁 Directory: ${docsDir}`)
    console.log(`📦 Total Size: ${(totalSize / 1024).toFixed(2)} KB`)
  } finally {
    if (browser) {
      await browser.close()
    }
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
