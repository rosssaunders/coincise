#!/usr/bin/env node

import { OpenAI } from "openai"
import { execSync } from "child_process"

/**
 * Generate an AI-powered Twitter summary based on git changes
 * @param {string} [apiKey] - OpenAI API key (defaults to OPENAI_API_KEY env var)
 * @param {string} [workingDir] - Working directory for git operations (defaults to current dir)
 * @param {number} [maxDiffLength] - Maximum diff length before truncation (defaults to 8000)
 * @returns {Promise<string>} Generated Twitter summary
 */
export async function generateTwitterSummary(
  apiKey,
  workingDir = process.cwd(),
  maxDiffLength = 8000
) {
  try {
    const openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
      timeout: 15 * 60 * 1000 // 15 minutes timeout for Flex processing
    })

    // Get git diff for changes (use committed changes instead of staged)
    const gitDiff = execSync("git diff HEAD~1 --name-status", {
      cwd: workingDir,
      encoding: "utf8"
    }).trim()

    if (!gitDiff) {
      return "📚 Updated cryptocurrency exchange API documentation! 🚀 #crypto #API #documentation"
    }

    // Get more detailed diff for modified files (limited to avoid token limits)
    const detailedDiff = execSync("git diff HEAD~1 --unified=3", {
      cwd: workingDir,
      encoding: "utf8"
    })

    // Truncate diff if it's too long to avoid token limits
    const truncatedDiff =
      detailedDiff.length > maxDiffLength
        ? detailedDiff.substring(0, maxDiffLength) +
          "\n\n[...diff truncated...]"
        : detailedDiff

    const prompt = `You are analyzing changes made to cryptocurrency exchange API documentation. Based on the git diff below, generate a Twitter/X friendly update (max 280 characters) that highlights the key changes in an engaging way.

Requirements:
- Maximum 280 characters (including emojis and hashtags)
- Use relevant emojis to make it engaging
- Mention the specific exchange if identifiable from the changes
- Use appropriate hashtags like #crypto #API #documentation
- Make it suitable for social media
- Focus on what was updated/improved

Git diff:
\`\`\`
${truncatedDiff}
\`\`\`

File changes summary:
\`\`\`
${gitDiff}
\`\`\`

Generate only the Twitter/X update text (no additional formatting or sections).`

    const response = await openai.responses.create({
      model: "gpt-5.1",
      instructions:
        "You are a social media assistant that creates engaging Twitter/X updates for technical documentation changes in the cryptocurrency space. You understand crypto exchanges and can create compelling social media content.",
      input: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_output_tokens: 150,
      service_tier: "flex"
    })

    const twitterSummary = response.output_text?.trim()

    if (!twitterSummary) {
      return "📚 Updated cryptocurrency exchange API documentation! 🚀 #crypto #API #documentation"
    }

    // Ensure it's under 280 characters
    if (twitterSummary.length > 280) {
      return twitterSummary.substring(0, 277) + "..."
    }

    return twitterSummary
  } catch (error) {
    console.error("Error generating Twitter summary:", error.message)

    return "📚 Updated cryptocurrency exchange API documentation! 🚀 #crypto #API #documentation"
  }
}

/**
 * Extract exchange name from file path
 * @param {string} filePath - Git file path
 * @returns {string|null} Exchange name or null
 */
function extractExchangeName(filePath) {
  const match = filePath.match(/docs\/([^/]+)\//)
  if (match) {
    const exchangeName = match[1]
    // Capitalize first letter
    return exchangeName.charAt(0).toUpperCase() + exchangeName.slice(1)
  }
  return null
}

/**
 * CLI script to generate Twitter summaries
 * Usage: node ai-x-post.js [working-directory] [max-diff-length]
 */
async function main() {
  try {
    const workingDir = process.argv[2] || process.cwd()
    const maxDiffLength = process.argv[3] ? parseInt(process.argv[3], 10) : 8000

    // Only log to stderr to keep stdout clean for workflows
    console.error("Generating Twitter/X summary...")
    console.error(`Working directory: ${workingDir}`)
    console.error(`Max diff length: ${maxDiffLength}`)

    const twitterSummary = await generateTwitterSummary(
      undefined,
      workingDir,
      maxDiffLength
    )

    // Output the summary to stdout so it can be captured by workflows
    console.log("---TWITTER_SUMMARY_START---")
    console.log(twitterSummary)
    console.log("---TWITTER_SUMMARY_END---")
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
