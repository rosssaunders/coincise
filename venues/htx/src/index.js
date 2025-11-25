"use strict"

import process from "process"
import { readFile } from "fs/promises"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { launchBrowser } from "../../shared/puppeteer.js"
import { logger } from "./logger.js"
import { cleanHtml } from "./html-cleaner.js"
import { convertToMarkdown } from "./markdown-converter.js"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Add sleep function at the top level
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function loadConfig(configPath) {
  if (!configPath) {
    throw new Error("Config file path is required")
  }
  const configData = await readFile(configPath, "utf-8")
  return JSON.parse(configData)
}

async function scrapePageForId(browser, url, ids) {
  const page = await browser.newPage()
  try {
    // Enable console logging
    page.on("console", msg => logger.browser(msg.text()))

    // Set a realistic user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    )

    // Set viewport to a realistic size
    await page.setViewport({ width: 1280, height: 800 })

    logger.info(`Navigating to: ${url}`)
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000
    })

    // Wait for the specific menu element to be loaded with retries
    logger.info("Waiting for menu element to load...")
    let menuLoaded = false
    let retries = 0
    const maxRetries = 3

    while (!menuLoaded && retries < maxRetries) {
      try {
        await page.waitForSelector("ul#sliderMenu", {
          timeout: 60000
        })
        logger.info("Menu element loaded successfully")
        menuLoaded = true
      } catch (error) {
        retries++
        logger.info(`Menu selector timeout (attempt ${retries}/${maxRetries}) - checking if menu exists anyway...`)
        const menuExists = await page.evaluate(() => {
          const menu = document.querySelector("ul#sliderMenu")
          if (!menu) {
            // Log what selectors ARE available for debugging
            const allMenus = document.querySelectorAll('ul')
            return {
              exists: false,
              visible: false,
              totalUls: allMenus.length,
              ulIds: Array.from(allMenus).map(ul => ul.id || 'no-id').slice(0, 10),
              ulClasses: Array.from(allMenus).map(ul => ul.className || 'no-class').slice(0, 10)
            }
          }
          return { exists: true, visible: menu.offsetParent !== null, className: menu.className }
        })
        logger.info("Menu status:", menuExists)

        if (menuExists && menuExists.exists) {
          logger.info("Menu exists and will proceed anyway")
          menuLoaded = true
        } else if (retries >= maxRetries) {
          logger.error("Menu not found after all retries. Available ul elements:", menuExists)
          throw error
        } else {
          logger.info(`Waiting 5 seconds before retry...`)
          await new Promise(resolve => setTimeout(resolve, 5000))
        }
      }
    }

    // Additional wait to ensure menu is fully interactive
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Click through all menu items and submenus recursively
    await page.evaluate(async () => {
      const siderChildren = document.querySelector(".ant-layout-sider-children")
      if (!siderChildren) {
        console.log("ant-layout-sider-children not found")
        return
      }

      /* Updated recursive function to build a hierarchy of menu items */
      async function getMenuTree(parentElement, depth = 0) {
        const indent = "  ".repeat(depth)
        const menuItems = parentElement.querySelectorAll('div[role="menuitem"]')
        console.log(
          `${indent}Found child parent menu items at depth ${depth}:`,
          menuItems.length
        )
        const result = []
        for (const item of menuItems) {
          const itemText = item.textContent.trim()
          console.log(`${indent}Clicking menu item:`, itemText)
          // Click the menu item
          item.click()
          // Wait for any animations or content loading
          await new Promise(resolve => setTimeout(resolve, 500))

          let children = []
          const itemParent = item.parentElement
          if (itemParent) {
            // Look for new menu items that might have appeared
            const subMenu = itemParent.querySelector("ul.ant-menu")
            if (subMenu) {
              console.log(`${indent}Found submenu for:`, itemText)
              children = await getMenuTree(subMenu, depth + 1)
            }
          }
          result.push({ text: itemText, children })
        }

        // Print out the keys for each li[role="menuitem"] under this parent
        // Print the full path each log line
        if (depth > 0) {
          const liMenuItems = parentElement.querySelectorAll(
            ':scope > li[role="menuitem"]'
          )
          for (const liMenuItem of liMenuItems) {
            const keys = liMenuItem.getAttribute("keys")
            const parentItemText =
              liMenuItem.parentElement.previousElementSibling.textContent.trim()
            const keyArray = keys ? keys.split(",") : []
            const lastKey = keyArray[keyArray.length - 1] || ""
            const isGuid = lastKey.includes("-")
            console.log(
              `${indent}Keys for ${parentItemText} > ${liMenuItem.textContent.trim()}:`,
              isGuid ? `"${lastKey}"` : lastKey
            )
          }
        }
        return result
      }

      // Replace the original recursive call with the new function call that builds a tree
      const menuTree = await getMenuTree(siderChildren)
      return menuTree
    })

    const content = await page.evaluate(ids => {
      const listItems = document.querySelectorAll('li[role="menuitem"]')
      console.log("Found list items:", listItems.length)

      const items = Array.from(listItems).map(item => {
        // Extract the category text safely
        let categoryText = "Unknown Category"
        const categoryElement =
          item.parentElement?.parentElement?.firstElementChild
        if (categoryElement) {
          categoryText =
            categoryElement.textContent.trim() ?? "Unknown Category"
        }

        return {
          menuIds: item.getAttribute("keys"),
          desc: item.getAttribute("desc"),
          text: item.textContent.trim() ?? "", // Just the item text now
          category: categoryText
        }
      })

      let filteredItems = []
      if (ids) {
        // Create a filtered list of items where at least one keyPart is in the provided ids array.
        const idsStr = ids.map(id => id.toString())
        filteredItems = items.filter(item => {
          const keyParts = item.menuIds ? item.menuIds.split(",") : []
          return keyParts.some(keyPart => idsStr.includes(keyPart.trim()))
        })
      }

      const result = []
      let currentCategory = null // Track the current category

      filteredItems.forEach(item => {
        if (item.category !== currentCategory) {
          currentCategory = item.category
          // Add the category header if it's not null or empty
          if (currentCategory) {
            result.push({
              isCategory: true,
              title: currentCategory,
              body: ""
            })
          }
        }

        // Add the item description (previously was category > item text)
        const itemDescription = item.desc ? `<div>${item.desc}</div>` : ""

        result.push({
          isCategory: false,
          title: item.text,
          body: itemDescription
        })
      })

      return result
    }, ids)

    return content
  } finally {
    await page.close()
  }
}

async function scrapePageForEndpoint(browser, url) {
  const page = await browser.newPage()

  const context = browser.defaultBrowserContext()
  await context.overridePermissions(url, [
    "clipboard-read",
    "clipboard-write",
    "clipboard-sanitized-write"
  ])

  try {
    // Enable console logging
    page.on("console", msg => logger.browser(msg.text()))

    // Set a realistic user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    )

    // Set viewport to a realistic size
    await page.setViewport({ width: 1280, height: 800 })

    logger.info(`Navigating to: ${url}`)
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000
    })

    // Wait for the specific menu element to be loaded with retries
    logger.info("Waiting for menu element to load...")
    let menuLoaded = false
    let retries = 0
    const maxRetries = 3

    while (!menuLoaded && retries < maxRetries) {
      try {
        await page.waitForSelector("ul#sliderMenu", {
          timeout: 60000
        })
        logger.info("Menu element loaded successfully")
        menuLoaded = true
      } catch (error) {
        retries++
        logger.info(`Menu selector timeout (attempt ${retries}/${maxRetries}) - checking if menu exists anyway...`)
        const menuExists = await page.evaluate(() => {
          const menu = document.querySelector("ul#sliderMenu")
          if (!menu) {
            // Log what selectors ARE available for debugging
            const allMenus = document.querySelectorAll('ul')
            return {
              exists: false,
              visible: false,
              totalUls: allMenus.length,
              ulIds: Array.from(allMenus).map(ul => ul.id || 'no-id').slice(0, 10),
              ulClasses: Array.from(allMenus).map(ul => ul.className || 'no-class').slice(0, 10)
            }
          }
          return { exists: true, visible: menu.offsetParent !== null, className: menu.className }
        })
        logger.info("Menu status:", menuExists)

        if (menuExists && menuExists.exists) {
          logger.info("Menu exists and will proceed anyway")
          menuLoaded = true
        } else if (retries >= maxRetries) {
          logger.error("Menu not found after all retries. Available ul elements:", menuExists)
          throw error
        } else {
          logger.info(`Waiting 5 seconds before retry...`)
          await new Promise(resolve => setTimeout(resolve, 5000))
        }
      }
    }

    // Additional wait to ensure menu is fully interactive
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Extract content from the main API documentation container
    logger.info("Extracting content from API documentation container...")
    const content = await page.evaluate(async () => {
      const contentDiv = document.querySelector(
        "div.newApiPages_posR__RKd5D.newApiPages_posDetail__SmN2h"
      )

      // Remove the tools panel div
      const toolsPanel = contentDiv.querySelector("#tools")
      if (toolsPanel) {
        toolsPanel.remove()
      }

      // Remove the tools panel div
      const code_list = contentDiv.querySelector("#code_list")
      if (code_list) {
        code_list.remove()
        // Add a check right after removal
        const checkRemoved = contentDiv.querySelector("#code_list")
        if (checkRemoved) {
          console.warn("code_list STILL FOUND after remove() call.")
        }
      } else {
        console.warn("code_list not found")
      }

      // Remove the Failure Example section by its ID
      const failureTitle = contentDiv.querySelectorAll("h2")
      for (const title of failureTitle) {
        if (title.textContent.trim() === "Failure Example") {
          title.parentElement.remove()
        }
      }

      // Remove empty icon images
      const emptyIcons = contentDiv.querySelectorAll("img.empty__icon")
      emptyIcons.forEach(icon => icon.remove())

      const emptyTableRows = contentDiv.querySelectorAll(
        "tr.ant-table-placeholder"
      )
      emptyTableRows.forEach(tr => tr.remove())

      // FINISH REMOVAL... START CONVERSION

      // Convert h3 panel titles to h3
      const panelTitles = contentDiv.querySelectorAll(
        "h3.newApiPages_panelWrapTitle__kLXE_"
      )
      panelTitles.forEach(title => {
        const h2 = document.createElement("h3")
        h2.innerHTML = title.innerHTML
        h2.className = title.className
        title.parentNode.replaceChild(h2, title)
      })

      // Convert specific h2 titles to h4
      let requestAddressTitles = contentDiv.querySelectorAll(
        "h2.newApiPages_wrapTitle__UqglL"
      )
      requestAddressTitles.forEach(title => {
        const h3 = document.createElement("h4")
        h3.innerHTML = title.innerHTML
        h3.className = title.className
        title.parentNode.replaceChild(h3, title)
      })

      // Convert specific h2 titles to h3
      requestAddressTitles = contentDiv.querySelectorAll("h2")
      requestAddressTitles.forEach(title => {
        if (title.textContent.trim() === "Success Example") {
          const h4 = document.createElement("h5")
          h4.innerHTML = title.innerHTML
          h4.className = title.className
          title.parentNode.replaceChild(h4, title)
        }
      })

      // Convert the following <data> and </data> tags to just data and data
      // Strip <data> and </data> tags from table cells
      const dataCells = contentDiv.querySelectorAll("td.ant-table-cell")
      dataCells.forEach(cell => {
        // First replace the data tags with placeholders
        if (cell.textContent.startsWith("</")) {
          const strippedContents = cell.textContent.substring(
            2,
            cell.textContent.length - 1
          )
          cell.textContent = strippedContents.toUpperCase() + "_END"
          return
        }

        // First replace the data tags with placeholders
        if (cell.textContent.startsWith("<")) {
          const strippedContents = cell.textContent.substring(
            1,
            cell.textContent.length - 1
          )
          cell.textContent = strippedContents.toUpperCase() + "_START"
        }
      })

      // Convert the <div class="react-json-view"> blocks to a <code> block
      // Find all react-json-view blocks
      const jsonViews = contentDiv.querySelectorAll(".react-json-view")
      for (const jsonView of jsonViews) {
        // the h2 element to replace is a sibling of the jsonView
        const h2 = jsonView.previousElementSibling
        if (h2 && h2.tagName.toLowerCase() === "h2") {
          const h3 = document.createElement("h3")
          h3.innerHTML = h2.innerHTML
          h3.className = h2.className
          h2.parentNode.replaceChild(h3, h2)
        }

        // Find the copy-to-clipboard-container
        const copyContainer = jsonView.querySelector(
          ".copy-to-clipboard-container"
        )
        if (copyContainer) {
          // Get the first child span which is the clickable element
          const copyButton = copyContainer.firstElementChild
          if (copyButton) {
            // Click the button to trigger copy
            copyButton.click()

            // Wait a moment for clipboard operation to complete
            await new Promise(resolve => setTimeout(resolve, 100))

            // Get the copied JSON from clipboard
            const jsonText = await navigator.clipboard.readText()
            if (jsonText) {
              // Replace the react-json-view with a code block
              const codeBlock = document.createElement("pre")
              const code = document.createElement("code")
              code.textContent = jsonText
              codeBlock.appendChild(code)
              jsonView.parentNode.replaceChild(codeBlock, jsonView)
            }
          }
        }
      }

      if (!contentDiv) {
        console.log("Content container not found")
        return []
      }
      return [contentDiv.innerHTML]
    })

    if (!content || content.length === 0) {
      console.log("No content found in container")
      return null
    }

    console.log("Content extracted successfully")

    return content
  } finally {
    await page.close()
  }
}

async function main() {
  // Get config path from command line arguments
  const configPath = process.argv[2]
  if (!configPath) {
    logger.error("Please provide a config file path as an argument")
    process.exit(1)
  }

  const config = await loadConfig(configPath)
  const browser = await launchBrowser()

  const allMarkdownContent = []

  try {
    // Define the final output directory and ensure it exists
    const outputDir = join(__dirname, config.output.directory)
    await mkdir(outputDir, { recursive: true })
    const outputPath = join(outputDir, config.output.filename)

    // Process base URL for numeric IDs (often category descriptions)
    logger.info(
      `Processing base URL for category descriptions: ${config.baseUrl}`
    )

    allMarkdownContent.push(`# ${config.output.title}`)

    const numericContents = await scrapePageForId(
      browser,
      config.baseUrl,
      config.numericIds
    )
    if (numericContents && numericContents.length > 0) {
      for (const doc of numericContents) {
        if (doc.isCategory) {
          allMarkdownContent.push(`## ${doc.title}`)
          continue
        }

        // Clean the HTML tables for FIX
        const cleanedHtml = await cleanHtml(doc.body)

        const allHtml = `<h3>${doc.title}</h3>\n\n${cleanedHtml}`

        const markdown = convertToMarkdown(allHtml)
        allMarkdownContent.push(markdown)
      }
      logger.info(`Processed ${numericContents.length} category descriptions.`)
    } else {
      logger.info(
        "No matching content found for numeric IDs (category descriptions)."
      )
    }

    if (config.otherUrls.length > 0) {
      allMarkdownContent.push(`## Endpoints`)
    }

    // Process other URLs (specific endpoints)
    for (const urlPath of config.otherUrls) {
      const fullUrl = `${config.baseUrl}?id=${urlPath}`
      logger.info(`Processing endpoint URL: ${fullUrl}`)

      const content = await scrapePageForEndpoint(browser, fullUrl)
      if (content && content.length > 0) {
        const markdown = convertToMarkdown(content.join("\n\n"))
        allMarkdownContent.push(markdown)
      } else {
        logger.warn(`No content found for ${fullUrl}`)
      }

      // Add a delay between requests to avoid rate limiting
      logger.info("Waiting 5 seconds before next request...")
      await sleep(5000)
    }

    // Write the combined markdown content to the single output file
    if (allMarkdownContent.length > 0) {
      const allMarkdownContentString = allMarkdownContent.join("\n\n")

      await writeFile(outputPath, allMarkdownContentString)

      // prettier the markdown content
      await formatMarkdown(outputPath)

      logger.success(`Saved combined API documentation to ${outputPath}`)
    } else {
      logger.info("No content was scraped from any URL.")
    }
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
