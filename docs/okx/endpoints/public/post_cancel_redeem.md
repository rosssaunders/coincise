# POST / Cancel redeem

Source:
[https://www.okx.com/docs-v5/en/#financial-product-sol-staking-post-cancel-redeem](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-post-cancel-redeem)

### POST / Cancel redeem

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/sol/cancel-redeem`

#### Request Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| ordId     | String | Yes      | Order ID    |

#### Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| ordId     | String | Order ID    |
