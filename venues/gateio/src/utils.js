import fs from "fs"
import dotenv from "dotenv"
import { JSDOM } from "jsdom"
import axios from "axios"

// Load environment variables from .env file
dotenv.config()

// Function to download HTML file
export function downloadHtml(url, filePath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading HTML from ${url}...`)
    const file = fs.createWriteStream(filePath)
    axios
      .get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "text/html"
        },
        responseType: "stream"
      })
      .then(response => {
        if (response.status !== 200) {
          reject(
            new Error(`Failed to download: HTTP status code ${response.status}`)
          )
          return
        }
        response.data.pipe(file)
        file.on("finish", () => {
          file.close()
          console.log("Download completed successfully.")
          resolve()
        })
      })
      .catch(err => {
        fs.unlink(filePath, () => {})
        reject(err)
      })
    file.on("error", err => {
      fs.unlink(filePath, () => {})
      reject(err)
    })
  })
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
