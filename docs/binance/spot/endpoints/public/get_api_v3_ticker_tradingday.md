## Trading Day Ticker​

```
GET /api/v3/ticker/tradingDay
```

Price change statistics for a trading day.

**Weight:**

4 for each requested symbol.

The weight for this request will cap at 200 once the number of `symbols` in the
request is more than 50.

**Parameters:**

| | | symbol | STRING | YES | Either symbol or symbols must be providedExamples
of accepted format for the symbols
parameter:["BTCUSDT","BNBUSDT"]or%5B%22BTCUSDT%22,%22BNBUSDT%22%5DThe maximum
number of symbols allowed in a request is 100. symbols timeZone | STRING | NO |
Default: 0 (UTC) type | ENUM | NO | Supported values: FULL or MINI.If none
provided, the default is FULL symbolStatus | ENUM | NO | Filters for symbols
that have this tradingStatus.For a single symbol, a status mismatch returns
error -1220 SYMBOL_DOES_NOT_MATCH_STATUS.For multiple symbols, non-matching ones
are simply excluded from the response.Valid values: TRADING, HALT, BREAK |

**Notes:**

- Supported values for `timeZone`:
  - Hours and minutes (e.g. `-1:00`, `05:45`)
  - Only hours (e.g. `0`, `8`, `4`)

**Data Source:** Database

**Response - FULL:**

With `symbol`:

```
{
  "symbol":             "BTCUSDT",
  "priceChange":        "-83.13000000",         // Absolute price change
  "priceChangePercent": "-0.317",               // Relative price change in percent
  "weightedAvgPrice":   "26234.58803036",       // quoteVolume / volume
  "openPrice":          "26304.80000000",
  "highPrice":          "26397.46000000",
  "lowPrice":           "26088.34000000",
  "lastPrice":          "26221.67000000",
  "volume":             "18495.35066000",       // Volume in base asset
  "quoteVolume":        "485217905.04210480",   // Volume in quote asset
  "openTime":           1695686400000,
  "closeTime":          1695772799999,
  "firstId":            3220151555,             // Trade ID of the first trade in the interval
  "lastId":             3220849281,             // Trade ID of the last trade in the interval
  "count":              697727                  // Number of trades in the interval
}

```

With `symbols`:

```
[
  {
    "symbol": "BTCUSDT",
    "priceChange": "-83.13000000",
    "priceChangePercent": "-0.317",
    "weightedAvgPrice": "26234.58803036",
    "openPrice": "26304.80000000",
    "highPrice": "26397.46000000",
    "lowPrice": "26088.34000000",
    "lastPrice": "26221.67000000",
    "volume": "18495.35066000",
    "quoteVolume": "485217905.04210480",
    "openTime": 1695686400000,
    "closeTime": 1695772799999,
    "firstId": 3220151555,
    "lastId": 3220849281,
    "count": 697727
  },
  {
    "symbol": "BNBUSDT",
    "priceChange": "2.60000000",
    "priceChangePercent": "1.238",
    "weightedAvgPrice": "211.92276958",
    "openPrice": "210.00000000",
    "highPrice": "213.70000000",
    "lowPrice": "209.70000000",
    "lastPrice": "212.60000000",
    "volume": "280709.58900000",
    "quoteVolume": "59488753.54750000",
    "openTime": 1695686400000,
    "closeTime": 1695772799999,
    "firstId": 672397461,
    "lastId": 672496158,
    "count": 98698
  }
]
```

**Response - MINI:**

With `symbol`:

```
{
  "symbol":         "BTCUSDT",
  "openPrice":      "26304.80000000",
  "highPrice":      "26397.46000000",
  "lowPrice":       "26088.34000000",
  "lastPrice":      "26221.67000000",
  "volume":         "18495.35066000",       // Volume in base asset
  "quoteVolume":    "485217905.04210480",   // Volume in quote asset
  "openTime":       1695686400000,
  "closeTime":      1695772799999,
  "firstId":        3220151555,             // Trade ID of the first trade in the interval
  "lastId":         3220849281,             // Trade ID of the last trade in the interval
  "count":          697727                  // Number of trades in the interval
}
```

With `symbols`:

```
[
  {
    "symbol": "BTCUSDT",
    "openPrice": "26304.80000000",
    "highPrice": "26397.46000000",
    "lowPrice": "26088.34000000",
    "lastPrice": "26221.67000000",
    "volume": "18495.35066000",
    "quoteVolume": "485217905.04210480",
    "openTime": 1695686400000,
    "closeTime": 1695772799999,
    "firstId": 3220151555,
    "lastId": 3220849281,
    "count": 697727
  },
  {
    "symbol": "BNBUSDT",
    "openPrice": "210.00000000",
    "highPrice": "213.70000000",
    "lowPrice": "209.70000000",
    "lastPrice": "212.60000000",
    "volume": "280709.58900000",
    "quoteVolume": "59488753.54750000",
    "openTime": 1695686400000,
    "closeTime": 1695772799999,
    "firstId": 672397461,
    "lastId": 672496158,
    "count": 98698
  }
]
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints)
