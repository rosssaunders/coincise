# Get Candlestick Data

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get Candlestick Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/market/candles

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/candles?symbol=BTCUSDT&granularity=1min&startTime=1659076670000&endTime=1659080270000&limit=100"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair e.g.BTCUSDT |
| granularity | String | Yes | Time interval of charts  
For the corresponding relationship between granularity and value, refer to the list below.  
minute: 1min,3min,5min,15min,30min  
hour: 1h,4h,6h,12h  
day: 1day,3day  
week: 1week  
month: 1M  
hour in UTC:6Hutc,12Hutc  
day in UTC:1Dutc,3Dutc  
week in UTC:1Wutc  
month in UTC: 1Mutc  
1m, 3m, 5m can query for one month,15m can query for 52 days,30m can query for 62 days,1H can query for 83 days,2H can query for 120 days,4H can query for 240 days,6H can query for 360 days. |
| startTime | String | No | The time start point of the chart data, i.e., to get the chart data after this time stamp  
Unix millisecond timestamp, e.g. 1690196141868 |
| endTime | String | No | The time end point of the chart data, i.e., get the chart data before this time stamp  
Unix millisecond timestamp, e.g. 1690196141868 |
| limit | String | No | Number of queries: Default: 100, maximum: 1000. |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695800278693,
  "data": [
    [
      "1656604800000",
      "37834.5",
      "37849.5",
      "37773.5",
      "37773.5",
      "428.3462",
      "16198849.1079",
      "16198849.1079"
    ],
    [
      "1656604800000",
      "37834.5",
      "37849.5",
      "37773.5",
      "37773.5",
      "428.3462",
      "16198849.1079",
      "16198849.1079"
    ]
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| index\[0\] | String | System timestamp, Unix millisecond timestamp, e.g. 1690196141868 |
| index\[1\] | String | Opening price |
| index\[2\] | String | Highest price |
| index\[3\] | String | Lowest price |
| index\[4\] | String | Closing price |
| index\[5\] | String | Trading volume in base currency, e.g. "BTC" in the "BTCUSDT" pair. |
| index\[6\] | String | Trading volume in USDT |
| index\[7\] | String | Trading volume in quote currency, e.g. "USDT" in the "BTCUSDT" pair. |

> **Source:** https://www.bitget.com/api-doc/spot/market/Get-Candle-Data
