# GET / Lending history

Source:
[https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-lending-history](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-lending-history)

### GET / Lending history

Return data in the past month.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/savings/lending-history`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                                   |
| -------------- | --------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | Currency, e.g. `BTC`                                                                                                              |
| after          | String    | No           | Pagination of data to return records earlier than the requested `ts`, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| before         | String    | No           | Pagination of data to return records newer than the requested `ts`, Unix timestamp format in milliseconds, e.g. `1597026383085`   |
| limit          | String    | No           | Number of results per request. The maximum is `100`. The default is `100`.                                                        |

#### Response Parameters

| Parameter | Type   | Description                                                               |
| --------- | ------ | ------------------------------------------------------------------------- |
| ccy       | String | Currency, e.g. `BTC`                                                      |
| amt       | String | Lending amount                                                            |
| earnings  | String | Currency earnings                                                         |
| rate      | String | Lending annual interest rate                                              |
| ts        | String | Lending time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
