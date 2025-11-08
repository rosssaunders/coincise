## /private/withdraw

Creates a new withdrawal request

**📖 Related Support Article:**
[Withdrawals](https://support.deribit.com/hc/en-us/articles/25944635205021-Withdrawals)

**Scope:** `wallet:read_write` and mainaccount

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol | | address | true | string | | Address in currency
format, it must be in address book | | amount | true | number | | Amount of
funds to be withdrawn | | priority | false | string | `insane`  
`extreme_high`  
`very_high`  
`high`  
`mid`  
`low`  
`very_low` | Withdrawal priority, optional for BTC, default: `high` |

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
