# GET /private/remove_api_key

Removes api key. [Important notes](#creating-editing-removing-api-keys).

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum      | Description |
| --------- | -------- | ------- | --------- | ----------- |
| id        | true     | integer | Id of key |             |

### Response

| Name    | Type    | Description                                       |
| ------- | ------- | ------------------------------------------------- |
| id      | integer | The id that was sent in the request               |
| jsonrpc | string  | The JSON-RPC version (2.0)                        |
| result  | string  | Result of method execution. ok in case of success |
