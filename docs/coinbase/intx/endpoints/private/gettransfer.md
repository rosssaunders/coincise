# GET /api/v1/transfers/{transfer_uuid}

## Get transfer

**Operation ID:** getTransfer

**Tags:** Transfers

**Endpoint:** `GET /api/v1/transfers/{transfer_uuid}`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| transfer_uuid | path | string | Yes | The UUID of the transfer request |

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Matching transfer

### 400

Invalid attribute

## Documentation

For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
