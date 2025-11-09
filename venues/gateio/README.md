# Gate.io Documentation Scraper

This scraper extracts API documentation from Gate.io's official documentation website and converts it to Markdown format.

## Features

### Resilient HTTP Fetching

The scraper implements robust HTTP fetching to handle Gate.io's anti-bot protection:

1. **Browser-like User-Agent Headers**: All requests include realistic browser headers to avoid being flagged as bots
2. **Automatic Retry with Exponential Backoff**: Failed requests are automatically retried up to 3 times with increasing delays (500ms → 1500ms → 4500ms)
3. **Detailed Error Logging**: Failed requests log status codes, response headers, and response body previews for debugging
4. **Puppeteer Fallback**: If HTTP requests fail with 403 (Forbidden) errors, the scraper automatically falls back to using a headless browser (Puppeteer)

### Architecture

- **`src/fetcher.js`**: Core HTTP fetching logic with axios-retry
- **`src/puppeteer-fallback.js`**: Headless browser fallback for blocked requests
- **`src/utils.js`**: Utility functions including the `downloadHtml` wrapper
- **`src/scripts/test-fetch.js`**: Smoke test to validate fetch behavior

## Installation

```bash
pnpm install --frozen-lockfile
```

## Usage

### Extract All Documentation

```bash
npm start
```

### Extract Specific Sections

```bash
# REST API sections
pnpm run extract:change-log
pnpm run extract:general
pnpm run extract:spot
pnpm run extract:futures
# ... etc

# WebSocket sections
pnpm run extract:websocket-spot
pnpm run extract:websocket-futures
# ... etc
```

### Test Fetch Behavior

```bash
pnpm run test:fetch
```

This smoke test validates that the HTTP fetching works correctly, including retry logic and fallback mechanisms.

## Environment Variables

You can disable the Puppeteer fallback by modifying the code if needed (though it's recommended to keep it enabled for resilience).

## Dependencies

- **axios**: HTTP client for making requests
- **axios-retry**: Automatic retry logic with exponential backoff
- **puppeteer**: Headless browser for fallback fetching
- **cheerio**: HTML parsing
- **jsdom**: DOM manipulation
- **turndown**: HTML to Markdown conversion

## Error Handling

The scraper will:

1. Try to fetch with axios using browser-like headers
2. Retry up to 3 times with exponential backoff on 403, 429, or 5xx errors
3. Fall back to Puppeteer if axios continues to fail with 403 errors
4. Exit with a non-zero code and clear error message if all attempts fail

This ensures that transient network issues or anti-bot protections don't cause the CI/CD pipeline to fail unnecessarily.

## CI/CD Integration

The scraper runs automatically via GitHub Actions (`.github/workflows/gateio-docs-update.yml`):

- **Schedule**: Daily at 00:00 UTC
- **Trigger**: Manual dispatch or pushes to `venues/gateio/**`
- **Outputs**: Creates a PR with updated documentation if changes are detected

## Troubleshooting

If extractions fail:

1. Check the logs for retry attempts and error details
2. Run `pnpm run test:fetch` locally to diagnose fetch issues
3. Verify Gate.io's documentation is accessible in your browser
4. Check if Gate.io has implemented new anti-bot measures

The detailed logging will help identify whether the issue is:
- Network connectivity
- Anti-bot blocking (look for 403 errors)
- Changed HTML structure
- Code bugs
