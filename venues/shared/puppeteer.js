"use strict"

import puppeteer from "puppeteer"

/**
 * Launch a new Puppeteer browser instance with standardized configuration
 * @returns {Promise<Browser>} Puppeteer browser instance
 */
export const launchBrowser = async () => {
  const browser = await puppeteer.launch({
    //headless: false, // Uncommented to run in non-headless mode for debugging
    headless: "new", // Use the new headless mode for better performance and stability
    args: [
      "--no-sandbox", // Disables Chrome's sandbox for container compatibility
      "--disable-setuid-sandbox", // Further sandbox disabling for more environments
      "--disable-dev-shm-usage", // Prevents crashes in limited memory environments like Docker
      "--disable-gpu", // Disables GPU hardware acceleration which isn't needed for scraping
      "--single-process", // Run Chrome in single process mode for simpler resource management
      "--no-first-run", // Skip the first run setup dialog
      "--no-zygote", // Don't use zygote process for launching new renderer processes
      "--disable-extensions", // Disable Chrome extensions to reduce overhead and potential conflicts
      "--disable-component-extensions-with-background-pages", // Disable extensions with background pages
      "--disable-background-timer-throttling", // Prevent background timers from being throttled
      "--disable-backgrounding-occluded-windows", // Prevent throttling of invisible windows
      "--disable-web-security", // Disable same-origin policy for easier cross-domain scraping
      "--disable-features=IsolateOrigins,site-per-process", // Disable site isolation for better scraping
      "--password-store=basic" // Use basic password store to avoid keychain integration issues
    ],
    timeout: 30000, // 30 second timeout for browser launch
    ignoreHTTPSErrors: true // Ignore HTTPS errors to handle sites with invalid certificates
  })

  return browser
}

/**
 * Configure a Puppeteer page with standardized settings
 * @param {Page} page - Puppeteer page instance
 * @param {Object} options - Configuration options
 * @param {boolean} options.logWebsiteMessages - Whether to log messages from the website (defaults to false)
 * @param {string} options.customLogPrefix - Custom prefix for logs from page.evaluate (defaults to '[PuppeteerScript]')
 * @returns {Promise<void>}
 */
const configurePage = async (page, options = {}) => {
  const { logWebsiteMessages = false, customLogPrefix = "[PuppeteerScript]" } =
    options

  await page.setViewport({ width: 1920, height: 1080 }) // Set a standard high-resolution viewport size
  await page.setDefaultNavigationTimeout(30000) // Set 30 second timeout for navigation operations
  await page.setDefaultTimeout(30000) // Set 30 second timeout for other waiting operations

  // Setup console event listeners to pipe browser logs to Node.js
  page.on("console", async msg => {
    try {
      // Try to get the location of the console message
      const location = msg.location() // Get file/line info about where the console message originated
      const url = location?.url // Extract the URL from the location object
      const messageText = msg.text() // Get the actual message text content

      // Custom logic to determine if a message is from our code
      const isFromOurCode = messageText.startsWith(customLogPrefix)

      // Skip website messages unless explicitly enabled
      if (!logWebsiteMessages && url && !isFromOurCode) {
        return // Filter out website messages if not explicitly enabled
      }

      // Log messages from our code or if website logging is enabled
      const type = msg.type() // Get message type (log, warn, error, etc.)
      switch (type) {
        case "log":
          console.log(`[Browser] ${messageText}`) // Standard console.log messages
          break
        case "warning":
          console.warn(`[Browser] ${messageText}`) // Warning messages with appropriate color/format
          break
        case "error":
          console.error(`[Browser] ${messageText}`) // Error messages with appropriate color/format
          break
        default:
          console.log(`[Browser/${type}] ${messageText}`) // Other message types like info, debug, etc.
      }
    } catch (error) {
      // If there's an error processing the console message, log it
      console.error(
        `[Browser] Error processing console message: ${error.message}`
      )
    }
  })

  // Setup error event listeners
  page.on("pageerror", error => {
    if (logWebsiteMessages) {
      console.error(`[Browser] Page error: ${error.message}`) // Log JavaScript errors that occur on the page
    }
  })

  page.on("error", error => {
    console.error(`[Browser] Error: ${error.message}`) // Log fatal browser/page errors (always logged)
  })

  // Enable request interception
  // await page.setRequestInterception(true) // Enable ability to monitor and modify network requests

  // Block unnecessary resources
  // page.on("request", request => {
  //   const resourceType = request.resourceType() // Get the type of resource being requested
  //   if (["document", "script", "xhr", "fetch"].includes(resourceType)) {
  //     request.continue() // Allow HTML, JavaScript, and API requests to proceed
  //   } else {
  //     request.abort() // Block images, fonts, stylesheets, etc. to improve performance
  //   }
  // })

  // Inject a helper function to make custom logging easier from page.evaluate
  await page.evaluateOnNewDocument(prefix => {
    window.puppeteerLog = message => {
      console.log(`${prefix} ${message}`) // Helper for standard logs from page context
    }
    window.puppeteerWarn = message => {
      console.warn(`${prefix} ${message}`) // Helper for warning logs from page context
    }
    window.puppeteerError = message => {
      console.error(`${prefix} ${message}`) // Helper for error logs from page context
    }
  }, customLogPrefix)
}

/**
 * Creates and sets up a new page, navigates to URL and waits for content
 * @param {string} url - URL to navigate to
 * @param {Object} options - Additional options
 * @param {string} options.selector - CSS selector to wait for
 * @param {number} options.timeout - Timeout in milliseconds
 * @param {Browser} options.browser - Puppeteer browser instance
 * @returns {Promise<Page>} Configured Puppeteer page at the requested URL
 */
export const getPage = async (url, options = {}) => {
  const { selector = "body", timeout = 30000, browser } = options

  if (!browser) {
    throw new Error("Browser instance is required") // Ensure browser instance is provided
  }

  try {
    const page = await browser.newPage() // Create a new page in the browser
    await configurePage(page, options) // Apply standard configuration to the page

    await page.goto(url, {
      waitUntil: "networkidle2", // Wait until network is idle (no more than 2 connections for 500ms)
      timeout // Apply the specified timeout for navigation
    })

    // Wait for the content to load
    await page.waitForSelector(selector, { timeout }) // Wait for a specific element to appear in the DOM

    return page
  } catch (error) {
    console.error(`Error setting up page for ${url}:`, error)
    throw error // Re-throw for handling by the caller
  }
}

/**
 * Fetch content from a URL using Puppeteer
 * @param {string} url - URL to fetch
 * @param {Object} options - Additional options
 * @param {string} options.selector - CSS selector to wait for
 * @param {number} options.timeout - Timeout in milliseconds
 * @param {Browser} options.browser - Puppeteer browser instance
 * @returns {Promise<string>} HTML content of the page
 */
export const getContent = async (url, options = {}) => {
  let page = null

  try {
    page = await getPage(url, options) // Get a configured page at the requested URL

    // Extract the page content
    const content = await page.evaluate(sel => {
      const el = document.querySelector(sel) // Find the element specified by the selector
      return el ? el.innerHTML : document.body.innerHTML // Return its content or fall back to body content
    }, options.selector || "body")

    if (!content) {
      throw new Error(`No content found on ${url}`) // Ensure we have content to return
    }

    return content
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error)
    throw error // Re-throw for handling by the caller
  } finally {
    if (page) await page.close().catch(console.error) // Always close the page to free resources
  }
}

/**
 * Add a polite delay between requests
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export const politeDelay = ms => new Promise(resolve => setTimeout(resolve, ms)) // Simple delay function to avoid overloading servers
