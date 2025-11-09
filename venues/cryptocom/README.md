# Crypto.com Exchange Documentation Extraction

This folder contains scripts for extracting and converting Crypto.com Exchange API documentation into LLM-friendly markdown format.

## Documentation Source

- **Source URL**: https://exchange-docs.crypto.com/exchange/v1/rest-ws/
- **Documentation Type**: Custom HTML-based API documentation
- **API Base URL**: https://uat-api.3ona.co/ (UAT), https://api.crypto.com/exchange/v1/ (Production)
- **WebSocket URL**: Included in documentation

## Features

The Crypto.com Exchange API documentation includes:

- REST API endpoints (public and private)
- WebSocket streams
- HMAC signature authentication
- Spot trading, derivatives, margin trading
- Wallet management and staking

## Scripts

### Extract General Documentation

Extracts core documentation files:

```bash
pnpm run extract:general
```

This creates:
- `docs/cryptocom/authentication.md` - API authentication and request signing
- `docs/cryptocom/network_connectivity.md` - API endpoints and connection info
- `docs/cryptocom/change_log.md` - API version history and breaking changes
- `docs/cryptocom/rate_limits.md` - Rate limiting information
- `docs/cryptocom/error_codes.md` - Error code definitions
- `docs/cryptocom/response_formats.md` - Response format specifications

### Extract Endpoint Documentation

Extracts individual endpoint documentation:

```bash
pnpm run extract:endpoints
```

This creates individual markdown files in:
- `docs/cryptocom/endpoints/public/` - Public API endpoints
- `docs/cryptocom/endpoints/private/` - Authenticated API endpoints

### Extract All

Run all extraction scripts:

```bash
pnpm run extract:all
```

## Installation

```bash
cd venues/cryptocom
pnpm install
```

## Technical Notes

### Authentication

Crypto.com Exchange uses HMAC SHA256 signature authentication for private endpoints. The signature is generated using:

1. API key and secret key pair
2. Request parameters including method, id, nonce, and params
3. HMAC SHA256 signing of the request payload
4. Signature sent in request body

### Documentation Structure

The Crypto.com documentation is a single-page HTML application. The extraction scripts:

- Use Puppeteer to navigate and render the documentation
- Extract content by H1/H2 section traversal
- Convert HTML to markdown using Turndown
- Organize endpoints into public/private categories

### Endpoint Categories

**Public Endpoints**:
- Announcements
- Risk Parameters
- Instruments
- Order Book
- Candlestick Data
- Trades
- Tickers
- Valuations
- Settlement Prices
- Insurance Fund
- Staking

**Private Endpoints**:
- Account Balance and Positions
- Trading (create, amend, cancel orders)
- Advanced Order Management (OTO, OTOCO)
- Order History and Trades
- Transactions
- Wallet (deposits, withdrawals)
- Fiat Operations
- Staking Operations
- Cancel on Disconnect

## Maintenance

The extraction scripts are run automatically via GitHub Actions on a daily schedule. When changes are detected, a pull request is automatically created for review.

## Last Updated

Generated: 2025-11-08
