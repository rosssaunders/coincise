#!/usr/bin/env node
/**
 * CLI for the Coinbase Exchange API documentation scraper
 */
"use strict"

import fs from "fs"
import process from "process"
import { scrapeApiDocumentation } from "./scraper.js"
import {
  processAuthSection,
  processRequestParams
} from "./processors/formatters.js"
import { parseConfigOptions } from "./utils/config.js"
import { processBatch } from "./utils/batch.js"

// Parse command line arguments
const args = process.argv.slice(2)
const command = args[0]

// Print help information
const printHelp = () => {
  console.log(`
Coinbase Exchange API Documentation Scraper

Usage:
  node index.js batch [-c config.json] [-o output_dir]   # Process all URLs in a config file
  node index.js scrape <url> <output-file>               # Scrape API docs from URL to markdown file
  node index.js convert-auth <input-file> [output-file]  # Convert auth HTML to markdown
  node index.js convert-params <input-file> [output-file] # Convert request params HTML to markdown
  node index.js help                                     # Show this help message
  `)
}

// Main function to handle CLI commands
const main = async () => {
  let exitCode = 0
  try {
    if (
      !command ||
      command === "help" ||
      command === "--help" ||
      command === "-h"
    ) {
      printHelp()
      return
    }

    if (command === "batch") {
      // Extract config path and output directory from arguments
      const { configPath, outputDir } = parseConfigOptions(args.slice(1))

      console.log(`Using config file: ${configPath}`)
      if (outputDir) {
        console.log(`Using output directory: ${outputDir}`)
      }

      await processBatch(configPath, outputDir)
    } else if (command === "scrape") {
      const url = args[1]
      const outputFile = args[2]

      if (!url || !outputFile) {
        console.error("Error: URL and output file are required")
        printHelp()
        exitCode = 1
        return
      }

      await scrapeApiDocumentation(url, outputFile)
    } else if (command === "convert-auth" && args[1]) {
      try {
        const inputFile = args[1]
        const outputFile = args[2]

        console.log(`Reading auth HTML from ${inputFile}...`)
        const htmlContent = fs.readFileSync(inputFile, "utf8")
        const markdownTable = processAuthSection(htmlContent)

        if (!markdownTable) {
          console.error(
            "Error: Could not extract authentication data from input file"
          )
          exitCode = 1
          return
        }

        console.log(markdownTable)

        // Optionally save to an output file if specified
        if (outputFile) {
          fs.writeFileSync(outputFile, markdownTable)
          console.log(`Markdown table written to ${outputFile}`)
        }
      } catch (error) {
        console.error("Error converting auth file:", error.message)
        exitCode = 1
      }
    } else if (command === "convert-params" && args[1]) {
      try {
        const inputFile = args[1]
        const outputFile = args[2]

        console.log(`Reading params HTML from ${inputFile}...`)
        const htmlContent = fs.readFileSync(inputFile, "utf8")
        const markdownTable = processRequestParams(htmlContent)

        if (!markdownTable) {
          console.error(
            "Error: Could not extract request parameters from input file"
          )
          exitCode = 1
          return
        }

        console.log(markdownTable)

        // Optionally save to an output file if specified
        if (outputFile) {
          fs.writeFileSync(outputFile, markdownTable)
          console.log(`Markdown table written to ${outputFile}`)
        }
      } catch (error) {
        console.error("Error converting params file:", error.message)
        exitCode = 1
      }
    } else {
      console.error(`Unknown command: ${command}`)
      printHelp()
      exitCode = 1
    }
  } catch (error) {
    console.error("Error:", error)
    exitCode = 1
  } finally {
    // In CI environments, make sure errors are reported to the CI system
    if (exitCode !== 0) {
      console.error("Script completed with errors")
      process.exit(exitCode)
    }
  }
}

// Run the main function
main().catch(error => {
  console.error("Unhandled error:", error)
  process.exit(1)
})

// // Export the main functionality for use as a module
// export {
//   scrapeApiDocumentation,
//   processAuthSection,
//   processRequestParams,
//   processBatch
// }
