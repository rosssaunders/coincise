# GET index tickers

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-index-tickers](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-index-tickers)

### Get index tickers

Retrieve index tickers.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/index-tickers`

#### Request Parameters

| Parameter                                                                        | Type   | Required    | Description           |
| -------------------------------------------------------------------------------- | ------ | ----------- | --------------------- |
| quoteCcy                                                                         | String | Conditional | Quote currency        |
| Currently there is only an index with `USD/USDT/BTC/USDC` as the quote currency. |
| instId                                                                           | String | Conditional | Index, e.g. `BTC-USD` |

Either `quoteCcy` or `instId` is required.  
Same as `uly`. |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                      |
| ------------- | -------- | ------------------------------------------------------------------------------------ |
| instId        | String   | Index                                                                                |
| idxPx         | String   | Latest index price                                                                   |
| high24h       | String   | Highest price in the past 24 hours                                                   |
| low24h        | String   | Lowest price in the past 24 hours                                                    |
| open24h       | String   | Open price in the past 24 hours                                                      |
| sodUtc0       | String   | Open price in the UTC 0                                                              |
| sodUtc8       | String   | Open price in the UTC 8                                                              |
| ts            | String   | Index price update time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
