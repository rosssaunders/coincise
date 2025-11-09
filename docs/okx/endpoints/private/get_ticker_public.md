# GET ticker (Public)

Source:
[https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-ticker-public](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-ticker-public)

### Get ticker (Public)

Retrieve the latest price snapshot, best bid/ask price and quantity.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/sprd-ticker`

#### Request Parameters

| Parameter | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| sprdId    | String | Yes      | spread ID, e.g. BTC-USDT_BTC-USDT-SWAP |

#### Response Parameters

| Parameter                                                                                         | Type   | Description                                                                             |
| ------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------- |
| sprdId                                                                                            | String | spread ID                                                                               |
| last                                                                                              | String | Last traded price                                                                       |
| lastSz                                                                                            | String | Last traded size                                                                        |
| askPx                                                                                             | String | Best ask price                                                                          |
| askSz                                                                                             | String | Best ask size                                                                           |
| bidPx                                                                                             | String | Best bid price                                                                          |
| bidSz                                                                                             | String | Best bid size                                                                           |
| open24h                                                                                           | String | Open price in the past 24 hours                                                         |
| high24h                                                                                           | String | Highest price in the past 24 hours                                                      |
| low24h                                                                                            | String | Lowest price in the past 24 hours                                                       |
| vol24h                                                                                            | String | 24h trading volume                                                                      |
| The unit is USD for inverse spreads, and the corresponding baseCcy for linear and hybrid spreads. |
| ts                                                                                                | String | Ticker data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085. |
