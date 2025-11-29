# POST /api/v5/trade/cancel-algos

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-post-cancel-algo-order](https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-post-cancel-algo-order)

### POST / Cancel algo order

Cancel unfilled algo orders. A maximum of 10 orders can be canceled per request.
Request parameters should be passed in the form of an array.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule (except Options): User ID + Instrument ID

#### Rate limit rule (Options only): User ID + Instrument Family

#### Permission: Trade

#### HTTP Request

`POST /api/v5/trade/cancel-algos`

#### Request Parameters

| Parameter                                                                                | Type   | Required    | Description                    |
| ---------------------------------------------------------------------------------------- | ------ | ----------- | ------------------------------ |
| instId                                                                                   | String | Yes         | Instrument ID, e.g. `BTC-USDT` |
| algoId                                                                                   | String | Conditional | Algo ID                        |
| Either `algoId` or `algoClOrdId` is required. If both are passed, `algoId` will be used. |
| algoClOrdId                                                                              | String | Conditional | Client-supplied Algo ID        |
| Either `algoId` or `algoClOrdId` is required. If both are passed, `algoId` will be used. |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                            |
| ------------- | -------- | ---------------------------------------------------------- |
| algoId        | String   | Algo ID                                                    |
| sCode         | String   | The code of the event execution result, `0` means success. |
| sMsg          | String   | Rejection message if the request is unsuccessful.          |
| clOrdId       | String   | ~Client Order ID as assigned by the client~(Deprecated)    |
| algoClOrdId   | String   | ~Client-supplied Algo ID~(Deprecated)                      |
| tag           | String   | ~Order tag~ (Deprecated)                                   |
