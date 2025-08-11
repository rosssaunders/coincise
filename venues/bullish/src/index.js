import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"
import widdershins from "widdershins"
import process from "process"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration for splitting the documentation
const SPLIT_CONFIG = {
  // Public endpoints (no authentication required)
  "public-nonce": {
    filename: "public_rest_api_nonce.md",
    title: "Bullish Trading API - Public REST API - Nonce",
    sections: ["nonce"]
  },
  "public-asset-data": {
    filename: "public_rest_api_asset-data.md",
    title: "Bullish Trading API - Public REST API - Asset Data",
    sections: ["asset-data"]
  },
  "public-market-data": {
    filename: "public_rest_api_market-data.md",
    title: "Bullish Trading API - Public REST API - Market Data",
    sections: ["market-data"]
  },
  "public-index-data": {
    filename: "public_rest_api_index-data.md",
    title: "Bullish Trading API - Public REST API - Index Data",
    sections: ["index-data"]
  },
  "public-time": {
    filename: "public_rest_api_time.md",
    title: "Bullish Trading API - Public REST API - Time",
    sections: ["time"]
  },
  // Private endpoints (authentication required)
  "private-orders": {
    filename: "private_rest_api_orders.md",
    title: "Bullish Trading API - Private REST API - Orders",
    sections: ["orders"]
  },
  "private-amm-instructions": {
    filename: "private_rest_api_amm-instructions.md",
    title: "Bullish Trading API - Private REST API - AMM Instructions",
    sections: ["amm instructions"]
  },
  "private-command-entry": {
    filename: "private_rest_api_command-entry.md",
    title: "Bullish Trading API - Private REST API - Command Entry",
    sections: ["command entry"]
  },
  "private-custody": {
    filename: "private_rest_api_custody.md",
    title: "Bullish Trading API - Private REST API - Custody",
    sections: ["custody"]
  },
  "private-trades": {
    filename: "private_rest_api_trades.md",
    title: "Bullish Trading API - Private REST API - Trades",
    sections: ["trades"]
  },
  "private-accounts": {
    filename: "private_rest_api_accounts.md",
    title: "Bullish Trading API - Private REST API - Accounts",
    sections: ["accounts"]
  },
  "private-sessions": {
    filename: "private_rest_api_sessions.md",
    title: "Bullish Trading API - Private REST API - Sessions",
    sections: ["sessions"]
  },
  "private-trading-accounts": {
    filename: "private_rest_api_trading-accounts.md",
    title: "Bullish Trading API - Private REST API - Trading Accounts",
    sections: ["trading-accounts"]
  },
  "private-derivatives": {
    filename: "private_rest_api_derivatives.md",
    title: "Bullish Trading API - Private REST API - Derivatives",
    sections: ["derivatives"]
  },
  "private-history": {
    filename: "private_rest_api_history.md",
    title: "Bullish Trading API - Private REST API - History",
    sections: ["history"]
  },
  "private-portfolio-margin-simulator": {
    filename: "private_rest_api_portfolio-margin-simulator.md",
    title:
      "Bullish Trading API - Private REST API - Portfolio Margin Simulator",
    sections: ["portfolio-margin-simulator"]
  },
  // WebSocket documentation
  websocket: {
    filename: "websocket_api.md",
    title: "Bullish Trading API - WebSocket API",
    startMarker: "# WebSockets",
    endMarker: "# Quickly Try The API"
  }
}

/**
 * Split the markdown content into sections based on h1 tags
 */
function splitMarkdownIntoSections(markdown) {
  const lines = markdown.split("\n")
  const sections = {}
  let currentSection = null
  let currentContent = []

  // Find the start of API sections
  const apiStartIndex = lines.findIndex(line =>
    line.includes('<h1 id="bullish-trading-api-nonce">')
  )

  // Find the start of the change log
  const changeLogStartIndex = lines.findIndex(
    line => line.trim() === "# API Change Log"
  )

  // Extract general information (everything before the change log or first API section, whichever comes first)
  let generalInfoEndIndex = apiStartIndex
  if (changeLogStartIndex !== -1 && changeLogStartIndex < apiStartIndex) {
    generalInfoEndIndex = changeLogStartIndex
  }
  const generalInfo =
    generalInfoEndIndex > 0
      ? lines.slice(0, generalInfoEndIndex).join("\n")
      : ""

  // Extract change log content (if it exists)
  let changeLogContent = ""
  if (changeLogStartIndex !== -1) {
    // Find the end of the change log (next h1 or end of file)
    const changeLogEndIndex = lines.findIndex(
      (line, index) =>
        index > changeLogStartIndex &&
        line.match(/^<h1 id="bullish-trading-api-([^"]+)">/)
    )
    const endIdx = changeLogEndIndex === -1 ? lines.length : changeLogEndIndex
    changeLogContent = lines.slice(changeLogStartIndex, endIdx).join("\n")
  }

  // Extract API sections (from API start to end of file, or from change log end to end of file)
  let apiSectionsStartIndex = apiStartIndex
  if (changeLogStartIndex !== -1 && changeLogStartIndex < apiStartIndex) {
    // If change log comes before API sections, find where change log ends
    const changeLogEndIndex = lines.findIndex(
      (line, index) =>
        index > changeLogStartIndex &&
        line.match(/^<h1 id="bullish-trading-api-([^"]+)">/)
    )
    apiSectionsStartIndex =
      changeLogEndIndex !== -1 ? changeLogEndIndex : lines.length
  }

  for (let i = apiSectionsStartIndex; i < lines.length; i++) {
    const line = lines[i]

    // Check for main API section headers
    const sectionMatch = line.match(/<h1 id="bullish-trading-api-([^"]+)">/)
    if (sectionMatch) {
      // Save previous section
      if (currentSection) {
        sections[currentSection] = currentContent.join("\n")
      }

      // Start new section
      currentSection = sectionMatch[1]
      currentContent = [line]
    } else if (currentSection) {
      currentContent.push(line)
    }
  }

  // Save the last section
  if (currentSection) {
    sections[currentSection] = currentContent.join("\n")
  }

  return { generalInfo, sections, changeLogContent }
}

/**
 * Extract WebSocket documentation section
 */
function extractWebSocketSection(markdown) {
  const lines = markdown.split("\n")
  const startIndex = lines.findIndex(line => line.trim() === "# WebSockets")
  const endIndex = lines.findIndex(
    (line, index) =>
      index > startIndex && line.trim() === "# Quickly Try The API"
  )

  if (startIndex === -1) {
    console.warn("WebSocket section not found")
    return ""
  }

  const endIdx = endIndex === -1 ? lines.length : endIndex
  return lines.slice(startIndex, endIdx).join("\n")
}

/**
 * Create the documentation header for each split file
 */
function createDocumentationHeader(title, originalHeader) {
  const headerLines = originalHeader.split("\n")

  // Update the title in the frontmatter
  const updatedHeader = headerLines
    .map(line => {
      if (line.startsWith("title:")) {
        return `title: ${title}`
      }
      return line
    })
    .join("\n")

  return updatedHeader
}

/**
 * Generate split documentation files
 */
async function generateSplitDocumentation(markdown, outputDir) {
  console.log("Splitting documentation into separate files...")

  const { generalInfo, sections, changeLogContent } =
    splitMarkdownIntoSections(markdown)

  // Create general information file (overview, rate limits, etc.)
  if (generalInfo) {
    const generalTitle = "Bullish Trading API - General Information"
    const generalHeader = createDocumentationHeader(generalTitle, generalInfo)
    const generalPath = path.join(outputDir, "general_information.md")
    await fs.writeFile(generalPath, generalHeader)
    await formatMarkdown(generalPath)
    console.log(`Created: ${generalPath}`)
  }

  // Create change log file
  if (changeLogContent) {
    const changeLogTitle = "Bullish Trading API - Change Log"
    // Create minimal header for change log (no general info)
    const changeLogHeader = `---
title: ${changeLogTitle}
language_tabs:
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2
---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="bullish-trading-api">${changeLogTitle}</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

`
    const changeLogPath = path.join(outputDir, "change_log.md")
    const fullChangeLogContent = changeLogHeader + changeLogContent
    await fs.writeFile(changeLogPath, fullChangeLogContent)
    await formatMarkdown(changeLogPath)
    console.log(`Created: ${changeLogPath}`)
  }

  // Create one file per config object (endpoint content only)
  for (const [configKey, config] of Object.entries(SPLIT_CONFIG)) {
    if (configKey === "websocket") {
      // Handle WebSocket separately since it uses different logic
      const websocketContent = extractWebSocketSection(markdown)
      if (websocketContent) {
        const wsHeader = createDocumentationHeader(config.title, generalInfo) // Use generalInfo for header
        const wsFullContent = wsHeader + "\n\n" + websocketContent
        const wsPath = path.join(outputDir, config.filename)
        await fs.writeFile(wsPath, wsFullContent)
        await formatMarkdown(wsPath)
        console.log(`Created: ${wsPath}`)
      }
    } else {
      // Handle REST API sections (endpoint content only)
      const sectionContent = config.sections
        .map(sectionName => sections[sectionName])
        .filter(Boolean)
        .join("\n\n")

      if (sectionContent) {
        // Create minimal header for endpoint files (no general info)
        const minimalHeader = `---
title: ${config.title}
language_tabs:
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2
---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="bullish-trading-api">${config.title}</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

`
        const fullContent = minimalHeader + sectionContent
        const filePath = path.join(outputDir, config.filename)
        await fs.writeFile(filePath, fullContent)
        await formatMarkdown(filePath)
        console.log(`Created: ${filePath}`)
      }
    }
  }
}

async function main() {
  try {
    const configPath = path.resolve(__dirname, "../config/config.json")
    const configData = JSON.parse(await fs.readFile(configPath, "utf8"))
    const { specUrl, outputFile, title } = configData

    console.log(`Downloading OpenAPI spec from: ${specUrl}`)
    const tmpFile = path.join(__dirname, "spec.tmp")
    execSync(`curl -L -o ${tmpFile} ${specUrl}`, { stdio: "inherit" })
    const specText = await fs.readFile(tmpFile, "utf8")
    await fs.unlink(tmpFile)
    const specJson = JSON.parse(specText)

    // add title if not present
    specJson.info = specJson.info || {}
    if (title) specJson.info.title = title

    const options = {
      codeSamples: true,
      httpsnippet: false,
      language_tabs: [{ javascript: "JavaScript" }, { python: "Python" }],
      search: true,
      theme: "darkula"
    }

    console.log("Converting spec to markdown...")
    const markdown = await widdershins.convert(specJson, options)

    const outputDir = path.dirname(path.resolve(__dirname, "..", outputFile))
    await fs.mkdir(outputDir, { recursive: true })

    // Generate split documentation files
    await generateSplitDocumentation(markdown, outputDir)

    console.log("Documentation splitting completed successfully!")
  } catch (err) {
    console.error("Error generating docs:", err)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
