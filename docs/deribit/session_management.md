# Deribit Session Management Documentation

# Session management

## /public/set_heartbeat

> _This method is only available via websockets._

Signals the Websocket connection to send and request heartbeats. Heartbeats can
be used to detect stale connections. When heartbeats have been set up, the API
server will send `heartbeat` messages and `test_request` messages. Your software
should respond to `test_request` messages by sending a `/api/v2/public/test`
request. If your software fails to do so, the API server will immediately close
the connection. If your account is configured to cancel on disconnect, any
orders opened over the connection will be cancelled.

### Parameters

| Parameter | Required | Type   | Enum | Description                                             |
| --------- | -------- | ------ | ---- | ------------------------------------------------------- |
| interval  | true     | number |      | The heartbeat interval in seconds, but not less than 10 |

### Response

| Name    | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                            |
| jsonrpc | string  | The JSON-RPC version (2.0)                                     |
| result  | string  | Result of method execution. <code>ok</code> in case of success |

## /public/disable_heartbeat

> _This method is only available via websockets._

Stop sending heartbeat messages.

### Parameters

_This method takes no parameters_

### Response

| Name    | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                            |
| jsonrpc | string  | The JSON-RPC version (2.0)                                     |
| result  | string  | Result of method execution. <code>ok</code> in case of success |

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

| Parameter | Required | Type   | Enum                                            | Description                                                                                                                                                                                                                                                 |
| --------- | -------- | ------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope     | false    | string | <code>connection</code><br><code>account</code> | Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - <code>connection</code>)<br><br><strong>NOTICE:</strong> Scope <code>connection</code> can be used only when working via Websocket. |

### Response

| Name    | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                            |
| jsonrpc | string  | The JSON-RPC version (2.0)                                     |
| result  | string  | Result of method execution. <code>ok</code> in case of success |

## /private/disable_cancel_on_disconnect

Disable Cancel On Disconnect for the connection.

When change is applied for the account, then every newly opened connection will
start with **inactive** Cancel on Disconnect.

**Scope:** `account:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                            | Description                                                                                                                                                                                                                                                 |
| --------- | -------- | ------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope     | false    | string | <code>connection</code><br><code>account</code> | Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - <code>connection</code>)<br><br><strong>NOTICE:</strong> Scope <code>connection</code> can be used only when working via Websocket. |

### Response

| Name    | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| id      | integer | The id that was sent in the request                            |
| jsonrpc | string  | The JSON-RPC version (2.0)                                     |
| result  | string  | Result of method execution. <code>ok</code> in case of success |

## /private/get_cancel_on_disconnect

Read current Cancel On Disconnect configuration for the account.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                            | Description                                                                                                                                                                                                                                                 |
| --------- | -------- | ------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope     | false    | string | <code>connection</code><br><code>account</code> | Specifies if Cancel On Disconnect change should be applied/checked for the current connection or the account (default - <code>connection</code>)<br><br><strong>NOTICE:</strong> Scope <code>connection</code> can be used only when working via Websocket. |

### Response

| Name                             | Type            | Description                                                                           |
| -------------------------------- | --------------- | ------------------------------------------------------------------------------------- |
| id                               | integer         | The id that was sent in the request                                                   |
| jsonrpc                          | string          | The JSON-RPC version (2.0)                                                            |
| result                           | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;enabled | boolean         | Current configuration status                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;scope   | string          | Informs if Cancel on Disconnect was checked for the current connection or the account |
