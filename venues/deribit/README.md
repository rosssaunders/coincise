# Deribit API Documentation Extraction

This directory contains the extraction scripts for Deribit cryptocurrency
exchange API documentation.

## Overview

Deribit is a cryptocurrency derivatives exchange offering futures, options, and
perpetual contracts on Bitcoin and Ethereum. Their API uses JSON-RPC 2.0
protocol over WebSocket and HTTP.

## Documentation Source

- **Main Documentation**: https://docs.deribit.com
- **Support Articles**: https://support.deribit.com
- **API Version**: v2.1.1

## Extraction Scripts

### extractGeneral.js

Extracts core documentation sections:

- `rate_limits.md` - Rate limiting rules and policies
- `authentication.md` - API authentication methods (OAuth, client credentials,
  signatures)
- `network_connectivity.md` - Connection endpoints and infrastructure
- `error_codes.md` - JSON-RPC error codes
- `response_formats.md` - JSON-RPC 2.0 response structure
- `change_log.md` - API version history

### extractEndpoints.js

Extracts individual endpoint documentation into separate files:

- Public endpoints → `docs/deribit/endpoints/public/`
- Private endpoints → `docs/deribit/endpoints/private/`

Each endpoint is saved as `{method}_{endpoint_name}.md`

## Running Extraction

```bash
# Install dependencies
pnpm install

# Extract general documentation
pnpm run extract:general

# Extract endpoint documentation
pnpm run extract:endpoints

# Extract everything
pnpm run extract:all
```

## Documentation Structure

Deribit uses JSON-RPC style endpoints:

- Public endpoints: `/public/{method}` (e.g., `/public/get_time`,
  `/public/get_ticker`)
- Private endpoints: `/private/{method}` (e.g., `/private/buy`,
  `/private/get_account_summary`)

## Notes

- Deribit uses JSON-RPC 2.0 protocol, not REST
- Both WebSocket and HTTP transports are supported
- Test environment available at test.deribit.com
- Production environment at www.deribit.com
- All timestamps are in milliseconds since UNIX epoch

## Last Updated

2024-11-08
