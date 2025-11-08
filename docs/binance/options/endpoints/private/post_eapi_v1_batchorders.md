# Place Multiple Orders(TRADE)

### API Description

Send multiple option orders.

### HTTP Request

POST `/eapi/v1/batchOrders`

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description               |
| ---------- | ---- | --------- | ------------------------- |
| orders     | LIST | YES       | order list. Max 10 orders |
| recvWindow | LONG | NO        |                           |
| timestamp  | LONG | YES       |                           |

**Where `orders` is the list of order parameters in JSON:**

- **example:** /eapi/v1/batchOrders?orders=\[{"symbol":"BTC-210115-35000-C",
  "price":"100","quantity":"0.0002","side":"BUY","type":"LIMIT"}\]

| Name                                                                  | Type    | Mandatory | Description                                                |
| --------------------------------------------------------------------- | ------- | --------- | ---------------------------------------------------------- |
| symbol                                                                | STRING  | YES       | Option trading pair, e.g BTC-200730-9000-C                 |
| side                                                                  | ENUM    | YES       | Buy/sell direction: SELL, BUY                              |
| type                                                                  | ENUM    | YES       | Order Type: LIMIT (Only support LIMIT)                     |
| quantity                                                              | DECIMAL | YES       | Order Quantity                                             |
| price                                                                 | DECIMAL | NO        | Order Price                                                |
| timeInForce                                                           | ENUM    | NO        | Time in force method（Default GTC）                        |
| reduceOnly                                                            | BOOLEAN | NO        | Reduce Only（Default false）                               |
| postOnly                                                              | BOOLEAN | NO        | Post Only（Default false）                                 |
| newOrderRespType                                                      | ENUM    | NO        | "ACK", "RESULT", Default "ACK"                             |
| clientOrderId                                                         | STRING  | NO        | User-defined order ID cannot be repeated in pending orders |
| isMmp                                                                 | BOOLEAN | NO        | is market maker protection order, true/false               |
|                                                                       |         |           |                                                            |
| Some parameters are mandatory depending on the order type as follows: |         |           |                                                            |

| Type  | Mandatory parameters         |
| ----- | ---------------------------- |
| LIMIT | timeInForce, quantity, price |

> - Parameter rules are same with New Order
> - Batch orders are processed concurrently, and the order of matching is not
>   guaranteed.

### Response Example

```json
[
  {
    "orderId": 4612288550799409153, // System order number
    "symbol": "ETH-220826-1800-C", // Option trading pair
    "price": "100", // Order Price
    "quantity": "0.01", // Order Quantity
    "side": "BUY", // Buy/sell direction
    "type": "LIMIT", // Order type
    "reduceOnly": false, // Order is reduce only Y/N
    "postOnly": false, // Post only or not
    "clientOrderId": "1001", // Client order ID
    "mmp": false // MMP
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Place-Multiple-Orders](https://developers.binance.com/docs/derivatives/option/trade/Place-Multiple-Orders)
