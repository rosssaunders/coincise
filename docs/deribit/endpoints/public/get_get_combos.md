## /public/get_combos

Retrieves information about active combos

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR`  
`any` | The currency symbol or `"any"` for all |

### Response

| Name                      | Type              | Description                                                                                                                                         |
| ------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                        | integer           | The id that was sent in the request                                                                                                                 |
| jsonrpc                   | string            | The JSON-RPC version (2.0)                                                                                                                          |
| result                    | array of _object_ |                                                                                                                                                     |
|   ›  creation_timestamp   | integer           | The timestamp (milliseconds since the Unix epoch)                                                                                                   |
|   ›  id                   | string            | Unique combo identifier                                                                                                                             |
|   ›  instrument_id        | integer           | Instrument ID                                                                                                                                       |
|   ›  legs                 | array of _object_ |                                                                                                                                                     |
|   ›    ›  amount          | integer           | Size multiplier of a leg. A negative value indicates that the trades on given leg are in opposite direction to the combo trades they originate from |
|   ›    ›  instrument_name | string            | Unique instrument identifier                                                                                                                        |
|   ›  state                | string            | Combo state: `"active"`, "`inactive`"                                                                                                               |
|   ›  state_timestamp      | integer           | The timestamp (milliseconds since the Unix epoch)                                                                                                   |
