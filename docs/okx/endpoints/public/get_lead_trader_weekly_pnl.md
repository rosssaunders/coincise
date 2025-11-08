# GET / Lead trader weekly pnl

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-weekly-pnl](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-weekly-pnl)

### GET / Lead trader weekly pnl

Public endpoint. Retrieve lead trader weekly pnl. Results are returned in counter chronological order.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/public-weekly-pnl`

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
| beginTs | String | Begin time of pnl ratio on that week |
| pnl | String | Pnl on that week |
| pnlRatio | String | Pnl ratio on that week |
