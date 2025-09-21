#!/bin/bash

# Create an issue in the ccrxt repository when a PR with autodoc label is merged

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
## 🔄 AutoDoc Update from %s/%s

## 📋 Action Required

**Please review the changes in the documentation and implement them in the CCXT codebase as necessary.**

### Step-by-step instructions:

1. **Review the Changes**: Examine the diff linked below to understand what documentation updates were made
2. **Analyze Impact**: Determine if these changes affect any existing CCXT implementation
3. **Code Review**: Check if the documented API changes require updates to CCXT's exchange integration
4. **Implementation**: Make necessary code changes to align with the updated documentation
5. **Testing**: Verify that any code changes work correctly with the exchange's API
6. **Documentation**: Update CCXT's own documentation if needed

### 📖 Change Details

**PR Title:** %s
**PR Number:** #%s
**PR URL:** %s
**Merged by:** @%s
**Merged at:** %s

### 📝 PR Description
%s

### 🔍 Review the Changes
**Complete diff:** https://github.com/%s/%s/pull/%s.diff

**Next Steps:**
- Click the diff link above to see exactly what changed
- Review each modified file to understand the scope of changes
- Implement corresponding updates in CCXT if the changes affect API behavior
- Test the implementation with the exchange's live or sandbox API

---
*This issue was automatically created by the AutoDoc workflow when PR #%s was merged.*
*Please review and close this issue once the changes have been properly implemented or determined to be unnecessary.*
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