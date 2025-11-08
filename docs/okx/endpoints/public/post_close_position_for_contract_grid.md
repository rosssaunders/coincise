# POST / Close position for contract grid

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-close-position-for-contract-grid](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-close-position-for-contract-grid)

### POST / Close position for contract grid

Close position when the contract grid stop type is 'keep position'.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/close-position`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| algoId | String | Yes | Algo ID |
| mktClose | Boolean | Yes | Market close all the positions or not  
`true`: Market close all position, `false`: Close part of position |
| sz | String | Conditional | Close position amount, with unit of `contract`  
If `mktClose` is `false`, the parameter is required. |
| px | String | Conditional | Close position price  
If `mktClose` is `false`, the parameter is required. |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| algoId | String | Algo ID |
| ordId | String | Close position order ID  
If `mktClose` is `true`, the parameter will return "". |
| algoClOrdId | String | Client-supplied Algo ID |
| tag | String | Order tag |
