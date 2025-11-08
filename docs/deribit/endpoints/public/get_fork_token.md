## /public/fork_token

Generates a token for a new named session. This method can be used only with
session scoped tokens.

### Parameters

| Parameter     | Required | Type   | Enum | Description      |
| ------------- | -------- | ------ | ---- | ---------------- |
| refresh_token | true     | string |      | Refresh token    |
| session_name  | true     | string |      | New session name |

### Response

| Name               | Type     | Description                                              |
| ------------------ | -------- | -------------------------------------------------------- |
| id                 | integer  | The id that was sent in the request                      |
| jsonrpc            | string   | The JSON-RPC version (2.0)                               |
| result             | _object_ |                                                          |
|   ›  access_token  | string   |                                                          |
|   ›  expires_in    | integer  | Token lifetime in seconds                                |
|   ›  refresh_token | string   | Can be used to request a new token (with a new lifetime) |
|   ›  scope         | string   | Type of the access for assigned token                    |
|   ›  sid           | string   | Optional Session id                                      |
|   ›  token_type    | string   | Authorization type, allowed value - `bearer`             |
