## /private/set_clearance_originator

Sets originator of the deposit

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter          | Required | Type   | Enum  | Description       |
| ------------------ | -------- | ------ | ----- | ----------------- |
| deposit_id         | true     | object |       | Id of the deposit |
|   ›    ›  currency | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol | |   ›    ›  user_id | true | integer | | Id of a
(sub)account | |   ›    ›  address | true | string | | Address in currency
format | |   ›    ›  tx_hash | true | string | | Transaction id in a proper
format for the currency | | originator | true | object | | Information about the
originator of the deposit | |   ›    ›  is_personal | true | boolean | | If the
user is the originator of the deposit | |   ›    ›  company_name | true | string
| | Company name of the originator if the originator is a legal entity | |
  ›    ›  first_name | true | string | | If the user is the originator of the
deposit | |   ›    ›  last_name | true | string | | Last name of the originator
if the originator is a person | |   ›    ›  address | true | string | |
Geographical address of the originator |

### Response

| Name            | Type   | Description                                                                                                                                          |
| --------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| address         | string | Address in proper format for currency                                                                                                                |
| amount          | number | Amount of funds in given currency                                                                                                                    |
| clearance_state | string | Clearance state indicating the current status of the transaction clearance process. Allowed values:- `in_progress`: clearance process is in progress |

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
  client (valid for deposits only) | | currency | string | Currency, i.e
  `"BTC"`, `"ETH"`, `"USDC"` | | note | string | | | received_timestamp |
  integer | The timestamp (milliseconds since the Unix epoch) | |
  refund_transaction_id | string | Transaction id in proper format for currency,
  `null` if id is not available | | source_address | string | Address in proper
  format for currency | | state | string | Deposit state. Allowed values:-
  `pending`: deposit detected on blockchain/system, compliance not yet finished
- `completed`: compliance check finished successfully
- `rejected`: deposit failed compliance and must be handled manually
- `replaced`: deposit transaction was replaced on the blockchain and should have
  a new transaction hash | | transaction_id | string | Transaction id in proper
  format for currency, `null` if id is not available | | updated_timestamp |
  integer | The timestamp (milliseconds since the Unix epoch) |
