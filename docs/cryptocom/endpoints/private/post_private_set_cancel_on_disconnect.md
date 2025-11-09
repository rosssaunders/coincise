# POST private/set-cancel-on-disconnect

**Source:**
[private/set-cancel-on-disconnect](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-set-cancel-on-disconnect)

## Authentication

Required (Private Endpoint)

## private/set-cancel-on-disconnect

> Request Sample

```
{
  "id": 1,
  "method": "private/set-cancel-on-disconnect",
  "params": {
    "scope": "CONNECTION"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/set-cancel-on-disconnect",
  "code": 0,
  "result": {
    "scope": "CONNECTION"
  }
}
```

Cancel on Disconnect is an optional feature that will cancel all open orders
created by the connection upon loss of connectivity between client or server.

This feature is only available via the Websocket.

### Request Params

| Name  | Type   | Required | Description                                                                                                                                               |
| ----- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope | string | Y        | Specifies the scope of cancellation to be applied to the specific connection (all orders created via Websocket). The ONLY scope supported is `CONNECTION` |

### Helpful Information

- Once enabled, the scope of cancellation cannot be changed or disabled for the
  connection.
- Unsubscribing from any user channels will be considered as a loss of
  connectivity and will trigger cancelling orders.

### Applies To

Websocket (User API)

### Response Attributes

| Name  | Type   | Description                                                                                                                                               |
| ----- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope | string | Specifies the scope of cancellation to be applied to the specific connection (all orders created via Websocket). The ONLY scope supported is `CONNECTION` |
