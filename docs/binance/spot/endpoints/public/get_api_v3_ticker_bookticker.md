## Symbol order book ticker​

```
GET /api/v3/ticker/bookTicker
```

Best price/qty on the order book for a symbol or symbols.

**Weight:**

| Parameter                   | Symbols Provided | Weight |
| --------------------------- | ---------------- | ------ |
| symbol                      | 1                | 2      |
| symbol parameter is omitted | 4                |
| symbols                     | Any              | 4      |

**Parameters:**

| Name   | Type   | Mandatory | Description                                                 |
| ------ | ------ | --------- | ----------------------------------------------------------- |
| symbol | STRING | NO        | Parameter symbol and symbols cannot be used in combination. |

If neither parameter is sent, bookTickers for all symbols will be returned in an
array.

Examples of accepted format for the symbols parameter: \["BTCUSDT","BNBUSDT"\]  
or  
%5B%22BTCUSDT%22,%22BNBUSDT%22%5D | | symbols | STRING | NO | | symbolStatus |
ENUM | NO | Filters for symbols that have this `tradingStatus`.  
For a single symbol, a status mismatch returns error
`-1220 SYMBOL_DOES_NOT_MATCH_STATUS`.  
For multiple or all symbols, non-matching ones are simply excluded from the
response.  
Valid values: `TRADING`, `HALT`, `BREAK` |

**Data Source:** Memory

**Response:**

```
{
  "symbol": "LTCBTC",
  "bidPrice": "4.00000000",
  "bidQty": "431.00000000",
  "askPrice": "4.00000200",
  "askQty": "9.00000000"
}
```

OR

```
[
  {
    "symbol": "LTCBTC",
    "bidPrice": "4.00000000",
    "bidQty": "431.00000000",
    "askPrice": "4.00000200",
    "askQty": "9.00000000"
  },
  {
    "symbol": "ETHBTC",
    "bidPrice": "0.07946700",
    "bidQty": "9.00000000",
    "askPrice": "100000.00000000",
    "askQty": "1000.00000000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints)
