# POST / Compute min investment (public)

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-compute-min-investment-public](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-compute-min-investment-public)

### POST / Compute min investment (public)

Authentication is not required for this public endpoint.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP Request

`POST /api/v5/tradingBot/grid/min-investment`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. `BTC-USDT-SWAP` |
| algoOrdType | String | Yes | Algo order type  
`grid`: Spot grid  
`contract_grid`: Contract grid |
| maxPx | String | Yes | Upper price of price range |
| minPx | String | Yes | Lower price of price range |
| gridNum | String | Yes | Grid quantity |
| runType | String | Yes | Grid type  
`1`: Arithmetic, `2`: Geometric |
| direction | String | Conditional | Contract grid type  
`long`,`short`,`neutral`  
Only applicable to `contract grid` |
| lever | String | Conditional | Leverage  
Only applicable to `contract grid` |
| basePos | Boolean | No | Whether or not open a position when the strategy activates  
Default is `false`  
Neutral contract grid should omit the parameter  
Only applicable to `contract grid` |
| investmentType | String | No | Investment type, only applicable to `grid`  
`quote`  
`base`  
`dual` |
| triggerStrategy | String | No | Trigger stragety,  
`instant`  
`price`  
`rsi` |
| topUpAmt | String | No | Top up amount, only applicable to spot grid |
| investmentData | Array of objects | No | Invest Data |
| \> amt | String | Yes | Invest amount |
| \> ccy | String | Yes | Invest currency |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| minInvestmentData | Array of objects | Minimum invest Data |
| \> amt | String | Minimum invest amount |
| \> ccy | String | Minimum Invest currency |
| singleAmt | String | Single grid trading amount  
In terms of `spot grid`, the unit is `quote currency`  
In terms of `contract grid`, the unit is `contract` |
