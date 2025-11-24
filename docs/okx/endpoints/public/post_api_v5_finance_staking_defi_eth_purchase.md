# POST /api/v5/finance/staking-defi/eth/purchase

Source:
[https://www.okx.com/docs-v5/en/#financial-product-eth-staking-post-purchase](https://www.okx.com/docs-v5/en/#financial-product-eth-staking-post-purchase)

### POST / Purchase

Staking ETH for BETH  
Only the assets in the funding account can be used.

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/eth/purchase`

#### Request Parameters

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| amt       | String | Yes      | Investment amount |

#### Response Parameters

code = `0` means your request has been successfully handled.
