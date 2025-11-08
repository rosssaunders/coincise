## Current open orders (USER\_DATA)​

```
GET /api/v3/openOrders
```

Get all open orders on a symbol. **Careful** when accessing this with no symbol.

**Weight:** 6 for a single symbol; **80** when the symbol parameter is omitted

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | NO |  |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

-   If the symbol is not sent, orders for all symbols will be returned in an array.

**Data Source:** Memory => Database

**Response:**

```
[  {    "symbol": "LTCBTC",    "orderId": 1,    "orderListId": -1, // Unless it's part of an order list, value will be -1    "clientOrderId": "myOrder1",    "price": "0.1",    "origQty": "1.0",    "executedQty": "0.0",    "cummulativeQuoteQty": "0.0",    "status": "NEW",    "timeInForce": "GTC",    "type": "LIMIT",    "side": "BUY",    "stopPrice": "0.0",    "icebergQty": "0.0",    "time": 1499827319559,    "updateTime": 1499827319559,    "isWorking": true,    "origQuoteOrderQty": "0.000000",    "workingTime": 1499827319559,    "selfTradePreventionMode": "NONE"  }]
```

**Note:** The payload above does not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
