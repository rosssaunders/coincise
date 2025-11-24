# GET /api/v3/ticker/price

**Source:** https://www.mexc.com/api-docs/spot-v3/market-data-endpoints#symbol-price-ticker

> Response

```json
{    "symbol": "BTCUSDT",    "price": "184.34"}or[  {    "symbol": "BTCUSDT",    "price": "6.65"  },  {    "symbol": "ETHUSDT",    "price": "5.65"  }]
```

-   **GET** `/api/v3/ticker/price`

**Weight(IP):**

| Parameter | Symbols Provided | Weight |
| --- | --- | --- |
| symbol | 1 | 1 |
| symbols | all | 2 |

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | NO | If the symbol is not sent, all symbols will be returned in an array. |

Response:

| Name | Description |
| --- | --- |
| symbol |  |
| price | Last price |
