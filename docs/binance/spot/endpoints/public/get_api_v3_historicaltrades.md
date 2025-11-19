## Old trade lookup​

```
GET /api/v3/historicalTrades
```

Get older trades.

**Weight:** 25

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| limit | INT | NO | Default: 500; Maximum: 1000. |
| fromId | LONG | NO | TradeId to fetch from. Default gets most recent trades. |

**Data Source:** Database

**Response:**

```
[
  {
    "id": 28457,
    "price": "4.00000100",
    "qty": "12.00000000",
    "quoteQty": "48.000012",
    "time": 1499865549590,
    "isBuyerMaker": true,
    "isBestMatch": true
  }
]
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints)
