import { execSync } from "child_process"

/**
 * Create an issue in the ccxt repository when a PR with autodoc label is merged
 */
async function createCcxtIssue() {
  try {
    // Get PR information from environment variables
    const prTitle = process.env.PR_TITLE
    const prNumber = process.env.PR_NUMBER
    const prUrl = process.env.PR_URL
    const prBody = process.env.PR_BODY
    const mergedBy = process.env.MERGED_BY
    const mergedAt = process.env.MERGED_AT
    const repoOwner = process.env.REPO_OWNER
    const repoName = process.env.REPO_NAME
    const diffUrl = process.env.DIFF_URL
    const changedFiles = process.env.CHANGED_FILES
    const githubToken = process.env.GITHUB_TOKEN

    if (!githubToken) {
      throw new Error("GITHUB_TOKEN environment variable is required")
    }

    // Construct the issue body
    const issueBody = `## AutoDoc Update from ${repoOwner}/${repoName}

**PR Title:** ${prTitle}
**PR Number:** #${prNumber}
**PR URL:** ${prUrl}
**Merged by:** @${mergedBy}
**Merged at:** ${mergedAt}

## PR Description
${prBody || "No description provided"}

## Raw Diff
View the complete diff changes: ${diffUrl}

## Changed Files
\`\`\`
${changedFiles || "No files changed"}
\`\`\`

---
*This issue was automatically created by the AutoDoc workflow when PR #${prNumber} was merged.*`

    // Create the issue using GitHub CLI
    const command = `gh issue create --repo ccxt/ccxt --title "[AutoDoc] ${prTitle}" --body "${issueBody.replace(/"/g, '\\"')}" --label "autodoc,documentation"`

    console.log("Creating issue in ccxt/ccxt...")
    const result = execSync(command, {
      encoding: "utf8",
      env: { ...process.env, GH_TOKEN: githubToken }
    })

    console.log("Issue created successfully:", result)
    return result
  } catch (error) {
    console.error("Error creating issue:", error.message)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  createCcxtIssue().catch(error => {
    console.error("Unhandled error in createCcxtIssue:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
