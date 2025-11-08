# GET / Order history (last 7 days)

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)

### GET / Order history (last 7 days)

Get completed orders which are placed in the last 7 days, including those placed 7 days ago but completed in the last 7 days.  

The incomplete orders that have been canceled are only reserved for 2 hours.

#### Rate Limit: 40 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/trade/orders-history`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | yes | Instrument type  
`SPOT`  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` |
| instFamily | String | No | Instrument family  
Applicable to `FUTURES`/`SWAP`/`OPTION` |
| instId | String | No | Instrument ID, e.g. `BTC-USDT` |
| ordType | String | No | Order type  
`market`: market order  
`limit`: limit order  
`post_only`: Post-only order  
`fok`: Fill-or-kill order  
`ioc`: Immediate-or-cancel order  
`optimal_limit_ioc`: Market order with immediate-or-cancel order  
`mmp`: Market Maker Protection (only applicable to Option in Portfolio Margin mode)  
`mmp_and_post_only`: Market Maker Protection and Post-only order(only applicable to Option in Portfolio Margin mode)  
`op_fok`: Simple options (fok) |
| state | String | No | State  
`canceled`  
`filled`  
`mmp_canceled`: Order canceled automatically due to Market Maker Protection |
| category | String | No | Category  
`twap`  
`adl`  
`full_liquidation`  
`partial_liquidation`  
`delivery`  
`ddh`: Delta dynamic hedge |
| after | String | No | Pagination of data to return records earlier than the requested `ordId` |
| before | String | No | Pagination of data to return records newer than the requested `ordId` |
| begin | String | No | Filter with a begin timestamp `cTime`. Unix timestamp format in milliseconds, e.g. 1597026383085 |
| end | String | No | Filter with an end timestamp `cTime`. Unix timestamp format in milliseconds, e.g. 1597026383085 |
| limit | String | No | Number of results per request. The maximum is `100`; The default is `100` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type |
| instId | String | Instrument ID |
| tgtCcy | String | Order quantity unit setting for `sz`  
`base_ccy`: Base currency ,`quote_ccy`: Quote currency  
Only applicable to `SPOT` Market Orders  
Default is `quote_ccy` for buy, `base_ccy` for sell |
| ccy | String | Margin currency  
Applicable to all `isolated` `MARGIN` orders and `cross` `MARGIN` orders in `Futures mode`, `FUTURES` and `SWAP` contracts. |
| ordId | String | Order ID |
| clOrdId | String | Client Order ID as assigned by the client |
| tag | String | Order tag |
| px | String | Price  
For options, use coin as unit (e.g. BTC, ETH) |
| pxUsd | String | Options price in USDOnly applicable to options; return "" for other instrument types |
| pxVol | String | Implied volatility of the options orderOnly applicable to options; return "" for other instrument types |
| pxType | String | Price type of options  
`px`: Place an order based on price, in the unit of coin (the unit for the request parameter px is BTC or ETH)  
`pxVol`: Place an order based on pxVol  
`pxUsd`: Place an order based on pxUsd, in the unit of USD (the unit for the request parameter px is USD) |
| sz | String | Quantity to buy or sell |
| ordType | String | Order type  
`market`: market order  
`limit`: limit order  
`post_only`: Post-only order  
`fok`: Fill-or-kill order  
`ioc`: Immediate-or-cancel order  
`optimal_limit_ioc`: Market order with immediate-or-cancel order  
`mmp`: Market Maker Protection (only applicable to Option in Portfolio Margin mode)  
`mmp_and_post_only`: Market Maker Protection and Post-only order(only applicable to Option in Portfolio Margin mode)  
`op_fok`: Simple options (fok) |
| side | String | Order side |
| posSide | String | Position side |
| tdMode | String | Trade mode |
| accFillSz | String | Accumulated fill quantity |
| fillPx | String | Last filled price. If none is filled, it will return "". |
| tradeId | String | Last trade ID |
| fillSz | String | Last filled quantity |
| fillTime | String | Last filled time |
| avgPx | String | Average filled price. If none is filled, it will return "". |
| state | String | State  
`canceled`  
`filled`  
`mmp_canceled` |
| lever | String | Leverage, from `0.01` to `125`.  
Only applicable to `MARGIN/FUTURES/SWAP` |
| attachAlgoClOrdId | String | Client-supplied Algo ID when placing order attaching TP/SL. |
| tpTriggerPx | String | Take-profit trigger price. |
| tpTriggerPxType | String | Take-profit trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price |
| tpOrdPx | String | Take-profit order price. |
| slTriggerPx | String | Stop-loss trigger price. |
| slTriggerPxType | String | Stop-loss trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price |
| slOrdPx | String | Stop-loss order price. |
| attachAlgoOrds | Array of objects | TP/SL information attached when placing order |
| \> attachAlgoId | String | The order ID of attached TP/SL order. It can be used to identity the TP/SL order when amending. It will not be posted to algoId when placing TP/SL order after the general order is filled completely. |
| \> attachAlgoClOrdId | String | Client-supplied Algo ID when placing order attaching TP/SL  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.  
It will be posted to `algoClOrdId` when placing TP/SL order once the general order is filled completely. |
| \> tpOrdKind | String | TP order kind  
`condition`  
`limit` |
| \> tpTriggerPx | String | Take-profit trigger price. |
| \> tpTriggerPxType | String | Take-profit trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price |
| \> tpOrdPx | String | Take-profit order price. |
| \> slTriggerPx | String | Stop-loss trigger price. |
| \> slTriggerPxType | String | Stop-loss trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price |
| \> slOrdPx | String | Stop-loss order price. |
| \> sz | String | Size. Only applicable to TP order of split TPs |
| \> amendPxOnTriggerType | String | Whether to enable Cost-price SL. Only applicable to SL order of split TPs.  
`0`: disable, the default value  
`1`: Enable |
| \> failCode | String | The error code when failing to place TP/SL order, e.g. 51020  
The default is "" |
| \> failReason | String | The error reason when failing to place TP/SL order.  
The default is "" |
| linkedAlgoOrd | Object | Linked SL order detail, only applicable to the order that is placed by one-cancels-the-other (OCO) order that contains the TP limit order. |
| \> algoId | String | Algo ID |
| stpId | String | ~Self trade prevention ID  
Return "" if self trade prevention is not applicable~ (deprecated) |
| stpMode | String | Self trade prevention mode |
| feeCcy | String | Fee currency  
For maker sell orders of Spot and Margin, this represents the quote currency. For all other cases, it represents the currency in which fees are charged. |
| fee | String | Fee amount  
For Spot and Margin (excluding maker sell orders): accumulated fee charged by the platform, always negative  
For maker sell orders in Spot and Margin, Expiry Futures, Perpetual Futures and Options: accumulated fee and rebate (always in quote currency for maker sell orders in Spot and Margin) |
| rebateCcy | String | Rebate currency  
For maker sell orders of Spot and Margin, this represents the base currency. For all other cases, it represents the currency in which rebates are paid. |
| rebate | String | Rebate amount, only applicable to Spot and Margin  
For maker sell orders: ~Accumulated fee and~ rebate amount in the unit of base currency.  
For all other cases, it represents the maker rebate amount, always positive, return "" if no rebate. |
| source | String | Order source  
`6`: The normal order triggered by the `trigger order`  
`7`:The normal order triggered by the `TP/SL order`  
`13`: The normal order triggered by the algo order  
`25`:The normal order triggered by the `trailing stop order`  
`34`: The normal order triggered by the chase order |
| pnl | String | Profit and loss (excluding the fee).  
Applicable to orders which have a trade and aim to close position. It always is 0 in other conditions |
| category | String | Category  
`normal`  
`twap`  
`adl`  
`full_liquidation`  
`partial_liquidation`  
`delivery`  
`ddh`: Delta dynamic hedge  
`auto_conversion` |
| reduceOnly | String | Whether the order can only reduce the position size. Valid options: true or false. |
| cancelSource | String | Code of the cancellation source. |
| cancelSourceReason | String | Reason for the cancellation. |
| algoClOrdId | String | Client-supplied Algo ID. There will be a value when algo order attaching `algoClOrdId` is triggered, or it will be "". |
| algoId | String | Algo ID. There will be a value when algo order is triggered, or it will be "". |
| isTpLimit | String | Whether it is TP limit order. true or false |
| uTime | String | Update time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| cTime | String | Creation time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| quickMgnType | String | ~Quick Margin type, Only applicable to Quick Margin Mode of isolated margin  
`manual`, `auto_borrow`, `auto_repay`~ (Deprecated) |
| tradeQuoteCcy | String | The quote currency used for trading. |
