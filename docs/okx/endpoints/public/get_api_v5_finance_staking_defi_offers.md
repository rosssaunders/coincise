# GET /api/v5/finance/staking-defi/offers

Source:
[https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-offers](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-offers)

### GET / Offers

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/offers`

#### Request Parameters

| Parameter             | Type   | Required | Description                     |
| --------------------- | ------ | -------- | ------------------------------- |
| productId             | String | No       | Product ID                      |
| protocolType          | String | No       | Protocol type                   |
| `defi`: on-chain earn |
| ccy                   | String | No       | Investment currency, e.g. `BTC` |

#### Response Parameters

| Parameter                                                                      | Type             | Description                                                  |
| ------------------------------------------------------------------------------ | ---------------- | ------------------------------------------------------------ |
| ccy                                                                            | String           | Currency type, e.g. `BTC`                                    |
| productId                                                                      | String           | Product ID                                                   |
| protocol                                                                       | String           | Protocol                                                     |
| protocolType                                                                   | String           | Protocol type                                                |
| `defi`: on-chain earn                                                          |
| term                                                                           | String           | Protocol term                                                |
| It will return the days of fixed term and will return `0` for flexible product |
| apy                                                                            | String           | Estimated annualization                                      |
| If the annualization is 7% , this field is 0.07                                |
| earlyRedeem                                                                    | Boolean          | Whether the protocol supports early redemption               |
| investData                                                                     | Array of objects | Current target currency information available for investment |
| \> ccy                                                                         | String           | Investment currency, e.g. `BTC`                              |
| \> bal                                                                         | String           | Available balance to invest                                  |
| \> minAmt                                                                      | String           | Minimum subscription amount                                  |
| \> maxAmt                                                                      | String           | Maximum available subscription amount                        |
| earningData                                                                    | Array of objects | Earning data                                                 |
| \> ccy                                                                         | String           | Earning currency, e.g. `BTC`                                 |
| \> earningType                                                                 | String           | Earning type                                                 |

`0`: Estimated earning  
`1`: Cumulative earning | | state | String | Product state  
`purchasable`: Purchasable  
`sold_out`: Sold out  
`Stop`: Suspension of subscription | | redeemPeriod | Array of strings |
Redemption Period, format in \[min time,max time\]  
`H`: Hour, `D`: Day  
e.g. \["1H","24H"\] represents redemption period is between 1 Hour and 24
Hours.  
\["14D","14D"\] represents redemption period is 14 days. | |
fastRedemptionDailyLimit | String | Fast redemption daily limit  
If fast redemption is not supported, it will return ''. |
