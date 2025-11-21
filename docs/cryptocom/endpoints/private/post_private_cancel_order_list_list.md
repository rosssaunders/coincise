# POST private/cancel-order-list (LIST)

**Source:**
[private/cancel-order-list (LIST)](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-cancel-order-list "list")

## Authentication

Required (Private Endpoint)

## private/cancel-order-list (LIST)

> Request Sample

```
// Cancel List of Orders example
{
  "id": 6575,
  "method": "private/cancel-order-list",
  "api_key": "xxxxxxxxx",
  "params": {
    "contingency_type": "LIST",
    "order_list": [
      {
        "instrument_name": "CRO_USD",
        "client_oid": "api_leg1"
      },
      {
        "instrument_name": "CRO_USD",
        "client_oid": "api_leg2"
      }
    ]
  },
  "nonce": 1750389124417,
  "sig": "xxxxxxxx"
}
```

> Response Sample

```
// Cancel List of Orders - All ok
{
  "id": 6575,
  "method": "private/cancel-order-list",
  "code": 0,
  "result": [
    {
      "code": 0,
      "index": 0
    },
    {
      "code": 0,
      "index": 1
    }
  ]
}

// Cancel List of Orders - Error encountered
{
  "id": 6576,
  "method": "private/cancel-order-list",
  "code": 0,
  "result": [
    {
      "code": 212,
      "index": 0,
      "message": "INVALID_ORDERID"
    },
    {
      "code": 212,
      "index": 1,
      "message": "INVALID_ORDERID"
    }
  ]
}
```

Cancel a list of orders on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when each of the orders is
successfully cancelled.

### Request Params (List of Orders)

| Name             | Type            | Required | Description                                                   |
| ---------------- | --------------- | -------- | ------------------------------------------------------------- |
| order_list       | array of orders | Y        | For non contingency orders, A list of orders to be cancelled  |
| instrument_name  | string          | N        | Instrument name of contingency order, e.g., ETH_CRO, BTC_USDT |
| contingency_type | string          | Y        | Must be value "LIST"                                          |

Content of each order in `order_list`

| Name            | Type   | Required | Description                                      |
| --------------- | ------ | -------- | ------------------------------------------------ |
| instrument_name | string | N        | instrument_name, e.g., ETH_CRO, BTC_USDT         |
| order_id        | string | Y        | Order ID                                         |
| client_oid      | string | N        | Optional Client order ID (Maximum 36 characters) |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name    | Type   | Description                                             |
| ------- | ------ | ------------------------------------------------------- |
| code    | number | 0 if success                                            |
| index   | number | The index of corresponding order request (Start from 0) |
| message | string | (Optional) For server or error messages                 |
