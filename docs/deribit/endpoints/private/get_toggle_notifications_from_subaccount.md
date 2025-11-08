## /private/toggle_notifications_from_subaccount

Enable or disable sending of notifications for the subaccount.  
**[TFA required](#security-keys)**

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum | Description                                        |
| --------- | -------- | ------- | ---- | -------------------------------------------------- |
| sid       | true     | integer |      | The user id for the subaccount                     |
| state     | true     | boolean |      | enable (`true`) or disable (`false`) notifications |

### Response

| Name    | Type    | Description                                         |
| ------- | ------- | --------------------------------------------------- |
| id      | integer | The id that was sent in the request                 |
| jsonrpc | string  | The JSON-RPC version (2.0)                          |
| result  | string  | Result of method execution. `ok` in case of success |
