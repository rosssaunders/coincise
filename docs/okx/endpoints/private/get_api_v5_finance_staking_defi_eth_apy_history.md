# GET /api/v5/finance/staking-defi/eth/apy-history

Source:
[https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-apy-history-public](https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-apy-history-public)

### GET / APY history (Public)

Public endpoints don't need authorization.

#### Rate Limit: 6 requests per second

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/finance/staking-defi/eth/apy-history`

#### Request Parameters

| Parameter             | Type   | Required | Description                                                             |
| --------------------- | ------ | -------- | ----------------------------------------------------------------------- |
| days                  | String | Yes      | Get the days of APY(Annual percentage yield) history record in the past |
| No more than 365 days |

#### Response Parameters

| Parameter | Type   | Description                                                            |
| --------- | ------ | ---------------------------------------------------------------------- |
| rate      | String | APY(Annual percentage yield), e.g. `0.01` represents `1%`              |
| ts        | String | Data time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
