## /private/get_cancel_on_disconnect

Read current Cancel On Disconnect configuration for the account.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required                                                                                                                              | Type   | Enum         | Description |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------ | ----------- |
| scope     | false                                                                                                                                 | string | `connection` |
| `account` | Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - `connection`) |

**NOTICE:** Scope `connection` can be used only when working via Websocket. |

### Response

| Name         | Type     | Description                                                                           |
| ------------ | -------- | ------------------------------------------------------------------------------------- |
| id           | integer  | The id that was sent in the request                                                   |
| jsonrpc      | string   | The JSON-RPC version (2.0)                                                            |
| result       | _object_ |                                                                                       |
|   ›  enabled | boolean  | Current configuration status                                                          |
|   ›  scope   | string   | Informs if Cancel on Disconnect was checked for the current connection or the account |
