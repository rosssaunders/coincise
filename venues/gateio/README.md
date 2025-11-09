# Gate.io Documentation Scraper

This scraper extracts API documentation from Gate.io's official documentation website and converts it to Markdown format.

## Installation

```bash
pnpm install --frozen-lockfile
```

## Usage

### Standardized Extraction (Recommended)

Extract core documentation files using the new standardized approach:

```bash
# Extract general documentation (authentication, rate limits, etc.)
pnpm run extract:general

# Extract individual endpoint documentation (currently in development)
pnpm run extract:endpoints

# Extract both
pnpm run extract:all
```

The general extraction creates these core files in `docs/gateio/`:
- `network_connectivity.md` - API base URLs and data center information
- `authentication.md` - API key generation and signature requirements
- `rate_limits.md` - Frequency limits and rate limiting rules
- `error_codes.md` - Error handling and error code reference
- `response_formats.md` - Response format specifications
- `change_log.md` - API changelog (when available)

### Legacy Extraction

The original config-based extraction scripts are still available with the `extract:legacy:*` prefix:

```bash
# REST API sections
pnpm run extract:legacy:change-log
pnpm run extract:legacy:general
pnpm run extract:legacy:spot
pnpm run extract:legacy:futures
# ... etc

# WebSocket sections
pnpm run extract:legacy:websocket-spot
pnpm run extract:legacy:websocket-futures
# ... etc
```

### Test Fetch Behavior

```bash
pnpm run test:fetch
```

This smoke test validates that the HTTP fetching works correctly, including retry logic and fallback mechanisms.

## Features

### Standardized Extraction

The new extraction scripts follow the pattern established in Backpack, Deribit, and XT venues:

- **Pure ES6 JavaScript**: No TypeScript, functional programming paradigms
- **Shared Utilities**: Uses `venues/shared/puppeteer.js` and `venues/shared/turndown.js`
- **Consistent Structure**: Matches the standardized extraction pattern across all venues
- **Focused Output**: Creates targeted documentation files for core API concepts

### Resilient HTTP Fetching

The legacy scraper implements robust HTTP fetching to handle Gate.io's anti-bot protection:

1. **Browser-like User-Agent Headers**: All requests include realistic browser headers
2. **Automatic Retry with Exponential Backoff**: Failed requests are automatically retried up to 3 times
3. **Detailed Error Logging**: Failed requests log status codes, response headers, and response body previews
4. **Puppeteer Fallback**: Falls back to headless browser for 403 errors

### Architecture

- **`src/extractGeneral.js`**: Extracts core documentation sections (NEW)
- **`src/extractEndpoints.js`**: Extracts individual endpoint documentation (IN DEVELOPMENT)
- **`src/rest_api.js`**: Legacy config-based extraction (DEPRECATED)
- **`src/websocket_*.js`**: Legacy WebSocket documentation extractors (DEPRECATED)
- **`src/fetcher.js`**: Core HTTP fetching logic with axios-retry
- **`src/puppeteer-fallback.js`**: Headless browser fallback for blocked requests
- **`src/utils.js`**: Utility functions including the `downloadHtml` wrapper

## Current Limitations

**Endpoint Extraction**: The `extract:endpoints` script is currently in development. Gate.io's documentation is organized across multiple pages by product type (Spot, Futures, Options, etc.), which requires a different extraction approach than single-page API docs. For now, use the legacy extraction scripts for comprehensive endpoint documentation.

## Dependencies

- **puppeteer**: Headless browser for page rendering and extraction
- **turndown**: HTML to Markdown conversion
- **turndown-plugin-gfm**: GitHub Flavored Markdown support
- **axios**: HTTP client for legacy fetchers
- **axios-retry**: Automatic retry logic with exponential backoff
- **cheerio**: HTML parsing for legacy scripts
- **jsdom**: DOM manipulation

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

## Migration Notes

The venue is currently in transition from config-based extraction to the standardized extraction pattern. The legacy scripts (`extract:legacy:*`) will be maintained until endpoint extraction is fully implemented.
