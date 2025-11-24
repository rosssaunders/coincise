# GET /private/logout

Gracefully close websocket connection, when COD (Cancel On Disconnect) is
enabled orders are not cancelled

This is a private method; it can only be used after authentication.

### Parameters

| Parameter        | Required | Type    | Enum                                                                                  | Description |
| ---------------- | -------- | ------- | ------------------------------------------------------------------------------------- | ----------- |
| invalidate_token | false    | boolean | If value is true all tokens created in current session are invalidated, default: true |             |

### Response

_This method has no response body_
