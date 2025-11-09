# POST / Amend grid algo order basic param

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-amend-grid-algo-order-basic-param](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-amend-grid-algo-order-basic-param)

### POST / Amend grid algo order basic param

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/amend-algo-basic-param`

#### Request Parameters

| Parameter | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| algoId    | String | Yes      | Algo ID             |
| minPx     | String | Yes      | Minimum price range |
| maxPx     | String | Yes      | Maximum price range |
| gridNum   | int    | Yes      | Grid quantity       |

#### Response Parameters

| **Parameter**       | **Type** | **Description**                                            |
| ------------------- | -------- | ---------------------------------------------------------- |
| algoId              | String   | Algo ID                                                    |
| requiredTopupAmount | String   | Required top up investment amount to edit grid parameters. |
