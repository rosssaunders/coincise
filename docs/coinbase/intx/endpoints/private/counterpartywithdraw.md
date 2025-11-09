# POST /api/v1/transfers/withdraw/counterparty

## Withdraw to counterparty Id

**Operation ID:** counterpartyWithdraw

**Tags:** Transfers

**Endpoint:** `POST /api/v1/transfers/withdraw/counterparty`

**Base URL:** https://api.international.coinbase.com

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Counterparty withdrawal initiated

### 400

Counterparty withdrawal Failed

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
