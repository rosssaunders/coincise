# AI PR Summary Tool

This tool generates AI-powered PR summaries based on git changes for cryptocurrency exchange API documentation updates.

## Features

- Configurable maximum diff length to prevent truncation issues
- Fallback to basic summary when AI service is unavailable
- Designed specifically for crypto API documentation changes

## Usage

### Command Line

```bash
node generate-pr-summary.js [working-directory] [max-diff-length]
```

### Parameters

- `working-directory`: Git working directory (defaults to current directory)
- `max-diff-length`: Maximum diff length before truncation (defaults to 8000)

### Examples

```bash
# Use default settings (8000 max diff length)
node generate-pr-summary.js

# Specify working directory
node generate-pr-summary.js /path/to/repo

# Specify both working directory and max diff length
node generate-pr-summary.js /path/to/repo 15000
```

### Environment Variables

- `OPENAI_API_KEY`: Required for AI-powered summaries. If not provided, falls back to basic summary.

## Integration with GitHub Workflows

The tool is integrated into all venue documentation update workflows with a default max diff length of 15000 characters, providing more comprehensive summaries compared to the previous 8000 character limit.

Example workflow usage:
```yaml
- name: Generate AI PR Summary
  if: steps.git-check.outputs.changes == 'true'
  id: ai-summary
  run: |
    cd tools/ai-pr-summary && npm run generate-pr-summary ../../ 15000
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```