# POST /private/unsubscribe_all

Unsubscribe from all the channels subscribed so far.

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name    | Type    | Description                                       |
| ------- | ------- | ------------------------------------------------- |
| id      | integer | The id that was sent in the request               |
| jsonrpc | string  | The JSON-RPC version (2.0)                        |
| result  | string  | Result of method execution. ok in case of success |
