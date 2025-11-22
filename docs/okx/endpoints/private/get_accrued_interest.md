# GET / Accrued interest

Source:
[https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-accrued-interest](https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-accrued-interest)

### GET / Accrued interest

Retrieves the interest accrual history for flexible loans over the past 30 days.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/flexible-loan/interest-accrued`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                      |
| -------------- | --------- | ------------ | ------------------------------------------------------------------------------------ |
| ccy            | String    | No           | Loan currency, e.g. `BTC`                                                            |
| after          | String    | No           | Pagination of data to return records earlier than the requested `refId`(not include) |
| before         | String    | No           | Pagination of data to return records newer than the requested `refId`(not include)   |
| limit          | String    | No           | Number of results per request. The maximum is `100`. The default is `100`.           |

> 返回结果

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                               |
| ------------- | -------- | --------------------------------------------------------------------------------------------- |
| refId         | String   | Reference ID                                                                                  |
| ccy           | String   | Loan currency, e.g. `BTC`                                                                     |
| loan          | String   | Loan when calculated interest                                                                 |
| interest      | String   | Interest                                                                                      |
| interestRate  | String   | APY, e.g. `0.01` represents `1%`                                                              |
| ts            | String   | Timestamp to calculated interest, Unix timestamp format in milliseconds, e.g. `1597026383085` |
