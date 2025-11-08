# GET / One-click repay history

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-one-click-repay-history](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-one-click-repay-history)

### GET / One-click repay history

Get the history and status of one-click repay trades in the past 7 days. Only applicable to `Multi-currency margin`/`Portfolio margin`.

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/trade/one-click-repay-history`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| after | String | No | Pagination of data to return records earlier than the requested time, Unix timestamp format in milliseconds, e.g. 1597026383085 |
| before | String | No | Pagination of data to return records newer than the requested time, Unix timestamp format in milliseconds, e.g. 1597026383085 |
| limit | String | No | Number of results per request. The maximum is 100. The default is 100. |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| debtCcy | String | Debt currency type |
| fillDebtSz | String | Amount of debt currency transacted |
| repayCcy | String | Repay currency type |
| fillRepaySz | String | Amount of repay currency transacted |
| status | String | Current status of one-click repay  
`running`: Running  
`filled`: Filled  
`failed`: Failed |
| uTime | String | Trade time, Unix timestamp format in milliseconds, e.g. 1597026383085 |
