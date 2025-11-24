# GET /api/v5/account/interest-rate

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-interest-rate](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-interest-rate)

### Get interest rate

Get the user's current leveraged currency borrowing market interest rate

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/interest-rate`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**      |
| -------------- | --------- | ------------ | -------------------- |
| ccy            | String    | No           | Currency, e.g. `BTC` |

#### Response Parameters

| Parameter    | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| interestRate | String | Hourly borrowing interest rate |
| ccy          | String | Currency                       |
