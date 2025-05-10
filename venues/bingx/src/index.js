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

async function getPageHTML(pageURL, browser) {
  const page = await browser.newPage()
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

  await page.goto(pageURL)
  await page.waitForSelector(".app-content")
  const html = await page.evaluate(async () => {
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
          p.parentElement.nextSibling.remove()
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

      // Copy any remaining content to the empty placeholder div
      sectionElement.querySelectorAll("div.content-item").forEach(div => {
        console.log("Moving all remaining content to the catch all div")
        emptyDiv.appendChild(div)
      })
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
  })

  await page.close()
  return html
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

// Generic heading demotion utility (descending order)
const demoteHeadings = dom => {
  for (let level = 6; level >= 1; level--) {
    const selector = `h${level}`
    if (level < 6) {
      const headings = dom.window.document.querySelectorAll(selector)
      headings.forEach(heading => {
        const newHeading = dom.window.document.createElement(`h${level + 1}`)
        newHeading.textContent = heading.textContent
        heading.parentNode.replaceChild(newHeading, heading)
      })
    }
  }
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

    const { urls, outputConfig, title } = getConfig(type)

    console.log(`\x1b[34m%s\x1b[0m`, `📚 Generating ${type} API documentation`)

    // Process all URLs from the configuration
    for (const url of urls) {
      console.log("\x1b[34m%s\x1b[0m", `🌐 Processing URL: ${url}`)
      const startTime = Date.now()

      const html = await getPageHTML(url, browser)

      if (!html || html.trim() === "") {
        throw new Error(`Failed to get HTML content from ${url}`)
      }

      const endTime = Date.now()
      console.log(
        "\x1b[36m%s\x1b[0m",
        `⏱️ Time taken: ${(endTime - startTime) / 1000} seconds`
      )

      result.push(html)
    }

    // Create docs directory if it doesn't exist
    const { docsDir, outputFileName } = outputConfig
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true })
    }

    // Convert all the html to markdown and combine into a single file
    let combinedMarkdown = ""

    if (title) {
      console.log(`\x1b[34m%s\x1b[0m`, `📄 Adding title: ${title}`)
      combinedMarkdown += `# ${title}\n\n`
    }

    for (let i = 0; i < result.length; i++) {
      const html = result[i]
      const url = urls[i]
      // Demote all headings by one level using JSDOM
      const dom = new JSDOM(html)
      demoteHeadings(dom)
      const markdown = await convertToMarkdown(
        dom.window.document.body.innerHTML
      )
      combinedMarkdown += `${markdown}\n\n> **Source:** [original URL](${url})\n\n---\n\n`
    }

    // Save the combined markdown to a single file
    const outputPath = `${docsDir}/${outputFileName}`
    fs.writeFileSync(outputPath, combinedMarkdown)

    // Format the markdown file
    await formatMarkdown(outputPath)
    console.log(`Formatted: ${outputPath}`)

    // Print a visually appealing success message
    console.log(
      "\x1b[32m%s\x1b[0m",
      "✅ Success: Combined markdown file created successfully!"
    )
    console.log(`📄 File: ${outputPath}`)
    console.log(`📦 Size: ${(combinedMarkdown.length / 1024).toFixed(2)} KB`)
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
