# GET /api/v3/openOrders

**Source:**
https://www.mexc.com/api-docs/spot-v3/spot-account-trade#current-open-orders

> Response

```json
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
    "stpMode": "",
    "cancelReason": "stp_cancel",
    "origQuoteOrderQty": "0.000000"
  }
]
```

- **GET** `/api/v3/openOrders`

**Permission:** SPOT_DEAL_READ

**Weight(IP):** 3

Get all open orders on a symbol. **Careful** when accessing this with no symbol.

Parameters:

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | string | NO        |             |
| recvWindow | long   | NO        |             |
| timestamp  | long   | YES       |             |

Response:

| Name                | Description                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol              | Symbol                                                                                                                                                                |
| origClientOrderId   | Original client order id                                                                                                                                              |
| orderId             | order id                                                                                                                                                              |
| clientOrderId       | client order id                                                                                                                                                       |
| price               | Price                                                                                                                                                                 |
| origQty             | Original order quantity                                                                                                                                               |
| executedQty         | Executed order quantity                                                                                                                                               |
| cummulativeQuoteQty | Cummulative quote quantity                                                                                                                                            |
| status              | [order status](#order_status "order status")                                                                                                                          |
| timeInForce         |                                                                                                                                                                       |
| type                | [Order type](#order_type "Order type")                                                                                                                                |
| side                | [Order side](#order_side "Order side")                                                                                                                                |
| stopPrice           | stop price                                                                                                                                                            |
| time                | Order created time                                                                                                                                                    |
| updateTime          | Last update time                                                                                                                                                      |
| isWorking           | is orderbook                                                                                                                                                          |
| stpMode             | “” - Default value, no restriction on self-trading.“cancel_maker” - Cancel the maker order.“cancel_taker” - Cancel the taker order.“cancel_both” - Cancel both sides. |
| cancelReason        | cancel reason.stp_cancel: canceled due to STP rules.                                                                                                                  |
