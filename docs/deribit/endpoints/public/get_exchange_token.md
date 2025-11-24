# GET /public/exchange\_token

Generates a token for a new subject id. This method can be used to switch between subaccounts.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| refresh_token | true | string | Refresh token |  |
| subject_id | true | integer | New subject id |  |
| scope | false | string | Optional scope override for the new session. Cannot exceed caller's permissions. Supports session scope for direct session creation during token exchange. |  |

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