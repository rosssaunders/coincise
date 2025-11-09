# POST /api/v1/transfers/withdraw

## Withdraw to crypto address

**Operation ID:** withdraw

**Tags:** Transfers

**Endpoint:** `POST /api/v1/transfers/withdraw`

**Base URL:** https://api.international.coinbase.com

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Withdrawal Successful

### 400

Withdrawal Failed

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
