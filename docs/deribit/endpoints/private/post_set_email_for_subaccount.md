## /private/set_email_for_subaccount

Assign an email address to a subaccount. User will receive an email with a
confirmation link.  
**[TFA required](#security-keys)**

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum | Description                          |
| --------- | -------- | ------- | ---- | ------------------------------------ |
| sid       | true     | integer |      | The user id for the subaccount       |
| email     | true     | string  |      | The email address for the subaccount |

### Response

| Name    | Type    | Description                                         |
| ------- | ------- | --------------------------------------------------- |
| id      | integer | The id that was sent in the request                 |
| jsonrpc | string  | The JSON-RPC version (2.0)                          |
| result  | string  | Result of method execution. `ok` in case of success |
