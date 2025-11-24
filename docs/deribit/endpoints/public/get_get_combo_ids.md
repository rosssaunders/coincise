# GET /public/get\_combo\_ids

Retrieves available combos. This method can be used to get the list of all combos, or only the list of combos in the given state.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | BTC ETH USDC USDT EURR | The currency symbol |
| state | false | string | active inactive | Combo state, if not provided combos of all states are considered |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | array of string | Unique combo identifier |