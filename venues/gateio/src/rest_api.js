import fs from "fs"
import path from "path"
import process from "process"
import TurndownService from "turndown"
import { gfm, tables } from "turndown-plugin-gfm"
import { fileURLToPath } from "url"
import { downloadHtml } from "./utils.js"
import { formatMarkdown } from "../../shared/format-markdown.js"
import { JSDOM } from "jsdom"

// Get the current file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize turndown service
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced"
})
turndownService.use(gfm)
turndownService.use(tables)

// Function to delete the HTML file
const deleteHtmlFile = filePath => {
  fs.unlink(filePath, err => {
    if (err) {
      console.error("Error deleting file:", err)
      console.error("Stack trace:", err.stack)
    } else {
      console.log("Temporary HTML file deleted.")
    }
  })
}

// Function to process HTML and convert to markdown
function processSectionHtml(document, section, turndownService) {
  if (!turndownService) {
    throw new Error(`TurndownService is not initialized`)
  }

  // Find the section based on the heading id
  const heading = document.querySelector(
    `div.content-block h1[id="${section}"]`
  )
  if (!heading) {
    throw new Error(`Section not found: ${section}`)
  }

  const contentContainer =
    heading.parentElement.parentElement.parentElement.parentElement

  console.log(`Processing section: ${section}`)

  // Create a new div to hold all the content
  const collectedContent = document.createElement("div")

  // Add the current container's content
  collectedContent.appendChild(contentContainer.cloneNode(true))

  // We need to collect all the content until we find an element with an H1 tag
  let nextElement = contentContainer.nextElementSibling
  while (nextElement) {
    // Check if the next element has a child with an H1 tag
    const hasH1Child = nextElement.querySelector("h1")
    if (hasH1Child) {
      // If it has a child with an H1 tag, we need to break the loop
      console.log(`Found next section heading: ${hasH1Child.textContent}`)
      break
    }

    // Clone and add this element to our collection
    collectedContent.appendChild(nextElement.cloneNode(true))

    // Move to the next element
    nextElement = nextElement.nextElementSibling
  }

  if (!collectedContent) {
    console.error(`Could not collect content for section: ${section}`)
    throw new Error(`Content collection failed for section: ${section}`)
  }

  // Remove all the elements with the class "language-python"
  // as we don't need them in the markdown
  const pythonCodeBlocks = collectedContent.querySelectorAll(
    "div.language-python"
  )
  pythonCodeBlocks.forEach(codeBlock => {
    // Remove the element from its parent node
    codeBlock.parentNode.removeChild(codeBlock)
  })

  const shellCodeBlocks = collectedContent.querySelectorAll(
    "div.language-shell.extra-class"
  )
  shellCodeBlocks.forEach(codeBlock => {
    // Remove the element from its parent node
    codeBlock.parentNode.removeChild(codeBlock)
  })

  const content = collectedContent.innerHTML
  console.log(
    `Content extracted successfully for section: ${section}, length: ${content.length}`
  )
  return turndownService.turndown(content)
}

// Function to load config from file
const loadConfig = configPath => {
  try {
    const configContent = fs.readFileSync(configPath, "utf8")
    return JSON.parse(configContent)
  } catch (error) {
    console.error(`Error loading config from ${configPath}:`, error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  }
}

// Main execution
const main = async () => {
  // Check if config path is provided
  if (process.argv.length < 3) {
    console.error("Usage: node rest_api.js <path_to_config_file>")
    process.exit(1)
  }

  // Load config
  const configPath = process.argv[2]
  console.log(`Loading config from: ${configPath}`)
  const config = loadConfig(configPath)

  // URL to download the HTML file from
  const gateioDocsUrl =
    config.url || "https://www.gate.io/docs/developers/apiv4/en/"

  // Path to the HTML file
  const htmlFilePath = path.join(__dirname, "gateio.html")

  // Get output file path from config or use default
  const outputFileName = config.outputFile || "rest_api.md"
  const outputFilePath = path.join(
    __dirname,
    "../../../docs/gateio/",
    outputFileName
  )

  console.log(`Output file will be: ${outputFilePath}`)

  // Check if HTML file exists
  if (!fs.existsSync(htmlFilePath)) {
    await downloadHtml(gateioDocsUrl, htmlFilePath)
  } else {
    console.log("HTML file already exists, skipping download.")
  }

  // Read the HTML file
  console.log("Reading HTML file...")
  let html = fs.readFileSync(htmlFilePath, "utf8")

  const dom = new JSDOM(html)
  const document = dom.window.document

  // Get sections from config
  const sections = config.sections
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    console.error("No sections defined in config file")
    process.exit(1)
  }

  let markdown = ""
  for (const section of sections) {
    console.log(`Processing section: ${section}`)
    markdown += processSectionHtml(document, section, turndownService) + "\n\n"
  }

  console.log(`Total markdown length: ${markdown.length}`)

  fs.writeFileSync(outputFilePath, markdown)
  console.log(`Markdown file created at: ${outputFilePath}`)

  // Format the markdown file
  await formatMarkdown(outputFilePath)
  console.log(`Formatted: ${outputFilePath}`)

  // Delete the HTML file after processing
  deleteHtmlFile(htmlFilePath)
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
