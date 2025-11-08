## All orders (USER\_DATA)​

```
GET /api/v3/allOrders
```

Get all account orders; active, canceled, or filled.

**Weight:** 20

**Data Source:** Database

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| orderId | LONG | NO |  |
| startTime | LONG | NO |  |
| endTime | LONG | NO |  |
| limit | INT | NO | Default: 500; Maximum: 1000. |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

**Notes:**

-   If `orderId` is set, it will get orders >= that `orderId`. Otherwise most recent orders are returned.
-   For some historical orders `cummulativeQuoteQty` will be < 0, meaning the data is not available at this time.
-   If `startTime` and/or `endTime` provided, `orderId` is not required.
-   The time between `startTime` and `endTime` can't be longer than 24 hours.

**Response:**

```
[  {    "symbol": "LTCBTC",    "orderId": 1,    "orderListId": -1, //Unless it's part of an order list, value will be -1    "clientOrderId": "myOrder1",    "price": "0.1",    "origQty": "1.0",    "executedQty": "0.0",    "cummulativeQuoteQty": "0.0",    "status": "NEW",    "timeInForce": "GTC",    "type": "LIMIT",    "side": "BUY",    "stopPrice": "0.0",    "icebergQty": "0.0",    "time": 1499827319559,    "updateTime": 1499827319559,    "isWorking": true,    "origQuoteOrderQty": "0.000000",    "workingTime": 1499827319559,    "selfTradePreventionMode": "NONE"  }]
```

**Note:** The payload above does not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
