# POST /api/v1/portfolios/transfer

## Transfer funds between portfolios

Transfer assets from one portfolio to another.

**Operation ID:** createPortfolioAssetTransfer

**Tags:** Portfolios

**Endpoint:** `POST /api/v1/portfolios/transfer`

**Base URL:** https://api.international.coinbase.com

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Transfer processed

### 400

Invalid attribute

### 403

Invalid permission

## Documentation

For more details, see the
[INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
