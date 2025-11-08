# 24hr Ticker Price Change Statistics

### API Description

24 hour rolling window price change statistics.

### HTTP Request

GET `/eapi/v1/ticker`

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
    "priceChange": "-16.2038", //24-hour price change
    "priceChangePercent": "-0.0162", //24-hour percent price change
    "lastPrice": "1000", //Last trade price
    "lastQty": "1000", //Last trade amount
    "open": "1016.2038", //24-hour open price
    "high": "1016.2038", //24-hour high
    "low": "0", //24-hour low
    "volume": "5", //Trading volume(contracts)
    "amount": "1", //Trade amount(in quote asset)
    "bidPrice": "999.34", //The best buy price
    "askPrice": "1000.23", //The best sell price
    "openTime": 1592317127349, //Time the first trade occurred within the last 24 hours
    "closeTime": 1592380593516, //Time the last trade occurred within the last 24 hours
    "firstTradeId": 1, //First trade ID
    "tradeCount": 5, //Number of trades
    "strikePrice": "9000", //Strike price
    "exercisePrice": "3000.3356" //return estimated settlement price one hour before exercise, return index price at other times
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/24hr-Ticker-Price-Change-Statistics](https://developers.binance.com/docs/derivatives/option/market-data/24hr-Ticker-Price-Change-Statistics)
