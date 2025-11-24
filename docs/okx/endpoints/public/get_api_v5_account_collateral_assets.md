# GET /api/v5/account/collateral-assets

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-collateral-assets](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-collateral-assets)

### Get collateral assets

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/collateral-assets`

#### Request Parameters

| **Parameters**    | **Types** | **Required** | **Description**                                                                                         |
| ----------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------- |
| ccy               | String    | No           | Single currency or multiple currencies (no more than 20) separated with comma, e.g. "BTC" or "BTC,ETH". |
| collateralEnabled | Boolean   | No           | Whether or not to be a collateral asset                                                                 |

#### Response Parameters

| **Parameter**     | **Type** | **Description**                         |
| ----------------- | -------- | --------------------------------------- |
| ccy               | String   | Currency, e.g. `BTC`                    |
| collateralEnabled | Boolean  | Whether or not to be a collateral asset |
