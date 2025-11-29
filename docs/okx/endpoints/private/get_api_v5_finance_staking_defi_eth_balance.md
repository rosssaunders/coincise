# GET /api/v5/finance/staking-defi/eth/balance

Source:
[https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-balance](https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-balance)

### GET / Balance

The balance is a snapshot summarized all BETH assets (including assets in
redeeming) in account.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/eth/balance`

#### Request Parameters

None

#### Response Parameters

| Parameter             | Type   | Description                                                                  |
| --------------------- | ------ | ---------------------------------------------------------------------------- |
| ccy                   | String | Currency, e.g. `BETH`                                                        |
| amt                   | String | Currency amount                                                              |
| latestInterestAccrual | String | Latest interest accrual                                                      |
| totalInterestAccrual  | String | Total interest accrual                                                       |
| ts                    | String | Query data time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
