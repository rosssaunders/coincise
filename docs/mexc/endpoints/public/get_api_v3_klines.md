# Kline/Candlestick Data

> Response

```
[
  [
    1640804880000, 
    "47482.36", 
    "47482.36", 
    "47416.57", 
    "47436.1", 
    "3.550717", 
    1640804940000, 
    "168387.3"
  ]
]
```

-   **GET** `/api/v3/klines`

**Weight(IP):** 1

Kline/candlestick bars for a symbol. Klines are uniquely identified by their open time.

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | YES |  |
| interval | ENUM | YES | ENUM: [Kline Interval](#kline_interval) |
| startTime | long | NO |  |
| endTime | long | NO |  |
| limit | integer | NO | Default 500; max 1000. |

Response:

| Index | Description |
| --- | --- |
| 0 | Open time |
| 1 | Open |
| 2 | High |
| 3 | Low |
| 4 | Close |
| 5 | Volume |
| 6 | Close time |
| 7 | Quote asset volume |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#kline-candlestick-data
