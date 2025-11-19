## Rolling window price change statistics​

```
GET /api/v3/ticker
```

**Note:** This endpoint is different from the `GET /api/v3/ticker/24hr` endpoint.

The window used to compute statistics will be no more than 59999ms from the requested `windowSize`.

`openTime` for `/api/v3/ticker` always starts on a minute, while the `closeTime` is the current time of the request. As such, the effective window will be up to 59999ms wider than `windowSize`.

E.g. If the `closeTime` is 1641287867099 (January 04, 2022 09:17:47:099 UTC) , and the `windowSize` is `1d`. the `openTime` will be: 1641201420000 (January 3, 2022, 09:17:00)

**Weight:**

4 for each requested symbol regardless of windowSize.  
  
The weight for this request will cap at 200 once the number of `symbols` in the request is more than 50.

**Parameters:**

|  |
| 
symbol | STRING | YES | Either symbol or symbols must be providedExamples of accepted format for the symbols parameter:["BTCUSDT","BNBUSDT"]or%5B%22BTCUSDT%22,%22BNBUSDT%22%5DThe maximum number of symbols allowed in a request is 100.
symbols
windowSize | ENUM | NO | Defaults to 1d if no parameter providedSupported windowSize values:1m,2m....59m for minutes1h, 2h....23h - for hours1d...7d - for daysUnits cannot be combined (e.g. 1d2h is not allowed)
type | ENUM | NO | Supported values: FULL or MINI.If none provided, the default is FULL
symbolStatus | ENUM | NO | Filters for symbols that have this tradingStatus.For a single symbol, a status mismatch returns error -1220 SYMBOL_DOES_NOT_MATCH_STATUS.For multiple symbols, non-matching ones are simply excluded from the response.Valid values: TRADING, HALT, BREAK |

**Data Source:** Database

**Response - FULL:**

When using `symbol`:

```
{
  "symbol":             "BNBBTC",
  "priceChange":        "-8.00000000",  // Absolute price change
  "priceChangePercent": "-88.889",      // Relative price change in percent
  "weightedAvgPrice":   "2.60427807",   // QuoteVolume / Volume
  "openPrice":          "9.00000000",
  "highPrice":          "9.00000000",
  "lowPrice":           "1.00000000",
  "lastPrice":          "1.00000000",
  "volume":             "187.00000000",
  "quoteVolume":        "487.00000000", // Sum of (price * volume) for all trades
  "openTime":           1641859200000,  // Open time for ticker window
  "closeTime":          1642031999999,  // Close time for ticker window
  "firstId":            0,              // Trade IDs
  "lastId":             60,
  "count":              61              // Number of trades in the interval
}

```

or

When using `symbols`:

```
[
  {
    "symbol": "BTCUSDT",
    "priceChange": "-154.13000000",        // Absolute price change
    "priceChangePercent": "-0.740",        // Relative price change in percent
    "weightedAvgPrice": "20677.46305250",  // QuoteVolume / Volume
    "openPrice": "20825.27000000",
    "highPrice": "20972.46000000",
    "lowPrice": "20327.92000000",
    "lastPrice": "20671.14000000",
    "volume": "72.65112300",
    "quoteVolume": "1502240.91155513",     // Sum of (price * volume) for all trades
    "openTime": 1655432400000,             // Open time for ticker window
    "closeTime": 1655446835460,            // Close time for ticker window
    "firstId": 11147809,                   // Trade IDs
    "lastId": 11149775,
    "count": 1967                          // Number of trades in the interval
  },
  {
    "symbol": "BNBBTC",
    "priceChange": "0.00008530",
    "priceChangePercent": "0.823",
    "weightedAvgPrice": "0.01043129",
    "openPrice": "0.01036170",
    "highPrice": "0.01049850",
    "lowPrice": "0.01033870",
    "lastPrice": "0.01044700",
    "volume": "166.67000000",
    "quoteVolume": "1.73858301",
    "openTime": 1655432400000,
    "closeTime": 1655446835460,
    "firstId": 2351674,
    "lastId": 2352034,
    "count": 361
  }
]
```

**Response - MINI:**

When using `symbol`:

```
{
    "symbol": "LTCBTC",
    "openPrice": "0.10000000",
    "highPrice": "2.00000000",
    "lowPrice": "0.10000000",
    "lastPrice": "2.00000000",
    "volume": "39.00000000",
    "quoteVolume": "13.40000000",  // Sum of (price * volume) for all trades
    "openTime": 1656986580000,     // Open time for ticker window
    "closeTime": 1657001016795,    // Close time for ticker window
    "firstId": 0,                  // Trade IDs
    "lastId": 34,
    "count": 35                    // Number of trades in the interval
}
```

OR

When using `symbols`:

```
[
    {
        "symbol": "BNBBTC",
        "openPrice": "0.10000000",
        "highPrice": "2.00000000",
        "lowPrice": "0.10000000",
        "lastPrice": "2.00000000",
        "volume": "39.00000000",
        "quoteVolume": "13.40000000", // Sum of (price * volume) for all trades
        "openTime": 1656986880000,    // Open time for ticker window
        "closeTime": 1657001297799,   // Close time for ticker window
        "firstId": 0,                 // Trade IDs
        "lastId": 34,
        "count": 35                   // Number of trades in the interval
    },
    {
        "symbol": "LTCBTC",
        "openPrice": "0.07000000",
        "highPrice": "0.07000000",
        "lowPrice": "0.07000000",
        "lastPrice": "0.07000000",
        "volume": "33.00000000",
        "quoteVolume": "2.31000000",
        "openTime": 1656986880000,
        "closeTime": 1657001297799,
        "firstId": 0,
        "lastId": 32,
        "count": 33
    }
]
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints)
