import fs from "fs"
import dotenv from "dotenv"
import { JSDOM } from "jsdom"
import { fetchHtml } from "./fetcher.js"

// Load environment variables from .env file
dotenv.config()

// Function to download HTML file
export async function downloadHtml(url, filePath) {
  try {
    console.log(`Downloading HTML from ${url}...`)
    const html = await fetchHtml(url, { allowPuppeteerFallback: true })
    fs.writeFileSync(filePath, html, "utf8")
    console.log("Download completed successfully.")
  } catch (err) {
    // Clean up partial file if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    throw err
  }
}

// Function to process HTML and convert to markdown
export function processHtml(html, turndownService) {
  if (!turndownService) {
    console.error("TurndownService is not initialized.")
    return ""
  }
  const dom = new JSDOM(html)
  const document = dom.window.document
  const contentContainer = document.querySelector(
    "div.col-md-9.col-lg-10.content__container"
  )
  if (!contentContainer) {
    console.error("Could not find main content container")
    return ""
  }
  const content = contentContainer.innerHTML
  console.log("Content extracted successfully.")
  return turndownService.turndown(content)
}

// Helper functions for adding custom Turndown rules
export function addTableRule(turndownService) {
  turndownService.addRule("table", {
    filter: "table",
    replacement: function () {
      return ""
    }
  })
}

export function addListItemWithTableRule(turndownService) {
  turndownService.addRule("listItemWithTable", {
    filter: function (node) {
      return node.nodeName === "LI" && node.querySelector("table")
    },
    replacement: function (content) {
      let markdown = "- "
      markdown += content.trim().replace(/\n/g, "\n  ")
      return markdown + "\n"
    }
  })
}

export function addCodeBlockRule(turndownService) {
  turndownService.addRule("codeBlock", {
    filter: "pre",
    replacement: function (content, node) {
      let language = ""
      if (node.className) {
        const classes = node.className.split(" ")
        const langClass = classes.find(cls => cls.startsWith("language-"))
        if (langClass) {
          language = langClass.replace("language-", "").trim()
        }
      }
      const trimmedContent = content.trim()
      return `\n\`\`\`${language}\n${trimmedContent}\n\`\`\`\n`
    }
  })
}
