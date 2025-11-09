# Bullish Exchange Documentation Extraction

This venue extracts API documentation for Bullish Exchange from their OpenAPI
specification.

## Documentation Source

- **OpenAPI Spec URL**:
  https://api.exchange.bullish.com/docs/v2/open-api/api-doc.yml
- **Exchange Website**: https://bullish.com

## Extraction Approach

Bullish provides their API documentation as an OpenAPI specification. Since they
don't have a publicly accessible HTML documentation site, we extract
documentation directly from the OpenAPI spec file:

- General documentation sections (authentication, rate limits, etc.) are
  extracted from the spec metadata
- Individual endpoints are extracted from the paths object and organized into
  public/private categories

## Scripts

```bash
# Extract general documentation (overview, authentication, rate limits, etc.)
pnpm run extract:general

# Extract individual endpoint documentation
pnpm run extract:endpoints

# Run both extraction scripts
pnpm run extract:all
```

## Output Structure

```
docs/bullish/
├── overview.md                    # General API overview and information
├── network_connectivity.md        # Base URLs and connectivity options
├── authentication.md              # Authentication methods and requirements
├── rate_limits.md                 # Rate limiting information
├── error_codes.md                 # Error codes and handling
├── response_formats.md            # Response structure and formats
├── change_log.md                  # API changelog
└── endpoints/
    ├── public/                    # Public endpoints (no auth required)
    │   └── *.md
    └── private/                   # Private endpoints (auth required)
        └── *.md
```

## Notes

- Bullish uses OpenAPI 3.x specification
- Authentication is handled via JWT bearer tokens
- The API has both public (market data) and private (trading) endpoints
- Rate limits apply across all requests

## Last Updated

This extraction approach was implemented on 2025-11-08.
