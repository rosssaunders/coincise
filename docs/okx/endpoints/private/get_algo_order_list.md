# GET / Algo order list

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list](https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)

### GET / Algo order list

Retrieve a list of untriggered Algo orders under the current account.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/trade/orders-algo-pending`

#### Request Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| ordType   | String | Yes      | Order type  |

`conditional`: One-way stop order  
`oco`: One-cancels-the-other order  
`chase`: chase order, only applicable to FUTURES and SWAP  
`trigger`: Trigger order  
`move_order_stop`: Trailing order  
`iceberg`: Iceberg order  
`twap`: TWAP order  
For every request, unlike other ordType which only can use one type,
`conditional` and `oco` both can be used and separated with comma. | | algoId |
String | No | Algo ID | | instType | String | No | Instrument type  
`SPOT`  
`SWAP`  
`FUTURES`  
`MARGIN` | | instId | String | No | Instrument ID, e.g. `BTC-USDT` | | after |
String | No | Pagination of data to return records earlier than the requested
`algoId`. | | before | String | No | Pagination of data to return records newer
than the requested `algoId`. | | limit | String | No | Number of results per
request. The maximum is `100`. The default is `100` |

#### Response Parameters

| **Parameter**                                                                                                               | **Type**         | **Description**                                                                      |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------ |
| instType                                                                                                                    | String           | Instrument type                                                                      |
| instId                                                                                                                      | String           | Instrument ID                                                                        |
| ccy                                                                                                                         | String           | Margin currency                                                                      |
| Applicable to all `isolated` `MARGIN` orders and `cross` `MARGIN` orders in `Futures mode`, `FUTURES` and `SWAP` contracts. |
| ordId                                                                                                                       | String           | Latest order ID. It will be deprecated soon                                          |
| ordIdList                                                                                                                   | Array of strings | Order ID list. There will be multiple order IDs when there is TP/SL splitting order. |
| algoId                                                                                                                      | String           | Algo ID                                                                              |
| clOrdId                                                                                                                     | String           | Client Order ID as assigned by the client                                            |
| sz                                                                                                                          | String           | Quantity to buy or sell                                                              |
| closeFraction                                                                                                               | String           | Fraction of position to be closed when the algo order is triggered                   |
| ordType                                                                                                                     | String           | Order type                                                                           |
| side                                                                                                                        | String           | Order side                                                                           |
| posSide                                                                                                                     | String           | Position side                                                                        |
| tdMode                                                                                                                      | String           | Trade mode                                                                           |
| tgtCcy                                                                                                                      | String           | Order quantity unit setting for `sz`                                                 |

`base_ccy`: Base currency ,`quote_ccy`: Quote currency  
Only applicable to `SPOT` traded with Market order | | state | String | State  
`live`  
`pause` | | lever | String | Leverage, from `0.01` to `125`.  
Only applicable to `MARGIN/FUTURES/SWAP` | | tpTriggerPx | String | Take-profit
trigger price | | tpTriggerPxType | String | Take-profit trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price | | tpOrdPx | String | Take-profit order price | |
slTriggerPx | String | Stop-loss trigger price | | slTriggerPxType | String |
Stop-loss trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price | | slOrdPx | String | Stop-loss order price | | triggerPx |
String | Trigger price | | triggerPxType | String | Trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price | | ordPx | String | Order price for the trigger order | |
actualSz | String | Actual order quantity | | tag | String | Order tag | |
actualPx | String | Actual order price | | actualSide | String | Actual trigger
side  
`tp`: take profit `sl`: stop loss  
Only applicable to oco order and conditional order | | triggerTime | String |
Trigger time, Unix timestamp format in milliseconds, e.g. `1597026383085` | |
pxVar | String | Price ratio  
Only applicable to `iceberg` order or `twap` order | | pxSpread | String | Price
variance  
Only applicable to `iceberg` order or `twap` order | | szLimit | String |
Average amount  
Only applicable to `iceberg` order or `twap` order | | pxLimit | String | Price
Limit  
Only applicable to `iceberg` order or `twap` order | | timeInterval | String |
Time interval  
Only applicable to `twap` order | | callbackRatio | String | Callback price
ratio  
Only applicable to `move_order_stop` order | | callbackSpread | String |
Callback price variance  
Only applicable to `move_order_stop` order | | activePx | String | Active
price  
Only applicable to `move_order_stop` order | | moveTriggerPx | String | Trigger
price  
Only applicable to `move_order_stop` order | | reduceOnly | String | Whether the
order can only reduce the position size. Valid options: true or false. | |
quickMgnType | String | Quick Margin type, Only applicable to Quick Margin Mode
of isolated margin  
`manual`, `auto_borrow`, `auto_repay` | | last | String | Last filled price
while placing | | failCode | String | It represents that the reason that algo
order fails to trigger. There will be value when the state is `order_failed`,
e.g. 51008;  
For this endpoint, it always is "". | | algoClOrdId | String | Client-supplied
Algo ID | | amendPxOnTriggerType | String | Whether to enable Cost-price SL.
Only applicable to SL order of split TPs.  
`0`: disable, the default value  
`1`: Enable | | attachAlgoOrds | Array of objects | Attached SL/TP orders info  
Applicable to `Futures mode/Multi-currency margin/Portfolio margin` | | \>
attachAlgoClOrdId | String | Client-supplied Algo ID when placing order
attaching TP/SL.  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters.  
It will be posted to algoClOrdId when placing TP/SL order once the general order
is filled completely. | | \> tpTriggerPx | String | Take-profit trigger price  
If you fill in this parameter, you should fill in the take-profit order price as
well. | | \> tpTriggerPxType | String | Take-profit trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price | | \> tpOrdPx | String | Take-profit order price  
If you fill in this parameter, you should fill in the take-profit trigger price
as well.  
If the price is `-1`, take-profit will be executed at the market price. | | \>
slTriggerPx | String | Stop-loss trigger price  
If you fill in this parameter, you should fill in the stop-loss order price. | |
\> slTriggerPxType | String | Stop-loss trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price | | \> slOrdPx | String | Stop-loss order price  
If you fill in this parameter, you should fill in the stop-loss trigger price.  
If the price is `-1`, stop-loss will be executed at the market price. | |
linkedOrd | Object | Linked TP order detail, only applicable to SL order that
comes from the one-cancels-the-other (OCO) order that contains the TP limit
order. | | \> ordId | String | Order ID | | cTime | String | Creation time Unix
timestamp format in milliseconds, e.g. `1597026383085` | | uTime | String |
Order updated time, Unix timestamp format in milliseconds, e.g. 1597026383085 |
| isTradeBorrowMode | String | Whether borrowing currency automatically  
true  
false  
Only applicable to `trigger order`, `trailing order` and `twap order` | |
chaseType | String | Chase type. Only applicable to `chase` order. | | chaseVal
| String | Chase value. Only applicable to `chase` order. | | maxChaseType |
String | Maximum chase type. Only applicable to `chase` order. | | maxChaseVal |
String | Maximum chase value. Only applicable to `chase` order. | |
tradeQuoteCcy | String | The quote currency used for trading. |
