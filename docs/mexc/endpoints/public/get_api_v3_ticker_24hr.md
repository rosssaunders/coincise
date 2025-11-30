# GET /api/v3/ticker/24hr

**Source:**
https://www.mexc.com/api-docs/spot-v3/market-data-endpoints#24hr-ticker-price-change-statistics

> Response

```json
{    "symbol": "BTCUSDT",    "priceChange": "184.34",    "priceChangePercent": "0.00400048",    "prevClosePrice": "46079.37",    "lastPrice": "46263.71",    "bidPrice": "46260.38",    "bidQty": "",    "askPrice": "46260.41",    "askQty": "",    "openPrice": "46079.37",    "highPrice": "47550.01",    "lowPrice": "45555.5",    "volume": "1732.461487",    "quoteVolume": null,    "openTime": 1641349500000,    "closeTime": 1641349582808,    "count": null}or[  {    "symbol": "BTCUSDT",    "priceChange": "184.34",    "priceChangePercent": "0.00400048",    "prevClosePrice": "46079.37",    "lastPrice": "46263.71",    "bidPrice": "46260.38",    "bidQty": "",    "askPrice": "46260.41",    "askQty": "",    "openPrice": "46079.37",    "highPrice": "47550.01",    "lowPrice": "45555.5",    "volume": "1732.461487",    "quoteVolume": null,    "openTime": 1641349500000,    "closeTime": 1641349582808,    "count": null  },  {    "symbol": "ETHUSDT",    "priceChange": "184.34",    "priceChangePercent": "0.00400048",    "prevClosePrice": "46079.37",    "lastPrice": "46263.71",    "bidPrice": "46260.38",    "bidQty": "",    "askPrice": "46260.41",    "askQty": "",    "openPrice": "46079.37",    "highPrice": "47550.01",    "lowPrice": "45555.5",    "volume": "1732.461487",    "quoteVolume": null,    "openTime": 1641349500000,    "closeTime": 1641349582808,    "count": null  }]
```

- **GET** `/api/v3/ticker/24hr`

**Weight(IP):**

| Parameter | Symbols Provided | Weight |
| --------- | ---------------- | ------ |
| symbol    | 1                | 1      |
| symbols   | all              | 40     |

Parameters:

| Name   | Type   | Mandatory | Description                                                                      |
| ------ | ------ | --------- | -------------------------------------------------------------------------------- |
| symbol | string | NO        | If the symbol is not sent, tickers for all symbols will be returned in an array. |

Response:

| Name               | Description          |
| ------------------ | -------------------- |
| symbol             | Symbol               |
| priceChange        | price Change         |
| priceChangePercent | price change percent |
| prevClosePrice     | Previous close price |
| lastPrice          | Last price           |
| lastQty            | Last quantity        |
| bidPrice           | Bid best price       |
| bidQty             | Bid best quantity    |
| askPrice           | Ask best price       |
| askQty             | Ask best quantity    |
| openPrice          | Open                 |
| highPrice          | High                 |
| lowPrice           | Low                  |
| volume             | Deal volume          |
| quoteVolume        | Quote asset volume   |
| openTime           | Start time           |
| closeTime          | Close time           |
| count              |                      |
