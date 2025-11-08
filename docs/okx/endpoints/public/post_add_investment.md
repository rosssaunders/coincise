# POST / Add investment

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-add-investment](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-add-investment)

### POST / Add investment

It is used to add investment and only applicable to contract gird.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/adjust-investment`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| algoId | String | Yes | Algo ID |
| amt | String | Yes | The amount is going to be added |
| allowReinvestProfit | String | No | Whether reinvesting profits, only applicable to spot grid.  
`true` or `false`. The default is true. |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| algoId | String | Algo ID |
