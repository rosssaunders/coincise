# GET /api/v5/asset/balances

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-balance](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-balance)

### Get balance

Retrieve the funding account balances of all the assets and the amount that is
available or on hold.

Only asset information of a currency with a balance greater than 0 will be
returned.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/balances`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                         |
| -------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | Single currency or multiple currencies (no more than 20) separated with comma, e.g. `BTC` or `BTC,ETH`. |

#### Response Parameters

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| ccy       | String | Currency          |
| bal       | String | Balance           |
| frozenBal | String | Frozen balance    |
| availBal  | String | Available balance |
