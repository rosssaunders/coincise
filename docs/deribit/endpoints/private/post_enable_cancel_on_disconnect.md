## /private/enable_cancel_on_disconnect

Enable Cancel On Disconnect for the connection. After enabling, all orders
created via this connection will be automatically cancelled when the connection
is closed.

Cancel is triggered in the following cases: when the TCP connection is properly
terminated, when the connection is closed due to 10 minutes of inactivity, or
when a heartbeat detects a disconnection. To reduce the inactivity timeout,
consider using
[public/set_heartbeat](https://docs.deribit.com/#public-set_heartbeat).

**Note**: If the connection is gracefully closed using
[private/logout](https://docs.deribit.com/#private-logout), cancel-on-disconnect
will **not** be triggered.

**Notice**: Cancel-on-Disconnect does not affect orders created by other
connections - they will remain active! When change is applied on the `account`
scope, then every newly opened connection will start with **active** Cancel on
Disconnect.

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required                                                                                                                              | Type   | Enum         | Description |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------ | ----------- |
| scope     | false                                                                                                                                 | string | `connection` |
| `account` | Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - `connection`) |

**NOTICE:** Scope `connection` can be used only when working via Websocket. |

### Response

| Name    | Type    | Description                                         |
| ------- | ------- | --------------------------------------------------- |
| id      | integer | The id that was sent in the request                 |
| jsonrpc | string  | The JSON-RPC version (2.0)                          |
| result  | string  | Result of method execution. `ok` in case of success |
