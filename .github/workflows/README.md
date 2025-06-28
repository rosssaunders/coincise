# AutoDoc Issue Creator Workflow

This workflow automatically creates issues in the ccxt repository when PRs with
the "auto-docs-update" label are merged.

## Trigger

The workflow is triggered when:

- A pull request is closed (merged)
- The PR has the "auto-docs-update" label
- The PR is targeting the main branch

## What it does

1. **Collects PR Information**: Gathers all relevant information about the
   merged PR
2. **Creates CCXT Issue**: Automatically creates an issue in the ccxt/ccxt
   repository with:
   - PR title, number, and URL
   - Who merged it and when
   - Original PR description
   - Link to raw diff (`.diff` URL)

## Required Secrets

- `PAT_GITHUB`: Personal Access Token with permissions to create issues in
  ccxt/ccxt repository

## Issue Format

The created issue will have:

- **Title**: `[AutoDoc] {PR Title}`
- **Labels**: `autodoc`, `documentation`
- **Assignee**: The person who merged the PR
- **Body**: Comprehensive information about the PR and changes

## Example Issue

```
## AutoDoc Update from rosssaunders/cryptoapidocs

**PR Title:** Update Binance Spot API Documentation
**PR Number:** #123
**PR URL:** https://github.com/rosssaunders/cryptoapidocs/pull/123
**Merged by:** @rosssaunders
**Merged at:** 2024-01-15T10:30:00Z

## PR Description
Updated Binance Spot API documentation with new endpoints and parameter changes...

## Raw Diff
View the complete diff changes: https://github.com/rosssaunders/cryptoapidocs/pull/123.diff

---
*This issue was automatically created by the AutoDoc workflow when PR #123 was merged.*
```

## Raw Diff URL

The workflow provides a direct link to the raw diff using GitHub's `.diff` URL
format:

- **Format**: `https://github.com/{owner}/{repo}/pull/{number}.diff`
- **Example**: `https://github.com/rosssaunders/cryptoapidocs/pull/123.diff`

This provides a clean, machine-readable diff that shows exactly what changed in
the PR.

## Dependencies

- GitHub CLI (gh) - Built into GitHub Actions runners
- Shell script for issue creation

## Files

- `.github/workflows/autodoc-issue-creator.yml`: Main workflow file
- `.github/scripts/create-ccxt-issue.sh`: Shell script for creating issues in
  ccxt repository
