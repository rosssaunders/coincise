# GET /api/v1/assets/{asset}

## Get asset details

Retrieves information for a specific asset.

**Operation ID:** getAsset

**Tags:** Assets

**Endpoint:** `GET /api/v1/assets/{asset}`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name  | In   | Type   | Required | Description                                                                                                                             |
| ----- | ---- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| asset | path | string | Yes      | Identifies the asset by name (e.g., `BTC`), UUID (e.g., `291efb0f-2396-4d41-ad03-db3b2311cb2c`), or asset ID (e.g., `1482439423963469`) |

## Authentication

This endpoint does not require authentication.

## Responses

### 200

Asset found

### 400

Invalid attribute

## Documentation

For more details, see the
[INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
