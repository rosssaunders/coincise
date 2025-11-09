# GET /api/v1/transfers

## List matching transfers

**Operation ID:** getTransfers

**Tags:** Transfers

**Endpoint:** `GET /api/v1/transfers`

**Base URL:** https://api.international.coinbase.com

## Parameters

| Name                   | In        | Type   | Required | Description                                                                                                                                                                                                                                       |
| ---------------------- | --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| portfolio [DEPRECATED] | query     | string | No       | Identifies a portfolio by UUID (e.g., `892e8c7c-e979-4cad-b61b-55a197932cf1`) or portfolio ID (e.g., `5189861793641175`). If a portfolio identifier is provided under this param, it will be added to the list of values under `portfolios`       |
| portfolios             | query     | string | No       | Identifies the portfolios by UUID (e.g., `892e8c7c-e979-4cad-b61b-55a197932cf1`) or portfolio ID (e.g., `5189861793641175`). Can provide single or multiple portfolios to filter by or fetches transfers for all portfolios if none are provided. |
| time_from              | query     | string | No       | Only find transfers updated after this time. Uses ISO-8601 format (e.g., 2023-03-16T23:59:53Z)                                                                                                                                                    |
| time_to                | query     | string | No       | Only find transfers updated before this time. Uses ISO-8601 format (e.g., 2023-03-16T23:59:53Z)                                                                                                                                                   |
| undefined              | undefined | string | No       |                                                                                                                                                                                                                                                   |
| undefined              | undefined | string | No       |                                                                                                                                                                                                                                                   |
| status                 | query     | string | No       | The current status of transfer                                                                                                                                                                                                                    |
| type                   | query     | string | No       | The type of transfer (defaults to ALL if not defined)                                                                                                                                                                                             |

## Authentication

This endpoint requires authentication. Include the following headers:

- `CB-ACCESS-KEY`: Your API key
- `CB-ACCESS-SIGN`: Request signature
- `CB-ACCESS-TIMESTAMP`: Request timestamp
- `CB-ACCESS-PASSPHRASE`: API key passphrase

## Responses

### 200

Matching transfers

### 400

Invalid attribute

## Documentation

For more details, see the
[INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).
