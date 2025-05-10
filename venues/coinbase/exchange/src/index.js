#!/usr/bin/env node
/**
 * CLI for the Coinbase Exchange API documentation scraper
 */
"use strict"

import process from "process"
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
  node index.js help                                     # Show this help message
  `)
}

// Main function to handle CLI commands
const main = async () => {
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
  } else {
    console.error(`Unknown command: ${command}`)
    printHelp()
  }
}

// Run the main function
main().catch(error => {
  console.error("Unhandled error:", error)
  console.error("Stack trace:", error.stack)
  process.exit(1)
})
