"use strict"

import { writeFileSync, mkdirSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import prettier from "prettier"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const GITHUB_WEBSOCKET_URL =
  "https://raw.githubusercontent.com/DigiFinex/api/master/Websocket_API_en.md"

async function fetchWebSocketDocumentation() {
  console.log("Fetching DigiFinex WebSocket documentation from GitHub...")

  try {
    const response = await fetch(GITHUB_WEBSOCKET_URL)

    if (!response.ok) {
      console.error(
        `Failed to fetch WebSocket documentation: ${response.status} ${response.statusText}`
      )
      process.exit(1)
    }

    const content = await response.text()

    if (!content || content.trim().length === 0) {
      console.error("Fetched WebSocket documentation is empty")
      process.exit(1)
    }

    console.log(
      `Successfully fetched WebSocket documentation (${content.length} characters)`
    )
    return content
  } catch (error) {
    console.error("Error fetching WebSocket documentation:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  }
}

async function formatMarkdown(content) {
  try {
    // Load Prettier config from config/prettier.config.json
    const prettierConfigPath = join(
      __dirname,
      "..",
      "..",
      "config",
      "prettier.config.json"
    )
    let prettierConfig = {}
    try {
      prettierConfig = JSON.parse(
        await import("fs").then(fs =>
          fs.readFileSync(prettierConfigPath, "utf8")
        )
      )
    } catch (configError) {
      console.warn(
        `Could not load Prettier config from ${prettierConfigPath}:`,
        configError.message
      )
    }
    const formatted = await prettier.format(content, {
      parser: "markdown",
      ...prettierConfig
    })
    return formatted
  } catch (error) {
    console.warn("Failed to format markdown with prettier:", error.message)
    return content
  }
}

function enhanceWebSocketContent(content) {
  // Add header with source information
  const header = `# DigiFinex WebSocket API Documentation

> **Note**: This documentation is automatically synchronized from the official DigiFinex GitHub repository.
> 
> **Source**: ${GITHUB_WEBSOCKET_URL}

---

`

  return header + content
}

async function saveWebSocketDocumentation(content) {
  const docsDir = join(__dirname, "..", "..", "..", "docs", "digifinex")

  // Create docs directory if it doesn't exist
  mkdirSync(docsDir, { recursive: true })

  // Enhance content with metadata
  let enhancedContent = enhanceWebSocketContent(content)

  // Format with prettier
  enhancedContent = await formatMarkdown(enhancedContent)

  const filename = "websocket_api.md"
  const filepath = join(docsDir, filename)

  writeFileSync(filepath, enhancedContent, "utf8")
  console.log(`Saved WebSocket documentation to ${filename}`)
}

async function main() {
  console.log(
    "Starting DigiFinex WebSocket documentation extraction from GitHub"
  )

  try {
    // Fetch WebSocket documentation from GitHub
    const content = await fetchWebSocketDocumentation()

    // Save the documentation
    await saveWebSocketDocumentation(content)

    console.log(
      "DigiFinex WebSocket documentation extraction completed successfully"
    )
  } catch (error) {
    console.error("Error during WebSocket extraction:", error)
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
