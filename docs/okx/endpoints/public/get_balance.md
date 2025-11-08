# GET / Balance

Source: [https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-balance](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-balance)

### GET / Balance

The balance is summarized all OKSOL assets (including assets in redeeming) in account.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/sol/balance`

#### Request Parameters

None

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| ccy | String | Currency, e.g. `OKSOL` |
| amt | String | Currency amount |
| latestInterestAccrual | String | Latest interest accrual |
| totalInterestAccrual | String | Total interest accrual |
