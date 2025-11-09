# POST private/advanced/cancel-otoco

**Source:**
[private/advanced/cancel-otoco](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-advanced-cancel-otoco)

## Authentication

Required (Private Endpoint)

## private/advanced/cancel-otoco

> Request Example

```
{
  "method":"private/advanced/cancel-otoco",
  "id":1234,
  "nonce":123456789000,
  "params":{
    "list_id":"4421958062479290999"
  }
}
```

> Response Example

```
{
  "id" : 1661328073,
  "method" : "private/advanced/cancel-otoco",
  "code" : 0
}
```

Cancel a OTOCO order on the Exchange. This call is asynchronous, so the response
is simply a confirmation of the request. The `user.advanced.order` subscription
can be used to check when each of the orders is successfully cancelled.

### Request Params

| Name    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| list_id | string | Y        | List ID     |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

No result block is returned. The code (0 = success) is the primary indicator
that the request is queued.
