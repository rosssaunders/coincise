# Cancel Multiple Option Orders (TRADE)

### API Description

Cancel multiple orders.

### HTTP Request

DELETE `/eapi/v1/batchOrders`

### Request Weight

**1**

### Request Parameters

| Name           | Type         | Mandatory | Description                                               |
| -------------- | ------------ | --------- | --------------------------------------------------------- |
| symbol         | STRING       | YES       | Option trading pair, e.g BTC-200730-9000-C                |
| orderIds       | LIST<LONG>   | NO        | Order ID, e.g \[4611875134427365377,4611875134427365378\] |
| clientOrderIds | LIST<STRING> | NO        | User-defined order ID, e.g \["my_id_1","my_id_2"\]        |
| recvWindow     | LONG         | NO        |                                                           |
| timestamp      | LONG         | YES       |                                                           |

> - At least one instance of `orderId` and `clientOrderId` must be sent.

### Response Example

```json
[
  {
    "orderId": 4611875134427365377,     // System order number
    "symbol": "BTC-200730-9000-C",      // Option trading pair
    "price": "100",                     // Order Price
    "quantity": "1",                    // Order Quantity
    "executedQty": "0",                 // Number of completed quantity
    "fee": 0,                           // Fee
    "side": "BUY",                      // Buy/sell direction
    "type": "LIMIT",                    // Order type
    "timeInForce": "GTC",               // Time in force method
    "createTime": 1592465880683,        // Order Time
    "status": "ACCEPTED",               // Order status
    "avgPrice": "0",                    // Average price of completed trade
    "reduceOnly": false,                // Order is reduce only Y/N
    "clientOrderId": ""                 // Client order ID
    "updateTime": 1566818724722,        // Update time
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Cancel-Multiple-Option-Orders](https://developers.binance.com/docs/derivatives/option/trade/Cancel-Multiple-Option-Orders)
