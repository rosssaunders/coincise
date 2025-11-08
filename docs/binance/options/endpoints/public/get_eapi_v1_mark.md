# Option Mark Price

### API Description

Option mark price and greek info.

### HTTP Request

GET `/eapi/v1/mark`

### Request Weight

**5**

### Request Parameters

| Name   | Type   | Mandatory | Description                                |
| ------ | ------ | --------- | ------------------------------------------ |
| symbol | STRING | NO        | Option trading pair, e.g BTC-200730-9000-C |

### Response Example

```json
[
  {
    "symbol": "BTC-200730-9000-C",
    "markPrice": "1343.2883",       // Mark price
    "bidIV": "1.40000077",          // Implied volatility Buy
    "askIV": "1.50000153",          // Implied volatility Sell
    "markIV": "1.45000000"          // Implied volatility mark
    "delta": "0.55937056",          // delta
    "theta": "3739.82509871",       // theta
    "gamma": "0.00010969",          // gamma
    "vega": "978.58874732",         // vega
    "highPriceLimit": "1618.241",   // Current highest buy price
    "lowPriceLimit": "1068.3356"    // Current lowest sell price
    "riskFreeInterest": "0.1"       // risk free rate
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Option-Mark-Price](https://developers.binance.com/docs/derivatives/option/market-data/Option-Mark-Price)
