# GET /private/get_current_deposit_address

Retrieve deposit address for currency

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                   | Description         |
| --------- | -------- | ------ | ---------------------- | ------------------- |
| currency  | true     | string | BTC ETH USDC USDT EURR | The currency symbol |

### Response

| Name                      | Type    | Description                                       |
| ------------------------- | ------- | ------------------------------------------------- |
| id                        | integer | The id that was sent in the request               |
| jsonrpc                   | string  | The JSON-RPC version (2.0)                        |
| result                    | object  | Object if address is created, null otherwise      |
| result.address            | string  | Address in proper format for currency             |
| result.creation_timestamp | integer | The timestamp (milliseconds since the Unix epoch) |
| result.currency           | string  | Currency, i.e "BTC", "ETH", "USDC"                |
| result.type               | string  | Address type/purpose, allowed values : deposit    |
