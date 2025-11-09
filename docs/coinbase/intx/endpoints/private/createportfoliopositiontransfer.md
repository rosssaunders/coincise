# POST /api/v1/portfolios/transfer-position

## Transfer positions between portfolios

Transfer an existing position from one portfolio to another. The position transfer must fulfill the same portfolio-level margin requirements as submitting a new order on the opposite side for the sender's portfolio and a new order on the same side  for the recipient's portfolio. Additionally, organization-level requirements must be satisfied when evaluating the outcome of the position transfer.

**Operation ID:** createPortfolioPositionTransfer

**Tags:** Portfolios

**Endpoint:** `POST /api/v1/portfolios/transfer-position`

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

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
