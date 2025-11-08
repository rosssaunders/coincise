## /private/cancel_withdrawal

Cancels withdrawal request

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol | | id | true | number | | The withdrawal id |

### Response

| Name                     | Type     | Description                                                                                                        |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| id                       | integer  | The id that was sent in the request                                                                                |
| jsonrpc                  | string   | The JSON-RPC version (2.0)                                                                                         |
| result                   | _object_ |                                                                                                                    |
|   ›  address             | string   | Address in proper format for currency                                                                              |
|   ›  amount              | number   | Amount of funds in given currency                                                                                  |
|   ›  confirmed_timestamp | integer  | The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, `null` when not confirmed            |
|   ›  created_timestamp   | integer  | The timestamp (milliseconds since the Unix epoch)                                                                  |
|   ›  currency            | string   | Currency, i.e `"BTC"`, `"ETH"`, `"USDC"`                                                                           |
|   ›  fee                 | number   | Fee in currency                                                                                                    |
|   ›  id                  | integer  | Withdrawal id in Deribit system                                                                                    |
|   ›  priority            | number   | Id of priority level                                                                                               |
|   ›  state               | string   | Withdrawal state, allowed values : `unconfirmed`, `confirmed`, `cancelled`, `completed`, `interrupted`, `rejected` |
|   ›  transaction_id      | string   | Transaction id in proper format for currency, `null` if id is not available                                        |
|   ›  updated_timestamp   | integer  | The timestamp (milliseconds since the Unix epoch)                                                                  |
