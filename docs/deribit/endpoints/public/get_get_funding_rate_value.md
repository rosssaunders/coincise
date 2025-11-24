# GET /public/get\_funding\_rate\_value

Retrieves interest rate value for requested period. Applicable only for PERPETUAL instruments.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string | Instrument name |  |
| start_timestamp | true | integer | The earliest timestamp to return result from (milliseconds since the UNIX epoch) |  |
| end_timestamp | true | integer | The most recent timestamp to return result from (milliseconds since the UNIX epoch) |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result float |