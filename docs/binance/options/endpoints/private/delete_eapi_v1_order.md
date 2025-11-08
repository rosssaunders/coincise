# Cancel Option Order (TRADE)

### API Description

Cancel an active order.

### HTTP Request

DELETE `/eapi/v1/order`

**Weight:** **1**

### Request Parameters

| Name          | Type   | Mandatory | Description                                |
| ------------- | ------ | --------- | ------------------------------------------ |
| symbol        | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C |
| orderId       | LONG   | NO        | Order ID, e.g 4611875134427365377          |
| clientOrderId | STRING | NO        | User-defined order ID, e.g 10000           |
| recvWindow    | LONG   | NO        |                                            |
| timestamp     | LONG   | YES       |                                            |

> - At least one instance of `orderId` and `clientOrderId` must be sent.

### Response Example

```json
{
  "orderId": 4611875134427365377, // System order number
  "symbol": "BTC-200730-9000-C", // Option trading pair
  "price": "100", // Order Price
  "quantity": "1", // Order Quantity
  "executedQty": "0", // Number of executed quantity
  "fee": "0", // Fee
  "side": "BUY", // Buy/sell direction
  "type": "LIMIT", // Order type
  "timeInForce": "GTC", // Time in force method
  "reduceOnly": false, // Order is reduce only Y/N
  "postOnly": false,
  "createDate": 1592465880683, // Order Time
  "updateTime": 1566818724722, // Update time
  "status": "ACCEPTED", // Order status
  "avgPrice": "0", // Average price of completed trade
  "source": "API",
  "clientOrderId": "", // Client order ID
  "priceScale": 4,
  "quantityScale": 4,
  "optionSide": "CALL",
  "quoteAsset": "USDT",
  "mmp": false
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/trade/Cancel-Option-Order](https://developers.binance.com/docs/derivatives/option/trade/Cancel-Option-Order)
