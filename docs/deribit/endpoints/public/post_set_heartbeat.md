# POST /public/set\_heartbeat

Signals the Websocket connection to send and request heartbeats. Heartbeats can be used to detect stale connections. When heartbeats have been set up, the API server will send `heartbeat` messages and `test_request` messages. Your software should respond to `test_request` messages by sending a `/api/v2/public/test` request. If your software fails to do so, the API server will immediately close the connection. If your account is configured to cancel on disconnect, any orders opened over the connection will be cancelled.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| interval | true | number | The heartbeat interval in seconds, but not less than 10 |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | string | Result of method execution. ok in case of success |