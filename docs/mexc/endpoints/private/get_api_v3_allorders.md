# All Orders

> Response

```
[
  {
    "symbol": "LTCBTC",
    "orderId": 1,
    "orderListId": -1,
    "clientOrderId": "myOrder1",
    "price": "0.1",
    "origQty": "1.0",
    "executedQty": "0.0",
    "cummulativeQuoteQty": "0.0",
    "status": "NEW",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "BUY",
    "stopPrice": "0.0",
    "icebergQty": "0.0",
    "time": 1499827319559,
    "updateTime": 1499827319559,
    "isWorking": true,
    "origQuoteOrderQty": "0.000000"
  }
]
```

- **GET** `/api/v3/allOrders`

**Permission:** SPOT_DEAL_READ

**Weight(IP):** 10

Get all account orders including active, cancelled or completed orders(the query
period is the latest 24 hours by default). You can query a maximum of the latest
7 days.

Parameters:

| Name       | Type   | Mandatory | Description            |
| ---------- | ------ | --------- | ---------------------- |
| symbol     | string | YES       | Symbol                 |
| startTime  | long   | NO        |                        |
| endTime    | long   | NO        |                        |
| limit      | int    | NO        | Default 500; max 1000; |
| recvWindow | long   | NO        |                        |
| timestamp  | long   | YES       |                        |

Response:

| Name                | Description                   |
| ------------------- | ----------------------------- |
| symbol              | Symbol                        |
| origClientOrderId   | Original client order id      |
| orderId             | order id                      |
| clientOrderId       | client order id               |
| price               | Price                         |
| origOty             | Original order quantity       |
| executedQty         | Executed order quantity       |
| cummulativeQuoteQty | Cummulative quote quantity    |
| status              | [order status](#order_status) |
| timeInForce         |                               |
| type                | [Order type](#order_type)     |
| side                | [Order side](#order_side)     |
| stopPrice           | stop price                    |
| time                | Order created time            |
| updateTime          | Last update time              |
| isWorking           | is orderbook                  |
| origQuoteOrderQty   |                               |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#all-orders
