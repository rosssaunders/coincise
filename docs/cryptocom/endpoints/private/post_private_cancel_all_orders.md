# POST private/cancel-all-orders

**Source:** [private/cancel-all-orders](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-cancel-all-orders)

## Authentication

Required (Private Endpoint)

## private/cancel-all-orders

> Request Sample

```
{
  "id": 1,
  "nonce": 1611169184000,
  "method": "private/cancel-all-orders",
  "params": {
    "instrument_name": "BTCUSD-PERP"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/cancel-all-orders",
  "code": 0
}
```

Cancels all orders for a particular instrument/pair (asynchronous).

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.order` subscription can be used to check when the order is successfully canceled.

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| instrument\_name | string | N | e.g. BTCUSD-PERP. If not provided, the orders of ALL instruments will be canceled |
| type | string | N | e.g. `LIMIT`, `TRIGGER`, `ALL` |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

No result block is returned. The code (0 = success) is the primary indicator that the request is queued.