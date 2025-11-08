## /public/get_historical_volatility

Provides information about historical volatility for given cryptocurrency.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol |

### Response

| Name    | Type                          | Description                         |
| ------- | ----------------------------- | ----------------------------------- |
| id      | integer                       | The id that was sent in the request |
| jsonrpc | string                        | The JSON-RPC version (2.0)          |
| result  | array of \[timestamp, value\] |                                     |
