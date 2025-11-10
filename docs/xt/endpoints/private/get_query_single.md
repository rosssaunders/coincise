# GET Query single

**Source:**
[https://doc.xt.com/docs/spot/Order/QuerySingle](https://doc.xt.com/docs/spot/Order/QuerySingle)

## Description

**Path:** `/v4/order`

## Authentication

Required (Private Endpoint)

## Rate Limit

- 50/s/apikey

## Request Parameters

| Name          | Type   | Required | Default | Description     |
| ------------- | ------ | -------- | ------- | --------------- |
| orderId       | number | No       | N/A     | Order ID        |
| clientOrderId | string | No       | N/A     | Client order ID |

## Response Example

```json
{
  "rc": 0,
  "mc": "string",
  "ma": [{}],
  "result": {
    "symbol": "BTC_USDT",
    "orderId": "6216559590087220004",
    "clientOrderId": "16559590087220001",
    "baseCurrency": "string",
    "quoteCurrency": "string",
    "side": "BUY",
    "type": "LIMIT",
    "timeInForce": "GTC",
    "price": "40000",
    "origQty": "2",
    "origQuoteQty": "48000",
    "executedQty": "1.2",
    "leavingQty": "string",
    "tradeBase": "2",
    "tradeQuote": "48000",
    "avgPrice": "42350",
    "fee": "string",
    "feeCurrency": "string",
    "state": "NEW",
    "time": 1655958915583,
    "updatedTime": 1655958915583
  }
}
```
