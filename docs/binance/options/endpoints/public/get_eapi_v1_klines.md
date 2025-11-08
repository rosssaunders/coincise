# Kline/Candlestick Data

### API Description

Kline/candlestick bars for an option symbol. Klines are uniquely identified by
their open time.

### HTTP Request

GET `/eapi/v1/klines`

### Request Weight

**1**

### Request Parameters

| Name      | Type   | Mandatory | Description                                |
| --------- | ------ | --------- | ------------------------------------------ |
| symbol    | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C |
| interval  | STRING | YES       | Time interval                              |
| startTime | LONG   | NO        | Start Time 1592317127349                   |
| endTime   | LONG   | NO        | End Time                                   |
| limit     | INT    | NO        | Number of records Default:500 Max:1500     |

> - If startTime and endTime are not sent, the most recent klines are returned.

### Response Example

```json
[
  {
      "open": "950",              // Opening price
      "high": "1100",             // Highest price
      "low": "900",               // Lowest price
      "close": "1000",            // Closing price (latest price if the current candle has not closed)
      "volume": "100"             // Trading volume(contracts)
      "amount": "2",              // Trading amount(in quote asset)
      "interval": "5m",           // Candle type
      "tradeCount": 10,           // Number of completed trades
      "takerVolume": "100",       // Taker trading volume(contracts)
      "takerAmount": "10000",     // Taker trade amount(in quote asset)
      "openTime": 1499040000000,  // Opening time
      "closeTime": 1499644799999, // Closing time
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Kline-Candlestick-Data](https://developers.binance.com/docs/derivatives/option/market-data/Kline-Candlestick-Data)
