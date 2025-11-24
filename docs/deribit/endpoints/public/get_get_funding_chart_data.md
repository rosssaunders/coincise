# GET /public/get\_funding\_chart\_data

Retrieve the list of the latest PERPETUAL funding chart points within a given time period.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string | Instrument name |  |
| length | true | string | 8h 24h 1m | Specifies time period. 8h - 8 hours, 24h - 24 hours, 1m - 1 month |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.current_interest | number | Current interest result.data array of object |
| result.data[].index_price | number | Current index price |
| result.data[].interest_8h | number | Historical interest 8h value |
| result.data[].timestamp | integer | The timestamp (milliseconds since the Unix epoch) |
| result.interest_8h | number | Current interest 8h |