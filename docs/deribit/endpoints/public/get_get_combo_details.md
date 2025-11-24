# GET /public/get_combo_details

Retrieves information about a combo

### Parameters

| Parameter | Required | Type   | Enum     | Description |
| --------- | -------- | ------ | -------- | ----------- |
| combo_id  | true     | string | Combo ID |             |

### Response

| Name                          | Type    | Description                                                                                                                                         |
| ----------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                            | integer | The id that was sent in the request                                                                                                                 |
| jsonrpc                       | string  | The JSON-RPC version (2.0) result object                                                                                                            |
| result.creation_timestamp     | integer | The timestamp (milliseconds since the Unix epoch)                                                                                                   |
| result.id                     | string  | Unique combo identifier                                                                                                                             |
| result.instrument_id          | integer | Instrument ID result.legs array of object                                                                                                           |
| result.legs[].amount          | integer | Size multiplier of a leg. A negative value indicates that the trades on given leg are in opposite direction to the combo trades they originate from |
| result.legs[].instrument_name | string  | Unique instrument identifier                                                                                                                        |
| result.state                  | string  | Combo state: "active", "inactive"                                                                                                                   |
| result.state_timestamp        | integer | The timestamp (milliseconds since the Unix epoch)                                                                                                   |
