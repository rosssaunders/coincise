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

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a social media assistant that creates engaging Twitter/X updates for technical documentation changes in the cryptocurrency space. You understand crypto exchanges and can create compelling social media content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.5,
      service_tier: "flex"
    })

    const twitterSummary = completion.choices[0]?.message?.content?.trim()

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

    // Fallback to basic Twitter summary if AI fails
    try {
      const gitDiff = execSync("git diff HEAD~1 --name-status", {
        cwd: workingDir,
        encoding: "utf8"
      }).trim()

      if (gitDiff) {
        const files = gitDiff.split("\n")
        const exchangeName = extractExchangeName(files[0])
        if (exchangeName) {
          return `📚 Updated ${exchangeName} API documentation! 🚀 #crypto #API #${exchangeName.toLowerCase()}`
        }
      }
    } catch (fallbackError) {
      console.error(
        "Error generating fallback Twitter summary:",
        fallbackError.message
      )
    }

    return "📚 Updated cryptocurrency exchange API documentation! 🚀 #crypto #API #documentation"
  }
}

/**
 * Extract exchange name from file path
 * @param {string} filePath - Git file path
 * @returns {string|null} Exchange name or null
 */
function extractExchangeName(filePath) {
  const match = filePath.match(/docs\/([^\/]+)\//)
  if (match) {
    const exchangeName = match[1]
    // Capitalize first letter
    return exchangeName.charAt(0).toUpperCase() + exchangeName.slice(1)
  }
  return null
}

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

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a technical documentation assistant that creates clear, concise PR summaries for API documentation updates."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 700,
      temperature: 0.3,
      service_tier: "flex"
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
