# Index Price Ticker

### API Description

Get spot index price for option underlying.

### HTTP Request

GET `/eapi/v1/index`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                                               |
| ---------- | ------ | --------- | --------------------------------------------------------- |
| underlying | STRING | YES       | Spot pair（Option contract underlying asset, e.g BTCUSDT) |

### Response Example

```json
{
  "time": 1656647305000,
  "indexPrice": "9200" // Current spot index price
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Symbol-Price-Ticker](https://developers.binance.com/docs/derivatives/option/market-data/Symbol-Price-Ticker)
