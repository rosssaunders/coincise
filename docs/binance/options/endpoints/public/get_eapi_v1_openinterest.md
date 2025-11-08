# Open Interest

### API Description

Get open interest for specific underlying asset on specific expiration date.

### HTTP Request

GET `/eapi/v1/openInterest`

### Request Weight

**0**

### Request Parameters

| Name            | Type   | Mandatory | Description                   |
| --------------- | ------ | --------- | ----------------------------- |
| underlyingAsset | STRING | YES       | underlying asset, e.g ETH/BTC |
| expiration      | STRING | YES       | expiration date, e.g 221225   |

### Response Example

```json
[
  {
    "symbol": "ETH-221119-1175-P",
    "sumOpenInterest": "4.01",
    "sumOpenInterestUsd": "4880.2985615624",
    "timestamp": "1668754020000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Open-Interest](https://developers.binance.com/docs/derivatives/option/market-data/Open-Interest)
