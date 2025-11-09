# POST /api/v1/portfolios/margin

## Set portfolio margin override

Specify the margin override value for a portfolio to either increase notional requirements or opt-in to higher leverage.

**Operation ID:** setPortfolioMarginOverride

**Tags:** Portfolios

**Endpoint:** `POST /api/v1/portfolios/margin`

**Base URL:** https://api.international.coinbase.com

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Portfolio margin override set

### 400

Invalid attribute

### 403

Invalid permission

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
