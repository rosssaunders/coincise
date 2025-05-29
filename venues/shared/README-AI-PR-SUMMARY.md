# AI PR Summary Generator

This utility generates AI-powered pull request summaries for cryptocurrency exchange API documentation updates.

## Features

- **AI-Powered Analysis**: Uses OpenAI GPT-3.5-turbo to analyze git changes and generate meaningful PR descriptions
- **Robust Fallback**: Generates basic file change summaries when OpenAI is unavailable
- **Error Handling**: Graceful error handling ensures workflows continue even if AI generation fails
- **Token Optimization**: Truncates large diffs to stay within API token limits

## Usage

### Command Line
```bash
cd venues/shared
npm run generate-pr-summary [working-directory]
```

### In GitHub Actions
```yaml
- name: Generate AI PR Summary
  if: steps.git-check.outputs.changes == 'true'
  id: ai-summary
  run: |
    cd ../../../  # Move back to root directory for git operations
    # Generate AI summary using the shared utility
    SUMMARY=$(cd venues/shared && npm run generate-pr-summary ../../ 2>/dev/null | sed -n '/---PR_SUMMARY_START---/,/---PR_SUMMARY_END---/p' | sed '1d;$d')
    # Escape the summary for GitHub Actions
    echo "summary<<EOF" >> $GITHUB_OUTPUT
    echo "$SUMMARY" >> $GITHUB_OUTPUT
    echo "EOF" >> $GITHUB_OUTPUT
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## Configuration

### Environment Variables
- `OPENAI_API_KEY`: OpenAI API key for AI summary generation (optional - falls back to basic summaries)

### Dependencies
- `openai`: OpenAI API client for Node.js
- Standard Node.js modules: `child_process`, `path`, `url`

## Error Handling

The utility provides multiple levels of fallback:

1. **Primary**: AI-generated summary using OpenAI
2. **Fallback**: Basic file change summary (Modified X files, Added Y files, etc.)
3. **Final Fallback**: Generic "API documentation has been updated" message

## Output Format

The script outputs the summary between special markers:
```
---PR_SUMMARY_START---
[Generated summary content]
---PR_SUMMARY_END---
```

This format allows easy extraction in shell scripts and GitHub Actions workflows.

## Implementation Details

### Files
- `ai-pr-summary.js`: Core AI summary generation logic
- `generate-pr-summary.js`: CLI script for workflow integration

### AI Prompt Strategy
The utility sends git diff information to OpenAI with specific instructions to:
- Focus on API endpoint changes
- Identify new features and modifications
- Use bullet points for readability
- Keep summaries concise but informative

### Token Management
- Limits git diff content to 8000 characters to avoid token limits
- Uses temperature 0.3 for consistent, focused output
- Limits response to 500 tokens

## Integration Status

This feature is integrated into all 18 cryptocurrency exchange documentation workflows:
- binance-coinm-docs-update.yml
- binance-futures-change_log_update.yml
- binance-options-docs-update.yml
- binance-spot-docs-update.yml
- binance-usdm-docs-update.yml
- bingx-docs-update.yml
- bitfinex-docs-update.yml
- bitget-docs-update.yml
- bybit-docs-update.yml
- coinbase-exchange-docs-update.yml
- cryptocom-docs-update.yml
- deribit-docs-update.yml
- gateio-docs-update.yml
- htx-docs-update.yml
- kucoin-docs-update.yml
- mexc-docs-update.yml
- okx-docs-update.yml
- upbit-docs-update.yml