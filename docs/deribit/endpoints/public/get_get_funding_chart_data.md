## /public/get_funding_chart_data

Retrieve the list of the latest PERPETUAL funding chart points within a given
time period.

### Parameters

| Parameter       | Required | Type   | Enum | Description     |
| --------------- | -------- | ------ | ---- | --------------- |
| instrument_name | true     | string |      | Instrument name |
| length          | true     | string | `8h` |

`24h`  
`1m` | Specifies time period. `8h` - 8 hours, `24h` - 24 hours, `1m` - 1 month |

### Response

| Name                  | Type              | Description                                       |
| --------------------- | ----------------- | ------------------------------------------------- |
| id                    | integer           | The id that was sent in the request               |
| jsonrpc               | string            | The JSON-RPC version (2.0)                        |
| result                | _object_          |                                                   |
|   ›  current_interest | number            | Current interest                                  |
|   ›  data             | array of _object_ |                                                   |
|   ›    ›  index_price | number            | Current index price                               |
|   ›    ›  interest_8h | number            | Historical interest 8h value                      |
|   ›    ›  timestamp   | integer           | The timestamp (milliseconds since the Unix epoch) |
|   ›  interest_8h      | number            | Current interest 8h                               |
