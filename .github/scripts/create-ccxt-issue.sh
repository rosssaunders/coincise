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

# Construct the issue body - use a here document to avoid escaping issues
read -r -d '' ISSUE_BODY << 'EOF'
## AutoDoc Update from %s/%s

**PR Title:** %s
**PR Number:** #%s
**PR URL:** %s
**Merged by:** @%s
**Merged at:** %s

## PR Description
%s

## Raw Diff
View the complete diff changes: https://github.com/%s/%s/pull/%s.diff

---
*This issue was automatically created by the AutoDoc workflow when PR #%s was merged.*
EOF

# Create the issue using GitHub CLI with proper escaping
echo "Creating issue in rosssaunders/ccrxt..."

# Use printf to format the issue body safely
FORMATTED_BODY=$(printf "$ISSUE_BODY" "$REPO_OWNER" "$REPO_NAME" "$PR_TITLE" "$PR_NUMBER" "$PR_URL" "$MERGED_BY" "$MERGED_AT" "$PR_BODY" "$REPO_OWNER" "$REPO_NAME" "$PR_NUMBER" "$PR_NUMBER")

# Create the issue using a temporary file to avoid command line escaping issues
TEMP_FILE=$(mktemp)
echo "$FORMATTED_BODY" > "$TEMP_FILE"

# Create the issue - note: the user needs to have write access to the target repository
gh issue create \
  --repo rosssaunders/ccrxt \
  --title "[AutoDoc] $PR_TITLE" \
  --assignee "$MERGED_BY" \
  --label "autodoc" \
  --body-file "$TEMP_FILE"

# Clean up
rm -f "$TEMP_FILE"

echo "Issue created successfully!" 