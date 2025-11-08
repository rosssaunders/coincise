# OKX API Documentation Extractor

A tool for extracting and converting OKX API documentation into standardized LLM-friendly markdown format.

## Project Structure

```
okx/
├── src/
│   ├── extractGeneral.js    # Core documentation extraction
│   └── extractEndpoints.js  # Individual endpoint extraction
├── config/                  # Legacy configuration files (archived)
├── package.json             # Project dependencies
└── README.md               # This file
```

## Documentation Structure

The extractor generates documentation in the following structure:

```
docs/okx/
├── rate_limits.md          # API rate limiting rules and policies
├── authentication.md       # API key creation and request signing
├── network_connectivity.md # Connection info, endpoints, WebSocket
├── error_codes.md          # Error code definitions
├── response_formats.md     # Standard response structures
├── change_log.md           # API version history
└── endpoints/
    ├── public/             # Public endpoints (no authentication)
    └── private/            # Private endpoints (require authentication)
```

## Dependencies

- puppeteer: ^24.22.0 - For web scraping
- turndown: ^7.2.1 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - For GitHub Flavored Markdown support
- jsdom: 27.0.0 - For HTML parsing

## Usage

1. Install dependencies:

   ```bash
   npm install
   ```

2. Extract all documentation:

   ```bash
   npm run extract:all
   ```

3. Extract specific sections:

   ```bash
   # Extract core documentation files only
   npm run extract:general

   # Extract individual endpoints only
   npm run extract:endpoints
   ```

## Extraction Process

### General Documentation (`extractGeneral.js`)

Extracts the following core documentation files from the OKX API overview page:

- **rate_limits.md** - Rate limiting rules, tiers, and best practices
- **authentication.md** - API key creation, permissions, and request signing
- **network_connectivity.md** - Production/demo services, WebSocket, timeouts
- **error_codes.md** - REST API error codes and HTTP status codes
- **response_formats.md** - Standard JSON response structure
- **change_log.md** - API updates and announcements

All core files are kept under 1000 lines to ensure they are focused and maintainable.

### Endpoint Documentation (`extractEndpoints.js`)

Extracts individual endpoint documentation:

- Categorizes endpoints as **public** (no authentication) or **private** (requires API keys)
- Uses filename format: `{http_method}_{endpoint_name}.md`
- Includes source URL for each endpoint
- Captures request parameters, response schemas, and rate limits
- Extracted ~269 total endpoints (128 public, 141 private)

## Features

- Follows standardized extraction pattern used by Backpack, Deribit, and XT exchanges
- Separates core documentation from endpoint-specific documentation
- Generates LLM-friendly markdown optimized for AI consumption
- Maintains proper section boundaries to prevent over-extraction
- Includes source URLs for traceability
- Categorizes endpoints by authentication requirements
- Uses shared Puppeteer and Turndown utilities for consistency

## Source

Documentation is extracted from: https://www.okx.com/docs-v5/en/
