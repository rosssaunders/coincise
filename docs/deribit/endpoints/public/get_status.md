## /public/status

Method used to get information about locked currencies

### Parameters

_This method takes no parameters_

### Response

| Name                | Type     | Description                                                                                                                                 |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| id                  | integer  | The id that was sent in the request                                                                                                         |
| jsonrpc             | string   | The JSON-RPC version (2.0)                                                                                                                  |
| result              | _object_ |                                                                                                                                             |
|   ›  locked         | string   | `true` when platform is locked in all currencies, `partial` when some currencies are locked, `false` - when there are not currencies locked |
|   ›  locked_indices | array    | List of currency indices locked platform-wise                                                                                               |
