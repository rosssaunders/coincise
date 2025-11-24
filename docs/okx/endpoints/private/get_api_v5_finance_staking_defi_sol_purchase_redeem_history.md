# GET /api/v5/finance/staking-defi/sol/purchase-redeem-history

Source:
[https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-purchase-amp-redeem-history](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-purchase-amp-redeem-history)

### GET / Purchase&Redeem history

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/sol/purchase-redeem-history`

#### Request Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| type      | String | No       | Type        |

`purchase`  
`redeem` | | status | String | No | Status  
`pending`  
`success`  
`failed`  
`cancelled` | | after | String | No | Pagination of data to return records
earlier than the `requestTime`. The value passed is the corresponding
`timestamp` | | before | String | No | Pagination of data to return records
newer than the `requestTime`. The value passed is the corresponding `timestamp`
| | limit | String | No | Number of results per request. The default is `100`.
The maximum is `100`. |

#### Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| type      | String | Type        |

`purchase`  
`redeem` | | amt | String | Purchase/Redeem amount | | redeemingAmt | String |
Redeeming amount | | status | String | Status  
`pending`  
`success`  
`failed`  
`cancelled` | | ordId | String | Order ID | | requestTime | String | Request
time of make purchase/redeem, Unix timestamp format in milliseconds, e.g.
`1597026383085` | | completedTime | String | Completed time of redeem
settlement, Unix timestamp format in milliseconds, e.g. `1597026383085` | |
estCompletedTime | String | Estimated completed time of redeem settlement, Unix
timestamp format in milliseconds, e.g. `1597026383085` |
