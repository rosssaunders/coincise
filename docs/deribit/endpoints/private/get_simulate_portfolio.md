## /private/simulate_portfolio

Calculates portfolio margin info for simulated position or current position of
the user. This request has a special restricted rate limit (not more than once
per a second).

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol | | add_positions | false | boolean | | If `true`,
adds simulated positions to current positions, otherwise uses only simulated
positions. By default `true` | | simulated_positions | false | object | | Object
with positions in following form:
`{InstrumentName1: Position1, InstrumentName2: Position2...}`, for example
`{"BTC-PERPETUAL": -1000.0}` (or corresponding URI-encoding for GET). For
futures in USD, for options in base currency. |

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | object  | Portfolio details                   |
