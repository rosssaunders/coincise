import { OpenAI } from "openai"
import { execSync } from "child_process"



/**
 * Generate an AI-powered PR summary based on git changes
 * @param {string} [apiKey] - OpenAI API key (defaults to OPENAI_API_KEY env var)
 * @param {string} [workingDir] - Working directory for git operations (defaults to current dir)
 * @param {number} [maxDiffLength] - Maximum diff length before truncation (defaults to 8000)
 * @returns {Promise<string>} Generated PR summary
 */
export async function generatePrSummary(
  apiKey,
  workingDir = process.cwd(),
  maxDiffLength = 8000
) {
  try {
    const openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
      timeout: 15 * 60 * 1000 // 15 minutes timeout for Flex processing
    })

    // Get git diff - try staged first, then unstaged, then against origin/main
    let gitDiff = execSync("git diff --staged --name-status", {
      cwd: workingDir,
      encoding: "utf8"
    }).trim()

    let diffCommand = "git diff --staged --unified=3"

    // If no staged changes, check unstaged changes
    if (!gitDiff) {
      gitDiff = execSync("git diff --name-status", {
        cwd: workingDir,
        encoding: "utf8"
      }).trim()
      diffCommand = "git diff --unified=3"
    }

    // If still no changes, compare against origin/main (for PRs)
    if (!gitDiff) {
      gitDiff = execSync("git diff origin/main --name-status", {
        cwd: workingDir,
        encoding: "utf8"
      }).trim()
      diffCommand = "git diff origin/main --unified=3"
    }

    if (!gitDiff) {
      return "No changes detected in this update."
    }

    // Get more detailed diff for modified files (limited to avoid token limits)
    const detailedDiff = execSync(diffCommand, {
      cwd: workingDir,
      encoding: "utf8"
    })

    // Truncate diff if it's too long to avoid token limits
    const truncatedDiff =
      detailedDiff.length > maxDiffLength
        ? detailedDiff.substring(0, maxDiffLength) +
          "\n\n[...diff truncated...]"
        : detailedDiff

    const prompt = `Summarize this git diff of API documentation changes.

RULES:
- One bullet per file changed
- Format: \`filename\`: [what changed in under 12 words]
- State ONLY facts. No meta-commentary.
- Do NOT use: "for clarity", "for readability", "improved", "updated", "enhanced"
- Do NOT explain why changes were made
- Do NOT mention what didn't change
- Maximum 8 bullets total

GOOD examples:
- \`rate_limits.md\`: Added new rate limit tier for VIP users
- \`authentication.md\`: Added ED25519 signature method
- \`get_order.md\`: New \`clientOrderId\` parameter

BAD examples (never do this):
- "Text clarification / readability improvement" ❌
- "Slightly rephrased the description for clarity" ❌
- "No functional changes; formatting only" ❌

Files changed:
${gitDiff}

Diff:
${truncatedDiff}`

    console.error("About to call OpenAI API with:")
    console.error("Model: gpt-5.1")
    console.error("Service tier: flex")
    console.error("Prompt length:", prompt.length)
    console.error("Max completion tokens: 500")

    const response = await openai.responses.create({
      model: "gpt-5.1",
      instructions:
        "Output only bullet points. No introductions, conclusions, or explanations. Be terse.",
      input: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_output_tokens: 500,
      service_tier: "flex"
    })

    console.error("OpenAI API call completed successfully")
    console.error("Response output length:", response.output_text?.length)

    const summary = response.output_text?.trim()

    if (!summary) {
      return "API documentation has been updated with latest changes."
    }

    return summary
  } catch (error) {
    console.error("Error generating AI PR summary:")
    console.error("Error message:", error.message)
    console.error("Error code:", error.code)
    console.error("Error status:", error.status)
    console.error("Error type:", error.type)
    console.error("Full error object:", JSON.stringify(error, null, 2))
    console.error("Stack trace:", error.stack)



    return "API documentation has been updated with latest changes."
  }
}
