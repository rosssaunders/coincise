# Cancel all Open Orders on a Symbol

> Response

```
[
  {
    "symbol": "BTCUSDT",
    "origClientOrderId": "E6APeyTJvkMvLMYMqu1KQ4",
    "orderId": 11,
    "orderListId": -1,
    "clientOrderId": "pXLV6Hz6mprAcVYpVMTGgx",
    "price": "0.089853",
    "origQty": "0.178622",
    "executedQty": "0.000000",
    "cummulativeQuoteQty": "0.000000",
    "status": "CANCELED",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "BUY"
  },
  {
    "symbol": "BTCUSDT",
    "origClientOrderId": "A3EF2HCwxgZPFMrfwbgrhv",
    "orderId": 13,
    "orderListId": -1,
    "clientOrderId": "pXLV6Hz6mprAcVYpVMTGgx",
    "price": "0.090430",
    "origQty": "0.178622",
    "executedQty": "0.000000",
    "cummulativeQuoteQty": "0.000000",
    "status": "CANCELED",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "BUY"
  }
]
```

- **DELETE** `/api/v3/openOrders`

**Permission:** SPOT_DEAL_WRITE

**Weight(IP):** 1

Cancel all pending orders for a single symbol, including OCO pending orders.

Parameters:

| Name       | Type   | Mandatory | Description                                                             |
| ---------- | ------ | --------- | ----------------------------------------------------------------------- |
| symbol     | string | YES       | maximum input 5 symbols,separated by ",". e.g. "BTCUSDT,MXUSDT,ADAUSDT" |
| recvWindow | long   | NO        |                                                                         |
| timestamp  | long   | YES       |                                                                         |

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
| side                | [order side](#order_side)     |

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#cancel-all-open-orders-on-a-symbol
