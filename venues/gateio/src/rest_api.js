import fs from "fs"
import path from "path"
import TurndownService from "turndown"
import { fileURLToPath } from "url"
import { downloadHtml, processHtml } from "./websocket_docs_utils.js"
import { addTableRule, addCodeBlockRule } from "./websocket_docs_utils.js"
import { formatMarkdown } from "../../shared/format-markdown.js"
import process from "process"

// Get the current file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// URL to download the HTML file from
const gateioDocsUrl = "https://www.gate.io/docs/developers/apiv4/en/"

// Initialize turndown service
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced"
})
addTableRule(turndownService)
addCodeBlockRule(turndownService)

// Path to the HTML file
const htmlFilePath = path.join(__dirname, "gateio.html")
const outputFilePath = path.join(__dirname, "../../../docs/gateio/rest_api.md")

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

// Main execution
const main = async () => {
  try {
    // Check if HTML file exists
    if (!fs.existsSync(htmlFilePath)) {
      try {
        // If not, download it
        await downloadHtml(gateioDocsUrl, htmlFilePath)
      } catch (error) {
        console.error("Error downloading HTML file:", error)
        console.error("Stack trace:", error.stack)
        process.exit(1)
      }
    } else {
      console.log("HTML file already exists, skipping download.")
    }

    // Read the HTML file
    console.log("Reading HTML file...")
    let html
    try {
      html = fs.readFileSync(htmlFilePath, "utf8")
    } catch (err) {
      console.error("Error reading file:", err)
      console.error("Stack trace:", err.stack)
      process.exit(1)
    }

    const markdown = processHtml(html, turndownService)
    fs.writeFileSync(outputFilePath, markdown)
    console.log(`Markdown file created at: ${outputFilePath}`)

    // Format the markdown file
    try {
      await formatMarkdown(outputFilePath)
      console.log(`Formatted: ${outputFilePath}`)
    } catch (err) {
      console.error("Error formatting markdown:", err)
      console.error("Stack trace:", err.stack)
      process.exit(1)
    }

    // Delete the HTML file after processing
    deleteHtmlFile(htmlFilePath)
  } catch (error) {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
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
