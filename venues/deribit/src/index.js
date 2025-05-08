"use strict"

import process from "process"
import DeribitDocExtractor from "./extractor.js"

/**
 * Main execution function
 */
const main = async () => {
  // Get config file path from command line argument
  const configPath = process.argv[2]

  if (!configPath) {
    console.error("Error: No configuration file specified")
    console.log("Usage: node index.js <path-to-config-file>")
    process.exit(1)
  }

  const extractor = new DeribitDocExtractor(configPath)

  try {
    // Initialize the extractor
    await extractor.initialize()

    // Run the extraction process
    await extractor.run()

    process.exit(0)
  } catch (error) {
    console.error("Unhandled error:", error)
    process.exit(1)
  } finally {
    // Clean up resources
    await extractor.cleanup()
  }
}

// Start the application
main().catch(error => {
  console.error("Unhandled error:", error)
  process.exit(1)
})
