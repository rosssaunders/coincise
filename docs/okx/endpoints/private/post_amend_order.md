# POST / Amend order

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-amend-order](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-amend-order)

### POST / Amend order

Amend an incomplete order.

#### Rate Limit: 60 requests per 2 seconds

#### Rate Limit of lead trader lead instruments for Copy Trading: 4 requests per 2 seconds

#### Rate limit rule (except Options): User ID + Instrument ID

#### Rate limit rule (Options only): User ID + Instrument Family

#### Permission: Trade

Rate limit of this endpoint will also be affected by the rules
[Sub-account rate limit](/docs-v5/en/#overview-rate-limits-sub-account-rate-limit)
and
[Fill ratio based sub-account rate limit](/docs-v5/en/#overview-rate-limits-fill-ratio-based-sub-account-rate-limit).

#### HTTP Request

`POST /api/v5/trade/amend-order`

#### Request Parameters

| Parameter                                                                          | Type    | Required    | Description                                                                         |
| ---------------------------------------------------------------------------------- | ------- | ----------- | ----------------------------------------------------------------------------------- |
| instId                                                                             | String  | Yes         | Instrument ID                                                                       |
| cxlOnFail                                                                          | Boolean | No          | Whether the order needs to be automatically canceled when the order amendment fails |
| Valid options: `false` or `true`, the default is `false`.                          |
| ordId                                                                              | String  | Conditional | Order ID                                                                            |
| Either `ordId` or `clOrdId` is required. If both are passed, `ordId` will be used. |
| clOrdId                                                                            | String  | Conditional | Client Order ID as assigned by the client                                           |
| reqId                                                                              | String  | No          | Client Request ID as assigned by the client for order amendment                     |

A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters.  
The response will include the corresponding `reqId` to help you identify the
request if you provide it in the request. | | newSz | String | Conditional | New
quantity after amendment and it has to be larger than 0. When amending a
partially-filled order, the `newSz` should include the amount that has been
filled. | | newPx | String | Conditional | New price after amendment.  
When modifying options orders, users can only fill in one of the following:
newPx, newPxUsd, or newPxVol. It must be consistent with parameters when placing
orders. For example, if users placed the order using px, they should use newPx
when modifying the order. | | newPxUsd | String | Conditional | Modify options
orders using USD prices  
Only applicable to options.  
When modifying options orders, users can only fill in one of the following:
newPx, newPxUsd, or newPxVol. | | newPxVol | String | Conditional | Modify
options orders based on implied volatility, where 1 represents 100%  
Only applicable to options.  
When modifying options orders, users can only fill in one of the following:
newPx, newPxUsd, or newPxVol. | | pxAmendType | String | No | The price
amendment type for orders  
`0`: Do not allow the system to amend to order price if `newPx` exceeds the
price limit  
`1`: Allow the system to amend the price to the best available value within the
price limit if `newPx` exceeds the price limit  
The default value is `0` | | attachAlgoOrds | Array of objects | No | TP/SL
information attached when placing order | | \> attachAlgoId | String |
Conditional | The order ID of attached TP/SL order. It is required to identity
the TP/SL order when amending. It will not be posted to algoId when placing
TP/SL order after the general order is filled completely. | | \>
attachAlgoClOrdId | String | Conditional | Client-supplied Algo ID when placing
order attaching TP/SL  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters.  
It will be posted to `algoClOrdId` when placing TP/SL order once the general
order is filled completely. | | \> newTpTriggerPx | String | Conditional |
Take-profit trigger price.  
Either the take profit trigger price or order price is 0, it means that the take
profit is deleted. | | \> newTpTriggerRatio | String | Conditional | Take profit
trigger ratio, 0.3 represents 30%  
Only applicable to FUTURES and SWAP. | | \> newTpOrdPx | String | Conditional |
Take-profit order price  
If the price is -1, take-profit will be executed at the market price. | | \>
newTpOrdKind | String | No | TP order kind  
`condition`  
`limit` | | \> newSlTriggerPx | String | Conditional | Stop-loss trigger price  
Either the stop loss trigger price or order price is 0, it means that the stop
loss is deleted. | | \> newSlTriggerRatio | String | Conditional | Stop profit
trigger ratio, 0.3 represents 30%  
Only applicable to FUTURES and SWAP. | | \> newSlOrdPx | String | Conditional |
Stop-loss order price  
If the price is -1, stop-loss will be executed at the market price. | | \>
newTpTriggerPxType | String | Conditional | Take-profit trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
Only applicable to `FUTURES`/`SWAP`  
If you want to add the take-profit, this parameter is required | | \>
newSlTriggerPxType | String | Conditional | Stop-loss trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
Only applicable to `FUTURES`/`SWAP`  
If you want to add the stop-loss, this parameter is required | | \> sz | String
| Conditional | New size. Only applicable to TP order of split TPs, and it is
required for TP order of split TPs | | \> amendPxOnTriggerType | String | No |
Whether to enable Cost-price SL. Only applicable to SL order of split TPs.  
`0`: disable, the default value  
`1`: Enable |

#### Response Parameters

| **Parameter**                              | **Type**         | **Description**                                                                                                                    |
| ------------------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| code                                       | String           | The result code, `0` means success                                                                                                 |
| msg                                        | String           | The error message, empty if the code is 0                                                                                          |
| data                                       | Array of objects | Array of objects contains the response results                                                                                     |
| \> ordId                                   | String           | Order ID                                                                                                                           |
| \> clOrdId                                 | String           | Client Order ID as assigned by the client                                                                                          |
| \> ts                                      | String           | Timestamp when the order request processing is finished by our system, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| \> reqId                                   | String           | Client Request ID as assigned by the client for order amendment.                                                                   |
| \> sCode                                   | String           | The code of the event execution result, `0` means success.                                                                         |
| \> sMsg                                    | String           | Rejection message if the request is unsuccessful.                                                                                  |
| inTime                                     | String           | Timestamp at REST gateway when the request is received, Unix timestamp format in microseconds, e.g. `1597026383085123`             |
| The time is recorded after authentication. |
| outTime                                    | String           | Timestamp at REST gateway when the response is sent, Unix timestamp format in microseconds, e.g. `1597026383085123`                |

newSz  
If the new quantity of the order is less than or equal to the filled quantity
when you are amending a partially-filled order, the order status will be changed
to filled.

The amend order returns sCode equal to 0. It is not strictly considered that the
order has been amended. It only means that your amend order request has been
accepted by the system server. The result of the amend is subject to the status
pushed by the order channel or the order status query
