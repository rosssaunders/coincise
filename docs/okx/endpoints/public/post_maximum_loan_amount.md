# POST / Maximum loan amount

Source: [https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-post-maximum-loan-amount](https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-post-maximum-loan-amount)

### POST / Maximum loan amount

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`POST /api/v5/finance/flexible-loan/max-loan`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description** |
| --- | --- | --- | --- |
| borrowCcy | String | Yes | Currency to borrow, e.g. `USDT` |
| supCollateral | Array of objects | No | Supplementary collateral assets |
| \> ccy | String | Yes | Currency, e.g. `BTC` |
| \> amt | String | Yes | Amount |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| borrowCcy | String | Currency to borrow, e.g. `USDT` |
| maxLoan | String | Maximum available loan |
| notionalUsd | String | Maximum available loan notional value, unit in `USD` |
| remainingQuota | String | Remaining quota, unit in `borrowCcy` |
