# GET / Lead trader currency preferences

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-currency-preferences](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-currency-preferences)

### GET / Lead trader currency preferences

Public endpoint. The most frequently traded crypto of this lead trader. Results are sorted by ratio from large to small.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/public-preference-currency`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`SWAP`, the default value |
| uniqueCode | String | Yes | Lead trader unique code  
A combination of case-sensitive alphanumerics, all numbers and the length is 16 characters, e.g. 213E8C92DC61EFAC |

#### Response parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ccy | String | Currency |
| ratio | String | Ratio. 0.1 represents 10% |
