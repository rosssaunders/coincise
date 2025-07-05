import { execSync } from "child_process"
import { generateTwitterSummary } from "../ai-pr-summary/ai-pr-summary.js"

/**
 * Create a PR with Twitter summary when an autodoc PR is merged
 */
async function createTwitterSummaryPr() {
  try {
    // Get PR information from environment variables
    const prTitle = process.env.PR_TITLE
    const prNumber = process.env.PR_NUMBER
    const prUrl = process.env.PR_URL
    const mergedBy = process.env.MERGED_BY
    const mergedAt = process.env.MERGED_AT
    const repoOwner = process.env.REPO_OWNER
    const repoName = process.env.REPO_NAME
    const githubToken = process.env.GITHUB_TOKEN

    if (!githubToken) {
      throw new Error("GITHUB_TOKEN environment variable is required")
    }

    if (!prTitle || !prNumber) {
      throw new Error("PR_TITLE and PR_NUMBER environment variables are required")
    }

    console.log(`Generating Twitter summary for merged PR: ${prTitle}`)

    // Generate Twitter summary based on the merged changes
    const twitterSummary = await generateTwitterSummary(
      process.env.OPENAI_API_KEY,
      process.cwd(),
      15000
    )

    console.log("Generated Twitter summary:", twitterSummary)

    // Create a markdown file with the Twitter summary
    const twitterFileName = `twitter-summary-pr-${prNumber}.md`
    const twitterFileContent = `# Twitter Summary for PR #${prNumber}

## Original PR Details
- **Title:** ${prTitle}
- **Number:** #${prNumber}
- **URL:** ${prUrl}
- **Merged by:** @${mergedBy}
- **Merged at:** ${mergedAt}

## Twitter/X Update

${twitterSummary}

## Instructions

When this PR is merged, the above Twitter/X update will be automatically posted to social media.

---
*This Twitter summary was automatically generated based on the merged documentation changes.*`

    // Write the Twitter summary to a file
    const fs = await import('fs/promises')
    await fs.writeFile(twitterFileName, twitterFileContent)

    // Add the file to git
    execSync(`git add ${twitterFileName}`, {
      encoding: "utf8"
    })

    // Check if there are any changes to commit
    let hasChanges = false
    try {
      execSync("git diff --staged --quiet", { encoding: "utf8" })
    } catch (error) {
      hasChanges = true
    }

    if (!hasChanges) {
      console.log("No changes to commit for Twitter summary")
      return
    }

    // Commit the changes
    execSync(`git commit -m "feat: add Twitter summary for PR #${prNumber}"`, {
      encoding: "utf8"
    })

    // Create the PR using GitHub CLI
    const prBodyTemplate = `## Twitter Summary for Merged PR #${prNumber}

This PR contains a Twitter/X summary for the recently merged documentation update.

### Original PR Details
- **Title:** ${prTitle}
- **Number:** #${prNumber}
- **URL:** ${prUrl}
- **Merged by:** @${mergedBy}

### Twitter Summary
${twitterSummary}

### Next Steps
When this PR is merged, the Twitter summary will be automatically posted to social media.

---
*This PR was automatically created after merging the autodoc PR #${prNumber}.*`

    const command = `gh pr create --title "Twitter Summary for PR #${prNumber}: ${prTitle}" --body "${prBodyTemplate.replace(/"/g, '\\"')}" --label "twitter-summary" --reviewer "${mergedBy}"`

    console.log("Creating Twitter summary PR...")
    const result = execSync(command, {
      encoding: "utf8",
      env: { ...process.env, GH_TOKEN: githubToken }
    })

    console.log("Twitter summary PR created successfully:", result)
    return result
  } catch (error) {
    console.error("Error creating Twitter summary PR:", error.message)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  createTwitterSummaryPr().catch(error => {
    console.error("Unhandled error in createTwitterSummaryPr:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}