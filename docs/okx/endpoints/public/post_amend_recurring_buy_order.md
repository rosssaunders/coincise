# POST / Amend recurring buy order

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-recurring-buy-post-amend-recurring-buy-order](https://www.okx.com/docs-v5/en/#order-book-trading-recurring-buy-post-amend-recurring-buy-order)

### POST / Amend recurring buy order

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/recurring/amend-order-algo`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                  |
| --------- | ------ | -------- | ---------------------------------------------------------------------------- |
| algoId    | String | Yes      | Algo ID                                                                      |
| stgyName  | String | Yes      | New custom name for trading bot after adjustment, no more than 40 characters |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                         |
| ------------- | -------- | ------------------------------------------------------- |
| algoId        | String   | Algo ID                                                 |
| algoClOrdId   | String   | Client-supplied Algo ID                                 |
| sCode         | String   | The code of the event execution result, 0 means success |
| sMsg          | String   | Rejection message if the request is unsuccessful        |
