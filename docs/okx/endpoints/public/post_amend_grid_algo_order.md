# POST / Amend grid algo order

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-amend-grid-algo-order](https://www.okx.com/docs-v5/en/#order-book-trading-grid-trading-post-amend-grid-algo-order)

### POST / Amend grid algo order

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/grid/amend-order-algo`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| algoId | String | Yes | Algo ID |
| instId | String | Yes | Instrument ID, e.g. `BTC-USDT-SWAP` |
| slTriggerPx | String | No | New stop-loss trigger price  
if slTriggerPx is set "" means stop-loss trigger price is canceled.  
Either `slTriggerPx` or `tpTriggerPx` is required. |
| tpTriggerPx | String | No | New take-profit trigger price  
if tpTriggerPx is set "" means take-profit trigger price is canceled. |
| tpRatio | String | No | Take profit ratio, 0.1 represents 10%, only applicable to contract grid  
if it is set "" means take-profit ratio is canceled. |
| slRatio | String | No | Stop loss ratio, 0.1 represents 10%, only applicable to contract grid\`  
if it is set "" means stop-loss ratio is canceled. |
| topUpAmt | String | No | Top up amount, only applicable to spot grid |
| triggerParams | Array of objects | No | Trigger Parameters |
| \> triggerAction | String | Yes | Trigger action  
`start`  
`stop` |
| \> triggerStrategy | String | Yes | Trigger strategy  
`instant`  
`price`  
`rsi` |
| \> triggerPx | String | No | Trigger Price  
This field is only valid when `triggerStrategy` is `price` |
| \> stopType | String | No | Stop type  
Spot grid `1`: Sell base currency `2`: Keep base currency  
Contract grid `1`: Market Close All positions `2`: Keep positions  
This field is only valid when `triggerAction` is `stop` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| algoId | String | Algo ID |
| algoClOrdId | String | Client-supplied Algo ID |
| sCode | String | The code of the event execution result, `0` means success. |
| sMsg | String | Rejection message if the request is unsuccessful. |
| tag | String | Order tag |
