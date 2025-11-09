# POST / Instant trigger grid algo order

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-instant-trigger-grid-algo-order](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-instant-trigger-grid-algo-order)

### POST / Instant trigger grid algo order

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID + Instrument ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/order-instant-trigger`

#### Request Parameters

| Parameter | Type   | Required | Description                                 |
| --------- | ------ | -------- | ------------------------------------------- |
| algoId    | String | Yes      | Algo ID                                     |
| topUpAmt  | String | No       | Top up amount, only applicable to spot grid |

#### Response Parameters

| **Parameter** | **Type** | **Description**         |
| ------------- | -------- | ----------------------- |
| algoId        | String   | Algo ID                 |
| algoClOrdId   | String   | Client-supplied Algo ID |
