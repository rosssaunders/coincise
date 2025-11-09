# POST private/advanced/cancel-all-orders

**Source:**
[private/advanced/cancel-all-orders](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-advanced-cancel-all-orders)

## Authentication

Required (Private Endpoint)

## private/advanced/cancel-all-orders

> Request Example

```
{
  "id": 1,
  "nonce": 1611169184000,
  "method": "private/advanced/cancel-all-orders",
  "params": {
    "instrument_name": "BTCUSD"
  }
}
```

> Response Example

```
{
  "id": 1,
  "method": "private/advanced/cancel-all-orders",
  "code": 0
}
```

Cancels all OTO/OTOCO orders for a particular instrument/pair (asynchronous).
This call is asynchronous, so the response is simply a confirmation of the
request. The `user.advanced.order` subscription can be used to check when the
order is successfully canceled.

### Request Params

| Name            | Type   | Required | Description                                                                            |
| --------------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| instrument_name | string | N        | e.g. BTCUSD. If not provided, the OTO/OTOCO orders of ALL instruments will be canceled |
| type            | string | N        | e.g. `LIMIT`, `TRIGGER`, `ALL`                                                         |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

No result block is returned. The code (0 = success) is the primary indicator
that the request is queued.
