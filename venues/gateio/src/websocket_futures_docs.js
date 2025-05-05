import fs from "fs"
import path from "path"
import TurndownService from "turndown"
import { fileURLToPath } from "url"
import { downloadHtml, processHtml } from "./websocket_docs_utils.js"
import {
  addTableRule,
  addListItemWithTableRule,
  addCodeBlockRule
} from "./websocket_docs_utils.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// List of endpoints to scrape
const endpoints = ["delivery/ws/en/"]

async function run() {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced"
  })
  addTableRule(turndownService)
  addListItemWithTableRule(turndownService)
  addCodeBlockRule(turndownService)

  for (const endpoint of endpoints) {
    const url = `https://www.gate.io/docs/developers/${endpoint}`
    const htmlFilePath = path.join(
      __dirname,
      `gateio_${endpoint.replace(/\//g, "_")}.html`
    )
    const outputFilePath = path.join(
      __dirname,
      `../../../docs/gateio/websocket_futures_api.md`
    )

    try {
      await downloadHtml(url, htmlFilePath)
      const html = fs.readFileSync(htmlFilePath, "utf8")
      const markdown = processHtml(html, turndownService)
      fs.writeFileSync(outputFilePath, markdown)
      console.log(`Markdown file created at: ${outputFilePath}`)
      fs.unlink(htmlFilePath, err => {
        if (err) {
          console.error("Error deleting HTML file:", err)
        } else {
          console.log("HTML file deleted successfully.")
        }
      })
    } catch (error) {
      console.error("Error processing HTML:", error)
    }
  }
}

run().catch(console.error)
