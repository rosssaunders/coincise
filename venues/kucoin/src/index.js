"use strict"

import process from "process"
import { downloadOpenApiSpecs } from "./downloader.js"
import { convertSpecsToMarkdown } from "./converter.js"
import { config } from "./config.js"
import { createOutputDirectories } from "./fileUtils.js"
import { scrapeRateLimit } from "./rateLimitScraper.js"

/**
 * Check if rate limit scraping is requested
 * @returns {boolean} True if --rate-limit flag is present
 */
function shouldScrapeRateLimit() {
  return process.argv.includes("--rate-limit")
}

/**
 * Main function to download OpenAPI specs and convert them to Markdown
 */
async function main() {
  // Check if rate limit scraping is requested
  if (shouldScrapeRateLimit()) {
    console.log("Starting KuCoin rate limit documentation scraping...")

    // Create output directories if they don't exist
    await createOutputDirectories(config.outputDir)

    // Scrape rate limit documentation
    await scrapeRateLimit(config)

    console.log(
      "KuCoin rate limit documentation scraping completed successfully!"
    )
    return
  }

  console.log("Starting KuCoin API documentation extraction...")

  // Create output directories if they don't exist
  await createOutputDirectories(config.outputDir)

  // Download OpenAPI specs from KuCoin GitHub repository
  console.log("Downloading OpenAPI specifications...")
  const downloadedSpecs = await downloadOpenApiSpecs(config.apiSpecUrls)

  // Convert the downloaded specs to Markdown
  console.log("Converting specifications to Markdown...")
  await convertSpecsToMarkdown(downloadedSpecs, config.outputDir)

  console.log("KuCoin API documentation extraction completed successfully!")
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
