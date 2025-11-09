# Coinbase International Exchange (INTX) API Documentation Scraper

Documentation extraction for the Coinbase International Exchange (INTX) API
following the standardized Coincise pipeline.

## Overview

This scraper extracts Coinbase INTX API documentation and converts it to the
standardized LLM-friendly markdown format used across all Coincise venues.

## Documentation Structure

The scraper produces the following documentation structure:

```
docs/coinbase/intx/
├── authentication.md          # API authentication and signing
├── rate_limits.md            # Rate limiting policies
├── network_connectivity.md   # Connection and endpoint information
├── error_codes.md            # Error code definitions
├── response_formats.md       # Response data types and formats
├── change_log.md            # API version history
└── endpoints/
    ├── public/              # Public (unauthenticated) endpoints - 16 files
    │   ├── getassets.md
    │   ├── getinstruments.md
    │   └── ...
    └── private/             # Private (authenticated) endpoints - 47 files
        ├── getportfolios.md
        ├── createorder.md
        └── ...
```

## Installation

```bash
npm install
```

## Usage

### Extract All Documentation

```bash
npm run extract:all
```

This will run both general and endpoint extraction in sequence.

### Extract General Documentation Only

```bash
npm run extract:general
```

Extracts core documentation files:

- Authentication
- Rate limits
- Network connectivity
- Error codes
- Response formats
- Change log

### Extract Endpoint Documentation Only

```bash
npm run extract:endpoints
```

Extracts individual API endpoint documentation into `endpoints/public/` and
`endpoints/private/` directories.

## Endpoint Classification

Endpoints are automatically classified as public or private based on
authentication requirements:

- **Public endpoints**: No authentication headers required (CB-ACCESS-KEY,
  CB-ACCESS-SIGN, etc.)
- **Private endpoints**: Require authentication headers

## Documentation Source

- **Base URL**: https://docs.cdp.coinbase.com/intx
- **API Reference**: https://docs.cdp.coinbase.com/intx/reference/
- **REST API Docs**: https://docs.cdp.coinbase.com/intx/docs/rest-api
- **Authentication**: https://docs.cdp.coinbase.com/intx/docs/rest-api-auth

## Endpoint Extraction

The scraper successfully extracts individual endpoint documentation from the
Coinbase INTX OpenAPI specification. The extraction process:

1. Downloads the OpenAPI spec from
   `https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/intx-spec.yaml`
2. Parses the specification using js-yaml
3. Generates markdown documentation for each endpoint with:
   - HTTP method and path
   - Operation ID and tags
   - Parameters table
   - Authentication requirements
   - Response codes and descriptions

The endpoints are automatically classified as public (16) or private (47) based
on their tags and path structure.

## Authentication Headers

Coinbase INTX uses the following authentication headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature (HMAC-SHA-256)
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Notes

- The Coinbase INTX documentation uses a custom framework similar to Coinbase
  Exchange
- Each endpoint is documented on a separate page with the pattern:
  `intxrestapi_{operation}`
- Documentation is updated regularly by GitHub Actions workflow
- INTX is Coinbase's institutional trading platform with perpetual futures and
  other derivatives

## Project Structure

```
venues/coinbase/intx/
├── src/
│   ├── extractGeneral.js      # General documentation extraction
│   ├── extractEndpoints.js    # Endpoint documentation extraction
│   └── endpoints-config.js    # List of known endpoints
├── package.json
└── README.md
```

## Dependencies

- **turndown**: HTML to Markdown conversion
- **turndown-plugin-gfm**: GitHub Flavored Markdown support
- **puppeteer**: Headless browser for dynamic content scraping
- **jsdom**: HTML parsing and manipulation

## Automation

Documentation is automatically updated via GitHub Actions workflow that runs
weekly. The workflow:

1. Extracts general documentation
2. Extracts all endpoint documentation
3. Formats the documentation
4. Creates a pull request with any changes

## Related

- [Coinbase Exchange](../exchange/README.md) - Standard Coinbase Exchange API
- [Main Documentation](../../../../README.md) - Coincise project overview
