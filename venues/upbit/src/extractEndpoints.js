/**
 * Upbit Exchange - Endpoint Documentation Extraction
 * Extracts individual endpoint documentation from Upbit API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/upbit/endpoints")

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
 * Generate filename from endpoint name
 * Since Upbit docs don't expose HTTP methods clearly, we'll use the endpoint name
 */
const generateFilename = endpointName => {
  const sanitized = sanitizeFilename(endpointName)
  return `${sanitized}.md`
}

/**
 * Extract structured data from a single endpoint page
 */
const extractEndpointData = async (page, url) => {
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 30000
  })

  // Wait for content to load
  await page.waitForSelector('main, [role="main"], .main-content', {
    timeout: 10000
  })

  // Add delay for dynamic content
  await new Promise(resolve => setTimeout(resolve, 2000))

  const data = await page.evaluate(() => {
    // Extract HTTP method - look for class names
    let method = 'GET'
    const methodClasses = ['APIMethod_get', 'APIMethod_post', 'APIMethod_put', 'APIMethod_delete', 'APIMethod_patch']
    for (const cls of methodClasses) {
      if (document.querySelector(`[class*="${cls}"]`)) {
        method = cls.split('_')[1].toUpperCase()
        break
      }
    }

    // Extract endpoint path
    const urlElement = document.querySelector('[class*="headline-container-article-info-url"]')
    const fullUrl = urlElement ? urlElement.textContent.trim() : ''
    // Extract path from URL like https://{region}-api.upbit.com/v1/ticker
    const pathMatch = fullUrl.match(/\/v1\/[^?#\s]*/)
    const path = pathMatch ? pathMatch[0] : ''

    // Extract title
    const h1Element = document.querySelector('h1')
    const title = h1Element ? h1Element.textContent.trim() : ''

    // Extract description - look for paragraphs in the main area
    const descriptionElements = []
    // Look for paragraphs that are in the description area (not in tables or code)
    const paragraphs = document.querySelectorAll('main p, [role="main"] p')
    for (const p of paragraphs) {
      const text = p.textContent.trim()
      // Skip unwanted text
      if (text && 
          !text.includes('Updated about') && 
          !text.includes('Base URL') &&
          !text.startsWith('Check the proper endpoint') &&
          !text.includes('Singapore (sg):') &&
          !text.includes('Indonesia (id):') &&
          !text.includes('Thailand (th):') &&
          descriptionElements.length < 2) {
        descriptionElements.push(text)
      }
    }
    const description = descriptionElements.join('\n\n')

    // Extract rate limit info - look for specific text pattern
    const pageText = document.body.textContent
    const rateLimitMatch = pageText.match(/Up to (\d+) calls per second[^.]*\./)
    const rateLimit = rateLimitMatch ? rateLimitMatch[0] : ''

    // Extract request parameters - look for Query Params form
    const requestParams = []
    const requestForm = document.querySelector('form[name="Parameters"]')
    if (requestForm) {
      // Only get top-level field groups (not nested ones)
      const fields = requestForm.querySelectorAll('.form-group.field')
      const seen = new Set()
      
      for (const field of fields) {
        // Skip if this is inside a nested array/object
        if (field.closest('.field-array') && field.closest('.field-array') !== field) {
          continue
        }
        
        const label = field.querySelector('label')
        const typeDiv = field.querySelector('[class*="Param-type"]')
        const requiredDiv = field.querySelector('[class*="Param-required"]')
        const descDiv = field.querySelector('[class*="field-description"]')
        
        if (!label) continue
        
        const name = label.textContent.trim()
        const type = typeDiv ? typeDiv.textContent.trim() : 'string'
        const required = requiredDiv ? 'Yes' : 'No'
        const description = descDiv ? descDiv.textContent.trim() : ''
        
        if (name && !seen.has(name)) {
          seen.add(name)
          requestParams.push({ name, type, required, description })
        }
      }
    }

    // Extract response parameters - only from 200 success responses
    const responseParams = []
    const responseForms = document.querySelectorAll('form.param-type.response')
    const seenResponse = new Set()
    
    for (const form of responseForms) {
      // Check if this is a 200 response section (skip error responses)
      const parent = form.closest('[class*="AccordionPanel"]')
      if (parent) {
        // Look for status code in the accordion label
        const label = parent.querySelector('[class*="APIResponseSchemaPicker-label"]')
        // Only process 200-level responses
        if (label && !label.textContent.includes('200')) {
          continue
        }
      }
      
      const fields = form.querySelectorAll('.form-group.field')
      
      for (const field of fields) {
        const label = field.querySelector('label')
        const typeDiv = field.querySelector('[class*="Param-type"]')
        const descDiv = field.querySelector('[class*="field-description"]')
        
        if (!label) continue
        
        const name = label.textContent.trim()
        const type = typeDiv ? typeDiv.textContent.trim() : 'string'
        const description = descDiv ? descDiv.textContent.trim() : ''
        
        if (name && !seenResponse.has(name)) {
          seenResponse.add(name)
          responseParams.push({ name, type, description })
        }
      }
    }

    // Extract code examples
    const codeExamples = []
    const seenCode = new Set()
    
    // Get code blocks from the playground section
    const codeBlocks = document.querySelectorAll('pre code, pre')
    for (const block of codeBlocks) {
      let text = block.textContent.trim()
      
      // Skip very short blocks
      if (text.length < 10) continue
      
      // Skip blocks that are just line numbers or single values
      if (text.match(/^[\d\s]+$/)) continue
      if (text.match(/^["'][^"']+["']$/)) continue
      
      // Clean up code - remove line number prefixes and escape sequences
      text = text.replace(/^x+\d+\s+\d+/gm, '')  // Remove "xxxxxxxxxx54 1" prefix
      text = text.replace(/\\\d+/g, '')           // Remove "\2", "\3" escape sequences
      text = text.replace(/\s+\d+\s+(?=[{])/g, ' ')  // Remove " 2  " before {
      text = text.replace(/,\d+\s+/g, ', ')       // Remove line numbers after commas
      text = text.trim()
      
      // NOW check for duplicates and length after cleaning
      if (text.length < 10 || seenCode.has(text)) continue
      seenCode.add(text)
      
      // Determine language based on cleaned text
      let lang = 'bash'
      if (text.startsWith('{') || text.startsWith('[')) {
        lang = 'json'
      } else if (text.includes('curl')) {
        lang = 'bash'
      }
      
      codeExamples.push({ lang, code: text })
    }

    return {
      method,
      path,
      title,
      description,
      rateLimit,
      requestParams,
      responseParams,
      codeExamples
    }
  })

  return data
}

/**
 * Format extracted data into standard markdown format
 */
const formatEndpointMarkdown = (data, endpointName, url, isPublic) => {
  const lines = []

  // H1 Title: HTTP Method + Path
  const title = data.path ? `${data.method} ${data.path}` : `${data.method} /v1/${endpointName}`
  lines.push(`# ${title}`)
  lines.push('')

  // Source Link (immediately after H1)
  lines.push(`**Source:** [${endpointName}](${url})`)
  lines.push('')

  // Description
  lines.push('## Description')
  lines.push('')
  if (data.description) {
    lines.push(data.description)
  } else if (data.title) {
    lines.push(data.title)
  } else {
    lines.push('Endpoint documentation.')
  }
  lines.push('')

  // Authentication
  lines.push('## Authentication')
  lines.push('')
  if (isPublic) {
    lines.push('Not Required (Public Endpoint)')
  } else {
    lines.push('Required (Private Endpoint)')
  }
  lines.push('')

  // Rate Limit
  lines.push('## Rate Limit')
  lines.push('')
  if (data.rateLimit) {
    lines.push(data.rateLimit)
    lines.push('')
    lines.push('This is measured on an IP basis and request counts are shared within the exchange.')
  } else {
    lines.push('See [Rate Limits](/docs/upbit/rate_limits.md) for rate limiting rules.')
  }
  lines.push('')

  // HTTP Request
  lines.push('## HTTP Request')
  lines.push('')
  lines.push(`\`${title}\``)
  lines.push('')

  // Request Parameters
  if (data.requestParams && data.requestParams.length > 0) {
    lines.push('## Request Parameters')
    lines.push('')
    lines.push('### Query Parameters')
    lines.push('')
    lines.push('| Parameter | Type | Required | Description |')
    lines.push('| --------- | ---- | -------- | ----------- |')
    
    data.requestParams.forEach(param => {
      const desc = param.description.replace(/\n/g, ' ').replace(/\|/g, '\\|')
      lines.push(`| ${param.name} | ${param.type} | ${param.required} | ${desc} |`)
    })
    lines.push('')
  }

  // Request Example
  if (data.codeExamples && data.codeExamples.length > 0) {
    const bashExample = data.codeExamples.find(ex => ex.lang === 'bash' || ex.code.includes('curl'))
    if (bashExample) {
      lines.push('## Request Example')
      lines.push('')
      lines.push('```bash')
      lines.push(bashExample.code)
      lines.push('```')
      lines.push('')
    }
  }

  // Response Parameters
  if (data.responseParams && data.responseParams.length > 0) {
    lines.push('## Response Parameters')
    lines.push('')
    lines.push('| Parameter | Type | Description |')
    lines.push('| --------- | ---- | ----------- |')
    
    data.responseParams.forEach(param => {
      const desc = param.description.replace(/\n/g, ' ').replace(/\|/g, '\\|')
      lines.push(`| ${param.name} | ${param.type} | ${desc} |`)
    })
    lines.push('')
  }

  // Response Example
  if (data.codeExamples && data.codeExamples.length > 0) {
    const jsonExamples = data.codeExamples.filter(ex => ex.lang === 'json')
    if (jsonExamples.length > 0) {
      lines.push('## Response Example')
      lines.push('')
      lines.push('### Success Response (200 OK)')
      lines.push('')
      lines.push('```json')
      lines.push(jsonExamples[0].code)
      lines.push('```')
      lines.push('')
    }
  }

  return lines.join('\n')
}

/**
 * Determine if an endpoint is public or private
 * Quotation endpoints are public, others require authentication
 */
const isPublicEndpoint = section => {
  const publicSections = ["quotation", "service"]
  return publicSections.includes(section.toLowerCase())
}

/**
 * Load endpoint configurations from config files
 */
const loadEndpointConfigs = () => {
  const configDir = path.resolve(__dirname, "../config")
  const configFiles = [
    "assets.json",
    "order.json",
    "withdrawal.json",
    "deposit.json",
    "service.json",
    "quotation.json"
  ]

  const allEndpoints = []

  for (const configFile of configFiles) {
    try {
      const configPath = path.join(configDir, configFile)
      if (fs.existsSync(configPath)) {
        const configData = fs.readFileSync(configPath, "utf8")
        const config = JSON.parse(configData)

        allEndpoints.push({
          section: config.section,
          endpoints: config.endpoints
        })
      }
    } catch (error) {
      console.error(`Error loading ${configFile}:`, error.message)
    }
  }

  return allEndpoints
}

/**
 * Extract all endpoints
 */
const extractEndpoints = async (page) => {
  console.log("Extracting endpoint documentation...")

  const configs = loadEndpointConfigs()
  const publicEndpoints = []
  const privateEndpoints = []

  for (const config of configs) {
    const isPublic = isPublicEndpoint(config.section)
    const targetDir = isPublic ? "public" : "private"

    console.log(
      `\nProcessing ${config.section} (${config.endpoints.length} endpoints) - ${targetDir}`
    )

    for (const endpoint of config.endpoints) {
      try {
        console.log(`  Extracting ${endpoint.name}...`)

        const data = await extractEndpointData(page, endpoint.url)
        const markdown = formatEndpointMarkdown(
          data,
          endpoint.name,
          endpoint.url,
          isPublic
        )

        const filename = generateFilename(endpoint.name)

        if (isPublic) {
          publicEndpoints.push({ filename, content: markdown })
        } else {
          privateEndpoints.push({ filename, content: markdown })
        }

        // Polite delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`  ❌ Error extracting ${endpoint.name}:`, error.message)
      }
    }
  }

  return { publicEndpoints, privateEndpoints }
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Starting endpoint documentation extraction for Upbit...")

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  try {
    // Clean up old directory structure (migration from old format)
    const oldDirs = [
      "assets",
      "order",
      "withdrawal",
      "deposit",
      "service",
      "quotation"
    ]
    const upbitDocsDir = path.resolve(__dirname, "../../../docs/upbit")

    for (const oldDir of oldDirs) {
      const dirPath = path.join(upbitDocsDir, oldDir)
      if (fs.existsSync(dirPath)) {
        console.log(`Removing old directory: ${oldDir}/`)
        fs.rmSync(dirPath, { recursive: true, force: true })
      }
    }

    // Create output directories
    const publicDir = path.join(OUTPUT_DIR, "public")
    const privateDir = path.join(OUTPUT_DIR, "private")
    ensureDir(publicDir)
    ensureDir(privateDir)

    // Extract all endpoints
    const { publicEndpoints, privateEndpoints } = await extractEndpoints(page)

    // Write public endpoints
    console.log(`\nWriting ${publicEndpoints.length} public endpoints...`)
    for (const endpoint of publicEndpoints) {
      writeFile(path.join(publicDir, endpoint.filename), endpoint.content)
    }

    // Write private endpoints
    console.log(`\nWriting ${privateEndpoints.length} private endpoints...`)
    for (const endpoint of privateEndpoints) {
      writeFile(path.join(privateDir, endpoint.filename), endpoint.content)
    }

    console.log("\n✅ Endpoint documentation extraction completed successfully")
    console.log(`   Public endpoints: ${publicEndpoints.length}`)
    console.log(`   Private endpoints: ${privateEndpoints.length}`)
  } catch (error) {
    console.error("Error during endpoint documentation extraction:", error)
    throw error
  } finally {
    await browser.close()
  }
}

// Standard entry point with error handling
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Fatal error:", error)
    console.error(error.stack)
    process.exit(1)
  })
}

export { main }
