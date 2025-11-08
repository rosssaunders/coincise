# POST private/get-cancel-on-disconnect

**Source:**
[private/get-cancel-on-disconnect](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-cancel-on-disconnect)

## Authentication

Required (Private Endpoint)

## private/get-cancel-on-disconnect

> Request Sample

```
{
  "id": 1,
  "method": "private/get-cancel-on-disconnect"
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/get-cancel-on-disconnect",
  "code": 0,
  "result": {
    "scope": "CONNECTION"
  }
}
```

Returns the scope of cancellation.

### Request Params

None

### Applies To

Websocket (User API)

### Response Attributes

| Name  | Type   | Description                                                                                                                                               |
| ----- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope | string | Specifies the scope of cancellation to be applied to the specific connection (all orders created via Websocket). The ONLY scope supported is `CONNECTION` |
