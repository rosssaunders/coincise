# Order Book

### API Description

Query symbol orderbook

### HTTP Request

GET `/fapi/v1/depth`

### Request Weight

Adjusted based on the limit:

| Limit         | Weight |
| ------------- | ------ |
| 5, 10, 20, 50 | 2      |
| 100           | 5      |
| 500           | 10     |
| 1000          | 20     |

### Request Parameters

| Name   | Type   | Mandatory | Description                                                 |
| ------ | ------ | --------- | ----------------------------------------------------------- |
| symbol | STRING | YES       |                                                             |
| limit  | INT    | NO        | Default 500; Valid limits:\[5, 10, 20, 50, 100, 500, 1000\] |

### Response Example

```json
{
  "lastUpdateId": 1027024,
  "E": 1589436922972, // Message output time
  "T": 1589436922959, // Transaction time
  "bids": [
    [
      "4.00000000", // PRICE
      "431.00000000" // QTY
    ]
  ],
  "asks": [["4.00000200", "12.00000000"]]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Order-Book](https://developers.binance.com/docs/derivatives/usds-margined-futures/market-data/rest-api/Order-Book)
