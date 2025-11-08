## /public/get_volatility_index_data

Public market data request for volatility index candles.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol | | start_timestamp | true | integer | | The
earliest timestamp to return result from (milliseconds since the UNIX epoch) | |
end_timestamp | true | integer | | The most recent timestamp to return result
from (milliseconds since the UNIX epoch) | | resolution | true | string | `1`  
`60`  
`3600`  
`43200`  
`1D` | Time resolution given in full seconds or keyword `1D` (only some specific
resolutions are supported) |

### Response

| Name              | Type     | Description                                                                                                                                                                      |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                | integer  | The id that was sent in the request                                                                                                                                              |
| jsonrpc           | string   | The JSON-RPC version (2.0)                                                                                                                                                       |
| result            | _object_ | Volatility index candles.                                                                                                                                                        |
|   ›  continuation | integer  | Continuation - to be used as the `end_timestamp` parameter on the next request. `NULL` when no continuation.                                                                     |
|   ›  data         | array    | Candles as an array of arrays with 5 values each. The inner values correspond to the timestamp in ms, open, high, low, and close values of the volatility index correspondingly. |
