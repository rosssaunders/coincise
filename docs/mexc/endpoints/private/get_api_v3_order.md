# GET /api/v3/order

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#query-order

> Response

```json
{  "symbol": "LTCBTC",  "orderId": 1,  "orderListId": -1,  "clientOrderId": "myOrder1",  "price": "0.1",  "Qty": "1.0",  "executedQty": "0.0",  "cummulativeQuoteQty": "0.0",  "status": "NEW",  "timeInForce": "GTC",  "type": "LIMIT",  "side": "BUY",  "stopPrice": "0.0",  "time": 1499827319559,  "updateTime": 1499827319559,  "stpMode":"",   "cancelReason":"stp_cancel",   "isWorking": true,  "origQuoteOrderQty": "0.000000"}
```

-   **GET** `/api/v3/order`

**Permission:** SPOT\_DEAL\_READ

**Weight(IP):** 2

Check an order's status.

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | String | YES |  |
| origClientOrderId | String | NO |  |
| orderId | String | NO |  |
| recvWindow | long | NO |  |
| timestamp | long | YES |  |

Response:

| Name | Description |
| --- | --- |
| symbol | Symbol |
| origClientOrderId | Original client order id |
| orderId | order id |
| clientOrderId | client order id |
| price | Price |
| Qty | Original order quantity |
| executedQty | Executed order quantity |
| cummulativeQuoteQty | Cummulative quote quantity |
| status | [order status](#order_status "order status") |
| timeInForce |  |
| type | [Order type](#order_type "Order type") |
| side | [Order side](#order_side "Order side") |
| stopPrice | stop price |
| time | Order created time |
| updateTime | Last update time |
| isWorking | is orderbook |
| stpMode | “” - Default value, no restriction on self-trading.“cancel\_maker” - Cancel the maker order.“cancel\_taker” - Cancel the taker order.“cancel\_both” - Cancel both sides. |
| cancelReason | cancel reason.stp\_cancel: canceled due to STP rules. |
