# GET / Max grid quantity (public)

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-get-max-grid-quantity-public](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-get-max-grid-quantity-public)

### GET / Max grid quantity (public)

Authentication is not required for this public endpoint.  

Maximum grid quantity can be retrieved from this endpoint. Minimum grid quantity always is 2.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/grid/grid-quantity`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. `BTC-USDT` |
| runType | String | Yes | Grid type  
`1`: Arithmetic  
`2`: Geometric |
| algoOrdType | String | Yes | Algo order type  
`grid`: Spot grid  
`contract_grid`: Contract grid |
| maxPx | String | Yes | Upper price of price range |
| minPx | String | Yes | Lower price of price range |
| lever | String | Conditional | Leverage, it is required for contract grid |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| maxGridQty | String | Maximum grid quantity |
