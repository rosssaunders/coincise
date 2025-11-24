# GET /public/get_index_price_names

Retrieves the identifiers of all supported Price Indexes

### Parameters

| Parameter | Required | Type    | Enum                                                                                                                                      | Description |
| --------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| extended  | false    | boolean | When set to true, returns additional information including future_combo_creation_enabled and option_combo_creation_enabled for each index |             |

### Response

| Name                                   | Type    | Description                                                                               |
| -------------------------------------- | ------- | ----------------------------------------------------------------------------------------- |
| id                                     | integer | The id that was sent in the request                                                       |
| jsonrpc                                | string  | The JSON-RPC version (2.0) result array of object                                         |
| result[].future_combo_creation_enabled | boolean | Whether future combo creation is enabled for this index (only present when extended=true) |
| result[].name                          | string  | Index name                                                                                |
| result[].option_combo_creation_enabled | boolean | Whether option combo creation is enabled for this index (only present when extended=true) |
