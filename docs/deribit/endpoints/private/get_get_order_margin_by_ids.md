# GET /private/get_order_margin_by_ids

Retrieves initial margins of given orders

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type  | Enum          | Description |
| --------- | -------- | ----- | ------------- | ----------- |
| ids       | true     | array | Ids of orders |             |

### Response

| Name                             | Type    | Description                                       |
| -------------------------------- | ------- | ------------------------------------------------- |
| id                               | integer | The id that was sent in the request               |
| jsonrpc                          | string  | The JSON-RPC version (2.0) result array of object |
| result[].initial_margin          | number  | Initial margin of order                           |
| result[].initial_margin_currency | string  | Currency of initial margin                        |
| result[].order_id                | string  | Unique order identifier                           |
