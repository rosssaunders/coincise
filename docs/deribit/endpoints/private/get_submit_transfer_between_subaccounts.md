# GET /private/submit_transfer_between_subaccounts

Transfer funds between two (sub)accounts.

**Scope:** `wallets:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter   | Required | Type    | Enum                                                                                                                                                                                                                                                                                                  | Description         |
| ----------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| currency    | true     | string  | BTC ETH USDC USDT EURR                                                                                                                                                                                                                                                                                | The currency symbol |
| amount      | true     | number  | Amount of funds to be transferred                                                                                                                                                                                                                                                                     |                     |
| destination | true     | integer | Id of destination subaccount. Can be found in My Account >> Subaccounts tab                                                                                                                                                                                                                           |                     |
| source      | false    | integer | Id of the source (sub)account. Can be found in My Account >> Subaccounts tab. By default, it is the Id of the account which made the request. However, if a different "source" is specified, the user must possess the mainaccount scope, and only other subaccounts can be designated as the source. |                     |

### Response

| Name                     | Type    | Description                                                                                                                                                                  |
| ------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                       | integer | The id that was sent in the request                                                                                                                                          |
| jsonrpc                  | string  | The JSON-RPC version (2.0) result object                                                                                                                                     |
| result.amount            | number  | Amount of funds in given currency                                                                                                                                            |
| result.created_timestamp | integer | The timestamp (milliseconds since the Unix epoch)                                                                                                                            |
| result.currency          | string  | Currency, i.e "BTC", "ETH", "USDC"                                                                                                                                           |
| result.direction         | string  | Transfer direction                                                                                                                                                           |
| result.id                | integer | Id of transfer                                                                                                                                                               |
| result.other_side        | string  | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username. |
| result.state             | string  | Transfer state, allowed values : prepared, confirmed, cancelled, waiting_for_admin, insufficient_funds, withdrawal_limit otherwise rejection reason                          |
| result.type              | string  | Type of transfer: user - sent to user, subaccount - sent to subaccount                                                                                                       |
| result.updated_timestamp | integer | The timestamp (milliseconds since the Unix epoch)                                                                                                                            |
