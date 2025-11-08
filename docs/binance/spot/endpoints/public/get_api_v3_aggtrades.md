## Compressed/Aggregate trades list​

```
GET /api/v3/aggTrades
```

Get compressed, aggregate trades. Trades that fill at the time, from the same taker order, with the same price will have the quantity aggregated.

**Weight:** 4

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| fromId | LONG | NO | ID to get aggregate trades from INCLUSIVE. |
| startTime | LONG | NO | Timestamp in ms to get aggregate trades from INCLUSIVE. |
| endTime | LONG | NO | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| limit | INT | NO | Default: 500; Maximum: 1000. |

-   If fromId, startTime, and endTime are not sent, the most recent aggregate trades will be returned.

**Data Source:** Database

**Response:**

```
[  {    "a": 26129,         // Aggregate tradeId    "p": "0.01633102",  // Price    "q": "4.70443515",  // Quantity    "f": 27781,         // First tradeId    "l": 27781,         // Last tradeId    "T": 1498793709153, // Timestamp    "m": true,          // Was the buyer the maker?    "M": true           // Was the trade the best price match?  }]
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints)
