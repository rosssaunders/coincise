# GET /v4/order/{orderId}

**Source:**
[https://doc.xt.com/docs/spot/Order/GetSingleOrder](https://doc.xt.com/docs/spot/Order/GetSingleOrder)

## Description

This endpoint retrieves operations on /v4/order/{orderId}.

## Authentication

Required (Private Endpoint)

## Rate Limit

- 10/s/apikey

## HTTP Request

`GET /v4/order/{orderId}`

## Request Parameters

| Name    | Type   | Required | Default | Description |
| ------- | ------ | -------- | ------- | ----------- |
| orderId | number | Yes      | —       | Order ID    |

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
    "ip": "127.0.0.1",
    "updatedTime": 1655958915583
  }
}
```
