# POST / Trade one-click repay

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-trade-one-click-repay](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-trade-one-click-repay)

### POST / Trade one-click repay

Trade one-click repay to repay cross debts. Isolated debts are not applicable. The maximum repayment amount is based on the remaining available balance of funding and trading accounts. Only applicable to `Multi-currency margin`/`Portfolio margin`.

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/trade/one-click-repay`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| debtCcy | Array of strings | Yes | Debt currency type  
Maximum 5 currencies can be selected in one order. If there are multiple currencies, separate them with commas. |
| repayCcy | String | Yes | Repay currency type  
Only one receiving currency type can be selected in one order and cannot be the same as the small payment currencies. |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| status | String | Current status of one-click repay  
`running`: Running  
`filled`: Filled  
`failed`: Failed |
| debtCcy | String | Debt currency type |
| repayCcy | String | Repay currency type |
| fillDebtSz | String | Filled amount of debt currency |
| fillRepaySz | String | Filled amount of repay currency |
| uTime | String | Trade time, Unix timestamp format in milliseconds, e.g. 1597026383085 |
