# DELETE /api/v3/order

**Source:**
https://www.mexc.com/api-docs/spot-v3/spot-account-trade#cancel-order

> Response

```json
{
  "symbol": "LTCBTC",
  "origClientOrderId": "myOrder1",
  "orderId": 4,
  "clientOrderId": "cancelMyOrder1",
  "price": "2.00000000",
  "origQty": "1.00000000",
  "executedQty": "0.00000000",
  "cummulativeQuoteQty": "0.00000000",
  "status": "CANCELED",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "side": "BUY"
}
```

- **DELETE** `/api/v3/order`

**Permission:** SPOT_DEAL_WRITE

**Weight(IP):** 1

Cancel an active order.

Parameters:

| Name              | Type   | Mandatory | Description |
| ----------------- | ------ | --------- | ----------- |
| symbol            | string | YES       |             |
| orderId           | string | NO        | Order id    |
| origClientOrderId | string | NO        |             |
| newClientOrderId  | string | NO        |             |
| recvWindow        | long   | NO        |             |
| timestamp         | long   | YES       |             |

Either `orderId` or `origClientOrderId` must be sent.

Response:

| Name                | Description                                  |
| ------------------- | -------------------------------------------- |
| symbol              | Symbol                                       |
| origClientOrderId   | Original client order id                     |
| orderId             | order id                                     |
| clientOrderId       | client order id                              |
| price               | Price                                        |
| origQty             | Original order quantity                      |
| executedQty         | Executed order quantity                      |
| cummulativeQuoteQty | Cummulative quote quantity                   |
| status              | [order status](#order_status "order status") |
| timeInForce         |                                              |
| type                | [Order type](#order_type "Order type")       |
| side                | [order side](#order_side "order side")       |
