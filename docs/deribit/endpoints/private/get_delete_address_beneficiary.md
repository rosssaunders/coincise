# GET /private/delete_address_beneficiary

Deletes address beneficiary information

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                               | Description         |
| --------- | -------- | ------ | ------------------------------------------------------------------ | ------------------- |
| currency  | true     | string | BTC ETH STETH ETHW USDC USDT EURR MATIC SOL XRP USYC PAXG BNB USDE | The currency symbol |
| address   | true     | string | Address in currency format                                         |                     |
| tag       | false    | string | Tag for XRP addresses                                              |                     |

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | string  | ok                                  |
