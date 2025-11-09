# GET /api/v1/portfolios

## List all user portfolios

Returns all of the user's portfolios.

**Operation ID:** getPortfolios

**Tags:** Portfolios

**Endpoint:** `GET /api/v1/portfolios`

**Base URL:** https://api.international.coinbase.com

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Portfolio list

### 400

Invalid attribute

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
