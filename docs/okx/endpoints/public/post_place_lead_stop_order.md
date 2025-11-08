# POST / Place lead stop order

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-place-lead-stop-order](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-place-lead-stop-order)

### POST / Place lead stop order

Set TP/SL for the current lead position that are not closed.

#### Rate limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/copytrading/algo-order`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`SPOT`  
`SWAP`, the default value |
| subPosId | String | Yes | Lead position ID |
| tpTriggerPx | String | Conditional | Take-profit trigger price. Take-profit order price will be the market price after triggering. At least one of tpTriggerPx and slTriggerPx must be filled  
The take profit order will be deleted if it is 0 |
| slTriggerPx | String | Conditional | Stop-loss trigger price. Stop-loss order price will be the market price after triggering. The stop loss order will be deleted if it is 0 |
| tpOrdPx | String | No | Take-profit order price  
If the price is -1, take-profit will be executed at the market price, the default is `-1`  
Only applicable to `SPOT` lead trader |
| slOrdPx | String | No | Stop-loss order price  
If the price is -1, stop-loss will be executed at the market price, the default is `-1`  
Only applicable to `SPOT` lead trader |
| tpTriggerPxType | String | No | Take-profit trigger price type  
  
`last`: last price  
`index`: index price  
`mark`: mark price  
Default is `last` |
| slTriggerPxType | String | No | Stop-loss trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
Default is last |
| tag | String | No | Order tag  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters. |

#### Response parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| subPosId | String | Lead position ID |
| tag | String | Order tag |
