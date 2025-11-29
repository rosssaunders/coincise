# POST /api/v5/trade/amend-algos

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-post-amend-algo-order](https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-post-amend-algo-order)

### POST / Amend algo order

Amend unfilled algo orders (Support Stop order and Trigger order only, not
including Move_order_stop order, Iceberg order, TWAP order, Trailing Stop
order).

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID + Instrument ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/trade/amend-algos`

#### Request Parameters

| Parameter                                                                                | Type    | Required    | Description                                                                         |
| ---------------------------------------------------------------------------------------- | ------- | ----------- | ----------------------------------------------------------------------------------- |
| instId                                                                                   | String  | Yes         | Instrument ID                                                                       |
| algoId                                                                                   | String  | Conditional | Algo ID                                                                             |
| Either `algoId` or `algoClOrdId` is required. If both are passed, `algoId` will be used. |
| algoClOrdId                                                                              | String  | Conditional | Client-supplied Algo ID                                                             |
| Either `algoId` or `algoClOrdId` is required. If both are passed, `algoId` will be used. |
| cxlOnFail                                                                                | Boolean | No          | Whether the order needs to be automatically canceled when the order amendment fails |
| Valid options: `false` or `true`, the default is `false`.                                |
| reqId                                                                                    | String  | Conditional | Client Request ID as assigned by the client for order amendment                     |

A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters.  
The response will include the corresponding `reqId` to help you identify the
request if you provide it in the request. | | newSz | String | Conditional | New
quantity after amendment and it has to be larger than 0. |

**Take Profit / Stop Loss Order**

| Parameter                                                                                          | Type   | Required    | Description                    |
| -------------------------------------------------------------------------------------------------- | ------ | ----------- | ------------------------------ |
| newTpTriggerPx                                                                                     | String | Conditional | Take-profit trigger price.     |
| Either the take-profit trigger price or order price is 0, it means that the take-profit is deleted |
| newTpOrdPx                                                                                         | String | Conditional | Take-profit order price        |
| If the price is -1, take-profit will be executed at the market price.                              |
| newSlTriggerPx                                                                                     | String | Conditional | Stop-loss trigger price.       |
| Either the stop-loss trigger price or order price is 0, it means that the stop-loss is deleted     |
| newSlOrdPx                                                                                         | String | Conditional | Stop-loss order price          |
| If the price is -1, stop-loss will be executed at the market price.                                |
| newTpTriggerPxType                                                                                 | String | Conditional | Take-profit trigger price type |

`last`: last price  
`index`: index price  
`mark`: mark price | | newSlTriggerPxType | String | Conditional | Stop-loss
trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price |

**Trigger Order**

| Parameter                                                             | Type   | Required | Description                            |
| --------------------------------------------------------------------- | ------ | -------- | -------------------------------------- |
| newTriggerPx                                                          | String | Yes      | New trigger price after amendment      |
| newOrdPx                                                              | String | Yes      | New order price after amendment        |
| If the price is `-1`, the order will be executed at the market price. |
| newTriggerPxType                                                      | String | No       | New trigger price type after amendment |

`last`: last price  
`index`: index price  
`mark`: mark price  
The default is `last` | | attachAlgoOrds | Array of objects | No | Attached
SL/TP orders info  
Applicable to `Futures mode/Multi-currency margin/Portfolio margin` | | \>
newTpTriggerPx | String | No | Take-profit trigger price  
If you fill in this parameter, you should fill in the take-profit order price as
well. | | \> newTpTriggerRatio | String | No | Take profit trigger ratio, 0.3
represents 30%  
Only applicable to FUTURES and SWAP. | | \> newTpTriggerPxType | String | No |
Take-profit trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is `last` | | \> newTpOrdPx | String | No | Take-profit order
price  
If you fill in this parameter, you should fill in the take-profit trigger price
as well.  
If the price is `-1`, take-profit will be executed at the market price. | | \>
newSlTriggerPx | String | No | Stop-loss trigger price  
If you fill in this parameter, you should fill in the stop-loss order price. | |
\> newSlTriggerRatio | String | No | Stop profit trigger ratio, 0.3 represents
30%  
Only applicable to FUTURES and SWAP. | | \> newSlTriggerPxType | String | No |
Stop-loss trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is `last` | | \> newSlOrdPx | String | No | Stop-loss order price  
If you fill in this parameter, you should fill in the stop-loss trigger price.  
If the price is `-1`, stop-loss will be executed at the market price. |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                  |
| ------------- | -------- | ---------------------------------------------------------------- |
| algoId        | String   | Algo ID                                                          |
| algoClOrdId   | String   | Client-supplied Algo ID                                          |
| reqId         | String   | Client Request ID as assigned by the client for order amendment. |
| sCode         | String   | The code of the event execution result, `0` means success.       |
| sMsg          | String   | Rejection message if the request is unsuccessful.                |
