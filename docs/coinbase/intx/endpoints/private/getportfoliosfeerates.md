# GET /api/v1/portfolios/fee-rates

## List portfolio fee rates

Retrieves the Perpetual Future and Spot fee rate tiers for the user.

**Operation ID:** getPortfoliosFeeRates

**Tags:** Portfolios

**Endpoint:** `GET /api/v1/portfolios/fee-rates`

**Base URL:** https://api.international.coinbase.com

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Fee rate tiers list

### 400

Invalid attribute

## Documentation

For more details, see the
[INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
