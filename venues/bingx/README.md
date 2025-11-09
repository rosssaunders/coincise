# BingX API Documentation Extractor

This project extracts BingX API documentation and converts it to structured markdown format following the standardized Coincise extraction pattern.

## Project Structure

```
bingx/
├── src/
│   ├── extractGeneral.js    # Extracts core documentation
│   └── extractEndpoints.js  # Extracts individual endpoint documentation
├── package.json
└── README.md
```

## Dependencies

- puppeteer: ^24.22.0 - For web scraping
- turndown: ^7.2.1 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - GitHub Flavored Markdown support
- jsdom: ^27.0.0 - For HTML parsing and manipulation
- prettier: 3.6.2 - For markdown formatting

## Usage

1. Install dependencies:

```bash
pnpm install
```

2. Extract documentation:

```bash
# Extract all documentation (general + endpoints)
pnpm run extract:all

# Extract only general/core documentation
pnpm run extract:general

# Extract only endpoint documentation
pnpm run extract:endpoints
```

## Output Structure

Generated documentation is organized in `../../docs/bingx/` with the following structure:

```
docs/bingx/
├── rate_limits.md              # Rate limiting documentation
├── authentication.md           # Authentication and API key documentation
├── network_connectivity.md     # Base URLs and connectivity information
├── error_codes.md              # Error codes and descriptions
├── response_formats.md         # Response format specifications
├── change_log.md               # API changelog
└── endpoints/
    ├── public/                 # Public endpoint documentation
    │   └── get_*.md            # Individual endpoint files
    └── private/                # Private endpoint documentation
        └── post_*.md           # Individual endpoint files
```

## Extraction Scripts

### extractGeneral.js

Extracts the following core documentation files:

- **rate_limits.md** - Rate limiting rules and policies
- **authentication.md** - API key generation and request signing
- **network_connectivity.md** - Base URLs and connection details
- **error_codes.md** - Error code definitions
- **response_formats.md** - Standard response structures
- **change_log.md** - API version history and changes

### extractEndpoints.js

Extracts individual endpoint documentation:

- Automatically categorizes endpoints as public or private based on authentication requirements
- Generates filenames in the format: `{http_method}_{endpoint_name}.md`
- Includes proper source URLs linking back to original documentation
- Handles complex HTML tables and converts them to GitHub Flavored Markdown

## Features

- **Standardized Structure**: Follows the same pattern as Backpack, Deribit, and XT venues
- **Advanced Web Scraping**: Uses Puppeteer with optimized settings from shared utilities
- **Smart Categorization**: Automatically detects public vs private endpoints
- **Clean Markdown**: High-quality conversion to GitHub Flavored Markdown
- **Error Handling**: Comprehensive error handling with detailed logging
- **Table Processing**: Smart table extraction and formatting for parameter documentation
- **Source Attribution**: Automatic source links for each extracted endpoint
