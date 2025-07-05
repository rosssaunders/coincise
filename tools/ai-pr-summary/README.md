# AI PR Summary Tool

This tool generates AI-powered PR summaries and Twitter summaries based on git changes for cryptocurrency exchange API documentation updates.

## Features

- Separate functions for PR summaries and Twitter/X updates
- Configurable maximum diff length to prevent truncation issues
- Fallback to basic summaries when AI service is unavailable
- Designed specifically for crypto API documentation changes
- Twitter summaries optimized for social media engagement

## Usage

### PR Summary Generation

```bash
node generate-pr-summary.js [working-directory] [max-diff-length]
```

### Twitter Summary Generation

```bash
node generate-twitter-summary.js [working-directory] [max-diff-length]
```

### Parameters

- `working-directory`: Git working directory (defaults to current directory)
- `max-diff-length`: Maximum diff length before truncation (defaults to 8000)

### Examples

```bash
# Generate PR summary with default settings
node generate-pr-summary.js

# Generate Twitter summary with default settings
node generate-twitter-summary.js

# Specify working directory
node generate-pr-summary.js /path/to/repo

# Specify both working directory and max diff length
node generate-pr-summary.js /path/to/repo 15000
node generate-twitter-summary.js /path/to/repo 15000
```

### Environment Variables

- `OPENAI_API_KEY`: Required for AI-powered summaries. If not provided, falls back to basic summaries.

## Integration with GitHub Workflows

### PR Summary Integration

The PR summary tool is integrated into autodoc workflows to generate comprehensive PR descriptions:

```yaml
- name: Generate AI PR Summary
  if: steps.git-check.outputs.changes == 'true'
  id: ai-summary
  run: |
    cd tools/ai-pr-summary && npm run generate-pr-summary ../../ 15000
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

### Twitter Summary Integration

Twitter summaries are generated automatically when autodoc PRs are merged:

1. **Twitter Summary Generator Workflow**: Triggers when autodoc PRs are merged, creates a new PR with Twitter content
2. **Tweet Poster Workflow**: Triggers when Twitter summary PRs are merged, posts the tweet automatically

This ensures proper review and approval of social media content before posting.