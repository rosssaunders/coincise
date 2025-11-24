# GET /private/remove\_subaccount

Remove empty subaccount.  
**[TFA required](#security-keys)**

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| subaccount_id | true | integer | The user id for the subaccount |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | string | Result of method execution. ok in case of success |