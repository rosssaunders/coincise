# POST /private/unsubscribe

Unsubscribe from one or more channels.

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| channels | true | array | A list of channels to unsubscribe from. |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | array of string | A list of subscribed channels. |