# GET / Grid AI parameter (public)

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-get-grid-ai-parameter-public](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-get-grid-ai-parameter-public)

### GET / Grid AI parameter (public)

Authentication is not required for this public endpoint.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP Request

`GET /api/v5/tradingBot/grid/ai-param`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| algoOrdType | String | Yes | Algo order type  
`grid`: Spot grid  
`contract_grid`: Contract grid |
| instId | String | Yes | Instrument ID, e.g. `BTC-USDT` |
| direction | String | Conditional | Contract grid type  
`long`,`short`,`neutral`  
Required in the case of `contract_grid` |
| duration | String | No | Back testing duration  
`7D`: 7 Days, `30D`: 30 Days, `180D`: 180 Days  
The default is `7D` for `Spot grid`  
Only `7D` is available for `Contract grid` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instId | String | Instrument ID, e.g. BTC-USDT-SWAP |
| algoOrdType | String | Algo order type  
`grid`: Spot grid  
`contract_grid`: Contract grid |
| duration | String | Back testing duration  
`7D`: 7 Days, `30D`: 30 Days, `180D`: 180 Days |
| gridNum | String | Grid quantity |
| maxPx | String | Upper price of price range |
| minPx | String | Lower price of price range |
| perMaxProfitRate | String | Estimated maximum Profit margin per grid |
| perMinProfitRate | String | Estimated minimum Profit margin per grid |
| perGridProfitRatio | String | Per grid profit ratio |
| annualizedRate | String | Grid annualized rate |
| minInvestment | String | The minimum invest amount |
| ccy | String | The invest currency |
| runType | String | Grid type  
`1`: Arithmetic, `2`: Geometric |
| direction | String | Contract grid type  
`long`,`short`,`neutral`  
Only applicable to contract grid |
| lever | String | Leverage  
Only applicable to contract grid |
| sourceCcy | String | Source currency |
