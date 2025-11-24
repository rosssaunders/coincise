# POST /api/v5/tradingBot/signal/set-instruments

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-set-instruments](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-set-instruments)

### POST / Set instruments

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/signal/set-instruments`

#### Request Parameters

| Parameter  | Type             | Required | Description                                                                                                   |
| ---------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| algoId     | String           | Yes      | Algo ID                                                                                                       |
| instIds    | Array of strings | Yes      | Instrument IDs. When `includeAll` is `true`, it is ignored                                                    |
| includeAll | Boolean          | Yes      | Whether to include all USDT-margined contract.The default value is `false`. `true`: include `false` : exclude |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| algoId        | String   | Algo ID         |
