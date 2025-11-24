# GET /private/toggle_subaccount_login

Enable or disable login for a subaccount. If login is disabled and a session for
the subaccount exists, this session will be terminated.  
**[TFA required](#security-keys)**

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum                           | Description              |
| --------- | -------- | ------- | ------------------------------ | ------------------------ |
| sid       | true     | integer | The user id for the subaccount |                          |
| state     | true     | string  | enable disable                 | enable or disable login. |

### Response

| Name    | Type    | Description                                       |
| ------- | ------- | ------------------------------------------------- |
| id      | integer | The id that was sent in the request               |
| jsonrpc | string  | The JSON-RPC version (2.0)                        |
| result  | string  | Result of method execution. ok in case of success |
