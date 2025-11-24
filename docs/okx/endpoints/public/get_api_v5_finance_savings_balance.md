# GET /api/v5/finance/savings/balance

Source:
[https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-saving-balance](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-saving-balance)

### GET / Saving balance

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/savings/balance`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**      |
| -------------- | --------- | ------------ | -------------------- |
| ccy            | String    | No           | Currency, e.g. `BTC` |

#### Response Parameters

| Parameter  | Type   | Description                                     |
| ---------- | ------ | ----------------------------------------------- |
| ccy        | String | Currency                                        |
| amt        | String | Currency amount                                 |
| earnings   | String | Currency earnings                               |
| rate       | String | Minimum annual lending rate configured by users |
| loanAmt    | String | Lending amount                                  |
| pendingAmt | String | Pending amount                                  |
| redemptAmt | String | ~Redempting amount~ (Deprecated)                |
