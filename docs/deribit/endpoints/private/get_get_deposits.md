## /private/get_deposits

Retrieve the latest users deposits

**📖 Related Support Article:**
[Deposits](https://support.deribit.com/hc/en-us/articles/25944616988957-Deposits)

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol | | count | false | integer | | Number of requested
items, default - `10`, maximum - `1000` | | offset | false | integer | | The
offset for pagination, default - `0` |

### Response

| Name                      | Type              | Description                                                                                                                                          |
| ------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                        | integer           | The id that was sent in the request                                                                                                                  |
| jsonrpc                   | string            | The JSON-RPC version (2.0)                                                                                                                           |
| result                    | _object_          |                                                                                                                                                      |
|   ›  count                | integer           | Total number of results available                                                                                                                    |
|   ›  data                 | array of _object_ |                                                                                                                                                      |
|   ›    ›  address         | string            | Address in proper format for currency                                                                                                                |
|   ›    ›  amount          | number            | Amount of funds in given currency                                                                                                                    |
|   ›    ›  clearance_state | string            | Clearance state indicating the current status of the transaction clearance process. Allowed values:- `in_progress`: clearance process is in progress |

- `pending_admin_decision`: transaction is under manual review by Deribit admin
- `pending_user_input`: user should provide additional information regarding the
  transaction
- `success`: clearance process completed successfully
- `failed`: clearance process failed, transaction is rejected
- `cancelled`: transaction is cancelled (currently used only for withdrawals,
  meaning the withdrawal is cancelled)
- `refund_initiated`: clearance process failed, transaction refund is initiated,
  funds are removed from Deribit balance (valid for deposits only)
- `refunded`: clearance process failed, deposit amount is refunded back to the
  client (valid for deposits only) | |   ›    ›  currency | string | Currency,
  i.e `"BTC"`, `"ETH"`, `"USDC"` | |   ›    ›  note | string | | |
    ›    ›  received_timestamp | integer | The timestamp (milliseconds since the
  Unix epoch) | |   ›    ›  refund_transaction_id | string | Transaction id in
  proper format for currency, `null` if id is not available | |
    ›    ›  source_address | string | Address in proper format for currency | |
    ›    ›  state | string | Deposit state. Allowed values:- `pending`: deposit
  detected on blockchain/system, compliance not yet finished
- `completed`: compliance check finished successfully
- `rejected`: deposit failed compliance and must be handled manually
- `replaced`: deposit transaction was replaced on the blockchain and should have
  a new transaction hash | |   ›    ›  transaction_id | string | Transaction id
  in proper format for currency, `null` if id is not available | |
    ›    ›  updated_timestamp | integer | The timestamp (milliseconds since the
  Unix epoch) |
