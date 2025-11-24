# GET /public/fork\_token

Generates a token for a new named session. This method can be used only with session scoped tokens.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| refresh_token | true | string | Refresh token |  |
| session_name | true | string | New session name |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object result.access_token string |
| result.expires_in | integer | Token lifetime in seconds |
| result.refresh_token | string | Can be used to request a new token (with a new lifetime) |
| result.scope | string | Type of the access for assigned token |
| result.sid | string | Optional Session id |
| result.token_type | string | Authorization type, allowed value - bearer |