# GET / Lead trader daily pnl

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-daily-pnl](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-daily-pnl)

### GET / Lead trader daily pnl

Public endpoint. Retrieve lead trader daily pnl. Results are returned in counter chronological order.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/public-pnl`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`SWAP`, the default value |
| uniqueCode | String | Yes | Lead trader unique code  
A combination of case-sensitive alphanumerics, all numbers and the length is 16 characters, e.g. 213E8C92DC61EFAC |
| lastDays | String | Yes | Last days  
`1`: last 7 days  
`2`: last 30 days  
`3`: last 90 days  
`4`: last 365 days |

#### Response parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| beginTs | String | Begin time on that day |
| pnl | String | Accumulated pnl |
| pnlRatio | String | Accumulated pnl ratio |
