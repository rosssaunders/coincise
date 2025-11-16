# Get Candlestick Data

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

By default, 100 records are returned. If there is no data, an empty array is
returned. The queryable data history varies depending on the k-line granularity.

The rules are as follows:  
1m, 3m, and 5m can be checked for up to one month;  
15m can be checked for up to 52 days;  
30m can be searched for up to 62 days;  
1H can be checked for up to 83 days;  
2H can be checked for up to 120 days;  
4H can be checked for up to 240 days;  
6H can be checked for up to 360 days

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/market/candles

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/candles?symbol=BTCUSDT&granularity=5m&limit=100&productType=usdt-futures"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description  |
| :---------- | :----- | :------- | :----------- |
| symbol      | String | Yes      | Trading pair |
| productType | String | Yes      | Product type |

`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures | | granularity | String | Yes | K-line particle
size  
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
\- 1Mutc (UTC monthly line) | | startTime | String | No | The start time is to
query the k-lines after this time  
According to the different time granularity, the corresponding time unit must be
rounded down to be queried.  
The millisecond format of the Unix timestamp, such as 1672410780000  
Request data after this start time (the maximum time query range is 90 days) | |
endTime | String | No | The end time is to query the k-lines before this time  
According to the different time granularity, the corresponding time unit must be
rounded down to be queried.  
The millisecond format of the Unix timestamp, such as 1672410780000  
Request data before this end time (the maximum time query range is 90 days) | |
kLineType | String | No | Candlestick chart types: MARKET tick; MARK mark; INDEX
index;  
MARKET by default | | limit | String | No | Default: 100, maximum: 1000 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695865615662,    "data": [        [            "1695835800000",            "26210.5",            "26210.5",            "26194.5",            "26194.5",            "26.26",            "687897.63"        ],        [            "1695836100000",            "26194.5",            "26194.5",            "26171",            "26171",            "17.98",            "470618.72"        ]    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter  | Type   | Description                                                                                                       |
| :--------- | :----- | :---------------------------------------------------------------------------------------------------------------- |
| index\[0\] | String | Milliseconds format of timestamp Unix, e.g. 1597026383085                                                         |
| index\[1\] | String | Entry price                                                                                                       |
| index\[2\] | String | Highest price                                                                                                     |
| index\[3\] | String | Lowest price                                                                                                      |
| index\[4\] | String | Exit price. The latest exit price may be updated in the future. Subscribe to WebSocket to track the latest price. |
| index\[5\] | String | Trading volume of the base coin                                                                                   |
| index\[6\] | String | Trading volume of quote currency                                                                                  |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Candle-Data
