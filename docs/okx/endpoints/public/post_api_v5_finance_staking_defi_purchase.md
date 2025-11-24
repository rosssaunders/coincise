# POST /api/v5/finance/staking-defi/purchase

Source:
[https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-purchase](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-purchase)

### POST / Purchase

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/purchase`

#### Request Parameters

| Parameter                                                                                          | Type             | Required    | Description                     |
| -------------------------------------------------------------------------------------------------- | ---------------- | ----------- | ------------------------------- |
| productId                                                                                          | String           | Yes         | Product ID                      |
| investData                                                                                         | Array of objects | Yes         | Investment data                 |
| \> ccy                                                                                             | String           | Yes         | Investment currency, e.g. `BTC` |
| \> amt                                                                                             | String           | Yes         | Investment amount               |
| term                                                                                               | String           | Conditional | Investment term                 |
| Investment term must be specified for fixed-term product                                           |
| tag                                                                                                | String           | No          | Order tag                       |
| A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters. |

#### Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| ordId     | String | Order ID    |
| tag       | String | Order tag   |
