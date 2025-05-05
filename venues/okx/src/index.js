"use strict"

import puppeteer from "puppeteer"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"
import { JSDOM } from "jsdom"
import {
  readFileSync,
  writeFileSync,
  existsSync,
  unlinkSync,
  readdirSync
} from "fs"
import { join, resolve } from "path"

/**
 * Extracts sections from the document based on the section configuration
 * @param {Document} document - The JSDOM document
 * @param {Section} section - The section configuration
 * @returns {Array<[string, string]>} Array of [id, html] pairs
 */
function extractSections(document, section) {
  const extractedSections = []

  // Process H1 sections
  const h1Elements = document.querySelectorAll("h1")
  for (const h1 of h1Elements) {
    const id = h1.getAttribute("id")
    if (!id || !id.includes(section.h1_match)) continue

    console.log(`Found H1 section: ${id}`)

    // Process H2 sections within matching H1
    let sibling = h1.nextElementSibling
    while (sibling) {
      if (sibling.tagName === "H2") {
        const h2Id = sibling.getAttribute("id")
        if (h2Id && h2Id.includes(section.h2_match)) {
          console.log(`Found H2 section: ${h2Id}`)

          if (section.include_h2_html) {
            const sectionHtml = extractSectionContent(sibling)
            extractedSections.push([h2Id, sectionHtml])
          }

          // Process H3 sections within matching H2
          let h2Sibling = sibling.nextElementSibling
          while (h2Sibling) {
            if (h2Sibling.tagName === "H3") {
              const h3Id = h2Sibling.getAttribute("id")
              if (
                h3Id &&
                section.h3_matches.some(pattern => h3Id.includes(pattern))
              ) {
                const sectionHtml = extractSectionContent(h2Sibling)
                extractedSections.push([h3Id, sectionHtml])
                console.log(`Found H3 section: ${h3Id}`)
              }
            }
            h2Sibling = h2Sibling.nextElementSibling
          }
        }
      }
      sibling = sibling.nextElementSibling
    }
  }

  return extractedSections
}

/**
 * Extracts the content of a section including all siblings until the next heading
 * @param {Element} node - The starting node
 * @returns {string} The HTML content of the section
 */
function extractSectionContent(node) {
  let sectionHtml = node.outerHTML
  let sibling = node.nextElementSibling

  while (sibling) {
    if (sibling.tagName.match(/^H[1-3]$/)) break
    sectionHtml += sibling.outerHTML
    sibling = sibling.nextElementSibling
  }

  return sectionHtml
}

/**
 * Processes a single configuration file
 * @param {Document} document - The JSDOM document
 * @param {Object} config - The configuration loaded from a file
 */
async function processConfig(document, config) {
  console.log(`Processing configuration: ${config.name}`)

  // Extract sections based on each section configuration
  const allExtractedSections = []
  for (const section of config.sections) {
    const extracted = extractSections(document, section)
    allExtractedSections.push(...extracted)
  }

  if (allExtractedSections.length === 0) {
    console.log(`Warning: No sections found for configuration '${config.name}'`)
    return
  }

  // Create a combined markdown string
  let combinedMarkdown = `# OKX API Documentation - ${config.name}\n\n`

  // Convert each section to markdown
  const turndownService = new TurndownService({
    codeBlockStyle: "fenced",
    fence: "```"
  })
  turndownService.use(gfm)

  // Add custom rule to preserve line breaks in table cells
  turndownService.addRule("tableCellWithBr", {
    filter: "td",
    replacement: (content, node) => {
      const cellContent = node.innerHTML.replace(/<br\s*\/?>/gi, "<br>")
      return `| ${cellContent} `
    }
  })

  for (const [id, html] of allExtractedSections) {
    const markdown = turndownService.turndown(html)
    combinedMarkdown += markdown + "\n\n---\n\n"
  }

  // Save the combined markdown to the configured output file
  writeFileSync(config.output_file, combinedMarkdown)
  console.log(`Created documentation file: ${config.output_file}`)
}

/**
 * Load all configuration files from the config directory
 * @returns {Array<Object>} Array of configuration objects
 */
function loadConfigurations() {
  const configDir = join(process.cwd(), "config")
  if (!existsSync(configDir)) {
    console.error(
      "Config directory not found. Please create a config directory with JSON configuration files."
    )
    process.exit(1)
  }

  const configFiles = readdirSync(configDir)
    .filter(file => file.endsWith(".json"))
    .map(file => join(configDir, file))

  if (configFiles.length === 0) {
    console.error("No configuration files found in the config directory.")
    process.exit(1)
  }

  return configFiles.map(file => {
    try {
      return JSON.parse(readFileSync(file, "utf8"))
    } catch (error) {
      console.error(`Error parsing configuration file ${file}:`, error)
      process.exit(1)
    }
  })
}

/**
 * Main function to run the extraction process
 */
async function main() {
  try {
    let configs = []

    // Check if a specific config file is provided as a command-line argument
    if (process.argv.length > 2) {
      const configPath = process.argv[2]
      if (existsSync(configPath)) {
        try {
          const config = JSON.parse(readFileSync(configPath, "utf8"))
          configs = [config]
          console.log(`Using config file: ${configPath}`)
        } catch (error) {
          console.error(
            `Error parsing configuration file ${configPath}:`,
            error
          )
          process.exit(1)
        }
      } else {
        console.error(`Configuration file not found: ${configPath}`)
        process.exit(1)
      }
    } else {
      // Load all configurations from the config directory
      configs = loadConfigurations()
    }

    if (configs.length === 0) {
      console.error("No valid configurations found.")
      process.exit(1)
    }

    // Get URL from the first config (all configs should have the same URL)
    const url = configs[0].url
    console.log(`Fetching documentation from ${url}`)

    // Launch browser and get page content
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: "networkidle0" })
    const content = await page.content()
    await browser.close()

    // Save HTML for reference
    writeFileSync("okx.html", content)
    console.log("Saved raw HTML to okx.html")

    // Parse HTML with JSDOM
    const dom = new JSDOM(content)
    const document = dom.window.document

    const darkBoxes = dom.window.document.querySelectorAll("div.dark-box")
    darkBoxes.forEach(box => box.remove())

    // Remove "Response Example" blockquotes
    const responseExamples = document.querySelectorAll("blockquote")
    responseExamples.forEach(blockquote => {
      const text = blockquote.textContent.trim()
      if (text.toLowerCase().includes("example")) {
        blockquote.remove()
      }

      if (text.toLowerCase().includes("format description")) {
        blockquote.remove()
      }
    })

    // Remove the Highlight divs
    const highlights = document.querySelectorAll("div.highlight")
    highlights.forEach(highlight => highlight.remove())

    // Process each configuration
    for (const config of configs) {
      await processConfig(document, config)
    }

    // Clean up
    if (existsSync("okx.html")) {
      unlinkSync("okx.html")
    }

    console.log("All documentation files have been generated successfully!")
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

// Run the main function
main()
