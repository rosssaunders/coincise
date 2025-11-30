# POST private/advanced/cancel-oto

**Source:**
[private/advanced/cancel-oto](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-advanced-cancel-oto)

## Authentication

Required (Private Endpoint)

## private/advanced/cancel-oto

> Request Example

```
{
  "method":"private/advanced/cancel-oto",
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
  "method" : "private/advanced/cancel-oto",
  "code" : 0
}
```

Cancel a OTO order on the Exchange. This call is asynchronous, so the response
is simply a confirmation of the request. The `user.advanced.order` subscription
can be used to check when each of the orders is successfully cancelled.

The `user.order` subscription can be used to check when each of the orders is
successfully cancelled.

### Request Params (List of Orders)

| Name             | Type            | Required | Description                                                   |
| ---------------- | --------------- | -------- | ------------------------------------------------------------- |
| order_list       | array of orders | Y        | For non contingency orders, A list of orders to be cancelled  |
| instrument_name  | string          | N        | Instrument name of contingency order, e.g., ETH_CRO, BTC_USDT |
| contingency_type | string          | Y        | Must be value "LIST"                                          |
| `order_list`     | array of orders | Y        | `LIST`: 1-10 orders                                           |

Content of each order in `order_list`

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
