# GET /api/v5/finance/staking-defi/orders-active

Source:
[https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-active-orders](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-active-orders)

### GET / Active orders

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/orders-active`

#### Request Parameters

| Parameter             | Type   | Required | Description                     |
| --------------------- | ------ | -------- | ------------------------------- |
| productId             | String | No       | Product ID                      |
| protocolType          | String | No       | Protocol type                   |
| `defi`: on-chain earn |
| ccy                   | String | No       | Investment currency, e.g. `BTC` |
| state                 | String | No       | Order state                     |

`8`: Pending  
`13`: Cancelling  
`9`: Onchain  
`1`: Earning  
`2`: Redeeming |

#### Response Parameters

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| ccy       | String | Currency, e.g. `BTC` |
| ordId     | String | Order ID             |
| productId | String | Product ID           |
| state     | String | Order state          |

`8`: Pending  
`13`: Cancelling  
`9`: Onchain  
`1`: Earning  
`2`: Redeeming | | protocol | String | Protocol | | protocolType | String |
Protocol type  
`defi`: on-chain earn | | term | String | Protocol term  
It will return the days of fixed term and will return `0` for flexible product |
| apy | String | Estimated APY  
If the estimated APY is 7% , this field is 0.07  
Retain to 4 decimal places (truncated) | | investData | Array of objects |
Investment data | | \> ccy | String | Investment currency, e.g. `BTC` | | \> amt
| String | Invested amount | | earningData | Array of objects | Earning data | |
\> ccy | String | Earning currency, e.g. `BTC` | | \> earningType | String |
Earning type  
`0`: Estimated earning  
`1`: Cumulative earning | | \> earnings | String | Earning amount | |
fastRedemptionData | Array of objects | Fast redemption data | | \> ccy | String
| Currency, e.g. `BTC` | | \> redeemingAmt | String | Redeeming amount | |
purchasedTime | String | Order purchased time, Unix timestamp format in
milliseconds, e.g. `1597026383085` | | estSettlementTime | String | Estimated
redemption settlement time | | cancelRedemptionDeadline | String | Deadline for
cancellation of redemption application | | tag | String | Order tag |
