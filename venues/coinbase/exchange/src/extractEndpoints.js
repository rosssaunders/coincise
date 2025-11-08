/**
 * Coinbase Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from reference pages
 */
"use strict"

import { launchBrowser, configurePage } from "../../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../../shared/turndown.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://docs.cdp.coinbase.com/exchange/reference"
const OUTPUT_DIR = path.join(__dirname, "../../../../docs/coinbase/endpoints")

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
 * Determine if endpoint is public or private based on authentication requirements
 */
const isPublicEndpoint = content => {
  // Check for authentication headers in the content
  const hasCBAccessKey = content.includes("CB-ACCESS-KEY") || content.includes("CB-ACCESS-Key")
  const hasCBAccessSign = content.includes("CB-ACCESS-SIGN") || content.includes("CB-ACCESS-Signature")
  const hasCBAccessTimestamp = content.includes("CB-ACCESS-TIMESTAMP") || content.includes("CB-ACCESS-Timestamp")
  const hasCBAccessPassphrase = content.includes("CB-ACCESS-PASSPHRASE") || content.includes("CB-ACCESS-Passphrase")
  
  const hasAuthHeaders = hasCBAccessKey || hasCBAccessSign || hasCBAccessTimestamp || hasCBAccessPassphrase
  
  // Also check for explicit mentions of authentication
  const requiresAuth = content.includes("API Key Permissions") || 
                       content.toLowerCase().includes("authentication required") ||
                       content.toLowerCase().includes("requires authentication")
  
  return !hasAuthHeaders && !requiresAuth
}

/**
 * Extract endpoint documentation
 */
const extractEndpoint = async (page, turndownService, operationId) => {
  const url = `${BASE_URL}/${operationId}`
  
  console.log(`  Extracting ${operationId}...`)
  
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 90000
  })

  await page.waitForSelector("#content", { timeout: 90000 })

  const endpointData = await page.evaluate(() => {
    const content = document.querySelector("#content")
    const title = document.querySelector("#page-title, h1")
    
    // Check if this is a 404 page
    const bodyText = content ? content.textContent : ""
    const is404 = title && title.textContent.includes("Page Not Found") && 
                  bodyText.includes("We couldn't find the page")
    
    // Try to find the endpoint method and path
    const methodMatch = bodyText.match(/(GET|POST|PUT|DELETE|PATCH)\s+(\/[^\s\n]*)/i)
    
    return {
      html: content ? content.innerHTML : "",
      title: title ? title.textContent.trim() : "",
      method: methodMatch ? methodMatch[1].toUpperCase() : "GET",
      path: methodMatch ? methodMatch[2] : "/unknown",
      is404
    }
  })

  // Skip 404 pages
  if (endpointData.is404) {
    console.log(`    ⚠️  Skipping - page not found (404)`)
    return null
  }

  const markdown = turndownService.turndown(endpointData.html)
  
  // Build endpoint file content
  const method = endpointData.method
  const endpointPath = endpointData.path
  const title = endpointData.title || operationId
  
  const content = `# ${method} ${endpointPath}

**Source:**
[${title}](${url})

## Authentication

${isPublicEndpoint(markdown) ? "Not Required (Public Endpoint)" : "Required (Private Endpoint)"}

${markdown}
`

  return {
    method,
    path: endpointPath,
    operationId,
    sourceUrl: url,
    content,
    isPublic: isPublicEndpoint(markdown)
  }
}

/**
 * List of known Coinbase Exchange API endpoints
 * This list should be expanded as new endpoints are discovered
 */
const KNOWN_ENDPOINTS = [
  // Accounts
  "exchangerestapi_getaccounts",
  "exchangerestapi_getaccount",
  "exchangerestapi_getaccountledger",
  "exchangerestapi_getaccountholds",
  "exchangerestapi_getaccounttransfers",
  
  // Orders
  "exchangerestapi_postorders",
  "exchangerestapi_deleteorders",
  "exchangerestapi_deleteorder",
  "exchangerestapi_getorders",
  "exchangerestapi_getorder",
  
  // Fills
  "exchangerestapi_getfills",
  
  // Limits
  "exchangerestapi_getexchangelimits",
  
  // Deposits
  "exchangerestapi_postdepositcoinbaseaccount",
  "exchangerestapi_postdepositpaymentmethod",
  "exchangerestapi_getdeposits",
  "exchangerestapi_getdeposit",
  "exchangerestapi_getpaymentmethods",
  
  // Withdrawals
  "exchangerestapi_postwithdrawcoinbaseaccount",
  "exchangerestapi_postwithdrawcrypto",
  "exchangerestapi_postwithdrawpaymentmethod",
  "exchangerestapi_postwithdrawfeeestimate",
  "exchangerestapi_getwithdrawals",
  "exchangerestapi_getwithdrawal",
  
  // Stablecoins
  "exchangerestapi_poststablecoinconversions",
  
  // Payment Methods
  "exchangerestapi_getcoinbaseaccounts",
  
  // Fees
  "exchangerestapi_getfees",
  
  // Reports
  "exchangerestapi_postreports",
  "exchangerestapi_getreport",
  
  // Profiles
  "exchangerestapi_getprofiles",
  "exchangerestapi_getprofile",
  "exchangerestapi_postprofile",
  "exchangerestapi_putprofile",
  "exchangerestapi_deleteprofile",
  
  // Margin (deprecated but may still be documented)
  "exchangerestapi_getmarginprofileinformation",
  "exchangerestapi_getbuyingpower",
  "exchangerestapi_getwithdrawalpower",
  "exchangerestapi_getallwithdrawalpower",
  "exchangerestapi_getexitstatus",
  "exchangerestapi_getliquidationhistory",
  "exchangerestapi_getpositionrefreshfees",
  "exchangerestapi_getstatus",
  
  // Oracle
  "exchangerestapi_getcryptocurrencies",
  
  // Products (Public)
  "exchangerestapi_getproducts",
  "exchangerestapi_getproduct",
  "exchangerestapi_getproductbook",
  "exchangerestapi_getproductcandles",
  "exchangerestapi_getproductstats",
  "exchangerestapi_getproductticker",
  "exchangerestapi_getproducttrades",
  
  // Currencies (Public)
  "exchangerestapi_getcurrencies",
  "exchangerestapi_getcurrency",
  
  // Time (Public)
  "exchangerestapi_gettime",
  
  // Conversions
  "exchangerestapi_postconversions",
  "exchangerestapi_getconversion",
  
  // Address Book
  "exchangerestapi_getaddressbook",
  "exchangerestapi_postaddresses",
  "exchangerestapi_deleteaddress",
  
  // Wallets
  "exchangerestapi_getwallets",
  "exchangerestapi_getwallet",
  
  // Wrapped Assets
  "exchangerestapi_getwrappedassets",
  "exchangerestapi_getwrappedasset",
  "exchangerestapi_getstakedholdingsperstakingproduct",
  "exchangerestapi_poststakewrap",
  "exchangerestapi_postunstakewrap",
  "exchangerestapi_getstakewrap",
  "exchangerestapi_getwrapconversionrate"
]

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting endpoint documentation extraction for Coinbase Exchange...")
  console.log(`Will attempt to extract ${KNOWN_ENDPOINTS.length} known endpoints`)

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  // Set longer timeouts for Coinbase
  await page.setDefaultNavigationTimeout(90000)
  await page.setDefaultTimeout(90000)

  const turndownBuilder = createTurndownBuilder()
  const turndownService = turndownBuilder.build()

  try {
    // Ensure output directories exist
    const publicDir = path.join(OUTPUT_DIR, "public")
    const privateDir = path.join(OUTPUT_DIR, "private")
    await ensureDir(publicDir)
    await ensureDir(privateDir)

    let successCount = 0
    let errorCount = 0
    let publicCount = 0
    let privateCount = 0

    for (const operationId of KNOWN_ENDPOINTS) {
      try {
        const endpoint = await extractEndpoint(page, turndownService, operationId)
        
        // Skip if endpoint returned null (404 page)
        if (!endpoint) {
          errorCount++
          continue
        }
        
        // Determine output directory
        const outputDir = endpoint.isPublic ? publicDir : privateDir
        const filename = generateFilename(endpoint.method, endpoint.path)
        const filePath = path.join(outputDir, filename)
        
        await writeFile(filePath, endpoint.content)
        
        if (endpoint.isPublic) {
          publicCount++
        } else {
          privateCount++
        }
        
        successCount++
      } catch (error) {
        console.error(`  ❌ Failed to extract ${operationId}: ${error.message}`)
        errorCount++
      }
    }

    console.log("\n" + "=".repeat(50))
    console.log(`✅ Endpoint extraction completed`)
    console.log(`   Total attempted: ${KNOWN_ENDPOINTS.length}`)
    console.log(`   Successfully extracted: ${successCount}`)
    console.log(`   Public endpoints: ${publicCount}`)
    console.log(`   Private endpoints: ${privateCount}`)
    console.log(`   Failed: ${errorCount}`)
    console.log("=".repeat(50))
  } finally {
    await browser.close()
  }
}

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}

export { main }
