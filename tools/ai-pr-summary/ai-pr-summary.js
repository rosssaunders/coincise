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
      apiKey: apiKey || process.env.OPENAI_API_KEY
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

Generate a PR summary with two sections:
1. A detailed PR summary with bullet points
2. A Twitter/X friendly update (max 280 characters) that highlights the key changes in an engaging way. Use relevant emojis and make it suitable for social media.

Format your response as:
## PR Summary
[detailed summary with bullet points]

## Twitter/X Update
[concise social media update]`

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are a technical documentation assistant that creates clear, concise PR summaries for API documentation updates. You also create engaging Twitter/X updates that highlight key changes in a social media friendly format with emojis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 700,
      temperature: 0.3
    })

    const summary = completion.choices[0]?.message?.content?.trim()

    if (!summary) {
      return "API documentation has been updated with latest changes."
    }

    return summary
  } catch (error) {
    console.error("Error generating AI PR summary:", error.message)

    // Fallback to basic summary if AI fails
    try {
      const gitDiff = execSync("git diff --staged --name-status", {
        cwd: workingDir,
        encoding: "utf8"
      }).trim()

      if (gitDiff) {
        const files = gitDiff.split("\n")
        const modifiedCount = files.filter(line => line.startsWith("M")).length
        const addedCount = files.filter(line => line.startsWith("A")).length
        const deletedCount = files.filter(line => line.startsWith("D")).length

        let summary = "API documentation has been updated:\n\n"
        if (modifiedCount > 0)
          summary += `- Modified ${modifiedCount} file(s)\n`
        if (addedCount > 0) summary += `- Added ${addedCount} file(s)\n`
        if (deletedCount > 0) summary += `- Deleted ${deletedCount} file(s)\n`

        return summary
      }
    } catch (fallbackError) {
      console.error("Error generating fallback summary:", fallbackError.message)
    }

    return "API documentation has been updated with latest changes."
  }
}
