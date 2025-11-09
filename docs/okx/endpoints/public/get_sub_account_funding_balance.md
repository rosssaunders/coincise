# GET sub-account funding balance

Source:
[https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-funding-balance](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-funding-balance)

### Get sub-account funding balance

Query detailed balance info of Funding Account of a sub-account via the master
account (applies to master accounts only)

#### Rate limit：6 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/asset/subaccount/balances`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                             |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------- |
| subAcct   | String | Yes      | Sub-account name                                                                                        |
| ccy       | String | No       | Single currency or multiple currencies (no more than 20) separated with comma, e.g. `BTC` or `BTC,ETH`. |

> Returned result

#### Response parameters

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| ccy       | String | Currency          |
| bal       | String | Balance           |
| frozenBal | String | Frozen balance    |
| availBal  | String | Available balance |
