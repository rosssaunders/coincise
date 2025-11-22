# GitHub Actions Workflows Documentation

## AutoDoc Issue Creator Workflow

This workflow automatically creates issues in the ccrxt repository when PRs with
the "auto-docs-update" label are merged.

### Trigger

The workflow is triggered when:

- A pull request is closed (merged)
- The PR has the "auto-docs-update" label
- The PR is targeting the main branch

### What it does

1. **Collects PR Information**: Gathers all relevant information about the
   merged PR
2. **Creates CCRXT Issue**: Automatically creates an issue in the
   rosssaunders/ccrxt repository with:
   - PR title, number, and URL
   - Who merged it and when
   - Original PR description
   - Link to raw diff (`.diff` URL)

### Required Secrets

- `PAT_GITHUB`: Personal Access Token with permissions to create issues in
  rosssaunders/ccrxt repository

### Issue Format

The created issue will have:

- **Title**: `[AutoDoc] {PR Title}`
- **Labels**: `autodoc`, `documentation`
- **Assignee**: The person who merged the PR
- **Body**: Comprehensive information about the PR and changes

### Example Issue

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

### Raw Diff URL

The workflow provides a direct link to the raw diff using GitHub's `.diff` URL
format:

- **Format**: `https://github.com/{owner}/{repo}/pull/{number}.diff`
- **Example**: `https://github.com/rosssaunders/cryptoapidocs/pull/123.diff`

This provides a clean, machine-readable diff that shows exactly what changed in
the PR.

### Dependencies

- GitHub CLI (gh) - Built into GitHub Actions runners
- Shell script for issue creation

### Files

- `.github/workflows/autodoc-issue-creator.yml`: Main workflow file
- `.github/scripts/create-ccrxt-issue.sh`: Shell script for creating issues in
  ccrxt repository

## Duplicate PR Prevention

All exchange documentation update workflows now include a step to prevent
multiple open PRs for the same exchange from accumulating.

### How it works

Before creating a new PR, each workflow:

1. Checks for existing open PRs with the `auto-docs-update` label
2. Filters by the specific exchange's PR title pattern
3. Closes any matching PRs with a descriptive comment
4. Then creates the new PR

### Implementation

The duplicate PR prevention is handled by the
`.github/scripts/close-duplicate-prs.sh` script, which:

- Takes a PR title pattern as an argument
- Uses GitHub CLI (`gh`) to search for matching open PRs
- Closes each matching PR with a comment explaining the closure
- Exits cleanly if no duplicates are found

### Usage in Workflows

Each exchange workflow includes this step before creating a PR:

```yaml
- name: Close duplicate PRs
  if: steps.git-check.outputs.changes == 'true'
  run: |
    .github/scripts/close-duplicate-prs.sh "Exchange Name API Documentation Update"
  env:
    GH_TOKEN: ${{ secrets.PAT_GITHUB }}
```

### Benefits

- **Prevents clutter**: No more multiple open PRs for the same exchange
- **Clear communication**: Closed PRs include a comment explaining why
- **Automatic cleanup**: Runs automatically before each new PR creation
- **No manual intervention**: No need to manually close duplicate PRs

### Script Details

**Script**: `.github/scripts/close-duplicate-prs.sh`

**Parameters**:
- `$1`: PR title pattern (e.g., "Bybit API Documentation Update")

**Environment Variables**:
- `GH_TOKEN`: GitHub token for authentication (uses `PAT_GITHUB` secret)

**Exit Codes**:
- `0`: Success (including when no duplicates found)
- `1`: Invalid usage (missing parameters)

**Example**:
```bash
.github/scripts/close-duplicate-prs.sh "Binance Spot API Documentation Update"
```
