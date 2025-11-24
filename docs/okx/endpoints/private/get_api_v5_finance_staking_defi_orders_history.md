# GET /api/v5/finance/staking-defi/orders-history

Source:
[https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-order-history](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-order-history)

### GET / Order history

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/orders-history`

#### Request Parameters

| Parameter             | Type   | Required | Description                                                                                                       |
| --------------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| productId             | String | No       | Product ID                                                                                                        |
| protocolType          | String | No       | Protocol type                                                                                                     |
| `defi`: on-chain earn |
| ccy                   | String | No       | Investment currency, e.g. `BTC`                                                                                   |
| after                 | String | No       | Pagination of data to return records earlier than the requested ID. The value passed is the corresponding `ordId` |
| before                | String | No       | Pagination of data to return records newer than the requested ID. The value passed is the corresponding `ordId`   |
| limit                 | String | No       | Number of results per request. The default is `100`. The maximum is `100`.                                        |

#### Response Parameters

| Parameter                                                                      | Type   | Description          |
| ------------------------------------------------------------------------------ | ------ | -------------------- |
| ccy                                                                            | String | Currency, e.g. `BTC` |
| ordId                                                                          | String | Order ID             |
| productId                                                                      | String | Product ID           |
| state                                                                          | String | Order state          |
| `3`: Completed (including canceled and redeemed)                               |
| protocol                                                                       | String | Protocol             |
| protocolType                                                                   | String | Protocol type        |
| `defi`: on-chain earn                                                          |
| term                                                                           | String | Protocol term        |
| It will return the days of fixed term and will return `0` for flexible product |
| apy                                                                            | String | Estimated APY        |

If the estimated APY is 7% , this field is `0.07`  
Retain to 4 decimal places (truncated) | | investData | Array of objects |
Investment data | | \> ccy | String | Investment currency, e.g. `BTC` | | \> amt
| String | Invested amount | | earningData | Array of objects | Earning data | |
\> ccy | String | Earning currency, e.g. `BTC` | | \> earningType | String |
Earning type  
`0`: Estimated earning  
`1`: Cumulative earning | | \> realizedEarnings | String | Cumulative earning of
redeemed orders  
This field is just valid when the order is in redemption state | | purchasedTime
| String | Order purchased time, Unix timestamp format in milliseconds, e.g.
`1597026383085` | | redeemedTime | String | Order redeemed time, Unix timestamp
format in milliseconds, e.g. `1597026383085` | | tag | String | Order tag |
