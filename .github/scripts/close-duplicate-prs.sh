#!/bin/bash

# Close duplicate PRs for exchange documentation updates before creating a new one
# This prevents multiple open PRs for the same exchange from accumulating

set -e

# Check if required parameters are provided
if [ -z "$1" ]; then
  echo "Usage: $0 <pr-title-pattern>"
  echo "Example: $0 'Binance Spot API Documentation Update'"
  exit 1
fi

PR_TITLE_PATTERN="$1"

echo "Checking for existing open PRs matching pattern: '$PR_TITLE_PATTERN'"

# Use GitHub CLI to find open PRs with the auto-docs-update label and matching title
# The jq query filters PRs by title pattern (case-insensitive)
EXISTING_PRS=$(gh pr list \
  --state open \
  --label "auto-docs-update" \
  --json number,title \
  --jq ".[] | select(.title | test(\"$PR_TITLE_PATTERN\"; \"i\")) | .number")

if [ -z "$EXISTING_PRS" ]; then
  echo "No existing open PRs found matching pattern."
  exit 0
fi

# Close each existing PR
echo "Found existing open PRs: $EXISTING_PRS"
for PR_NUMBER in $EXISTING_PRS; do
  echo "Closing PR #$PR_NUMBER..."
  gh pr close "$PR_NUMBER" --comment "Closing this PR as a new documentation update is being created. Changes will be included in the new PR if still relevant." || {
    echo "Warning: Failed to close PR #$PR_NUMBER"
  }
done

echo "Finished closing duplicate PRs."
