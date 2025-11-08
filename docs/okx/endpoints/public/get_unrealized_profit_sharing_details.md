# GET / Unrealized profit sharing details

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-unrealized-profit-sharing-details](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-unrealized-profit-sharing-details)

### GET / Unrealized profit sharing details

The leading trader gets the profit sharing details that are expected to be shared in the next settlement cycle.  
The unrealized profit sharing details will update once there copy position is closed.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/unrealized-profit-sharing-details`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`SPOT`  
`SWAP`  
It returns all types by default. |

#### Response parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ccy | String | The currency of profit sharing. e.g. USDT |
| unrealizedProfitSharingAmt | String | Unrealized profit sharing amount. |
| nickName | String | Nickname of copy trader. |
| instType | String | Instrument type |
| portLink | String | Portrait link |
| ts | String | Update time. |
