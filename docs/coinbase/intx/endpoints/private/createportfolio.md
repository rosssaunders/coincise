# POST /api/v1/portfolios

## Create portfolio

Create a new portfolio. Request will fail if no name is provided or if user
already has max number of portfolios. Max number of portfolios is 20.

**Operation ID:** createPortfolio

**Tags:** Portfolios

**Endpoint:** `POST /api/v1/portfolios`

**Base URL:** https://api.international.coinbase.com

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

New portfolio created

### 400

Invalid attribute

## Documentation

For more details, see the
[INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
