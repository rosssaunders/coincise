# POST / Redeem

Source:
[https://www.okx.com/docs-v5/en/#financial-product-sol-staking-post-redeem](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-post-redeem)

### POST / Redeem

Only the assets in the funding account can be used. If your OKSOL is in your
trading account, you can make funding transfer first.

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/sol/redeem`

#### Request Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| amt       | String | Yes      | Redeeming amount |

#### Response Parameters

code = `0` means your request has been successfully handled.
