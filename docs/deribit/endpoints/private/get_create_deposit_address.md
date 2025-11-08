## /private/create_deposit_address

Creates deposit address in currency

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol |

### Response

| Name                    | Type     | Description                                       |
| ----------------------- | -------- | ------------------------------------------------- |
| id                      | integer  | The id that was sent in the request               |
| jsonrpc                 | string   | The JSON-RPC version (2.0)                        |
| result                  | _object_ | Object if address is created, null otherwise      |
|   ›  address            | string   | Address in proper format for currency             |
|   ›  creation_timestamp | integer  | The timestamp (milliseconds since the Unix epoch) |
|   ›  currency           | string   | Currency, i.e `"BTC"`, `"ETH"`, `"USDC"`          |
|   ›  type               | string   | Address type/purpose, allowed values : `deposit`  |
