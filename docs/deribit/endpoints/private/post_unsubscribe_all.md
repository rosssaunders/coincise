# POST /private/unsubscribe\_all

Unsubscribe from all the channels subscribed so far.

This is a private method; it can only be used after authentication.

### Parameters

*This method takes no parameters*

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | string | Result of method execution. ok in case of success |