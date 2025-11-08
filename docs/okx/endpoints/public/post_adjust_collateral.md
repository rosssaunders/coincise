# POST / Adjust collateral

Source: [https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-post-adjust-collateral](https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-post-adjust-collateral)

### POST / Adjust collateral

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/flexible-loan/adjust-collateral`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description** |
| --- | --- | --- | --- |
| type | String | Yes | Operation type  
`add`: Add collateral  
`reduce`: Reduce collateral |
| collateralCcy | String | Yes | Collateral currency, e.g. `BTC` |
| collateralAmt | String | Yes | Collateral amount |

#### Response Parameters

code = `0` means your request has been accepted (It doesn't mean the request has been successfully handled.)
