# POST private/amend-order

**Source:**
[private/amend-order](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-amend-order)

## Authentication

Required (Private Endpoint)

## private/amend-order

> Request Sample (amend by order_id)

```
{
    "id": 53,
    "method": "private/amend-order",
    "api_key": ${api_key},
    "params": {
        "order_id": order_id,
        "new_price": "82000",
        "new_quantity": "0.0002",
    },
    "nonce": 1587846358253
}
```

> Response Sample (amend by order_id)

```
{
    "id": 53,
    "method": "private/amend-order",
    "code": 0,
    "result": {
        "client_oid": "53",
        "order_id": "6530219466236720401"
    }
}
```

> Request Sample (amend by orig_client_id)

```
{
    "id": 55,
    "method": "private/amend-order",
    "api_key": ${api_key},
    "params": {
        "orig_client_oid": "53",
        "new_price": "83000",
        "new_quantity": "0.0001",
    },
    "nonce": 1587846358253
}

```

> Response Sample (amend by orig_client_id)

```
{
    "id": 55,
    "method": "private/amend-order",
    "code": 0,
    "result": {
        "client_oid": "55",
        "order_id": "6530219466236720401"
    }
}
```

Amend an existing order on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when the order is
successfully created.

Please note that amend order is designed as a convenience function such that it
performs cancel and then create behind the scene. The new order will lose queue
priority, except if the amend is only to amend down order quantity. For faster
performance, it is recommended to use `private/cancel-order`, and then
`private/create-order` instead.

### Request Params

| Name                                                   | Type             | Required | Description                             |
| ------------------------------------------------------ | ---------------- | -------- | --------------------------------------- |
| client_oid                                             | string           | N        | Client Order ID (Maximum 36 characters) |
| Order_id                                               | string of number | Depends  | Optional Order ID                       |
| Either `order_id` or `orig_client_oid` must be present |
| orig_client_oid                                        | string           | Depends  | Optional Original Client Order ID       |

Either `order_id` or `orig_client_oid` must be present  
If both exist together, `order_id` will have higher priority | | new_price |
string | Y | The new amended price  
If no change required, input original value | | new_quantity | string | Y | The
new amended quantity  
If no change required, input original value |

Remark:  
Either `new_price` or `new_quantity` must input a new value, otherwise request
will be rejected.

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name       | Type   | Description     |
| ---------- | ------ | --------------- |
| client_oid | string | client order ID |
| order_id   | string | order ID        |
