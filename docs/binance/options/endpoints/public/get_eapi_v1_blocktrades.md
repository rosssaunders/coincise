# Recent Block Trades List

### API Description

Get recent block trades

### HTTP Request

GET `/eapi/v1/blockTrades`

### Request Weight

**5**

### Request Parameters

| Name   | Type   | Mandatory |  Description                                 |
| ------ | ------ | --------- | -------------------------------------------- |
| symbol | STRING | NO        | Option trading pair, e.g. BTC-200730-9000-C  |
| limit  | INT    | NO        | Number of records; Default: 100 and Max: 500 |

### Response Example

```json
[
  {
    "id": 1125899906901081078,
    "tradeId": 389,
    "symbol": "ETH-250725-1200-P",
    "price": "342.40",
    "qty": "-2167.20",
    "quoteQty": "-4.90",
    "side": -1,
    "time": 1733950676483
  },
  {
    "id": 1125899906901080972,
    "tradeId": 161,
    "symbol": "XRP-250904-0.086-P",
    "price": "3.0",
    "qty": "-6.0",
    "quoteQty": "-2.02",
    "side": -1,
    "time": 1733950488444
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Recent-Block-Trade-List](https://developers.binance.com/docs/derivatives/option/market-data/Recent-Block-Trade-List)
