#!/bin/bash

# Create an issue in the ccxt repository when a PR with autodoc label is merged

# Get PR information from environment variables
PR_TITLE="$1"
PR_NUMBER="$2"
PR_URL="$3"
PR_BODY="$4"
MERGED_BY="$5"
MERGED_AT="$6"
REPO_OWNER="$7"
REPO_NAME="$8"

# Construct the issue body
ISSUE_BODY="## AutoDoc Update from $REPO_OWNER/$REPO_NAME

**PR Title:** $PR_TITLE
**PR Number:** #$PR_NUMBER
**PR URL:** $PR_URL
**Merged by:** @$MERGED_BY
**Merged at:** $MERGED_AT

## PR Description
$PR_BODY

## Raw Diff
View the complete diff changes: https://github.com/$REPO_OWNER/$REPO_NAME/pull/$PR_NUMBER.diff

---
*This issue was automatically created by the AutoDoc workflow when PR #$PR_NUMBER was merged.*"

# Create the issue using GitHub CLI
echo "Creating issue in ccxt/ccxt..."
gh issue create \
  --repo ccxt/ccxt \
  --title "[AutoDoc] $PR_TITLE" \
  --assignee "$MERGED_BY" \
  --label "autodoc,documentation" \
  --body "$ISSUE_BODY"

echo "Issue created successfully!" 