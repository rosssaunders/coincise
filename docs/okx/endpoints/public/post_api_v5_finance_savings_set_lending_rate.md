# POST /api/v5/finance/savings/set-lending-rate

Source:
[https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-post-set-lending-rate](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-post-set-lending-rate)

### POST / Set lending rate

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/savings/set-lending-rate`

#### Request Parameters

| Parameter                                   | Type   | Required | Description          |
| ------------------------------------------- | ------ | -------- | -------------------- |
| ccy                                         | String | Yes      | Currency, e.g. `BTC` |
| rate                                        | String | Yes      | Annual lending rate  |
| The rate value range is between 1% and 365% |

#### Response Parameters

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| ccy       | String | Currency, e.g. `BTC` |
| rate      | String | Annual lending rate  |
