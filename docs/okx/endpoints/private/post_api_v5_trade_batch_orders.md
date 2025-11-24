# POST /api/v5/trade/batch-orders

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)

### POST / Place multiple orders

Place orders in batches. Maximum 20 orders can be placed per request.  
Request parameters should be passed in the form of an array. Orders will be
placed in turn

#### Rate Limit: 300 orders per 2 seconds

#### Rate Limit of lead trader lead instruments for Copy Trading: 4 orders per 2 seconds

#### Rate limit rule (except Options): User ID + Instrument ID

#### Rate limit rule (Options only): User ID + Instrument Family

#### Permission: Trade

Rate limit of this endpoint will also be affected by the rules
[Sub-account rate limit](/docs-v5/en/#overview-rate-limits-sub-account-rate-limit)
and
[Fill ratio based sub-account rate limit](/docs-v5/en/#overview-rate-limits-fill-ratio-based-sub-account-rate-limit).

Unlike other endpoints, the rate limit of this endpoint is determined by the
number of orders. If there is only one order in the request, it will consume the
rate limit of \`Place order\`.

#### HTTP Request

`POST /api/v5/trade/batch-orders`

#### Request Parameters

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| instId    | String | Yes      | Instrument ID, e.g. `BTC-USDT` |
| tdMode    | String | Yes      | Trade mode                     |

Margin mode `cross` `isolated`  
Non-Margin mode `cash`  
`spot_isolated` (only applicable to SPOT lead trading, `tdMode` should be
`spot_isolated` for `SPOT` lead trading.)  
Note: `isolated` is not available in multi-currency margin mode and portfolio
margin mode. | | ccy | String | No | Margin currency  
Applicable to all `isolated` `MARGIN` orders and `cross` `MARGIN` orders in
`Futures mode`. | | clOrdId | String | No | Client Order ID as assigned by the
client  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters. | | tag | String | No | Order tag  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 16 characters. | | side | String | Yes | Order side `buy` `sell` | | posSide
| String | Conditional | Position side  
The default is `net` in the `net` mode  
It is required in the `long/short` mode, and can only be `long` or `short`.  
Only applicable to `FUTURES`/`SWAP`. | | ordType | String | Yes | Order type  
`market`: Market order, only applicable to `SPOT/MARGIN/FUTURES/SWAP`  
`limit`: Limit order  
`post_only`: Post-only order  
`fok`: Fill-or-kill order  
`ioc`: Immediate-or-cancel order  
`optimal_limit_ioc`: Market order with immediate-or-cancel order (applicable
only to Expiry Futures and Perpetual Futures).  
`mmp`: Market Maker Protection (only applicable to Option in Portfolio Margin
mode)  
`mmp_and_post_only`: Market Maker Protection and Post-only order(only applicable
to Option in Portfolio Margin mode) | | sz | String | Yes | Quantity to buy or
sell | | px | String | Conditional | Order price. Only applicable to
`limit`,`post_only`,`fok`,`ioc`,`mmp`,`mmp_and_post_only` order.  
When placing an option order, one of px/pxUsd/pxVol must be filled in, and only
one can be filled in | | pxUsd | String | Conditional | Place options orders in
`USD`  
Only applicable to options  
When placing an option order, one of px/pxUsd/pxVol must be filled in, and only
one can be filled in | | pxVol | String | Conditional | Place options orders
based on implied volatility, where 1 represents 100%  
Only applicable to options  
When placing an option order, one of px/pxUsd/pxVol must be filled in, and only
one can be filled in | | reduceOnly | Boolean | No | Whether the order can only
reduce position size.  
Valid options: `true` or `false`. The default value is `false`.  
Only applicable to `MARGIN` orders, and `FUTURES`/`SWAP` orders in `net` mode  
Only applicable to `Futures mode` and `Multi-currency margin` | | tgtCcy |
String | No | Order quantity unit setting for `sz`  
`base_ccy`: Base currency ,`quote_ccy`: Quote currency  
Only applicable to `SPOT` Market Orders  
Default is `quote_ccy` for buy, `base_ccy` for sell | | banAmend | Boolean | No
| Whether to disallow the system from amending the size of the SPOT Market
Order.  
Valid options: `true` or `false`. The default value is `false`.  
If `true`, system will not amend and reject the market order if user does not
have sufficient funds.  
Only applicable to SPOT Market Orders | | pxAmendType | String | No | The price
amendment type for orders  
`0`: Do not allow the system to amend to order price if `px` exceeds the price
limit  
`1`: Allow the system to amend the price to the best available value within the
price limit if `px` exceeds the price limit  
The default value is `0` | | tradeQuoteCcy | String | No | The quote currency
used for trading. Only applicable to `SPOT`.  
The default value is the quote currency of the `instId`, for example: for
`BTC-USD`, the default is `USD`. | | stpMode | String | No | Self trade
prevention mode.  
`cancel_maker`,`cancel_taker`, `cancel_both`  
Cancel both does not support FOK.

The account-level acctStpMode will be used to place orders by default. The
default value of this field is `cancel_maker`. Users can log in to the webpage
through the master account to modify this configuration. Users can also utilize
the stpMode request parameter of the placing order endpoint to determine the
stpMode of a certain order. | | attachAlgoOrds | Array of objects | No | TP/SL
information attached when placing order | | \> attachAlgoClOrdId | String | No |
Client-supplied Algo ID when placing order attaching TP/SL  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters.  
It will be posted to `algoClOrdId` when placing TP/SL order once the general
order is filled completely. | | \> tpTriggerPx | String | Conditional |
Take-profit trigger price  
For condition TP order, if you fill in this parameter, you should fill in the
take-profit order price as well. | | \> tpTriggerRatio | String | Conditional |
Take profit trigger ratio, 0.3 represents 30%  
Only one of `tpTriggerPx` and `tpTriggerPct` can be passed  
Only applicable to FUTURES and SWAP. | | \> tpOrdPx | String | Conditional |
Take-profit order price  
For condition TP order, if you fill in this parameter, you should fill in the
take-profit trigger price as well.  
For limit TP order, you need to fill in this parameter, take-profit trigger
needn't to be filled.  
If the price is -1, take-profit will be executed at the market price. | | \>
tpOrdKind | String | No | TP order kind  
`condition`  
`limit`  
The default is `condition` | | \> slTriggerPx | String | Conditional | Stop-loss
trigger price  
If you fill in this parameter, you should fill in the stop-loss order price. | |
\> slTriggerRatio | String | Conditional | Stop profit trigger ratio, 0.3
represents 30%  
Only one of `slTriggerPx` and `slTriggerPct` can be passed  
Only applicable to FUTURES and SWAP. | | \> slOrdPx | String | Conditional |
Stop-loss order price  
If you fill in this parameter, you should fill in the stop-loss trigger price.  
If the price is -1, stop-loss will be executed at the market price. | | \>
tpTriggerPxType | String | No | Take-profit trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is last | | \> slTriggerPxType | String | No | Stop-loss trigger
price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is last | | \> sz | String | Conditional | Size. Only applicable to
TP order of split TPs, and it is required for TP order of split TPs | | \>
amendPxOnTriggerType | String | No | Whether to enable Cost-price SL. Only
applicable to SL order of split TPs. Whether `slTriggerPx` will move to `avgPx`
when the first TP order is triggered  
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
| \> tag                                     | String           | Order tag                                                                                                                          |
| \> ts                                      | String           | Timestamp when the order request processing is finished by our system, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| \> sCode                                   | String           | The code of the event execution result, `0` means success.                                                                         |
| \> sMsg                                    | String           | Rejection or success message of event execution.                                                                                   |
| inTime                                     | String           | Timestamp at REST gateway when the request is received, Unix timestamp format in microseconds, e.g. `1597026383085123`             |
| The time is recorded after authentication. |
| outTime                                    | String           | Timestamp at REST gateway when the response is sent, Unix timestamp format in microseconds, e.g. `1597026383085123`                |

In the \`Portfolio Margin\` account mode, either all orders are accepted by the
system successfully, or all orders are rejected by the system.

clOrdId  
clOrdId is a user-defined unique ID used to identify the order. It will be
included in the response parameters if you have specified during order
submission, and can be used as a request parameter to the endpoints to query,
cancel and amend orders.  
clOrdId must be unique among all pending orders and the current request.
