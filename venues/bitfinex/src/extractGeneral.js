/**
 * Bitfinex Exchange - General Documentation Extraction
 * Extracts core documentation sections from Bitfinex API docs
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"
import { createTurndownBuilder } from "../../shared/turndown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "https://docs.bitfinex.com"
const OUTPUT_DIR = path.resolve(__dirname, "../../../docs/bitfinex")

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
  console.log(`Writing ${path.basename(filePath)}...`)
  fs.writeFileSync(filePath, content, "utf8")
  console.log(`✅ Written ${path.basename(filePath)}`)
}

/**
 * Extract content from a specific page section
 */
const extractPageSection = async (page, url, turndownService, sectionTitle = null) => {
  console.log(`Navigating to ${url}...`)
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 30000
  })

  const html = await page.evaluate(section => {
    const main = document.querySelector("main, article, .content-body, [role=\"main\"]")
    if (!main) return ""

    // Clone to avoid modifying the original
    const clone = main.cloneNode(true)

    // Remove navigation elements and sidebars
    const elementsToRemove = clone.querySelectorAll(
      "nav, aside, .sidebar, .table-of-contents, .pagination, button"
    )
    elementsToRemove.forEach(el => el.remove())

    // If a specific section is requested, extract only that section
    if (section) {
      const headings = Array.from(clone.querySelectorAll("h1, h2, h3"))
      let sectionStart = null
      let sectionEnd = null

      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i]
        if (heading.textContent.trim().includes(section)) {
          sectionStart = heading
          // Find next heading of same or higher level
          const startLevel = parseInt(heading.tagName.substring(1))
          for (let j = i + 1; j < headings.length; j++) {
            const nextHeading = headings[j]
            const nextLevel = parseInt(nextHeading.tagName.substring(1))
            if (nextLevel <= startLevel) {
              sectionEnd = nextHeading
              break
            }
          }
          break
        }
      }

      if (sectionStart) {
        const sectionContent = document.createElement("div")
        let currentElement = sectionStart
        while (currentElement && currentElement !== sectionEnd) {
          sectionContent.appendChild(currentElement.cloneNode(true))
          currentElement = currentElement.nextElementSibling
        }
        return sectionContent.innerHTML
      }
    }

    return clone.innerHTML
  }, sectionTitle)

  return turndownService.turndown(html)
}

/**
 * Extract Network Connectivity information
 */
const extractNetworkConnectivity = async (page, turndownService) => {
  console.log("Extracting network connectivity information...")

  const introContent = await extractPageSection(
    page,
    `${BASE_URL}/docs/introduction`,
    turndownService
  )

  const restGeneralContent = await extractPageSection(
    page,
    `${BASE_URL}/docs/rest-general`,
    turndownService,
    "URL"
  )

  const markdown = `# Network Connectivity

## Introduction

${introContent}

## REST API

${restGeneralContent}

---
Source: ${BASE_URL}/docs/introduction
Source: ${BASE_URL}/docs/rest-general
`

  return markdown
}

/**
 * Extract Authentication documentation
 */
const extractAuthentication = async (page, turndownService) => {
  console.log("Extracting authentication information...")

  const authContent = await extractPageSection(
    page,
    `${BASE_URL}/docs/authentication`,
    turndownService
  )

  const restAuthContent = await extractPageSection(
    page,
    `${BASE_URL}/docs/rest-auth`,
    turndownService,
    "Authentication"
  )

  const markdown = `# Authentication

${authContent}

## REST Authentication Details

${restAuthContent}

---
Source: ${BASE_URL}/docs/authentication
Source: ${BASE_URL}/docs/rest-auth
`

  return markdown
}

/**
 * Extract Rate Limits documentation
 */
const extractRateLimits = async (page, turndownService) => {
  console.log("Extracting rate limits information...")

  const rateLimitsContent = await extractPageSection(
    page,
    `${BASE_URL}/docs/requirements-and-limitations`,
    turndownService,
    "Limitations"
  )

  const restGeneralRateLimits = await extractPageSection(
    page,
    `${BASE_URL}/docs/rest-general`,
    turndownService,
    "Rate Limits"
  )

  const markdown = `# Rate Limits

## General Rate Limits

${rateLimitsContent}

## REST API Rate Limits

${restGeneralRateLimits}

---
Source: ${BASE_URL}/docs/requirements-and-limitations
Source: ${BASE_URL}/docs/rest-general
`

  return markdown
}

/**
 * Extract Error Codes documentation
 */
const extractErrorCodes = async (page, turndownService) => {
  console.log("Extracting error codes information...")

  const errorCodesContent = await extractPageSection(
    page,
    `${BASE_URL}/docs/abbreviations-glossary`,
    turndownService,
    "Error/Info Codes"
  )

  const markdown = `# Error Codes

${errorCodesContent}

---
Source: ${BASE_URL}/docs/abbreviations-glossary
`

  return markdown
}

/**
 * Extract Response Formats documentation
 */
const extractResponseFormats = async (page, turndownService) => {
  console.log("Extracting response formats information...")

  const glossaryContent = await extractPageSection(
    page,
    `${BASE_URL}/docs/abbreviations-glossary`,
    turndownService
  )

  const markdown = `# Response Formats

## Abbreviation Glossary

${glossaryContent}

---
Source: ${BASE_URL}/docs/abbreviations-glossary
`

  return markdown
}

/**
 * Extract Change Log documentation
 */
const extractChangeLog = async (page, turndownService) => {
  console.log("Extracting change log information...")

  const changelogContent = await extractPageSection(
    page,
    `${BASE_URL}/docs/changelog`,
    turndownService
  )

  const markdown = `# Change Log

${changelogContent}

---
Source: ${BASE_URL}/docs/changelog
`

  return markdown
}

/**
 * Main extraction function
 */
const extractGeneral = async () => {
  console.log("Starting Bitfinex general documentation extraction...")

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await configurePage(page)

    // Create turndown service
    const turndownService = createTurndownBuilder().build()

    // Ensure output directory exists
    ensureDir(OUTPUT_DIR)

    // Extract each core documentation section
    const networkConnectivity = await extractNetworkConnectivity(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "network_connectivity.md"), networkConnectivity)

    const authentication = await extractAuthentication(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "authentication.md"), authentication)

    const rateLimits = await extractRateLimits(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits)

    const errorCodes = await extractErrorCodes(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "error_codes.md"), errorCodes)

    const responseFormats = await extractResponseFormats(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "response_formats.md"), responseFormats)

    const changeLog = await extractChangeLog(page, turndownService)
    writeFile(path.join(OUTPUT_DIR, "change_log.md"), changeLog)

    console.log("\n✅ General documentation extraction completed successfully!")
  } finally {
    await browser.close()
  }
}

/**
 * Entry point with error handling
 */
const main = async () => {
  try {
    await extractGeneral()
  } catch (error) {
    console.error("Error during extraction:", error)
    console.error(error.stack)
    process.exit(1)
  }
}

main()
