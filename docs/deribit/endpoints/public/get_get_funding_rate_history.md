# GET /public/get_funding_rate_history

Retrieves hourly historical interest rate for requested PERPETUAL instrument.

### Parameters

| Parameter       | Required | Type    | Enum                                                                                | Description |
| --------------- | -------- | ------- | ----------------------------------------------------------------------------------- | ----------- |
| instrument_name | true     | string  | Instrument name                                                                     |             |
| start_timestamp | true     | integer | The earliest timestamp to return result from (milliseconds since the UNIX epoch)    |             |
| end_timestamp   | true     | integer | The most recent timestamp to return result from (milliseconds since the UNIX epoch) |             |

### Response

| Name                      | Type    | Description                                       |
| ------------------------- | ------- | ------------------------------------------------- |
| id                        | integer | The id that was sent in the request               |
| jsonrpc                   | string  | The JSON-RPC version (2.0) result array of object |
| result[].index_price      | number  | Price in base currency                            |
| result[].interest_1h      | float   | 1hour interest rate                               |
| result[].interest_8h      | float   | 8hour interest rate                               |
| result[].prev_index_price | number  | Price in base currency                            |
| result[].timestamp        | integer | The timestamp (milliseconds since the Unix epoch) |
