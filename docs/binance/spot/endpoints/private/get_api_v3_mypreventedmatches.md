## Query Prevented Matches (USER\_DATA)​

```
GET /api/v3/myPreventedMatches
```

Displays the list of orders that were expired due to STP.

These are the combinations supported:

-   `symbol` + `preventedMatchId`
-   `symbol` + `orderId`
-   `symbol` + `orderId` + `fromPreventedMatchId` (`limit` will default to 500)
-   `symbol` + `orderId` + `fromPreventedMatchId` + `limit`

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| preventedMatchId | LONG | NO |  |
| orderId | LONG | NO |  |
| fromPreventedMatchId | LONG | NO |  |
| limit | INT | NO | Default: `500`; Maximum: `1000` |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

**Weight:**

| Case | Weight |
| --- | --- |
| If `symbol` is invalid | 2 |
| Querying by `preventedMatchId` | 2 |
| Querying by `orderId` | 20 |

**Data Source:**

Database

**Response:**

```
[  {    "symbol": "BTCUSDT",    "preventedMatchId": 1,    "takerOrderId": 5,    "makerSymbol": "BTCUSDT",    "makerOrderId": 3,    "tradeGroupId": 1,    "selfTradePreventionMode": "EXPIRE_MAKER",    "price": "1.100000",    "makerPreventedQuantity": "1.300000",    "transactTime": 1669101687094  }]
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
