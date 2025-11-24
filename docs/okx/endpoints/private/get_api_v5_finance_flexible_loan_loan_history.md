# GET /api/v5/finance/flexible-loan/loan-history

Source:
[https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-loan-history](https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-loan-history)

### GET / Loan history

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/flexible-loan/loan-history`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description** |
| -------------- | --------- | ------------ | --------------- |
| type           | String    | No           | Action type     |

`borrowed`  
`repaid`  
`collateral_locked`  
`collateral_released`  
`forced_repayment_buy`  
`forced_repayment_sell`  
`forced_liquidation`  
`partial_liquidation`  
`sell_collateral`  
`buy_transition_coin`  
`sell_transition_coin`  
`buy_borrowed_coin` | | after | String | No | Pagination of data to return
records earlier than the requested `refId`(not include) | | before | String | No
| Pagination of data to return records newer than the requested `refId`(not
include) | | limit | String | No | Number of results per request. The maximum is
`100`. The default is `100`. |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                       |
| ------------- | -------- | ------------------------------------------------------------------------------------- |
| refId         | String   | Reference ID                                                                          |
| type          | String   | Action type                                                                           |
| ccy           | String   | Currency, e.g. `BTC`                                                                  |
| amt           | String   | Amount                                                                                |
| ts            | String   | Timestamp for the action, Unix timestamp format in milliseconds, e.g. `1597026383085` |
