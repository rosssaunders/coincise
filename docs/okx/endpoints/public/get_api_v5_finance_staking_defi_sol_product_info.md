# GET /api/v5/finance/staking-defi/sol/product-info

Source:
[https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-product-info](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-product-info)

### GET / Product info

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/sol/product-info`

#### Response Parameters

| Parameter                                                | Type   | Description                                    |
| -------------------------------------------------------- | ------ | ---------------------------------------------- |
| fastRedemptionDailyLimit                                 | String | Fast redemption daily limit                    |
| The master account and sub-accounts share the same limit |
| fastRedemptionAvail                                      | String | Currently fast redemption max available amount |
