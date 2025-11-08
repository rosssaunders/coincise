# New Order (TRADE)

### API Description

Send a new order.

### HTTP Request

POST `/eapi/v1/order`

### Request Parameters

| Name             | Type    | Mandatory | Description                                                |
| ---------------- | ------- | --------- | ---------------------------------------------------------- |
| symbol           | STRING  | YES       | Option trading pair, e.g BTC-200730-9000-C                 |
| side             | ENUM    | YES       | Buy/sell direction: SELL, BUY                              |
| type             | ENUM    | YES       | Order Type: LIMIT(only support limit)                      |
| quantity         | DECIMAL | YES       | Order Quantity                                             |
| price            | DECIMAL | NO        | Order Price                                                |
| timeInForce      | ENUM    | NO        | Time in force method（Default GTC）                        |
| reduceOnly       | BOOLEAN | NO        | Reduce Only（Default false）                               |
| postOnly         | BOOLEAN | NO        | Post Only（Default false）                                 |
| newOrderRespType | ENUM    | NO        | "ACK", "RESULT", Default "ACK"                             |
| clientOrderId    | STRING  | NO        | User-defined order ID cannot be repeated in pending orders |
| isMmp            | BOOLEAN | NO        | is market maker protection order, true/false               |
| recvWindow       | LONG    | NO        |                                                            |
| timestamp        | LONG    | YES       |                                                            |

Some parameters are mandatory depending on the order type as follows:

| Type  | Mandatory parameters         |
| ----- | ---------------------------- |
| LIMIT | timeInForce, quantity, price |

### Response Example

> **Response ACK:**

```json
{
  "orderId": 4611875134427365377, // System order number
  "symbol": "BTC-200730-9000-C", // Option trading pair
  "price": "100", // Order Price
  "quantity": "1", // Order Quantity
  "side": "BUY", // Buy/sell direction
  "type": "LIMIT", // Order type
  "createDate": 1592465880683, // Order Time
  "reduceOnly": false,
  "postOnly": false,
  "mmp": false
}
```

> **Response RESULT:**

```json
{
  "orderId": 4611875134427365377,     // System order number
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
  "clientOrderId": ""                 // Client order ID
  "priceScale": 2,
  "quantityScale": 2,
  "optionSide": "CALL",
  "quoteAsset": "USDT",
  "mmp": false
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade](https://developers.binance.com/docs/derivatives/option/trade)
