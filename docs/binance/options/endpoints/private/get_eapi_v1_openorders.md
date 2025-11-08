# Query Current Open Option Orders (USER_DATA)

### API Description

Query current all open orders, status: ACCEPTED PARTIALLY_FILLED

### HTTP Request

GET `/eapi/v1/openOrders`

### Request Weight

**1** for a single symbol; **40** when the symbol parameter is omitted

### Request Parameters

| Name       | Type   | Mandatory | Description                                                                             |
| ---------- | ------ | --------- | --------------------------------------------------------------------------------------- |
| symbol     | STRING | NO        | return all orders if don't pass, Option trading pair, e.g BTC-200730-9000-C,            |
| orderId    | LONG   | NO        | Returns the orderId and subsequent orders, the most recent order is returned by default |
| startTime  | LONG   | NO        | Start Time                                                                              |
| endTime    | LONG   | NO        | End Time                                                                                |
| recvWindow | LONG   | NO        |                                                                                         |
| timestamp  | LONG   | YES       |                                                                                         |

### Response Example

```json
[
  {
    "orderId": 4611875134427365377,     // System order number
    "symbol": "BTC-200730-9000-C",      // Option trading pair
    "price": "100",                     // Order Price
    "quantity": "1",                    // Order Quantity
    "executedQty": "0",                 // Number of completed trades
    "fee": "0",                         // Fee
    "side": "BUY",                      // Buy/sell direction
    "type": "LIMIT",                    // Order type
    "timeInForce": "GTC",               // Time in force method
    "reduceOnly": false,                // Order is reduce only Y/N
    "postOnly": false,
    "createTime": 1592465880683,        // Order Time
    "updateTime": 1592465880683,        // Update Time
    "status": "ACCEPTED",               // Order status
    "avgPrice": "0",                    // Average price of completed trade
    "clientOrderId": ""                 // Client order ID
    "priceScale": 2,
    "quantityScale": 2,
    "optionSide": "CALL",
    "quoteAsset": "USDT",
    "mmp": false
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Query-Current-Open-Option-Orders](https://developers.binance.com/docs/derivatives/option/trade/Query-Current-Open-Option-Orders)
