/**
 * HTX Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from HTX API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://www.htx.com/en-us/opend/newApiPages/"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/htx/endpoints")

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
 * Wait for menu to load with retries
 */
const waitForMenu = async page => {
  console.log("Waiting for menu element to load...")
  let menuLoaded = false
  let retries = 0
  const maxRetries = 3

  while (!menuLoaded && retries < maxRetries) {
    try {
      await page.waitForSelector("ul#sliderMenu.ant-menu", {
        timeout: 60000,
        visible: true
      })
      console.log("✅ Menu element loaded successfully")
      menuLoaded = true
    } catch (error) {
      retries++
      console.log(`⚠️  Menu selector timeout (attempt ${retries}/${maxRetries}) - checking if menu exists anyway...`)
      const menuExists = await page.evaluate(() => {
        const menu = document.querySelector("ul#sliderMenu.ant-menu")
        if (!menu) {
          // Log what selectors ARE available for debugging
          const allMenus = document.querySelectorAll('ul')
          return {
            exists: false,
            visible: false,
            totalUls: allMenus.length,
            ulIds: Array.from(allMenus).map(ul => ul.id || 'no-id').slice(0, 10)
          }
        }
        return { exists: true, visible: menu.offsetParent !== null }
      })
      console.log("Menu status:", menuExists)

      if (menuExists && menuExists.exists) {
        console.log("✅ Menu exists and will proceed anyway")
        menuLoaded = true
      } else if (retries >= maxRetries) {
        console.error("❌ Menu not found after all retries. Available ul elements:", menuExists)
        throw error
      } else {
        console.log(`⏳ Waiting 5 seconds before retry...`)
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    }
  }

  // Additional wait to ensure menu is fully interactive
  await new Promise(resolve => setTimeout(resolve, 3000))
}

/**
 * Expand all menus to make all menu items visible
 */
const expandAllMenus = async page => {
  console.log("Expanding all menus...")

  await page.evaluate(async () => {
    // Find and click Spot menu to expand it
    const menus = document.querySelectorAll('div[role="menuitem"]')
    for (const menu of menus) {
      const text = menu.textContent.trim()
      if (text === "Spot") {
        menu.click()
        await new Promise(resolve => setTimeout(resolve, 500))
        break
      }
    }

    // Now expand all submenus
    let changed = true
    let iterations = 0

    while (changed && iterations < 20) {
      changed = false
      iterations++

      const allMenus = document.querySelectorAll('div[role="menuitem"]')

      for (const menu of allMenus) {
        if (menu.getAttribute("aria-expanded") === "false") {
          menu.click()
          changed = true
          await new Promise(resolve => setTimeout(resolve, 300))
        }
      }
    }
  })

  console.log("✅ All menus expanded")
}

/**
 * Extract all endpoint menu items
 */
const extractEndpointMenuItems = async page => {
  return await page.evaluate(() => {
    const listItems = document.querySelectorAll('li[role="menuitem"]')
    const endpoints = []

    for (const item of listItems) {
      const keys = item.getAttribute("keys")
      if (!keys) continue

      const keyParts = keys.split(",")
      const lastKey = keyParts[keyParts.length - 1]?.trim()

      // GUID format indicates an endpoint (contains hyphens)
      if (lastKey && lastKey.includes("-")) {
        const categoryElement =
          item.parentElement?.parentElement?.firstElementChild
        const categoryText = categoryElement
          ? categoryElement.textContent.trim()
          : "Unknown Category"

        endpoints.push({
          text: item.textContent.trim(),
          guid: lastKey,
          category: categoryText
        })
      }
    }

    return endpoints
  })
}

/**
 * Navigate to endpoint URL by GUID and extract content
 */
const extractEndpointContent = async (page, guid) => {
  // Navigate directly to the endpoint URL
  const endpointUrl = `${BASE_URL}?id=${guid}`
  console.log(`  Navigating to: ${endpointUrl}`)

  try {
    await page.goto(endpointUrl, { waitUntil: "networkidle0", timeout: 30000 })
    console.log(`  ✅ Page loaded`)
  } catch (error) {
    console.log(`  ⚠️  Navigation timeout or error: ${error.message}`)
    // Continue anyway, content might still be there
  }

  // Wait for content div to have actual content
  console.log("  Waiting for content to load...")
  try {
    await page.waitForFunction(
      () => {
        const contentDiv = document.querySelector(
          "div.newApiPages_posR__RKd5D.newApiPages_posDetail__SmN2h"
        )
        return contentDiv && contentDiv.innerHTML.trim().length > 100
      },
      { timeout: 10000 }
    )
    console.log("  ✅ Content loaded")
  } catch {
    console.log("  ⚠️  Timeout waiting for content to load")
  }

  const html = await page.evaluate(async () => {
    const contentDiv = document.querySelector(
      "div.newApiPages_posR__RKd5D.newApiPages_posDetail__SmN2h"
    )
    if (!contentDiv) return null

    // Clone the content div to avoid modifying the original
    const clonedContent = contentDiv.cloneNode(true)

    // Remove unwanted elements
    const toolsPanel = clonedContent.querySelector("#tools")
    if (toolsPanel) toolsPanel.remove()

    const codeList = clonedContent.querySelector("#code_list")
    if (codeList) codeList.remove()

    // Remove Failure Example sections
    const failureTitles = clonedContent.querySelectorAll("h2")
    for (const title of failureTitles) {
      if (title.textContent.trim() === "Failure Example") {
        title.parentElement?.remove()
      }
    }

    // Remove empty icons and table rows
    const emptyIcons = clonedContent.querySelectorAll("img.empty__icon")
    emptyIcons.forEach(icon => icon.remove())

    const emptyTableRows = clonedContent.querySelectorAll(
      "tr.ant-table-placeholder"
    )
    emptyTableRows.forEach(tr => tr.remove())

    // Convert h3 panel titles
    const panelTitles = clonedContent.querySelectorAll(
      "h3.newApiPages_panelWrapTitle__kLXE_"
    )
    panelTitles.forEach(title => {
      const h3 = document.createElement("h3")
      h3.innerHTML = title.innerHTML
      h3.className = title.className
      title.parentNode.replaceChild(h3, title)
    })

    // Convert h2 titles to h4
    const requestAddressTitles = clonedContent.querySelectorAll(
      "h2.newApiPages_wrapTitle__UqglL"
    )
    requestAddressTitles.forEach(title => {
      const h4 = document.createElement("h4")
      h4.innerHTML = title.innerHTML
      h4.className = title.className
      title.parentNode.replaceChild(h4, title)
    })

    // Convert Success Example h2 to h5
    const h2Titles = clonedContent.querySelectorAll("h2")
    h2Titles.forEach(title => {
      if (title.textContent.trim() === "Success Example") {
        const h5 = document.createElement("h5")
        h5.innerHTML = title.innerHTML
        h5.className = title.className
        title.parentNode.replaceChild(h5, title)
      }
    })

    // Strip <data> tags from table cells
    const dataCells = clonedContent.querySelectorAll("td.ant-table-cell")
    dataCells.forEach(cell => {
      if (cell.textContent.startsWith("</")) {
        const strippedContents = cell.textContent.substring(
          2,
          cell.textContent.length - 1
        )
        cell.textContent = strippedContents.toUpperCase() + "_END"
        return
      }

      if (cell.textContent.startsWith("<")) {
        const strippedContents = cell.textContent.substring(
          1,
          cell.textContent.length - 1
        )
        cell.textContent = strippedContents.toUpperCase() + "_START"
      }
    })

    // Convert react-json-view blocks to code blocks
    const jsonViews = clonedContent.querySelectorAll(".react-json-view")
    for (const jsonView of jsonViews) {
      const h2 = jsonView.previousElementSibling
      if (h2 && h2.tagName.toLowerCase() === "h2") {
        const h3 = document.createElement("h3")
        h3.innerHTML = h2.innerHTML
        h3.className = h2.className
        h2.parentNode.replaceChild(h3, h2)
      }

      // Try to get JSON from clipboard
      const copyContainer = jsonView.querySelector(
        ".copy-to-clipboard-container"
      )
      if (copyContainer) {
        const copyButton = copyContainer.firstElementChild
        if (copyButton) {
          try {
            copyButton.click()
            await new Promise(resolve => setTimeout(resolve, 100))

            const jsonText = await navigator.clipboard.readText()
            if (jsonText && jsonText.trim().length > 0) {
              // Properly format the JSON
              try {
                const parsed = JSON.parse(jsonText)
                const formatted = JSON.stringify(parsed, null, 2)
                const codeBlock = document.createElement("pre")
                const code = document.createElement("code")
                code.setAttribute("class", "language-json")
                code.textContent = formatted
                codeBlock.appendChild(code)
                jsonView.parentNode.replaceChild(codeBlock, jsonView)
                continue
              } catch (parseError) {
                // If JSON parsing fails, use raw text
                const codeBlock = document.createElement("pre")
                const code = document.createElement("code")
                code.setAttribute("class", "language-json")
                code.textContent = jsonText
                codeBlock.appendChild(code)
                jsonView.parentNode.replaceChild(codeBlock, jsonView)
                continue
              }
            }
          } catch (e) {
            console.warn("Could not copy JSON from clipboard:", e)
          }
        }
      }

      // Fallback: extract JSON from the react-json-view structure
      try {
        const jsonObject = {}
        const objectContent = jsonView.querySelector('.object-content')
        if (objectContent) {
          const keyValues = objectContent.querySelectorAll('.object-key-val')
          keyValues.forEach(kv => {
            const keySpan = kv.querySelector('.object-key')
            const valueSpan = kv.querySelector('.variable-value, .object-value')
            if (keySpan && valueSpan) {
              const key = keySpan.textContent.replace(/[":]/g, '').trim()
              let value = valueSpan.textContent.trim()
              // Try to parse value as JSON
              try {
                value = JSON.parse(value)
              } catch {
                // Keep as string
              }
              jsonObject[key] = value
            }
          })

          const formatted = JSON.stringify(jsonObject, null, 2)
          const codeBlock = document.createElement("pre")
          const code = document.createElement("code")
          code.setAttribute("class", "language-json")
          code.textContent = formatted
          codeBlock.appendChild(code)
          jsonView.parentNode.replaceChild(codeBlock, jsonView)
        }
      } catch (e) {
        console.warn("Could not extract JSON from react-json-view:", e)
        // Last resort: remove the jsonView element
        jsonView.remove()
      }
    }

    return clonedContent.innerHTML
  })

  return html
}

/**
 * Extract HTTP method and path from endpoint title
 */
const parseEndpointTitle = title => {
  // Try to extract method and path from title
  // Common patterns: "GET /v1/account", "POST /v1/order", etc.
  const methodMatch = title.match(/^(GET|POST|PUT|DELETE|PATCH)\s+(.+)/i)
  if (methodMatch) {
    return {
      method: methodMatch[1].toUpperCase(),
      path: methodMatch[2].trim()
    }
  }

  // If no method found, check if title contains a path
  if (title.includes("/")) {
    return {
      method: "GET", // Default to GET
      path: title.trim()
    }
  }

  // Otherwise, use the title as-is
  return {
    method: "GET",
    path: title.trim()
  }
}

/**
 * Determine if endpoint is public or private
 */
const isPublicEndpoint = (content, title, category) => {
  if (!content) return true

  const contentLower = content.toLowerCase()

  // Check for explicit signature verification status
  // "Signature verification: No" means the endpoint is public
  if (contentLower.includes("signature verification: no")) {
    return true
  }

  // "Signature verification: Yes" means the endpoint is private
  if (contentLower.includes("signature verification: yes")) {
    return false
  }

  // Check for authentication requirements in content
  const hasApiKey =
    contentLower.includes("api-key") ||
    contentLower.includes("apikey") ||
    contentLower.includes("accesskey")
  const hasSignature =
    contentLower.includes("signature") || contentLower.includes("sign")
  const hasTimestamp = contentLower.includes("timestamp")

  // If content mentions authentication requirements, it's private
  if (hasApiKey || hasSignature || hasTimestamp) {
    return false
  }

  // Check category name
  const categoryLower = category.toLowerCase()
  if (
    categoryLower.includes("private") ||
    categoryLower.includes("account") ||
    categoryLower.includes("trading") ||
    categoryLower.includes("order") ||
    categoryLower.includes("wallet")
  ) {
    return false
  }

  if (
    categoryLower.includes("public") ||
    categoryLower.includes("market") ||
    categoryLower.includes("reference")
  ) {
    return true
  }

  // Check title
  const titleLower = title.toLowerCase()
  if (
    titleLower.includes("public") ||
    titleLower.includes("market") ||
    titleLower.includes("ticker") ||
    titleLower.includes("orderbook") ||
    titleLower.includes("trades") ||
    titleLower.includes("kline") ||
    titleLower.includes("depth")
  ) {
    return true
  }

  if (
    titleLower.includes("order") ||
    titleLower.includes("balance") ||
    titleLower.includes("account") ||
    titleLower.includes("withdraw") ||
    titleLower.includes("deposit")
  ) {
    return false
  }

  // Default to public if unclear
  return true
}

/**
 * Process and save endpoint documentation
 */
const processEndpoint = (endpoint, content, turndownService) => {
  const { method, path: endpointPath } = parseEndpointTitle(endpoint.text)
  const isPublic = isPublicEndpoint(content, endpoint.text, endpoint.category)

  // Convert HTML to Markdown
  let markdown = turndownService.turndown(content || "")

  // Add standard template header
  const sourceUrl = `${BASE_URL}?id=${endpoint.guid}`
  const header = `# ${method} ${endpointPath}\n\n**Source:** [${endpoint.text}](${sourceUrl})\n\n**Category:** ${endpoint.category}\n\n## Authentication\n\n${isPublic ? "Not Required (Public Endpoint)" : "Required (Private Endpoint)"}\n\n`

  markdown = header + markdown

  // Generate filename
  const filename = generateFilename(method, endpointPath)
  const folder = isPublic ? "public" : "private"
  const filePath = path.join(OUTPUT_DIR, folder, filename)

  // Write file
  writeFile(filePath, markdown)

  return { filename, isPublic }
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("🚀 Starting HTX endpoint documentation extraction...")
  console.log(`📍 Source: ${BASE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()

    // Set a realistic user agent (important for HTX)
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    )

    // Set viewport to a realistic size
    await page.setViewport({ width: 1280, height: 800 })

    // Enable clipboard permissions
    const context = browser.defaultBrowserContext()
    await context.overridePermissions(BASE_URL, [
      "clipboard-read",
      "clipboard-write",
      "clipboard-sanitized-write"
    ])

    console.log(`Navigating to ${BASE_URL}...`)
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 60000 })
    console.log("✅ Page loaded")

    // Wait for menu to render
    await waitForMenu(page)

    // Expand all menus to make endpoint items visible
    await expandAllMenus(page)

    const turndownService = createTurndownBuilder()
      .withCustomRule("htx-empty-tables", {
        filter: node => {
          if (node.nodeName !== "TABLE") return false
          const rows = Array.from(node.querySelectorAll("tr"))
          // Check if table has only header row or is completely empty
          return rows.length <= 1
        },
        replacement: () => {
          // Remove empty tables entirely
          return ""
        }
      })
      .withCustomRule("htx-json-code", {
        filter: node => {
          return (
            node.nodeName === "PRE" &&
            node.querySelector("code") &&
            node.textContent.trim().startsWith("{")
          )
        },
        replacement: (content, node) => {
          const codeContent = node.textContent.trim()
          // Check if it looks like JSON
          if (codeContent.startsWith("{") || codeContent.startsWith("[")) {
            return "\n```json\n" + codeContent + "\n```\n"
          }
          return "\n```\n" + codeContent + "\n```\n"
        }
      })
      .build()

    // Ensure output directories exist
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    // Extract all endpoint menu items
    console.log("Extracting endpoint menu items...")
    const endpoints = await extractEndpointMenuItems(page)
    console.log(`\n📊 Found ${endpoints.length} endpoint menu items`)

    if (endpoints.length === 0) {
      throw new Error(
        "No endpoints were found in the menu. " +
          "Possible causes: (1) Menu structure changed - GUID detection is not finding endpoint keys, " +
          "(2) Menu selector 'li[role=\"menuitem\"]' is incorrect, " +
          "(3) HTX anti-bot protection is blocking access, " +
          "(4) Page did not fully load. " +
          "Expected to find menu items with 'keys' attributes containing GUID format (with hyphens)."
      )
    }

    let publicCount = 0
    let privateCount = 0

    // Process each endpoint
    console.log("\n📝 Processing endpoints...")
    for (let i = 0; i < endpoints.length; i++) {
      const endpoint = endpoints[i]
      console.log(
        `\n[${i + 1}/${endpoints.length}] Processing: ${endpoint.text}`
      )

      try {
        const content = await extractEndpointContent(page, endpoint.guid)

        if (!content || content.trim().length === 0) {
          throw new Error(
            `Failed to extract content for endpoint "${endpoint.text}" (GUID: ${endpoint.guid}). ` +
              `Possible causes: (1) Content selector 'div.newApiPages_posR__RKd5D.newApiPages_posDetail__SmN2h' is incorrect, ` +
              `(2) Menu item click did not load content, (3) Content takes longer than 2s to load.`
          )
        }

        const result = processEndpoint(endpoint, content, turndownService)

        if (result.isPublic) {
          publicCount++
        } else {
          privateCount++
        }

        // Add a small delay between requests
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error(`  ❌ Error processing ${endpoint.text}:`, error.message)
      }
    }

    const totalEndpoints = publicCount + privateCount

    console.log(
      `\n✅ Endpoint documentation extraction completed successfully!`
    )
    console.log(`📁 Files written to: ${OUTPUT_DIR}`)
    console.log(`   - Public endpoints: ${publicCount}`)
    console.log(`   - Private endpoints: ${privateCount}`)
    console.log(`   - Total: ${totalEndpoints}`)
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
