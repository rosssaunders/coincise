# POST / Create signal

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-create-signal](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-create-signal)

### POST / Create signal

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/signal/create-signal`

#### Request Parameters

| Parameter      | Type   | Required | Description                |
| -------------- | ------ | -------- | -------------------------- |
| signalChanName | String | Yes      | Signal channel name        |
| signalChanDesc | String | No       | Signal channel description |

#### Response Parameters

| **Parameter**   | **Type** | **Description**                              |
| --------------- | -------- | -------------------------------------------- |
| signalChanId    | String   | Signal channel Id                            |
| signalChanToken | String   | User identify when placing orders via signal |
