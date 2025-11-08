## /private/set_disabled_trading_products

Configure disabled trading products for subaccounts. Only main accounts can
modify this for subaccounts.  
**[TFA required](#security-keys)**

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter        | Required | Type    | Enum | Description                                                                                                              |
| ---------------- | -------- | ------- | ---- | ------------------------------------------------------------------------------------------------------------------------ |
| user_id          | true     | integer |      | Id of a (sub)account                                                                                                     |
| trading_products | true     | array   |      | List of available trading products. Available products: perpetual, futures, options, future_combos, option_combos, spots |
|                  |          |         |      |                                                                                                                          |

### Response

| Name    | Type    | Description                                         |
| ------- | ------- | --------------------------------------------------- |
| id      | integer | The id that was sent in the request                 |
| jsonrpc | string  | The JSON-RPC version (2.0)                          |
| result  | string  | Result of method execution. `ok` in case of success |
