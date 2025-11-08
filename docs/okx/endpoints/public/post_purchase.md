# POST / Purchase

Source: [https://www.okx.com/docs-v5/en/#financial-product-sol-staking-post-purchase](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-post-purchase)

### POST / Purchase

Staking SOL for OKSOL  
Only the assets in the funding account can be used.  

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/sol/purchase`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| amt | String | Yes | Investment amount |

#### Response Parameters

code = `0` means your request has been successfully handled.
