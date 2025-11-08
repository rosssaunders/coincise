## /public/exchange_token

Generates a token for a new subject id. This method can be used to switch
between subaccounts.

### Parameters

| Parameter     | Required | Type    | Enum | Description                                                                                                                                                  |
| ------------- | -------- | ------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| refresh_token | true     | string  |      | Refresh token                                                                                                                                                |
| subject_id    | true     | integer |      | New subject id                                                                                                                                               |
| scope         | false    | string  |      | Optional scope override for the new session. Cannot exceed caller's permissions. Supports `session` scope for direct session creation during token exchange. |

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
