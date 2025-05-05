"use strict"

import { promises as fs } from "fs"
import path from "path"
import BrowserUtils from "./browserUtils.js"
import MarkdownUtils from "./markdownUtils.js"
import ExtractionUtils from "./extractionUtils.js"
import ConfigUtils from "./configUtils.js"

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
    try {
      // Load and validate configuration
      this.config = await ConfigUtils.loadConfig(this.configPath)
      console.log(
        `Loaded configuration with ${this.config.sections.length} sections to extract`
      )

      // Initialize Turndown service for Markdown conversion
      this.turndownService = MarkdownUtils.initTurndownService()

      // Initialize browser
      this.browser = await BrowserUtils.initBrowser()
    } catch (error) {
      console.error(`Initialization failed: ${error.message}`)
      throw error
    }
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

      // Convert to markdown
      return this.turndownService.turndown(content.content)
    } finally {
      await page.close()
    }
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
    try {
      console.log("Starting documentation extraction process...")

      // Extract the main API documentation
      console.log("Extracting selected API documentation sections...")
      const mainContent = await this.extractApiDocumentation()
      console.log("API documentation extraction complete")

      // Extract support articles if specified
      console.log("Extracting support articles...")
      const supportContent = await this.extractSupportArticles()
      console.log("Support articles extraction complete")

      // Combine the content
      console.log("Creating documentation file...")
      let combinedMarkdown = `# ${this.config.title || "Deribit API Documentation"}\n\n`

      // Add the main API documentation
      combinedMarkdown += `${mainContent}\n\n`

      // Add support articles if any were extracted
      if (supportContent.trim()) {
        combinedMarkdown += supportContent
      }

      // Ensure output directory exists
      const outputDir = path.dirname(this.config.output)
      await fs.mkdir(outputDir, { recursive: true })

      // Write the combined markdown to the output file
      await fs.writeFile(this.config.output, combinedMarkdown)
      console.log(`Documentation written to: ${this.config.output}`)

      console.log("Documentation extraction complete!")
    } catch (error) {
      console.error("Error in extraction process:", error)
      throw error
    }
  }
}

export default DeribitDocExtractor
