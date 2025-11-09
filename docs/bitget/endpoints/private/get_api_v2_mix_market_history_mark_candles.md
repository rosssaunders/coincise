# Get Historical Mark Price Candlestick

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get historical mark price candle data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/market/history-mark-candles

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/history-mark-candles?symbol=BTCUSDT&granularity=5m&endTime=1691329771000&limit=100&startTime=1688824171000&productType=usdt-futures"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |
| granularity | String | Yes | K-line particle size  
\- 1m(1 minute)  
\- 3m(3 minutes)  
\- 5m(5 minutes)  
\- 15m(15 minutes)  
\- 30m(30 minutes)  
\- 1H( 1 hour)  
\- 4H(4 hours)  
\- 6H(6 hours)  
\- 12H(12 hours)  
\- 1D(1 day)  
\- 3D ( 3 days)  
\- 1W (1 week)  
\- 1M (monthly line)  
\- 6Hutc (UTC 6 hour line)  
\- 12Hutc (UTC 12 hour line)  
\- 1Dutc (UTC 1-day line)  
\- 3Dutc (UTC 3-day line)  
\- 1Wutc (UTC weekly line)  
\- 1Mutc (UTC monthly line) |
| startTime | String | No | The start time is to query the k-lines after this time  
According to the different time granularity, the corresponding time unit must be rounded down to be queried.  
The millisecond format of the Unix timestamp, such as 1672410780000  
Request data after this start time (the maximum time query range is 90 days) |
| endTime | String | No | The end time is to query the k-lines before this time  
According to the different time granularity, the corresponding time unit must be rounded down to be queried.  
The millisecond format of the Unix timestamp, such as 1672410780000  
Request data before this end time (the maximum time query range is 90 days) |
| limit | String | No | Default: 100, maximum: 200 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695795362764,    "data": [        [            "1691299500000",            "29803",            "29803",            "29803",            "29803",            "0",            "0"        ],        [            "1691299800000",            "29803",            "29803",            "29803",            "29803",            "0",            "0"        ]    ]  }
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| index\[0\] | String | Milliseconds format of timestamp Unix, e.g. 1597026383085 |
| index\[1\] | String | Entry price |
| index\[2\] | String | Highest price |
| index\[3\] | String | Lowest price |
| index\[4\] | String | Exit price(Only include the finished K line data) |
| index\[5\] | String | Trading volume of the base coin |
| index\[6\] | String | Trading volume of quote currency |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-History-Mark-Candle-Data
