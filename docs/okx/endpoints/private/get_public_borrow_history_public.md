# GET / Public borrow history (public)

Source: [https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-history-public](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-history-public)

### GET / Public borrow history (public)

Authentication is not required for this public endpoint.  
Only returned records after December 14, 2021.

#### Rate Limit: 6 requests per second

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/finance/savings/lending-rate-history`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description** |
| --- | --- | --- | --- |
| ccy | String | No | Currency, e.g. `BTC` |
| after | String | No | Pagination of data to return records earlier than the requested `ts`, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| before | String | No | Pagination of data to return records newer than the requested `ts`, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| limit | String | No | Number of results per request. The maximum is `100`. The default is `100`.  
If `ccy` is not specified, all data under the same `ts` will be returned, not limited by `limit` |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| ccy | String | Currency, e.g. `BTC` |
| amt | String | ~Lending amount~(deprecated) |
| rate | String | Lending annual interest rate |
| ts | String | Time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
