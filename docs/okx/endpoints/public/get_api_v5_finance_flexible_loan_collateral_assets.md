# GET /api/v5/finance/flexible-loan/collateral-assets

Source:
[https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-collateral-assets](https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-collateral-assets)

### GET / Collateral assets

Get collateral assets in funding account.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/flexible-loan/collateral-assets`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                 |
| -------------- | --------- | ------------ | ------------------------------- |
| ccy            | String    | No           | Collateral currency, e.g. `BTC` |

#### Response Parameters

| **Parameter**  | **Type**         | **Description**         |
| -------------- | ---------------- | ----------------------- |
| assets         | Array of objects | Collateral assets data  |
| \> ccy         | String           | Currency, e.g. `BTC`    |
| \> amt         | String           | Available amount        |
| \> notionalUsd | String           | Notional value in `USD` |
