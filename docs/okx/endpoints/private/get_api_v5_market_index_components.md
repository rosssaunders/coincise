# GET /api/v5/market/index-components

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-index-components](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-index-components)

### Get index components

Get the index component information data on the market

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/index-components`

#### Request Parameters

| Parameter      | Type   | Required | Description           |
| -------------- | ------ | -------- | --------------------- |
| index          | String | Yes      | index, e.g `BTC-USDT` |
| Same as `uly`. |

#### Response Parameters

| **Parameter** | **Type**         | **Description**                                                                   |
| ------------- | ---------------- | --------------------------------------------------------------------------------- |
| index         | String           | Index                                                                             |
| last          | String           | Latest Index Price                                                                |
| ts            | String           | Data generation time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| components    | Array of objects | Components                                                                        |
| \> exch       | String           | Name of Exchange                                                                  |
| \> symbol     | String           | Name of Exchange Trading Pairs                                                    |
| \> symPx      | String           | Price of Exchange Trading Pairs                                                   |
| \> wgt        | String           | Weights                                                                           |
| \> cnvPx      | String           | Price converted to index                                                          |
