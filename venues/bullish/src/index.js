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
  public: {
    filename: "public_rest_api.md",
    title: "Bullish Trading API - Public REST API",
    sections: ["nonce", "asset-data", "market-data", "index-data", "time"]
  },
  // Private endpoints (authentication required)
  private: {
    filename: "private_rest_api.md",
    title: "Bullish Trading API - Private REST API",
    sections: [
      "orders",
      "amm instructions",
      "command entry",
      "custody",
      "trades",
      "accounts",
      "sessions",
      "trading-accounts",
      "derivatives",
      "history",
      "portfolio-margin-simulator"
    ]
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

  // Extract the header (everything before the first API section)
  const headerEndIndex = lines.findIndex(line =>
    line.includes('<h1 id="bullish-trading-api-nonce">')
  )

  const header =
    headerEndIndex > 0 ? lines.slice(0, headerEndIndex).join("\n") : ""

  for (let i = headerEndIndex; i < lines.length; i++) {
    const line = lines[i]

    // Check for main API section headers
    const sectionMatch = line.match(/<h1 id="bullish-trading-api-([^"]+)"/)
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

  return { header, sections }
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

  const { header, sections } = splitMarkdownIntoSections(markdown)

  // Create public REST API documentation
  const publicSections = SPLIT_CONFIG.public.sections
    .map(sectionName => sections[sectionName])
    .filter(Boolean)
    .join("\n\n")

  if (publicSections) {
    const publicHeader = createDocumentationHeader(
      SPLIT_CONFIG.public.title,
      header
    )
    const publicContent = publicHeader + "\n\n" + publicSections
    const publicPath = path.join(outputDir, SPLIT_CONFIG.public.filename)
    await fs.writeFile(publicPath, publicContent)
    await formatMarkdown(publicPath)
    console.log(`Created: ${publicPath}`)
  }

  // Create private REST API documentation
  const privateSections = SPLIT_CONFIG.private.sections
    .map(sectionName => sections[sectionName])
    .filter(Boolean)
    .join("\n\n")

  if (privateSections) {
    const privateHeader = createDocumentationHeader(
      SPLIT_CONFIG.private.title,
      header
    )
    const privateContent = privateHeader + "\n\n" + privateSections
    const privatePath = path.join(outputDir, SPLIT_CONFIG.private.filename)
    await fs.writeFile(privatePath, privateContent)
    await formatMarkdown(privatePath)
    console.log(`Created: ${privatePath}`)
  }

  // Create WebSocket API documentation
  const websocketContent = extractWebSocketSection(markdown)
  if (websocketContent) {
    const wsHeader = createDocumentationHeader(
      SPLIT_CONFIG.websocket.title,
      header
    )
    const wsFullContent = wsHeader + "\n\n" + websocketContent
    const wsPath = path.join(outputDir, SPLIT_CONFIG.websocket.filename)
    await fs.writeFile(wsPath, wsFullContent)
    await formatMarkdown(wsPath)
    console.log(`Created: ${wsPath}`)
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
