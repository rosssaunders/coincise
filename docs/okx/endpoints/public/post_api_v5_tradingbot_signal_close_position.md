# POST /api/v5/tradingBot/signal/close-position

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-close-position](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-close-position)

### POST / Close position

Close the position of an instrument via a market order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/signal/close-position`

#### Request Parameters

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| algoId    | String | Yes      | Algo ID       |
| instId    | String | Yes      | Instrument ID |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| algoId        | String   | Algo ID         |
