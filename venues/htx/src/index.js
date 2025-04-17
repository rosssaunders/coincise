'use strict'

import { readFile } from 'fs/promises'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import puppeteer from 'puppeteer'
import TurndownService from 'turndown'
import { gfm, tables, strikethrough } from 'turndown-plugin-gfm'
import { logger } from './utils/logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Add sleep function at the top level
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function loadConfig() {
  const configPath = join(__dirname, '../config/spot/private_rest_api.json')
  const configData = await readFile(configPath, 'utf-8')
  return JSON.parse(configData)
}

async function scrapePage(browser, url, ids) {
  const page = await browser.newPage()
  try {
    // Enable console logging
    page.on('console', msg => logger.browser(msg.text()))

    // Set a realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    )

    // Set viewport to a realistic size
    await page.setViewport({ width: 1280, height: 800 })

    logger.info(`Navigating to: ${url}`)
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    })

    // Wait for the specific menu element to be loaded
    logger.info('Waiting for menu element to load...')
    await page.waitForSelector('ul#sliderMenu.ant-menu', { timeout: 30000 })
    logger.info('Menu element loaded successfully')

    // Click through all menu items and submenus
    await page.evaluate(async () => {
      const siderChildren = document.querySelector('.ant-layout-sider-children')
      if (!siderChildren) {
        console.log('ant-layout-sider-children not found')
        return
      }

      const menuItems = siderChildren.querySelectorAll('div[role="menuitem"]')
      console.log('Found menu items:', menuItems.length)

      for (const item of menuItems) {
        console.log('Clicking menu item:', item.textContent.trim())
        // Click the menu item
        item.click()

        // Wait for any animations or content loading
        await new Promise(resolve => setTimeout(resolve, 500))

        // Load all the new children of this item that has been loaded
        const parentNode = item.parentElement
        if (parentNode) {
          const subItems = parentNode.querySelectorAll('div[role="menuitem"]')
          console.log('Found parent menu items:', subItems.length)

          for (const subItem of subItems) {
            console.log('Clicking >', subItem.textContent.trim())
            subItem.click()
            await new Promise(resolve => setTimeout(resolve, 500))
          }
        }
      }
    })

    const content = await page.evaluate(ids => {
      // Extract content from list items
      const descriptions = new Map()

      const listItems = document.querySelectorAll('li[role="menuitem"]')
      console.log('Found list items:', listItems.length)

      const items = Array.from(listItems).map(item => {
        // Extract the category text safely
        let categoryText = 'Unknown Category'
        const categoryElement = item.parentElement?.parentElement?.firstElementChild
        if (categoryElement) {
          categoryText = categoryElement.textContent.trim() ?? 'Unknown Category'
        }

        return {
          menuIds: item.getAttribute('keys'),
          desc: item.getAttribute('desc'),
          text: item.textContent.trim() ?? '', // Just the item text now
          category: categoryText,
        }
      })

      if (ids) {
        items.forEach(item => {
          // For numeric IDs, check data-menu-id
          const menuId = item.menuIds
          // Split keys into array and map descriptions to IDs
          const keyParts = menuId ? menuId.split(',') : []
          keyParts.forEach(keyPart => {
            descriptions.set(keyPart, item)
          })
        })
      }

      const result = []
      let currentCategory = null // Track the current category

      if (ids) {
        ids.forEach(id => {
          const item = descriptions.get(id.toString()) || {
            menuIds: '',
            desc: `Description not found for ID ${id}`,
            text: `Item not found for ID ${id}`,
            category: 'Error', // Assign a category for not found items
          }

          // Check if the category has changed
          if (item.category !== currentCategory) {
            currentCategory = item.category
            // Add the category header if it's not null or empty
            if (currentCategory) {
              result.push(`<h2>${currentCategory}</h2>`)
            }
          }

          // Add the item description (previously was category > item text)
          if (item) {
            // Ensure description exists before pushing
            const itemDescription = item.desc ? `<div>${item.desc}</div>` : ''
            result.push(`<div>${item.text}</div>${itemDescription}`)
          }
        })
      }
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
    'clipboard-read',
    'clipboard-write',
    'clipboard-sanitized-write',
  ])

  try {
    // Enable console logging
    page.on('console', msg => logger.browser(msg.text()))

    // Set a realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    )

    // Set viewport to a realistic size
    await page.setViewport({ width: 1280, height: 800 })

    logger.info(`Navigating to: ${url}`)
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    })

    // Wait for the specific menu element to be loaded
    logger.info('Waiting for menu element to load...')
    await page.waitForSelector('ul#sliderMenu.ant-menu', { timeout: 30000 })
    logger.info('Menu element loaded successfully')

    // Extract content from the main API documentation container
    logger.info('Extracting content from API documentation container...')
    const content = await page.evaluate(async scrapeJsonCode => {
      const contentDiv = document.querySelector(
        'div.newApiPages_posR__RKd5D.newApiPages_posDetail__SmN2h'
      )

      // Remove the tools panel div
      const toolsPanel = contentDiv.querySelector('#tools')
      if (toolsPanel) {
        toolsPanel.remove()
      }

      // Remove the tools panel div
      const code_list = contentDiv.querySelector('#code_list')
      if (code_list) {
        code_list.remove()
        // Add a check right after removal
        const checkRemoved = contentDiv.querySelector('#code_list')
        if (checkRemoved) {
          console.warn('code_list STILL FOUND after remove() call.')
        }
      } else {
        console.warn('code_list not found')
      }

      // Remove the Failure Example section by its ID
      const failureTitle = contentDiv.querySelectorAll('h2')
      for (const title of failureTitle) {
        if (title.textContent.trim() === 'Failure Example') {
          title.parentElement.remove()
        }
      }

      // Remove empty icon images
      const emptyIcons = contentDiv.querySelectorAll('img.empty__icon')
      emptyIcons.forEach(icon => icon.remove())

      const emptyTableRows = contentDiv.querySelectorAll('tr.ant-table-placeholder')
      emptyTableRows.forEach(tr => tr.remove())

      // FINISH REMOVAL... START CONVERSION

      // Convert h3 panel titles to h2
      const panelTitles = contentDiv.querySelectorAll('h3.newApiPages_panelWrapTitle__kLXE_')
      panelTitles.forEach(title => {
        const h2 = document.createElement('h2')
        h2.innerHTML = title.innerHTML
        h2.className = title.className
        title.parentNode.replaceChild(h2, title)
      })

      // Convert specific h2 titles to h3
      let requestAddressTitles = contentDiv.querySelectorAll('h2.newApiPages_wrapTitle__UqglL')
      requestAddressTitles.forEach(title => {
        const h3 = document.createElement('h3')
        h3.innerHTML = title.innerHTML
        h3.className = title.className
        title.parentNode.replaceChild(h3, title)
      })

      // Convert specific h2 titles to h3
      requestAddressTitles = contentDiv.querySelectorAll('h2')
      requestAddressTitles.forEach(title => {
        if (title.textContent.trim() === 'Success Example') {
          const h4 = document.createElement('h4')
          h4.innerHTML = title.innerHTML
          h4.className = title.className
          title.parentNode.replaceChild(h4, title)
        }
      })

      // Convert the following <data> and </data> tags to just data and data
      // Strip <data> and </data> tags from table cells
      const dataCells = contentDiv.querySelectorAll('td.ant-table-cell')
      dataCells.forEach(cell => {
        // First replace the data tags with placeholders
        cell.innerHTML = cell.innerHTML
          .replace(/&lt;data&gt;/g, 'DATA_START')
          .replace(/&lt;\/data&gt;/g, 'DATA_END')

        // Remove all < and > from the td cells

        // Then replace the HTML entities with their actual characters
        cell.innerHTML = cell.innerHTML
          .replace(/&lt;/g, '__')
          .replace(/\/&gt;/g, '__')
          .replace(/&gt;/g, '__')
      })

      // Convert the <div class="react-json-view"> blocks to a <code> block
      // Find all react-json-view blocks
      const jsonViews = contentDiv.querySelectorAll('.react-json-view')
      for (const jsonView of jsonViews) {
        // the h2 element to replace is a sibling of the jsonView
        const h2 = jsonView.previousElementSibling
        if (h2 && h2.tagName.toLowerCase() === 'h2') {
          const h3 = document.createElement('h3')
          h3.innerHTML = h2.innerHTML
          h3.className = h2.className
          h2.parentNode.replaceChild(h3, h2)
        }

        // Find the copy-to-clipboard-container
        const copyContainer = jsonView.querySelector('.copy-to-clipboard-container')
        if (copyContainer) {
          // Get the first child span which is the clickable element
          const copyButton = copyContainer.firstElementChild
          if (copyButton) {
            // Click the button to trigger copy
            copyButton.click()

            // Wait a moment for clipboard operation to complete
            await new Promise(resolve => setTimeout(resolve, 100))

            try {
              // Get the copied JSON from clipboard
              const jsonText = await navigator.clipboard.readText()
              if (jsonText) {
                // Replace the react-json-view with a code block
                const codeBlock = document.createElement('pre')
                const code = document.createElement('code')
                code.textContent = jsonText
                codeBlock.appendChild(code)
                jsonView.parentNode.replaceChild(codeBlock, jsonView)
              }
            } catch (error) {
              console.error('Failed to read clipboard:', error)
            }
          }
        }
      }

      if (!contentDiv) {
        console.log('Content container not found')
        return []
      }
      return [contentDiv.innerHTML]
    })

    if (!content || content.length === 0) {
      console.log('No content found in container')
      return null
    }

    console.log('Content extracted successfully')

    return content
  } finally {
    await page.close()
  }
}

function convertToMarkdown(html) {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    fence: '```',
  })
  turndownService.use([gfm, tables, strikethrough])

  return turndownService.turndown(html)
}

async function main() {
  const config = await loadConfig()
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const allMarkdownContent = []

  try {
    // Define the final output directory and ensure it exists
    // Go up 4 levels from src to the repo root, then into docs/htx
    const outputDir = join(__dirname, '../../../docs/htx')
    await mkdir(outputDir, { recursive: true })
    const outputPath = join(outputDir, 'private_rest_api.md')

    // Process base URL for numeric IDs (often category descriptions)
    logger.info(`Processing base URL for category descriptions: ${config.baseUrl}`)
    const numericContents = await scrapePage(browser, config.baseUrl, config.numericIds)

    allMarkdownContent.push(`# HTX Private REST API API Documentation`)

    if (numericContents && numericContents.length > 0) {
      for (const item of numericContents) {
        const markdown = convertToMarkdown(item)
        allMarkdownContent.push(markdown)
      }
      logger.info(`Processed ${numericContents.length} category descriptions.`)
    } else {
      logger.info('No matching content found for numeric IDs (category descriptions).')
    }

    allMarkdownContent.push(`# Endpoints`)

    // Process other URLs (specific endpoints)
    for (const urlPath of config.otherUrls) {
      const fullUrl = `${config.baseUrl}?id=${urlPath}`
      logger.info(`Processing endpoint URL: ${fullUrl}`)

      const content = await scrapePageForEndpoint(browser, fullUrl)
      if (content && content.length > 0) {
        const markdown = convertToMarkdown(content.join('\n\n'))
        allMarkdownContent.push(markdown)
      } else {
        logger.warn(`No content found for ${fullUrl}`)
      }

      // Add a delay between requests to avoid rate limiting
      logger.info('Waiting 5 seconds before next request...')
      await sleep(5000)
    }

    // Write the combined markdown content to the single output file
    if (allMarkdownContent.length > 0) {
      const allMarkdownContentString = allMarkdownContent.join('\n\n')

      await writeFile(outputPath, allMarkdownContentString)
      logger.success(`Saved combined API documentation to ${outputPath}`)
    } else {
      logger.info('No content was scraped from any URL.')
    }
  } catch (error) {
    logger.error('Error in main function:', error.message)
    logger.error('Error stack:', error.stack)
  } finally {
    await browser.close()
  }
}

main().catch(error => logger.error('Unhandled error in main:', error))
