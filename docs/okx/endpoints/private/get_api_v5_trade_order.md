# GET /api/v5/trade/order

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-details](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-details)

### GET / Order details

Retrieve order details.

#### Rate Limit: 60 requests per 2 seconds

#### Rate limit rule (except Options): User ID + Instrument ID

#### Rate limit rule (Options only): User ID + Instrument Family

#### Permission: Read

#### HTTP Request

`GET /api/v5/trade/order`

#### Request Parameters

| Parameter                                                                                  | Type   | Required    | Description                               |
| ------------------------------------------------------------------------------------------ | ------ | ----------- | ----------------------------------------- |
| instId                                                                                     | String | Yes         | Instrument ID, e.g. `BTC-USDT`            |
| Only applicable to live instruments                                                        |
| ordId                                                                                      | String | Conditional | Order ID                                  |
| Either `ordId` or `clOrdId` is required, if both are passed, `ordId` will be used          |
| clOrdId                                                                                    | String | Conditional | Client Order ID as assigned by the client |
| If the `clOrdId` is associated with multiple orders, only the latest one will be returned. |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| instType      | String   | Instrument type |

`SPOT`  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` | | instId | String | Instrument ID | | tgtCcy | String | Order
quantity unit setting for `sz`  
`base_ccy`: Base currency ,`quote_ccy`: Quote currency  
Only applicable to `SPOT` Market Orders  
Default is `quote_ccy` for buy, `base_ccy` for sell | | ccy | String | Margin
currency  
Applicable to all `isolated` `MARGIN` orders and `cross` `MARGIN` orders in
`Futures mode`, `FUTURES` and `SWAP` contracts. | | ordId | String | Order ID |
| clOrdId | String | Client Order ID as assigned by the client | | tag | String
| Order tag | | px | String | Price  
For options, use coin as unit (e.g. BTC, ETH) | | pxUsd | String | Options price
in USDOnly applicable to options; return "" for other instrument types | | pxVol
| String | Implied volatility of the options orderOnly applicable to options;
return "" for other instrument types | | pxType | String | Price type of
options  
`px`: Place an order based on price, in the unit of coin (the unit for the
request parameter px is BTC or ETH)  
`pxVol`: Place an order based on pxVol  
`pxUsd`: Place an order based on pxUsd, in the unit of USD (the unit for the
request parameter px is USD) | | sz | String | Quantity to buy or sell | | pnl |
String | Profit and loss (excluding the fee).  
Applicable to orders which have a trade and aim to close position. It always is
0 in other conditions | | ordType | String | Order type  
`market`: Market order  
`limit`: Limit order  
`post_only`: Post-only order  
`fok`: Fill-or-kill order  
`ioc`: Immediate-or-cancel order  
`optimal_limit_ioc`: Market order with immediate-or-cancel order  
`mmp`: Market Maker Protection (only applicable to Option in Portfolio Margin
mode)  
`mmp_and_post_only`: Market Maker Protection and Post-only order(only applicable
to Option in Portfolio Margin mode)  
`op_fok`: Simple options (fok) | | side | String | Order side | | posSide |
String | Position side | | tdMode | String | Trade mode | | accFillSz | String |
Accumulated fill quantity  
The unit is `base_ccy` for SPOT and MARGIN, e.g. BTC-USDT, the unit is BTC; For
market orders, the unit both is `base_ccy` when the tgtCcy is `base_ccy` or
`quote_ccy`;  
The unit is contract for `FUTURES`/`SWAP`/`OPTION` | | fillPx | String | Last
filled price. If none is filled, it will return "". | | tradeId | String | Last
traded ID | | fillSz | String | Last filled quantity  
The unit is `base_ccy` for SPOT and MARGIN, e.g. BTC-USDT, the unit is BTC; For
market orders, the unit both is `base_ccy` when the tgtCcy is `base_ccy` or
`quote_ccy`;  
The unit is contract for `FUTURES`/`SWAP`/`OPTION` | | fillTime | String | Last
filled time | | avgPx | String | Average filled price. If none is filled, it
will return "". | | state | String | State  
`canceled`  
`live`  
`partially_filled`  
`filled`  
`mmp_canceled` | | stpId | String | ~Self trade prevention ID  
Return "" if self trade prevention is not applicable~ (deprecated) | | stpMode |
String | Self trade prevention mode | | lever | String | Leverage, from `0.01`
to `125`.  
Only applicable to `MARGIN/FUTURES/SWAP` | | attachAlgoClOrdId | String |
Client-supplied Algo ID when placing order attaching TP/SL. | | tpTriggerPx |
String | Take-profit trigger price. | | tpTriggerPxType | String | Take-profit
trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price | | tpOrdPx | String | Take-profit order price. | |
slTriggerPx | String | Stop-loss trigger price. | | slTriggerPxType | String |
Stop-loss trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price | | slOrdPx | String | Stop-loss order price. | |
attachAlgoOrds | Array of objects | TP/SL information attached when placing
order | | \> attachAlgoId | String | The order ID of attached TP/SL order. It
can be used to identity the TP/SL order when amending. It will not be posted to
algoId when placing TP/SL order after the general order is filled completely. |
| \> attachAlgoClOrdId | String | Client-supplied Algo ID when placing order
attaching TP/SL  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters.  
It will be posted to `algoClOrdId` when placing TP/SL order once the general
order is filled completely. | | \> tpOrdKind | String | TP order kind  
`condition`  
`limit` | | \> tpTriggerPx | String | Take-profit trigger price. | | \>
tpTriggerRatio | String | Take profit trigger ratio, 0.3 represents 30%  
Only applicable to FUTURES and SWAP. | | \> tpTriggerPxType | String |
Take-profit trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price | | \> tpOrdPx | String | Take-profit order price. | | \>
slTriggerPx | String | Stop-loss trigger price. | | \> slTriggerRatio | String |
Stop profit trigger ratio, 0.3 represents 30%  
Only applicable to FUTURES and SWAP. | | \> slTriggerPxType | String | Stop-loss
trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price | | \> slOrdPx | String | Stop-loss order price. | | \> sz |
String | Size. Only applicable to TP order of split TPs | | \>
amendPxOnTriggerType | String | Whether to enable Cost-price SL. Only applicable
to SL order of split TPs.  
`0`: disable, the default value  
`1`: Enable | | \> amendPxOnTriggerType | String | Whether to enable Cost-price
SL. Only applicable to SL order of split TPs.  
`0`: disable, the default value  
`1`: Enable | | \> failCode | String | The error code when failing to place
TP/SL order, e.g. 51020  
The default is "" | | \> failReason | String | The error reason when failing to
place TP/SL order.  
The default is "" | | linkedAlgoOrd | Object | Linked SL order detail, only
applicable to the order that is placed by one-cancels-the-other (OCO) order that
contains the TP limit order. | | \> algoId | String | Algo ID | | feeCcy |
String | Fee currency  
For maker sell orders of Spot and Margin, this represents the quote currency.
For all other cases, it represents the currency in which fees are charged. | |
fee | String | Fee amount  
For Spot and Margin (excluding maker sell orders): accumulated fee charged by
the platform, always negative  
For maker sell orders in Spot and Margin, Expiry Futures, Perpetual Futures and
Options: accumulated fee and rebate (always in quote currency for maker sell
orders in Spot and Margin) | | rebateCcy | String | Rebate currency  
For maker sell orders of Spot and Margin, this represents the base currency. For
all other cases, it represents the currency in which rebates are paid. | |
rebate | String | Rebate amount, only applicable to Spot and Margin  
For maker sell orders: ~Accumulated fee and~ rebate amount in the unit of base
currency.  
For all other cases, it represents the maker rebate amount, always positive,
return "" if no rebate. | | source | String | Order source  
`6`: The normal order triggered by the `trigger order`  
`7`:The normal order triggered by the `TP/SL order`  
`13`: The normal order triggered by the algo order  
`25`:The normal order triggered by the `trailing stop order`  
`34`: The normal order triggered by the chase order | | category | String |
Category  
`normal`  
`twap`  
`adl`  
`full_liquidation`  
`partial_liquidation`  
`delivery`  
`ddh`: Delta dynamic hedge  
`auto_conversion` | | reduceOnly | String | Whether the order can only reduce
the position size. Valid options: true or false. | | isTpLimit | String |
Whether it is TP limit order. true or false | | cancelSource | String | Code of
the cancellation source. | | cancelSourceReason | String | Reason for the
cancellation. | | quickMgnType | String | Quick Margin type, Only applicable to
Quick Margin Mode of isolated margin  
`manual`, `auto_borrow`, `auto_repay` | | algoClOrdId | String | Client-supplied
Algo ID. There will be a value when algo order attaching `algoClOrdId` is
triggered, or it will be "". | | algoId | String | Algo ID. There will be a
value when algo order is triggered, or it will be "". | | uTime | String |
Update time, Unix timestamp format in milliseconds, e.g. `1597026383085` | |
cTime | String | Creation time, Unix timestamp format in milliseconds, e.g.
`1597026383085` | | tradeQuoteCcy | String | The quote currency used for
trading. |
