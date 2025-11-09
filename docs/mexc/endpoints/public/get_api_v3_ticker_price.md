# Symbol Price Ticker

> Response

```
{
    "symbol": "BTCUSDT",
    "price": "184.34"
}
or
[
  {
    "symbol": "BTCUSDT",
    "price": "6.65"
  },
  {
    "symbol": "ETHUSDT",
    "price": "5.65"
  }
]
```

- **GET** `/api/v3/ticker/price`

**Weight(IP):**

| Parameter | Symbols Provided | Weight |
| --------- | ---------------- | ------ |
| symbol    | 1                | 1      |
| symbols   | all              | 2      |

Parameters:

| Name   | Type   | Mandatory | Description                                                          |
| ------ | ------ | --------- | -------------------------------------------------------------------- |
| symbol | string | NO        | If the symbol is not sent, all symbols will be returned in an array. |

Response:

| Name   | Description |
| ------ | ----------- |
| symbol |             |
| price  | Last price  |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#symbol-price-ticker
