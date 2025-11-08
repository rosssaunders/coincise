# Bitfinex API Documentation Extractor

This project extracts API documentation from Bitfinex and converts it to markdown format following the standardized Coincise extraction pattern.

## Features

- Extracts core documentation sections (authentication, rate limits, network connectivity, error codes, response formats, change log)
- Extracts all REST API endpoints (both public and private)
- Organizes endpoints by authentication requirement
- Converts HTML to Markdown with proper formatting
- Preserves code blocks with syntax highlighting
- Uses shared Puppeteer and Turndown utilities

## Project Structure

```
bitfinex/
├── src/
│   ├── extractGeneral.js     # Extracts core documentation files
│   └── extractEndpoints.js   # Extracts individual endpoint documentation
├── package.json
└── README.md
```

## Output Structure

```
docs/bitfinex/
├── authentication.md          # API authentication documentation
├── rate_limits.md             # Rate limiting rules and policies
├── network_connectivity.md    # Connection info and endpoints
├── error_codes.md             # Error code definitions
├── response_formats.md        # Standard response structures
├── change_log.md              # API version history
└── endpoints/
    ├── public/                # Public endpoints (no authentication required)
    │   └── get_*.md          # Public endpoint files
    └── private/               # Private endpoints (authentication required)
        └── post_*.md         # Private endpoint files
```

## Dependencies

- turndown: ^7.2.1 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - GitHub Flavored Markdown support
- puppeteer: ^24.22.0 - For web scraping and dynamic content extraction

Shared utilities are imported from `venues/shared/` (puppeteer.js, turndown.js).

## Usage

1. Install dependencies:

```bash
npm install
```

2. Extract all documentation:

```bash
npm run extract:all
```

3. Or run specific extractors:

```bash
# Extract core documentation
npm run extract:general

# Extract endpoint documentation
npm run extract:endpoints
```

## Documentation Sources

- **Core Documentation**: Extracted from various pages under `https://docs.bitfinex.com/docs/`
- **Public Endpoints**: Extracted from `https://docs.bitfinex.com/docs/rest-public`
- **Private Endpoints**: Extracted from `https://docs.bitfinex.com/docs/rest-auth`

All endpoint pages are under `https://docs.bitfinex.com/reference/`

## Endpoint Categorization

Endpoints are automatically categorized as public or private based on:

1. API path analysis (presence of `/auth/` in the path)
2. URL pattern matching (rest-public vs rest-auth)
3. Content analysis for authentication requirements

## Notes

- Public endpoints typically use GET method and do not require authentication
- Private endpoints typically use POST method and require API key authentication
- All extracted documentation includes source URLs for reference
- Core documentation files are kept under 1000 lines for optimal LLM consumption
