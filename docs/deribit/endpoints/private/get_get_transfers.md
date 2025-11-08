## /private/get_transfers

Retrieve the user's transfers list

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

| Name                        | Type              | Description                                                                                                                                                                  |
| --------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                          | integer           | The id that was sent in the request                                                                                                                                          |
| jsonrpc                     | string            | The JSON-RPC version (2.0)                                                                                                                                                   |
| result                      | _object_          |                                                                                                                                                                              |
|   ›  count                  | integer           | Total number of results available                                                                                                                                            |
|   ›  data                   | array of _object_ |                                                                                                                                                                              |
|   ›    ›  amount            | number            | Amount of funds in given currency                                                                                                                                            |
|   ›    ›  created_timestamp | integer           | The timestamp (milliseconds since the Unix epoch)                                                                                                                            |
|   ›    ›  currency          | string            | Currency, i.e `"BTC"`, `"ETH"`, `"USDC"`                                                                                                                                     |
|   ›    ›  direction         | string            | Transfer direction                                                                                                                                                           |
|   ›    ›  id                | integer           | Id of transfer                                                                                                                                                               |
|   ›    ›  other_side        | string            | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username. |
|   ›    ›  state             | string            | Transfer state, allowed values : `prepared`, `confirmed`, `cancelled`, `waiting_for_admin`, `insufficient_funds`, `withdrawal_limit` otherwise rejection reason              |
|   ›    ›  type              | string            | Type of transfer: `user` - sent to user, `subaccount` - sent to subaccount                                                                                                   |
|   ›    ›  updated_timestamp | integer           | The timestamp (milliseconds since the Unix epoch)                                                                                                                            |
