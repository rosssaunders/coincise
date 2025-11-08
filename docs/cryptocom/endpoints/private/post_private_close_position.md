# POST private/close-position

**Source:**
[private/close-position](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-close-position)

## Authentication

Required (Private Endpoint)

## private/close-position

> Request Sample

```
{
  "id": 1,
  "nonce" : 1610905028000,
  "method": "private/close-position",
  "params": {
    "instrument_name": "BTCUSD-PERP",
    "type": "LIMIT",
    "price": "30000.0",
    "quantity": "1000"
  }
}

{
  "id": 1,
  "nonce" : 1610905028000,
  "method": "private/close-position",
  "params": {
    "instrument_name": "BTCUSD-PERP",
    "type": "MARKET"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/close-position",
  "code": 0,
  "result": {
    "client_oid": "1684d6e4-2c55-64e1-52c3-3aa9febc3a23",
    "order_id": "15744"
  }
}
```

Cancels position for a particular instrument/pair (asynchronous).

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when the order is
successfully canceled.

### Request Params

| Name            | Type             | Required | Description             |
| --------------- | ---------------- | -------- | ----------------------- |
| instrument_name | string           | Y        | e.g. BTCUSD-PERP        |
| type            | string           | Y        | `LIMIT` or `MARKET`     |
| price           | string           | Depends  | For `LIMIT` orders only |
| quantity        | string of number | N        | Positive Number only    |

Remark:  
Only provide this field if intending to do partial closing |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

The code (0 = success) is the primary indicator that the request is queued.

| Name       | Type             | Description     |
| ---------- | ---------------- | --------------- |
| order_id   | string of number | Order ID        |
| client_oid | string           | Client Order ID |
