# POST / Spot grid withdraw income

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-spot-grid-withdraw-income](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-spot-grid-withdraw-income)

### POST / Spot grid withdraw income

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/withdraw-income`

#### Request Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| algoId    | String | Yes      | Algo ID     |

#### Response Parameters

| **Parameter** | **Type** | **Description**         |
| ------------- | -------- | ----------------------- |
| algoId        | String   | Algo ID                 |
| algoClOrdId   | String   | Client-supplied Algo ID |
| profit        | String   | Withdraw profit         |
