# Create Twitter Summary PR Tool

This tool creates a new PR containing a Twitter/X summary when autodoc PRs are merged.

## Features

- Automatically triggers when autodoc PRs are merged
- Generates AI-powered Twitter summaries based on documentation changes
- Creates a new PR for review before posting to social media
- Includes original PR details and context

## Usage

This tool is designed to run in GitHub Actions workflows and expects specific environment variables:

### Required Environment Variables

- `GITHUB_TOKEN`: GitHub token for creating PRs
- `PR_TITLE`: Title of the merged autodoc PR
- `PR_NUMBER`: Number of the merged autodoc PR
- `MERGED_BY`: User who merged the PR
- `OPENAI_API_KEY`: OpenAI API key for generating summaries (optional, falls back to default)

### Optional Environment Variables

- `PR_URL`: URL of the merged PR
- `MERGED_AT`: Timestamp when PR was merged
- `REPO_OWNER`: Repository owner
- `REPO_NAME`: Repository name

## Workflow Integration

This tool is used in the `twitter-summary-generator.yml` workflow:

```yaml
- name: Create Twitter Summary PR
  run: |
    cd tools/create-twitter-summary-pr
    node create-twitter-summary-pr.js
  env:
    PR_TITLE: ${{ github.event.pull_request.title }}
    PR_NUMBER: ${{ github.event.pull_request.number }}
    # ... other environment variables
```

## Output

The tool creates:
1. A markdown file containing the Twitter summary and original PR details
2. A new PR with the "twitter-summary" label for review
3. The PR is assigned to the original merger for approval

## Process Flow

1. Autodoc PR is merged with "auto-docs-update" label
2. This tool generates a Twitter summary
3. Creates a new PR with the Twitter content
4. When the Twitter summary PR is merged, the tweet is posted automatically