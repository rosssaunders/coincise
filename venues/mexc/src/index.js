import fs from "fs"
import path from "path"
import process from "process"
import { fileURLToPath } from "url"
import turndownService from "./turndownService.js"
import { launchBrowserAndLoadPage } from "./puppeteerUtils.js"
import { warn, info, error, success } from "./logger.js"
import { formatMarkdown } from "../../shared/format-markdown.js"

// --- Configuration ---
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const API_CONFIGS = {
  spot: {
    inputHtmlFile: "https://mexcdevelop.github.io/apidocs/spot_v3_en",
    outputDir: "../../docs/mexc/spot",
    configDir: "../config/spot"
  },
  contract: {
    inputHtmlFile: "https://mexcdevelop.github.io/apidocs/contract_v1_en",
    outputDir: "../../docs/mexc/contract",
    configDir: "../config/contract"
  },
  broker: {
    inputHtmlFile: "https://mexcdevelop.github.io/apidocs/broker_en",
    outputDir: "../../docs/mexc/broker",
    configDir: "../config/broker"
  }
}

/**
 * Extracts sections from the HTML page
 * @param {import('puppeteer').Page} page - The Puppeteer page object
 * @returns {Promise<Object>} An object containing the extracted sections where:
 *   - Each key is the section title
 *   - Each value is an object with:
 *     - title: The section title
 *     - id: The section's HTML id (if any)
 *     - html: The complete HTML content of the section
 */
async function extractSectionsFromPage(page) {
  info("Extracting content sections...")
  return await page.evaluate(() => {
    const contentNode = document.querySelector(".content")
    if (!contentNode) {
      warn("Could not find .content element in the page", [
        "The page structure has changed",
        "The HTML file is not loaded correctly",
        "The content is in a different container element"
      ])
      return {}
    }

    const sections = {}
    let currentSection = null
    let currentSectionHtml = ""

    const children = Array.from(contentNode.childNodes)

    for (let i = 0; i < children.length; i++) {
      const node = children[i]
      const nodeName = node.nodeName.toUpperCase()

      if (nodeName === "H1") {
        // Finish previous section if any
        if (currentSection) {
          sections[currentSection.title] = {
            title: currentSection.title,
            html: currentSectionHtml
          }
        }
        currentSectionHtml = ""

        // Start new section
        const sectionTitle = node.textContent?.trim() || ""
        currentSection = {
          title: sectionTitle
        }
      } else if (currentSection) {
        // Append content to the current section
        if (node.nodeType === Node.ELEMENT_NODE) {
          currentSectionHtml += node.outerHTML || ""
        } else if (
          node.nodeType === Node.TEXT_NODE &&
          node.textContent?.trim()
        ) {
          currentSectionHtml += `<p>${node.textContent.trim()}</p>`
        }
      }
    }

    // Add the last section
    if (currentSection) {
      sections[currentSection.title] = {
        title: currentSection.title,
        html: currentSectionHtml
      }
    }

    return sections
  })
}

/**
 * Filters and orders sections based on configuration
 * @param {Object} sections - The sections object from extractSectionsFromPage
 * @param {Object} configObj - The configuration object containing includeSections array
 * @returns {Object} An object containing the filtered and ordered sections where:
 *   - Keys are section titles
 *   - Values are section objects with title, id, and html properties
 *   - Order matches the order specified in configObj.includeSections
 */
function filterSectionsByConfig(sections, configObj) {
  const includeSections = configObj.includeSections || []

  // Log warnings for any sections in config that can't be found
  includeSections.forEach(includeSection => {
    const found = Object.keys(sections).some(sectionTitle =>
      sectionTitle.toLowerCase().includes(includeSection.toLowerCase())
    )
    if (!found) {
      warn(
        `Could not find section matching "${includeSection}" in the extracted content`,
        [
          "The section name has changed in the source",
          "The section is no longer available",
          "There is a typo in the config file"
        ]
      )
    }
  })

  // Create an ordered array of sections based on config
  const orderedSections = includeSections
    .map(includeSection => {
      const sectionTitle = Object.keys(sections).find(sectionTitle =>
        sectionTitle.toLowerCase().includes(includeSection.toLowerCase())
      )
      return sectionTitle ? sections[sectionTitle] : null
    })
    .filter(Boolean) // Remove any null entries

  // Convert back to object while maintaining order
  return orderedSections.reduce((acc, section) => {
    acc[section.title] = section
    return acc
  }, {})
}

/**
 * Formats sections into markdown
 */
function formatEndpointsMarkdown(sections, configTitle) {
  let markdown = `# ${configTitle}\n\n`
  const separator = "\n\n---\n\n"

  // Iterate over sections object
  for (const [sectionTitle, section] of Object.entries(sections)) {
    // Add section title
    markdown += `## ${sectionTitle}\n\n`

    // Convert section HTML to markdown
    let sectionMarkdown = turndownService.turndown(section.html)
    markdown += sectionMarkdown.trim() + separator
  }

  // Clean up trailing separator
  if (markdown.endsWith(separator)) {
    markdown = markdown.slice(0, -separator.length)
  }
  return markdown
}

/**
 * Processes sections based on configs and generates markdown
 */
function processAndGenerateMarkdown(sectionsData, configObj) {
  info("Processing sections based on configurations...")

  // Filter sections based on this config
  const filteredSections = filterSectionsByConfig(sectionsData, configObj)

  // Generate markdown with the filtered sections
  return formatEndpointsMarkdown(filteredSections, configObj.title)
}

/**
 * Main function to extract API docs and convert to markdown
 * @param {string} apiType - The type of API to process (spot, contract, or broker)
 */
async function convertHtmlToMarkdown(apiType) {
  if (!API_CONFIGS[apiType]) {
    error(`Invalid API type: ${apiType}`, [
      `Valid API types are: ${Object.keys(API_CONFIGS).join(", ")}`
    ])
    process.exit(1)
  }

  const config = API_CONFIGS[apiType]
  let browser = null

  try {
    info(`Processing ${apiType} API documentation...`)

    // 1. Launch browser and load page
    const { browser: launchedBrowser, page } = await launchBrowserAndLoadPage(
      config.inputHtmlFile
    )
    browser = launchedBrowser

    // 2. Extract content sections
    const sectionsData = await extractSectionsFromPage(page)
    info(
      `Extracted ${Object.keys(sectionsData).length} top-level sections for ${apiType} API.`
    )

    // Create output directory if it doesn't exist
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true })
    }

    // Create config directory if it doesn't exist
    if (!fs.existsSync(config.configDir)) {
      fs.mkdirSync(config.configDir, { recursive: true })
    }

    // Read all JSON config files from the config directory
    const configFiles = fs
      .readdirSync(path.join(__dirname, config.configDir))
      .filter(file => file.endsWith(".json"))

    if (configFiles.length === 0) {
      warn(`No config files found in ${config.configDir}`, [
        "Please add JSON config files to the config directory",
        "Each config file should contain the necessary configuration for a specific API section"
      ])
      return
    }

    for (const configFile of configFiles) {
      info(`Processing ${configFile} for ${apiType} API...`)
      const configObj = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, config.configDir, configFile),
          "utf8"
        )
      )

      const markdownContent = processAndGenerateMarkdown(
        sectionsData,
        configObj
      )

      const outputFile = path.format({
        ...path.parse(configFile),
        base: undefined,
        ext: ".md"
      })
      const fullOutputPath = path.join(config.outputDir, outputFile)
      const absoluteOutputPath = path.resolve(process.cwd(), fullOutputPath)
      fs.writeFileSync(fullOutputPath, markdownContent)

      // Format the generated markdown file
      await formatMarkdown(fullOutputPath)
      info(`Formatted ${fullOutputPath} using Prettier`)

      info(`Successfully processed ${configFile} for ${apiType} API.`)
      info(`Output file: ${fullOutputPath}`)
      info(`Absolute path: ${absoluteOutputPath}`)
    }

    success(`Markdown files successfully generated for ${apiType} API`)
  } finally {
    if (browser) {
      info("Closing Puppeteer...")
      await browser.close()
    }
  }
}

// Get API type from command line arguments
const apiType = process.argv[2]

if (!apiType) {
  error("No API type specified", [
    "Usage: node index.js <api-type>",
    `Valid API types are: ${Object.keys(API_CONFIGS).join(", ")}`
  ])
  process.exit(1)
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  convertHtmlToMarkdown(apiType).catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
