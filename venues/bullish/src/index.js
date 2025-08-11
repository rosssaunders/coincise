import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"
import widdershins from "widdershins"
import process from "process"
import { formatMarkdown } from "../../shared/format-markdown.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Convert HTML tags to Markdown for Bullish venue
 * @param {string} content - HTML content to convert
 * @returns {string} - Markdown content
 */
function convertHtmlToMarkdown(content) {
  return (
    content
      // Convert h1 tags to # headers
      .replace(/<h1[^>]*id="[^"]*">([^<]+)<\/h1>/g, "# $1")
      // Convert h2 tags to ## headers
      .replace(/<h2[^>]*id="[^"]*">([^<]+)<\/h2>/g, "## $1")
      // Convert h3 tags to ### headers
      .replace(/<h3[^>]*id="[^"]*">([^<]+)<\/h3>/g, "### $1")
      // Convert h4 tags to #### headers
      .replace(/<h4[^>]*id="[^"]*">([^<]+)<\/h4>/g, "#### $1")
      // Convert h5 tags to ##### headers
      .replace(/<h5[^>]*id="[^"]*">([^<]+)<\/h5>/g, "##### $1")
      // Convert h6 tags to ###### headers
      .replace(/<h6[^>]*id="[^"]*">([^<]+)<\/h6>/g, "###### $1")
      // Convert anchor tags to Markdown links
      .replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/g, "[$2]($1)")
      // Remove anchor tags with only id attributes (not needed in Markdown)
      .replace(/<a[^>]*id="[^"]*"[^>]*><\/a>/g, "")
      // Convert strong tags to **bold**
      .replace(/<strong>([^<]+)<\/strong>/g, "**$1**")
      // Convert b tags to **bold**
      .replace(/<b>([^<]+)<\/b>/g, "**$1**")
      // Convert em tags to *italic*
      .replace(/<em>([^<]+)<\/em>/g, "*$1*")
      // Convert i tags to *italic*
      .replace(/<i>([^<]+)<\/i>/g, "*$1*")
      // Convert code tags to `code`
      .replace(/<code>([^<]+)<\/code>/g, "`$1`")
      // Convert pre tags to ``` code blocks
      .replace(/<pre>([\s\S]*?)<\/pre>/g, "```\n$1\n```")
      // Convert br tags to line breaks
      .replace(/<br\s*\/?>/g, "\n")
      // Convert p tags to paragraphs (remove tags, keep content)
      .replace(/<p>([\s\S]*?)<\/p>/g, "$1\n\n")
      // Convert div tags (remove tags, keep content)
      .replace(/<div[^>]*>([\s\S]*?)<\/div>/g, "$1")
      // Convert span tags (remove tags, keep content)
      .replace(/<span[^>]*>([\s\S]*?)<\/span>/g, "$1")
      // Convert ul/ol tags (remove tags, keep content)
      .replace(/<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/g, "$2")
      // Convert li tags to - list items
      .replace(/<li>([\s\S]*?)<\/li>/g, "- $1")
      // Convert table tags to Markdown tables
      .replace(/<table[^>]*>([\s\S]*?)<\/table>/g, "$1")
      // Convert tr tags to table rows
      .replace(/<tr[^>]*>([\s\S]*?)<\/tr>/g, "$1\n")
      // Convert th tags to table headers
      .replace(/<th[^>]*>([\s\S]*?)<\/th>/g, "| $1 ")
      // Convert td tags to table cells
      .replace(/<td[^>]*>([\s\S]*?)<\/td>/g, "| $1 ")
      // Convert aside tags to blockquotes
      .replace(/<aside[^>]*>([\s\S]*?)<\/aside>/g, "\n\n> **Note:** $1\n\n")
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, "")
      // Clean up extra whitespace and empty lines
      .replace(/\n\s*\n\s*\n/g, "\n\n")
      .trim()
  )
}

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
    sections: ["amm-instructions"]
  },
  "private-command-entry": {
    filename: "private_rest_api_command-entry.md",
    title: "Bullish Trading API - Private REST API - Command Entry",
    sections: ["command-entry"]
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
  "websocket-public": {
    filename: "websocket_public_api.md",
    title: "Bullish Trading API - WebSocket Public API",
    startMarker: "## Multi-OrderBook WebSocket (unauthenticated)",
    endMarker: "## Private Data WebSocket (authenticated)"
  },
  "websocket-private": {
    filename: "websocket_private_api.md",
    title: "Bullish Trading API - WebSocket Private API",
    startMarker: "## Private Data WebSocket (authenticated)",
    endMarker: "# End"
  },
  "websocket-general": {
    filename: "websocket_general.md",
    title: "Bullish Trading API - WebSocket General Information",
    startMarker: "# WebSockets",
    endMarker: "## Multi-OrderBook WebSocket (unauthenticated)"
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
  let generalInfo =
    generalInfoEndIndex > 0
      ? lines.slice(0, generalInfoEndIndex).join("\n")
      : ""

  // Remove YAML frontmatter from general info if it exists
  if (generalInfo) {
    const generalInfoLines = generalInfo.split("\n")
    const yamlEndIndex = generalInfoLines.findIndex(
      line => line.trim() === "---"
    )
    if (yamlEndIndex !== -1) {
      // Find the second occurrence of "---" (end of YAML block)
      const secondYamlIndex = generalInfoLines.findIndex(
        (line, index) => index > yamlEndIndex && line.trim() === "---"
      )
      if (secondYamlIndex !== -1) {
        // Remove everything from start to second "---" (inclusive)
        generalInfo = generalInfoLines.slice(secondYamlIndex + 1).join("\n")
      }
    }
  }

  // Extract change log content (if it exists)
  let changeLogContent = ""
  let changeLogEndIndex = lines.length
  if (changeLogStartIndex !== -1) {
    // Find the end of the change log by looking for the "Base URLs:" section
    // The change log should end when we hit the Base URLs section
    changeLogEndIndex = lines.length

    // Look for the "Base URLs:" section which indicates the end of change log content
    for (let i = changeLogStartIndex + 1; i < lines.length; i++) {
      const line = lines[i]

      // Stop at the "Base URLs:" section (this is not part of change log)
      if (
        line.trim() === "Base URLs:" ||
        line.trim() === "# Authentication" ||
        line.trim() === "# Rate Limits" ||
        line.trim() === "# Error Codes" ||
        line.trim() === "# Additional Links" ||
        line.trim() === "# Connectivity Options" ||
        line.trim() === "# FIX API" ||
        line.trim() === "# Exchange Time" ||
        line.trim() === "# Pagination Support" ||
        line.includes('<h1 id="bullish-trading-api-')
      ) {
        changeLogEndIndex = i
        break
      }
    }

    changeLogContent = lines
      .slice(changeLogStartIndex, changeLogEndIndex)
      .join("\n")
  }

  // Add content after change log to general info (Base URLs, Authentication, etc.)
  if (changeLogEndIndex < lines.length) {
    const additionalGeneralInfo = lines
      .slice(changeLogEndIndex, apiStartIndex)
      .join("\n")
    if (additionalGeneralInfo.trim()) {
      generalInfo = generalInfo + "\n\n" + additionalGeneralInfo
    }
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
function extractWebSocketSection(markdown, startMarker, endMarker) {
  const lines = markdown.split("\n")
  const startIndex = lines.findIndex(line => line.trim() === startMarker)
  const endIndex = lines.findIndex(
    (line, index) => index > startIndex && line.trim() === endMarker
  )

  if (startIndex === -1) {
    console.warn(`WebSocket section "${startMarker}" not found`)
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
    // Create minimal header for general info (no YAML frontmatter)
    const generalHeader = `# ${generalTitle}

`
    const generalPath = path.join(outputDir, "general_information.md")
    const fullGeneralContent =
      generalHeader + convertHtmlToMarkdown(generalInfo)
    await fs.writeFile(generalPath, fullGeneralContent)
    await formatMarkdown(generalPath)
    console.log(`Created: ${generalPath}`)
  }

  // Create change log file
  if (changeLogContent) {
    const changeLogTitle = "Bullish Trading API - Change Log"
    // Create minimal header for change log (no YAML frontmatter)
    const changeLogHeader = `# ${changeLogTitle}

`
    const changeLogPath = path.join(outputDir, "change_log.md")
    const fullChangeLogContent =
      changeLogHeader + convertHtmlToMarkdown(changeLogContent)
    await fs.writeFile(changeLogPath, fullChangeLogContent)
    await formatMarkdown(changeLogPath)
    console.log(`Created: ${changeLogPath}`)
  }

  // Create one file per config object (endpoint content only)
  for (const [configKey, config] of Object.entries(SPLIT_CONFIG)) {
    if (configKey === "websocket-public") {
      // Handle WebSocket separately since it uses different logic
      const websocketContent = extractWebSocketSection(
        markdown,
        config.startMarker,
        config.endMarker
      )
      if (websocketContent) {
        // Create minimal header for WebSocket (no general info)
        const wsHeader = `# ${config.title}

`
        const wsFullContent = wsHeader + convertHtmlToMarkdown(websocketContent)
        const wsPath = path.join(outputDir, config.filename)
        await fs.writeFile(wsPath, wsFullContent)
        await formatMarkdown(wsPath)
        console.log(`Created: ${wsPath}`)
      }
    } else if (configKey === "websocket-private") {
      // Handle WebSocket separately since it uses different logic
      const websocketContent = extractWebSocketSection(
        markdown,
        config.startMarker,
        config.endMarker
      )
      if (websocketContent) {
        // Create minimal header for WebSocket (no general info)
        const wsHeader = `# ${config.title}

`
        const wsFullContent = wsHeader + convertHtmlToMarkdown(websocketContent)
        const wsPath = path.join(outputDir, config.filename)
        await fs.writeFile(wsPath, wsFullContent)
        await formatMarkdown(wsPath)
        console.log(`Created: ${wsPath}`)
      }
    } else if (configKey === "websocket-general") {
      // Handle WebSocket separately since it uses different logic
      const websocketContent = extractWebSocketSection(
        markdown,
        config.startMarker,
        config.endMarker
      )
      if (websocketContent) {
        // Create minimal header for WebSocket (no general info)
        const wsHeader = `# ${config.title}

`
        const wsFullContent = wsHeader + convertHtmlToMarkdown(websocketContent)
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
        const minimalHeader = `# ${config.title}

`
        const fullContent =
          minimalHeader + convertHtmlToMarkdown(sectionContent)
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
