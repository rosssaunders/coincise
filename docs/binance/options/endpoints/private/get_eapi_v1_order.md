# Query Single Order (TRADE)

### API Description

Check an order status.

- These orders will not be found:
  - order status is `CANCELED` or `REJECTED`, **AND**
  - order has NO filled trade, **AND**
  - created time + 3 days < current time

### HTTP Request

GET `/eapi/v1/order`

### Request Weight

**1**

### Request Parameters

| Name          | Type   | Mandatory | Description                                                |
| ------------- | ------ | --------- | ---------------------------------------------------------- |
| symbol        | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C                 |
| orderId       | LONG   | NO        | Order id                                                   |
| clientOrderId | STRING | NO        | User-defined order ID cannot be repeated in pending orders |
| recvWindow    | LONG   | NO        |                                                            |
| timestamp     | LONG   | YES       |                                                            |

> - Either `orderId` or `clientOrderId` must be sent.

### Response Example

```json
{
  "orderId": 4611875134427365377,     // System order id
  "symbol": "BTC-200730-9000-C",      // Option trading pair
  "price": "100",                     // Order Price
  "quantity": "1",                    // Order Quantity
  "executedQty": "0",                 // Number of executed quantity
  "fee": "0",                         // Fee
  "side": "BUY",                      // Buy/sell direction
  "type": "LIMIT",                    // Order type
  "timeInForce": "GTC",               // Time in force method
  "reduceOnly": false,                // Order is reduce only Y/N
  "postOnly": false,                  // Order is post only
  "createTime": 1592465880683,        // Order Time
  "updateTime": 1566818724722,        // Update time
  "status": "ACCEPTED",               // Order status
  "avgPrice": "0",                    // Average price of completed trade
  "source": "API",                    // Order source
  "clientOrderId": ""                 // Client order ID
  "priceScale": 2,
  "quantityScale": 2,
  "optionSide": "CALL",
  "quoteAsset": "USDT",
  "mmp": false
}
```

> **No Order Response:**

```json
{
  "code": -2013,
  "msg": "Order does not exist"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Query-Single-Order](https://developers.binance.com/docs/derivatives/option/trade/Query-Single-Order)
