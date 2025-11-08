# Order Book

### API Description

Check orderbook depth on specific symbol

### HTTP Request

GET `/eapi/v1/depth`

### Request Weight

| limit         | weight |
| ------------- | ------ |
| 5, 10, 20, 50 | 2      |
| 100           | 5      |
| 500           | 10     |
| 1000          | 20     |

### Request Parameters

| Name   | Type   | Mandatory | Description                                                        |
| ------ | ------ | --------- | ------------------------------------------------------------------ |
| symbol | STRING | YES       | Option trading pair, e.g BTC-200730-9000-C                         |
| limit  | INT    | NO        | Default:100 Max:1000.Optional value:\[10, 20, 50, 100, 500, 1000\] |

### Response Example

```json
{
  "T": 1589436922972,   // transaction time
  "u": 37461            // update id
  "bids": [             // Buy order
    [
      "1000",            // Price
      "0.9"              // Quantity
    ]
  ],
  "asks": [              // Sell order
    [
      "1100",            // Price
      "0.1"              // Quantity
    ]
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-data/Order-Book](https://developers.binance.com/docs/derivatives/option/market-data/Order-Book)
