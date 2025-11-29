# POST /api/v5/tradingBot/signal/amendTPSL

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-amend-tpsl](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-amend-tpsl)

### POST / Amend TPSL

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/signal/amendTPSL`

#### Request Parameters

| Parameter        | Type   | Required | Description                                             |
| ---------------- | ------ | -------- | ------------------------------------------------------- |
| algoId           | String | Yes      | Algo ID                                                 |
| exitSettingParam | String | Yes      | Exit setting                                            |
| \> tpSlType      | String | Yes      | Type of set the take-profit and stop-loss trigger price |

`pnl`: Based on the estimated profit and loss percentage from the entry point  
`price`: Based on price increase or decrease from the crypto’s entry price | |
\> tpPct | String | No | Take-profit percentage | | \> slPct | String | No |
Stop-loss percentage |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| algoId        | String   | Algo ID         |
