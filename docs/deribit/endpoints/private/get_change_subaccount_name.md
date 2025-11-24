# GET /private/change\_subaccount\_name

Change the user name for a subaccount

**Scope:** `account:read_write` and mainaccount

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| sid | true | integer | The user id for the subaccount |  |
| name | true | string | The new user name |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | string | Result of method execution. ok in case of success |