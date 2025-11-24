# Get History Candlestick Data

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get History Candlestick Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/history-candles

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/history-candles?symbol=BTCUSDT&granularity=1min&endTime=1659080270000&limit=100"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description             |
| :---------- | :----- | :------- | :---------------------- |
| symbol      | String | Yes      | Trading pair            |
| granularity | String | Yes      | Time interval of charts |

For the corresponding relationship between granularity and value, refer to the
list below.  
minute: 1min,3min,5min,15min,30min  
hour: 1h,4h,6h,12h  
day: 1day,3day  
week: 1week  
month: 1M  
hour in UTC:6Hutc,12Hutc  
day in UTC:1Dutc,3Dutc  
week in UTC:1Wutc  
month in UTC: 1Mutc  
 | | endTime | String | Yes | The time end point of the chart data, i.e., get
the chart data before this time stamp  
Unix millisecond timestamp, e.g. 1690196141868 | | limit | String | No | Number
of queries: Default: 100, maximum: 200. |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695799900330,
  "data": [
    [
      "1646064000000",
      "43500.8",
      "48207.2",
      "38516",
      "46451.9",
      "2581.4668",
      "118062073.82644",
      "118062073.82644"
    ],
    [
      "1648742400000",
      "46451.9",
      "55199.6",
      "15522.1",
      "38892.5",
      "42331329.5473",
      "1726993402150.991724",
      "1726993402150.991724"
    ],
    [
      "1654012800000",
      "38892.5",
      "38892.5",
      "38892.5",
      "38892.5",
      "0",
      "0",
      "0"
    ],
    [
      "1654012800000",
      "39270.4",
      "39270.4",
      "37834.5",
      "37834.5",
      "42.444",
      "1619934.779",
      "1619934.779"
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

| Parameter  | Type   | Description                                                          |
| :--------- | :----- | :------------------------------------------------------------------- |
| index\[0\] | String | System timestamp, Unix millisecond timestamp, e.g. 1690196141868     |
| index\[1\] | String | Opening price                                                        |
| index\[2\] | String | Highest price                                                        |
| index\[3\] | String | Lowest price                                                         |
| index\[4\] | String | Closing price                                                        |
| index\[5\] | String | Trading volume in base currency, e.g. "BTC" in the "BTCUSDT" pair.   |
| index\[6\] | String | Trading volume in USDT                                               |
| index\[7\] | String | Trading volume in quote currency, e.g. "USDT" in the "BTCUSDT" pair. |

> **Source:** https://www.bitget.com/api-doc/spot/market/Get-History-Candle-Data
