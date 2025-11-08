## /public/get_supported_index_names

Retrieves the identifiers of all supported Price Indexes

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| type      | false    | string | `all` |

`spot`  
`derivative` | Type of a cryptocurrency price index |

### Response

| Name                               | Type              | Description                                                                                    |
| ---------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------- |
| id                                 | integer           | The id that was sent in the request                                                            |
| jsonrpc                            | string            | The JSON-RPC version (2.0)                                                                     |
| result                             | array of _object_ |                                                                                                |
|   ›  future_combo_creation_enabled | boolean           | Whether future combo creation is enabled for this index (only present when `extended`\=`true`) |
|   ›  name                          | string            | Index name                                                                                     |
|   ›  option_combo_creation_enabled | boolean           | Whether option combo creation is enabled for this index (only present when `extended`\=`true`) |
