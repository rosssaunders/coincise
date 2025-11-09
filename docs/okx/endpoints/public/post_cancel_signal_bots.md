# POST / Cancel signal bots

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-cancel-signal-bots](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-cancel-signal-bots)

### POST / Cancel signal bots

A maximum of 10 orders can be stopped per request.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/signal/stop-order-algo`

#### Request Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| algoId    | String | Yes      | Algo ID     |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                            |
| ------------- | -------- | ---------------------------------------------------------- |
| algoId        | String   | Algo ID                                                    |
| sCode         | String   | The code of the event execution result, `0` means success. |
| sMsg          | String   | Rejection or success message of event execution.           |
| algoClOrdId   | String   | Client-supplied Algo ID                                    |
