# POST / Cancel close position order for contract grid

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-cancel-close-position-order-for-contract-grid](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-cancel-close-position-order-for-contract-grid)

### POST / Cancel close position order for contract grid

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/cancel-close-order`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| algoId | String | Yes | Algo ID |
| ordId | String | Yes | Close position order ID |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| algoId | String | Algo ID |
| ordId | String | Close position order ID |
| algoClOrdId | String | Client-supplied Algo ID |
| tag | String | Order tag |
