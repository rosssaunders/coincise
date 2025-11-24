# POST /private/disable_cancel_on_disconnect

Disable Cancel On Disconnect for the connection.

When change is applied for the account, then every newly opened connection will
start with **inactive** Cancel on Disconnect.

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum               | Description                                                                                                                                                                                               |
| --------- | -------- | ------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope     | false    | string | connection account | Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - connection) NOTICE: Scope connection can be used only when working via Websocket. |

### Response

| Name    | Type    | Description                                       |
| ------- | ------- | ------------------------------------------------- |
| id      | integer | The id that was sent in the request               |
| jsonrpc | string  | The JSON-RPC version (2.0)                        |
| result  | string  | Result of method execution. ok in case of success |
