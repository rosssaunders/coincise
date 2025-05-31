#!/usr/bin/env node

import { generatePrSummary } from "./ai-pr-summary.js"

/**
 * CLI script to generate AI-powered PR summaries
 * Usage: node generate-pr-summary.js [working-directory] [max-diff-length]
 */
async function main() {
  try {
    const workingDir = process.argv[2] || process.cwd()
    const maxDiffLength = process.argv[3] ? parseInt(process.argv[3], 10) : 8000

    // Only log to stderr to keep stdout clean for workflows
    console.error("Generating AI-powered PR summary...")
    console.error(`Working directory: ${workingDir}`)
    console.error(`Max diff length: ${maxDiffLength}`)

    const summary = await generatePrSummary(
      undefined,
      workingDir,
      maxDiffLength
    )

    // Output the summary to stdout so it can be captured by workflows
    console.log("---PR_SUMMARY_START---")
    console.log(summary)
    console.log("---PR_SUMMARY_END---")
  } catch (error) {
    console.error("Error:", error.message)
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
