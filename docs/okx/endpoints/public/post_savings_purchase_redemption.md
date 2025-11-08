# POST / Savings purchase/redemption

Source: [https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-post-savings-purchase-redemption](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-post-savings-purchase-redemption)

### POST / Savings purchase/redemption

Only the assets in the funding account can be used for saving.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/savings/purchase-redempt`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| ccy | String | Yes | Currency, e.g. `BTC` |
| amt | String | Yes | Purchase/redemption amount |
| side | String | Yes | Action type.  
`purchase`: purchase saving shares  
`redempt`: redeem saving shares |
| rate | String | Conditional | Annual purchase rate, e.g. `0.1` represents `10%`  
Only applicable to purchase saving shares  
The interest rate of the new subscription will cover the interest rate of the last subscription  
The rate value range is between 1% and 365% |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| ccy | String | Currency |
| amt | String | Purchase/Redemption amount |
| side | String | Action type |
| rate | String | Annual purchase rate, e.g. `0.1` represents `10%` |
