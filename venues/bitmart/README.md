# Bitmart API Documentation Extractor

This project extracts API documentation from Bitmart and converts it to markdown format following the Coincise standardized extraction pattern.

## Features

- Extracts core documentation sections (authentication, rate limits, network connectivity, error codes, changelog, response formats)
- Extracts individual REST API endpoints into separate files
- Organizes endpoints by public/private classification
- Converts HTML to Markdown with proper formatting
- Handles both Spot and Futures API documentation

## Project Structure

```
bitmart/
├── config/
│   ├── spot.json            # Legacy configuration for spot trading
│   └── futures.json         # Legacy configuration for futures trading
├── src/
│   ├── extractGeneral.js    # Extract core documentation sections
│   ├── extractEndpoints.js  # Extract individual endpoint documentation
│   └── index.js             # Legacy extraction script
├── package.json
└── README.md
```

## Dependencies

- turndown: ^7.1.2 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - GitHub Flavored Markdown support

Uses shared utilities from `venues/shared/`:
- puppeteer.js - Browser automation
- turndown.js - Markdown conversion
- utils.js - File system utilities

## Usage

### New Extraction Method (Recommended)

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
# Extract core documentation (authentication, rate limits, etc.)
npm run extract:general

# Extract individual endpoint documentation
npm run extract:endpoints
```

### Legacy Extraction Method

The old extraction method is still available for reference:

```bash
# Extract Spot API endpoints (legacy)
npm run extract:legacy:spot

# Extract Futures API endpoints (legacy)
npm run extract:legacy:futures
```

## Output Structure

The new extraction method generates the following structure:

```
docs/bitmart/
├── authentication.md          # API key setup and authentication
├── rate_limits.md            # Rate limiting information
├── network_connectivity.md   # Base URLs and connectivity info
├── error_codes.md            # Error code definitions
├── change_log.md             # API changelog
├── response_formats.md       # Standard response structures
└── endpoints/
    ├── public/               # Public endpoints (no auth required)
    │   ├── GET_endpoint1.md
    │   └── GET_endpoint2.md
    └── private/              # Private endpoints (auth required)
        ├── POST_endpoint3.md
        └── POST_endpoint4.md
```

## Endpoint Classification

Endpoints are automatically classified as public or private based on authentication requirements:

- **Public endpoints**: No authentication headers required (X-BM-KEY, X-BM-SIGN, X-BM-TIMESTAMP)
- **Private endpoints**: Require KEYED or SIGNED authentication

## API Documentation Source

The scraper targets the official Bitmart API documentation at:
- Spot API: https://developer-pro.bitmart.com/en/spot/
- Futures API: https://developer-pro.bitmart.com/en/futuresv2/

## Last Updated

Extraction scripts updated to follow Coincise standardized pattern - November 2024

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT