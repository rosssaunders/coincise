## Symbol price ticker​

```
GET /api/v3/ticker/price
```

Latest price for a symbol or symbols.

**Weight:**

| Parameter | Symbols Provided | Weight |
| --- | --- | --- |
| symbol | 1 | 2 |
| symbol parameter is omitted | 4 |
| symbols | Any | 4 |

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | NO | Parameter symbol and symbols cannot be used in combination.  
If neither parameter is sent, prices for all symbols will be returned in an array.  
  
Examples of accepted format for the symbols parameter: \["BTCUSDT","BNBUSDT"\]  
or  
%5B%22BTCUSDT%22,%22BNBUSDT%22%5D |
| symbols | STRING | NO |
| symbolStatus | ENUM | NO | Filters for symbols that have this `tradingStatus`.  
For a single symbol, a status mismatch returns error `-1220 SYMBOL_DOES_NOT_MATCH_STATUS`.  
For multiple or all symbols, non-matching ones are simply excluded from the response.  
Valid values: `TRADING`, `HALT`, `BREAK` |

**Data Source:** Memory

**Response:**

```
{  "symbol": "LTCBTC",  "price": "4.00000200"}
```

OR

```
[  {    "symbol": "LTCBTC",    "price": "4.00000200"  },  {    "symbol": "ETHBTC",    "price": "0.07946600"  }]
```

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints)
