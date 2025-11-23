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

    // Get git diff for staged changes
    const gitDiff = execSync("git diff --staged --name-status", {
      cwd: workingDir,
      encoding: "utf8"
    }).trim()

    if (!gitDiff) {
      return "No changes detected in this update."
    }

    // Get more detailed diff for modified files (limited to avoid token limits)
    const detailedDiff = execSync("git diff --staged --unified=3", {
      cwd: workingDir,
      encoding: "utf8"
    })

    // Truncate diff if it's too long to avoid token limits
    const truncatedDiff =
      detailedDiff.length > maxDiffLength
        ? detailedDiff.substring(0, maxDiffLength) +
          "\n\n[...diff truncated...]"
        : detailedDiff

    const prompt = `You are analyzing changes made to cryptocurrency exchange API documentation. Based on the git diff below, generate a concise but informative PR summary that explains what documentation was updated.

Focus on:
- Which API endpoints or sections were modified
- What types of changes were made (new endpoints, parameter updates, documentation improvements, etc.)
- Keep it professional and concise
- Use bullet points for readability

Git diff:
\`\`\`
${truncatedDiff}
\`\`\`

File changes summary:
\`\`\`
${gitDiff}
\`\`\`

Generate a detailed PR summary with bullet points that explains the documentation changes clearly and professionally.`

    console.error("About to call OpenAI API with:")
    console.error("Model: gpt-5-mini")
    console.error("Service tier: flex")
    console.error("Prompt length:", prompt.length)
    console.error("Max completion tokens: 3000")

    const response = await openai.responses.create({
      model: "gpt-5.1",
      instructions:
        "You are a technical documentation assistant that creates clear, concise PR summaries for API documentation updates.",
      input: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_output_tokens: 3000,
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
