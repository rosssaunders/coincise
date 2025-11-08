# POST / Place grid algo order

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order)

### POST / Place grid algo order

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID + Instrument ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/order-algo`

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
| runType | String | No | Grid type  
`1`: Arithmetic, `2`: Geometric  
Default is Arithmetic |
| tpTriggerPx | String | No | TP tigger price  
Applicable to `Spot grid`/`Contract grid` |
| slTriggerPx | String | No | SL tigger price  
Applicable to `Spot grid`/`Contract grid` |
| algoClOrdId | String | No | Client-supplied Algo ID  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| tag | String | No | Order tag |
| profitSharingRatio | String | No | Profit sharing ratio, it only supports these values  
`0`,`0.1`,`0.2`,`0.3`  
0.1 represents 10% |
| triggerParams | Array of objects | No | Trigger Parameters  
Applicable to `Spot grid`/`Contract grid` |
| \> triggerAction | String | Yes | Trigger action  
`start`  
`stop` |
| \> triggerStrategy | String | Yes | Trigger strategy  
`instant`  
`price`  
`rsi`  
Default is `instant` |
| \> delaySeconds | String | No | Delay seconds after action triggered |
| \> timeframe | String | No | K-line type  
`3m`, `5m`, `15m`, `30m` (`m`: minute)  
`1H`, `4H` (`H`: hour)  
`1D` (`D`: day)  
This field is only valid when `triggerStrategy` is `rsi` |
| \> thold | String | No | Threshold  
The value should be an integer between 1 to 100  
This field is only valid when `triggerStrategy` is `rsi` |
| \> triggerCond | String | No | Trigger condition  
`cross_up`  
`cross_down`  
`above`  
`below`  
`cross`  
This field is only valid when `triggerStrategy` is `rsi` |
| \> timePeriod | String | No | Time Period  
`14`  
This field is only valid when `triggerStrategy` is `rsi` |
| \> triggerPx | String | No | Trigger Price  
This field is only valid when `triggerStrategy` is `price` |
| \> stopType | String | No | Stop type  
Spot grid `1`: Sell base currency `2`: Keep base currency  
Contract grid `1`: Market Close All positions `2`: Keep positions  
This field is only valid when `triggerAction` is `stop` |

Spot Grid Order

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| quoteSz | String | Conditional | Invest amount for quote currency  
Either `quoteSz` or `baseSz` is required |
| baseSz | String | Conditional | Invest amount for base currency  
Either `quoteSz` or `baseSz` is required |
| tradeQuoteCcy | String | No | The quote currency for trading. Only applicable to SPOT.  
The default value is the quote currency of instId, e.g. USD for BTC-USD. |

Contract Grid Order

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| sz | String | Yes | Used margin based on `USDT` |
| direction | String | Yes | Contract grid type  
`long`,`short`,`neutral` |
| lever | String | Yes | Leverage |
| basePos | Boolean | No | Whether or not open a position when the strategy activates  
Default is `false`  
Neutral contract grid should omit the parameter |
| tpRatio | String | No | Take profit ratio, 0.1 represents 10% |
| slRatio | String | No | Stop loss ratio, 0.1 represents 10% |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| algoId | String | Algo ID |
| algoClOrdId | String | Client-supplied Algo ID |
| sCode | String | The code of the event execution result, `0` means success. |
| sMsg | String | Rejection message if the request is unsuccessful. |
| tag | String | Order tag |
