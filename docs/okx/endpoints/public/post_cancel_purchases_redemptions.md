# POST / Cancel purchases/redemptions

Source:
[https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-cancel-purchases-redemptions](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-cancel-purchases-redemptions)

### POST / Cancel purchases/redemptions

After cancelling, returning funds will go to the funding account.

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/cancel`

#### Request Parameters

| Parameter             | Type   | Required | Description   |
| --------------------- | ------ | -------- | ------------- |
| ordId                 | String | Yes      | Order ID      |
| protocolType          | String | Yes      | Protocol type |
| `defi`: on-chain earn |

#### Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| ordId     | String | Order ID    |
| tag       | String | Order tag   |
