# GET / Borrowable currencies

Source:
[https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-borrowable-currencies](https://www.okx.com/docs-v5/en/#financial-product-flexible-loan-get-borrowable-currencies)

### GET / Borrowable currencies

Get borrowable currencies

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/flexible-loan/borrow-currencies`

#### Response Parameters

| **Parameter** | **Type** | **Description**                 |
| ------------- | -------- | ------------------------------- |
| borrowCcy     | String   | Borrowable currency, e.g. `BTC` |
