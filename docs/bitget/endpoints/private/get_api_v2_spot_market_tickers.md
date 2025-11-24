# Get Ticker Information

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get Ticker Information,Supports both single and batch queries

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/tickers

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/tickers?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter                                                                            | Type   | Required | Description                     |
| :----------------------------------------------------------------------------------- | :----- | :------- | :------------------------------ |
| symbol                                                                               | String | No       | trading pair name, e.g. BTCUSDT |
| If the field is left blank, all trading pair information will be returned by default |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695808949356,
  "data": [
    {
      "symbol": "BTCUSDT",
      "high24h": "37775.65",
      "open": "35134.2",
      "low24h": "34413.1",
      "lastPr": "34413.1",
      "quoteVolume": "0",
      "baseVolume": "0",
      "usdtVolume": "0",
      "bidPr": "0",
      "askPr": "0",
      "bidSz": "0.0663",
      "askSz": "0.0119",
      "openUtc": "23856.72",
      "ts": "1625125755277",
      "changeUtc24h": "0.00301",
      "change24h": "0.00069"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter    | Type   | Description                                                 |
| :----------- | :----- | :---------------------------------------------------------- |
| symbol       | String | Trading pair                                                |
| high24h      | String | 24h highest price                                           |
| open         | String | 24h open price                                              |
| lastPr       | String | Latest price                                                |
| low24h       | String | 24h lowest price                                            |
| quoteVolume  | String | Trading volume in quote currency                            |
| baseVolume   | String | Trading volume in base currency                             |
| usdtVolume   | String | Trading volume in USDT                                      |
| bidPr        | String | Bid 1 price                                                 |
| askPr        | String | Ask 1 price                                                 |
| bidSz        | String | Buying 1 amount                                             |
| askSz        | String | selling 1 amount                                            |
| openUtc      | String | UTC±00:00 Entry price                                       |
| ts           | String | Current time Unix millisecond timestamp, e.g. 1690196141868 |
| changeUtc24h | String | Change at UTC+0, 0.01 means 1%.                             |
| change24h    | String | 24-hour change, 0.01 means 1%.                              |

> **Source:** https://www.bitget.com/api-doc/spot/market/Get-Tickers
