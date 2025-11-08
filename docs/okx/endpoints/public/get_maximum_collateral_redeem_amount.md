# GET / Maximum collateral redeem amount

Source: [https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-maximum-collateral-redeem-amount](https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-maximum-collateral-redeem-amount)

### GET / Maximum collateral redeem amount

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/flexible-loan/max-collateral-redeem-amount`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description** |
| --- | --- | --- | --- |
| ccy | String | Yes | Collateral currency, e.g. `USDT` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ccy | String | Collateral currency, e.g. `USDT` |
| maxRedeemAmt | String | Maximum collateral redeem amount |
