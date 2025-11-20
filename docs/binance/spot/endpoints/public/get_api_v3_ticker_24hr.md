## 24hr ticker price change statistics​

```
GET /api/v3/ticker/24hr
```

24 hour rolling window price change statistics. **Careful** when accessing this
with no symbol.

**Weight:**

| Parameter                    | Symbols Provided | Weight |
| ---------------------------- | ---------------- | ------ |
| symbol                       | 1                | 2      |
| symbol parameter is omitted  | 80               |
| symbols                      | 1-20             | 2      |
| 21-100                       | 40               |
| 101 or more                  | 80               |
| symbols parameter is omitted | 80               |

**Parameters:**

| Name   | Type   | Mandatory | Description                                                 |
| ------ | ------ | --------- | ----------------------------------------------------------- |
| symbol | STRING | NO        | Parameter symbol and symbols cannot be used in combination. |

If neither parameter is sent, tickers for all symbols will be returned in an
array.

Examples of accepted format for the symbols parameter: \["BTCUSDT","BNBUSDT"\]  
or  
%5B%22BTCUSDT%22,%22BNBUSDT%22%5D | | symbols | STRING | NO | | type | ENUM | NO
| Supported values: FULL or MINI.  
If none provided, the default is FULL | | symbolStatus | ENUM | NO | Filters for
symbols that have this `tradingStatus`.  
For a single symbol, a status mismatch returns error
`-1220 SYMBOL_DOES_NOT_MATCH_STATUS`.  
For multiple or all symbols, non-matching ones are simply excluded from the
response.  
Valid values: `TRADING`, `HALT`, `BREAK` |

**Data Source:** Memory

**Response - FULL:**

```
{
  "symbol": "BNBBTC",
  "priceChange": "-94.99999800",
  "priceChangePercent": "-95.960",
  "weightedAvgPrice": "0.29628482",
  "prevClosePrice": "0.10002000",
  "lastPrice": "4.00000200",
  "lastQty": "200.00000000",
  "bidPrice": "4.00000000",
  "bidQty": "100.00000000",
  "askPrice": "4.00000200",
  "askQty": "100.00000000",
  "openPrice": "99.00000000",
  "highPrice": "100.00000000",
  "lowPrice": "0.10000000",
  "volume": "8913.30000000",
  "quoteVolume": "15.30000000",
  "openTime": 1499783499040,
  "closeTime": 1499869899040,
  "firstId": 28385,   // First tradeId
  "lastId": 28460,    // Last tradeId
  "count": 76         // Trade count
}
```

OR

```
[
  {
    "symbol": "BNBBTC",
    "priceChange": "-94.99999800",
    "priceChangePercent": "-95.960",
    "weightedAvgPrice": "0.29628482",
    "prevClosePrice": "0.10002000",
    "lastPrice": "4.00000200",
    "lastQty": "200.00000000",
    "bidPrice": "4.00000000",
    "bidQty": "100.00000000",
    "askPrice": "4.00000200",
    "askQty": "100.00000000",
    "openPrice": "99.00000000",
    "highPrice": "100.00000000",
    "lowPrice": "0.10000000",
    "volume": "8913.30000000",
    "quoteVolume": "15.30000000",
    "openTime": 1499783499040,
    "closeTime": 1499869899040,
    "firstId": 28385,   // First tradeId
    "lastId": 28460,    // Last tradeId
    "count": 76         // Trade count
  }
]
```

**Response - MINI:**

```
{
  "symbol":      "BNBBTC",          // Symbol Name
  "openPrice":   "99.00000000",     // Opening price of the Interval
  "highPrice":   "100.00000000",    // Highest price in the interval
  "lowPrice":    "0.10000000",      // Lowest  price in the interval
  "lastPrice":   "4.00000200",      // Closing price of the interval
  "volume":      "8913.30000000",   // Total trade volume (in base asset)
  "quoteVolume": "15.30000000",     // Total trade volume (in quote asset)
  "openTime":    1499783499040,     // Start of the ticker interval
  "closeTime":   1499869899040,     // End of the ticker interval
  "firstId":     28385,             // First tradeId considered
  "lastId":      28460,             // Last tradeId considered
  "count":       76                 // Total trade count
}
```

OR

```
[
  {
    "symbol": "BNBBTC",
    "openPrice": "99.00000000",
    "highPrice": "100.00000000",
    "lowPrice": "0.10000000",
    "lastPrice": "4.00000200",
    "volume": "8913.30000000",
    "quoteVolume": "15.30000000",
    "openTime": 1499783499040,
    "closeTime": 1499869899040,
    "firstId": 28385,
    "lastId": 28460,
    "count": 76
  },
  {
    "symbol": "LTCBTC",
    "openPrice": "0.07000000",
    "highPrice": "0.07000000",
    "lowPrice": "0.07000000",
    "lastPrice": "0.07000000",
    "volume": "11.00000000",
    "quoteVolume": "0.77000000",
    "openTime": 1656908192899,
    "closeTime": 1656994592899,
    "firstId": 0,
    "lastId": 10,
    "count": 11
  }
]
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints)
