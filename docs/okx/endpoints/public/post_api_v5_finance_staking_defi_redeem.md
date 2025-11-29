# POST /api/v5/finance/staking-defi/redeem

Source:
[https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-redeem](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-redeem)

### POST / Redeem

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/redeem`

#### Request Parameters

| Parameter             | Type    | Required | Description                     |
| --------------------- | ------- | -------- | ------------------------------- |
| ordId                 | String  | Yes      | Order ID                        |
| protocolType          | String  | Yes      | Protocol type                   |
| `defi`: on-chain earn |
| allowEarlyRedeem      | Boolean | No       | Whether allows early redemption |
| Default is `false`    |

#### Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| ordId     | String | Order ID    |
| tag       | String | Order tag   |
