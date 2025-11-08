# GET / My lead traders

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-my-lead-traders](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-my-lead-traders)

### GET / My lead traders

Retrieve my lead traders.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/current-lead-traders`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`SWAP`, the default value |

#### Response parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| portLink | String | Portrait link |
| nickName | String | Nick name |
| margin | String | Margin for copy trading |
| copyTotalAmt | String | Copy total amount |
| copyTotalPnl | String | Copy total pnl |
| uniqueCode | String | Lead trader unique code |
| ccy | String | margin currency |
| profitSharingRatio | String | Profit sharing ratio. 0.1 represents 10% |
| beginCopyTime | String | Begin copying time. Unix timestamp format in milliseconds, e.g.1597026383085 |
| upl | String | Unrealized profit & loss |
| todayPnl | String | Today pnl |
| leadMode | String | Lead mode `public` `private` |
