# GET /api/v5/market/platform-24-volume

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-24h-total-volume](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-24h-total-volume)

### GET / 24H total volume

The 24-hour trading volume is calculated on a rolling basis.

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/platform-24-volume`

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                               |
| ------------- | -------- | ----------------------------------------------------------------------------- |
| volUsd        | String   | 24-hour total trading volume from the order book trading in "USD"             |
| volCny        | String   | 24-hour total trading volume from the order book trading in "CNY"             |
| ts            | String   | Data return time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
