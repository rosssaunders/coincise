## /public/get_mark_price_history

Public request for 5min history of markprice values for the instrument. For now
the markprice history is available only for a subset of options which take part
in the volatility index calculations. All other instruments, futures and
perpetuals will return an empty list.

### Parameters

| Parameter       | Required | Type    | Enum | Description                                                                         |
| --------------- | -------- | ------- | ---- | ----------------------------------------------------------------------------------- |
| instrument_name | true     | string  |      | Instrument name                                                                     |
| start_timestamp | true     | integer |      | The earliest timestamp to return result from (milliseconds since the UNIX epoch)    |
| end_timestamp   | true     | integer |      | The most recent timestamp to return result from (milliseconds since the UNIX epoch) |

### Response

| Name    | Type    | Description                                                                                                                                     |
| ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                                                                                                             |
| jsonrpc | string  | The JSON-RPC version (2.0)                                                                                                                      |
| result  | array   | Markprice history values as an array of arrays with 2 values each. The inner values correspond to the timestamp in ms and the markprice itself. |
