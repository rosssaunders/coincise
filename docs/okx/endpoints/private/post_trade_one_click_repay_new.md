# POST / Trade one-click repay (New)

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-trade-one-click-repay-new](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-trade-one-click-repay-new)

### POST / Trade one-click repay (New)

Trade one-click repay to repay debts. Only applicable to `SPOT mode`.

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/trade/one-click-repay-v2`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| debtCcy | String | Yes | Debt currency |
| repayCcyList | Array of strings | Yes | Repay currency list, e.g. \["USDC","BTC"\]  
The priority of currency to repay is consistent with the order in the array. (The first item has the highest priority) |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| debtCcy | String | Debt currency |
| repayCcyList | Array of strings | Repay currency list, e.g. \["USDC","BTC"\] |
| ts | String | Request time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
