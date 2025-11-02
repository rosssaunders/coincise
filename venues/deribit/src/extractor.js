"use strict"

import { promises as fs } from "fs"
import path from "path"
import process from "process"
import BrowserUtils from "./browserUtils.js"
import MarkdownUtils from "./markdownUtils.js"
import ExtractionUtils from "./extractionUtils.js"
import ConfigUtils from "./configUtils.js"
import { formatMarkdown } from "../../shared/format-markdown.js"

/**
 * Main application class for extracting Deribit API documentation
 */
class DeribitDocExtractor {
  /**
   * Constructor
   * @param {string} configPath - Path to the configuration file
   */
  constructor(configPath) {
    this.configPath = configPath
    this.config = null
    this.browser = null
    this.turndownService = null
  }

  /**
   * Initialize the application
   */
  async initialize() {
    // Load and validate configuration
    this.config = await ConfigUtils.loadConfig(this.configPath)
    console.log(
      `Loaded configuration with ${this.config.sections.length} sections to extract`
    )

    // Initialize Turndown service for Markdown conversion
    this.turndownService = MarkdownUtils.initTurndownService()

    // Initialize browser
    this.browser = await BrowserUtils.initBrowser()
  }

  /**
   * Clean up resources
   */
  async cleanup() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }

  /**
   * Extract sections from the main API documentation
   */
  async extractApiDocumentation() {
    const page = await BrowserUtils.createPage(this.browser)

    try {
      // Load the Deribit API documentation
      await page.goto("https://docs.deribit.com", {
        waitUntil: "networkidle0",
        timeout: 60000
      })

      // Extract the selected sections
      const content = await ExtractionUtils.extractSelectedSections(
        page,
        this.config.sections
      )

      console.log(
        `Found and extracted ${content.matchedSections.length} sections:`
      )
      content.matchedSections.forEach(section => console.log(`  - ${section}`))

      if (content.matchedSections.length === 0) {
        console.warn(
          "No matching sections found. Check your section names in the config file."
        )
      }

      return content
    } finally {
      await page.close()
    }
  }

  /**
   * Generate filename from endpoint path
   * @param {string} endpointPath - The endpoint path (e.g., /public/auth)
   * @returns {string} - Sanitized filename
   */
  generateFilename(endpointPath) {
    // Remove leading slash and replace remaining slashes with underscores
    return (
      endpointPath
        .replace(/^\//, "")
        .replace(/\//g, "_")
        .replace(/[^a-z0-9_]/gi, "_")
        .toLowerCase() + ".md"
    )
  }

  /**
   * Extract content from support articles
   */
  async extractSupportArticles() {
    if (
      !this.config.supportArticles ||
      this.config.supportArticles.length === 0
    ) {
      console.log("No support articles specified in configuration. Skipping.")
      return ""
    }

    console.log(
      `Processing ${this.config.supportArticles.length} support articles...`
    )
    let supportContent = "## Support Articles\n\n"

    for (const url of this.config.supportArticles) {
      console.log(`Processing support article: ${url}`)
      const page = await BrowserUtils.createPage(this.browser)

      try {
        const articleContent = await ExtractionUtils.extractSupportArticle(
          page,
          url
        )

        if (articleContent) {
          const articleMarkdown = this.turndownService.turndown(articleContent)
          supportContent += `${articleMarkdown}\n\n`
          console.log(`Successfully processed article: ${url}`)
        } else {
          console.log(`Failed to process article: ${url}`)
        }

        // Add a delay between articles to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 3000))
      } finally {
        await page.close()
      }
    }

    return supportContent
  }

  /**
   * Run the extraction process
   */
  async run() {
    console.log("Starting documentation extraction process...")

    // Extract the main API documentation
    console.log("Extracting selected API documentation sections...")
    const extractedData = await this.extractApiDocumentation()
    console.log("API documentation extraction complete")

    // Extract support articles if specified
    console.log("Extracting support articles...")
    const supportContent = await this.extractSupportArticles()
    console.log("Support articles extraction complete")

    // Determine output directory structure
    const baseOutputDir = path.dirname(this.config.output)
    const publicDir = path.join(baseOutputDir, "endpoints/public")
    const privateDir = path.join(baseOutputDir, "endpoints/private")
    const coreDir = path.join(baseOutputDir, "core")

    // Create directories
    await fs.mkdir(publicDir, { recursive: true })
    await fs.mkdir(privateDir, { recursive: true })
    await fs.mkdir(coreDir, { recursive: true })

    let publicCount = 0
    let privateCount = 0
    let coreCount = 0

    // Process and save individual endpoints
    console.log(
      `\nProcessing ${extractedData.endpoints.length} endpoints...`
    )

    for (const endpoint of extractedData.endpoints) {
      const markdown = this.turndownService.turndown(endpoint.content)
      const filename = this.generateFilename(endpoint.title)

      let outputPath
      if (endpoint.isPublic) {
        outputPath = path.join(publicDir, filename)
        publicCount++
        console.log(`  📄 Public:  ${endpoint.title} → ${filename}`)
      } else if (endpoint.isPrivate) {
        outputPath = path.join(privateDir, filename)
        privateCount++
        console.log(`  🔒 Private: ${endpoint.title} → ${filename}`)
      } else {
        // Fallback to private if not clearly marked
        outputPath = path.join(privateDir, filename)
        privateCount++
        console.log(`  🔒 Private: ${endpoint.title} → ${filename} (default)`)
      }

      await fs.writeFile(outputPath, markdown)
      await formatMarkdown(outputPath)
    }

    // Process and save core content
    if (extractedData.coreContent.length > 0) {
      console.log(`\nProcessing ${extractedData.coreContent.length} core sections...`)

      for (const coreItem of extractedData.coreContent) {
        const markdown = this.turndownService.turndown(coreItem.content)
        const sanitizedTitle = coreItem.sectionTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "")
        const filename = `${sanitizedTitle}.md`
        const outputPath = path.join(coreDir, filename)

        await fs.writeFile(outputPath, markdown)
        await formatMarkdown(outputPath)
        coreCount++
        console.log(`  📚 Core:    ${coreItem.sectionTitle} → ${filename}`)
      }
    }

    // Process support articles as core content
    if (supportContent.trim() && supportContent !== "## Support Articles\n\n") {
      const filename = "support_articles.md"
      const outputPath = path.join(coreDir, filename)
      await fs.writeFile(outputPath, supportContent)
      await formatMarkdown(outputPath)
      coreCount++
      console.log(`  📚 Core:    Support Articles → ${filename}`)
    }

    // Print summary
    console.log("\x1b[32m%s\x1b[0m", `\n✅ Extraction complete!`)
    console.log(`  📄 Public endpoints:  ${publicCount}`)
    console.log(`  🔒 Private endpoints: ${privateCount}`)
    console.log(`  📚 Core documentation: ${coreCount}`)
    console.log(`📁 Output directory: ${baseOutputDir}`)
  }
}

export default DeribitDocExtractor
