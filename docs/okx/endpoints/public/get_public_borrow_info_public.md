# GET / Public borrow info (public)

Source:
[https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-info-public](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-info-public)

### GET / Public borrow info (public)

Authentication is not required for this public endpoint.

#### Rate Limit: 6 requests per second

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/finance/savings/lending-rate-summary`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**      |
| -------------- | --------- | ------------ | -------------------- |
| ccy            | String    | No           | Currency, e.g. `BTC` |

#### Response Parameters

| Parameter | Type   | Description                                               |
| --------- | ------ | --------------------------------------------------------- |
| ccy       | String | Currency, e.g. `BTC`                                      |
| avgAmt    | String | ~24H average borrowing amount~(deprecated)                |
| avgAmtUsd | String | ~24H average borrowing amount in `USD` value~(deprecated) |
| avgRate   | String | 24-hours average annual borrowing rate                    |
| preRate   | String | Last annual borrowing interest rate                       |
| estRate   | String | Next estimate annual borrowing interest rate              |
