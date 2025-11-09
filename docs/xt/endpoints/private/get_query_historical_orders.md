# GET /v4/history-order

**Source:**
[https://doc.xt.com/docs/spot/Order/QueryHistoricalOrders](https://doc.xt.com/docs/spot/Order/QueryHistoricalOrders)

## Description

This endpoint retrieves operations on /v4/history-order.

## Authentication

Required (Private Endpoint)

## Rate Limit

- 10/s/apikey

## HTTP Request

`GET /v4/history-order`

## Request Parameters

| Name           | Type   | Required | Default | Description                                                           | Ranges                                                |
| -------------- | ------ | -------- | ------- | --------------------------------------------------------------------- | ----------------------------------------------------- |
| symbol         | string | No       | N/A     | Trading pair, if not filled in, represents all                        | —                                                     |
| bizType        | string | No       | N/A     | Business type                                                         | SPOT, LEVER                                           |
| side           | string | No       | N/A     | Order side                                                            | BUY, SELL                                             |
| type           | string | No       | N/A     | Order type                                                            | LIMIT, MARKET                                         |
| state          | string | No       | N/A     | Order [state](/docs/spot/Access Description/PublicModule#order-state) | PARTIALLY_FILLED, FILLED, CANCELED, REJECTED, EXPIRED |
| fromId         | number | No       | N/A     | Start ID                                                              | —                                                     |
| direction      | string | No       | N/A     | Query direction                                                       | PREV, NEXT                                            |
| limit          | number | No       | 20      | Limit number (max 100)                                                | —                                                     |
| startTime      | number | No       | N/A     | Start time (e.g. 1657682804112)                                       | —                                                     |
| endTime        | number | No       | N/A     | End time                                                              | —                                                     |
| hiddenCanceled | bool   | No       | N/A     | Whether to hide canceled orders                                       | —                                                     |

## Response Example

```json
{
  "rc": 0,
  "mc": "string",
  "ma": [{}],
  "result": {
    "hasPrev": true,
    "hasNext": true,
    "items": [
      {
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
    ]
  }
}
```
