# GET interest accrued data

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-interest-accrued-data](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-interest-accrued-data)

### Get interest accrued data

Get the interest accrued data for the past year

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/interest-accrued`

#### Request Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| type      | String | No       | Loan type   |

`2`: Market loans  
Default is `2` | | ccy | String | No | Loan currency, e.g. `BTC`  
Only applicable to `Market loans`  
Only applicable to`MARGIN` | | instId | String | No | Instrument ID, e.g.
`BTC-USDT`  
Only applicable to `Market loans` | | mgnMode | String | No | Margin mode  
`cross`  
`isolated`  
Only applicable to `Market loans` | | after | String | No | Pagination of data
to return records earlier than the requested timestamp, Unix timestamp format in
milliseconds, e.g. `1597026383085` | | before | String | No | Pagination of data
to return records newer than the requested, Unix timestamp format in
milliseconds, e.g. `1597026383085` | | limit | String | No | Number of results
per request. The maximum is `100`. The default is `100`. |

#### Response Parameters

| Parameter                         | Type   | Description                    |
| --------------------------------- | ------ | ------------------------------ |
| type                              | String | Loan type                      |
| `2`: Market loans                 |
| ccy                               | String | Loan currency, e.g. `BTC`      |
| instId                            | String | Instrument ID, e.g. `BTC-USDT` |
| Only applicable to `Market loans` |
| mgnMode                           | String | Margin mode                    |

`cross`  
`isolated` | | interest | String | Interest accrued | | interestRate | String |
Hourly borrowing interest rate | | liab | String | Liability | | totalLiab |
String | Total liability for current account | | interestFreeLiab | String |
Interest-free liability for current account | | ts | String | Timestamp for
interest accrued, Unix timestamp format in milliseconds, e.g. `1597026383085` |
