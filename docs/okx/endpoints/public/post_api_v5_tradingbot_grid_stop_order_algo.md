# POST /api/v5/tradingBot/grid/stop-order-algo

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-stop-grid-algo-order](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-stop-grid-algo-order)

### POST / Stop grid algo order

A maximum of 10 orders can be stopped per request.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/stop-order-algo`

#### Request Parameters

| Parameter   | Type   | Required | Description                    |
| ----------- | ------ | -------- | ------------------------------ |
| algoId      | String | Yes      | Algo ID                        |
| instId      | String | Yes      | Instrument ID, e.g. `BTC-USDT` |
| algoOrdType | String | Yes      | Algo order type                |

`grid`: Spot grid  
`contract_grid`: Contract grid | | stopType | String | Yes | Stop type  
Spot grid `1`: Sell base currency `2`: Keep base currency  
Contract grid `1`: Market Close All positions `2`: Keep positions |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                            |
| ------------- | -------- | ---------------------------------------------------------- |
| algoId        | String   | Algo ID                                                    |
| algoClOrdId   | String   | Client-supplied Algo ID                                    |
| sCode         | String   | The code of the event execution result, `0` means success. |
| sMsg          | String   | Rejection message if the request is unsuccessful.          |
| tag           | String   | Order tag                                                  |
