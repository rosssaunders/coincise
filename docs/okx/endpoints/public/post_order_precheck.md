# POST / Order precheck

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-order-precheck](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-order-precheck)

### POST / Order precheck

This endpoint is used to precheck the account information before and after placing the order.  
Only applicable to `Multi-currency margin mode`, and `Portfolio margin mode`.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/trade/order-precheck`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. `BTC-USDT` |
| tdMode | String | Yes | Trade mode  
Margin mode `cross` `isolated`  
Non-Margin mode `cash`  
`spot_isolated` (only applicable to SPOT lead trading, `tdMode` should be `spot_isolated` for `SPOT` lead trading.) |
| side | String | Yes | Order side, `buy` `sell` |
| posSide | String | Conditional | Position side  
The default is `net` in the `net` mode  
It is required in the `long/short` mode, and can only be `long` or `short`.  
Only applicable to `FUTURES`/`SWAP`. |
| ordType | String | Yes | Order type  
`market`: Market order  
`limit`: Limit order  
`post_only`: Post-only order  
`fok`: Fill-or-kill order  
`ioc`: Immediate-or-cancel order  
`optimal_limit_ioc`: Market order with immediate-or-cancel order (applicable only to Expiry Futures and Perpetual Futures). |
| sz | String | Yes | Quantity to buy or sell |
| px | String | Conditional | Order price. Only applicable to `limit`,`post_only`,`fok`,`ioc`,`mmp`,`mmp_and_post_only` order. |
| reduceOnly | Boolean | No | Whether orders can only reduce in position size.  
Valid options: `true` or `false`. The default value is `false`.  
Only applicable to `MARGIN` orders, and `FUTURES`/`SWAP` orders in `net` mode  
Only applicable to `Futures mode` and `Multi-currency margin` |
| tgtCcy | String | No | Whether the target currency uses the quote or base currency.  
`base_ccy`: Base currency ,`quote_ccy`: Quote currency  
Only applicable to `SPOT` Market Orders  
Default is `quote_ccy` for buy, `base_ccy` for sell |
| attachAlgoOrds | Array of objects | No | TP/SL information attached when placing order |
| \> attachAlgoClOrdId | String | No | Client-supplied Algo ID when placing order attaching TP/SL  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.  
It will be posted to `algoClOrdId` when placing TP/SL order once the general order is filled completely. |
| \> tpTriggerPx | String | Conditional | Take-profit trigger price  
For condition TP order, if you fill in this parameter, you should fill in the take-profit order price as well. |
| \> tpOrdPx | String | Conditional | Take-profit order price  
  
For condition TP order, if you fill in this parameter, you should fill in the take-profit trigger price as well.  
For limit TP order, you need to fill in this parameter, take-profit trigger needn‘t to be filled.  
If the price is -1, take-profit will be executed at the market price. |
| \> tpOrdKind | String | No | TP order kind  
`condition`  
`limit`  
The default is `condition` |
| \> slTriggerPx | String | Conditional | Stop-loss trigger price  
If you fill in this parameter, you should fill in the stop-loss order price. |
| \> slOrdPx | String | Conditional | Stop-loss order price  
If you fill in this parameter, you should fill in the stop-loss trigger price.  
If the price is -1, stop-loss will be executed at the market price. |
| \> tpTriggerPxType | String | No | Take-profit trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is last |
| \> slTriggerPxType | String | No | Stop-loss trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is last |
| \> sz | String | Conditional | Size. Only applicable to TP order of split TPs, and it is required for TP order of split TPs |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| adjEq | String | Current adjusted / Effective equity in `USD` |
| adjEqChg | String | After placing order, changed quantity of adjusted / Effective equity in `USD` |
| imr | String | Current initial margin requirement in `USD` |
| imrChg | String | After placing order, changed quantity of initial margin requirement in `USD` |
| mmr | String | Current Maintenance margin requirement in `USD` |
| mmrChg | String | After placing order, changed quantity of maintenance margin requirement in `USD` |
| mgnRatio | String | Current Maintenance margin ratio in `USD` |
| mgnRatioChg | String | After placing order, changed quantity of Maintenance margin ratio in `USD` |
| availBal | String | Current available balance in margin coin currency, only applicable to turn auto borrow off |
| availBalChg | String | After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| liqPx | String | Current estimated liquidation price |
| liqPxDiff | String | After placing order, the distance between estimated liquidation price and mark price |
| liqPxDiffRatio | String | After placing order, the distance rate between estimated liquidation price and mark price |
| posBal | String | Current positive asset, only applicable to margin isolated position |
| posBalChg | String | After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| liab | String | Current liabilities of currency  
For cross, it is cross liabilities  
For isolated position, it is isolated liabilities |
| liabChg | String | After placing order, changed quantity of liabilities  
For cross, it is cross liabilities  
For isolated position, it is isolated liabilities |
| liabChgCcy | String | After placing order, the unit of changed liabilities quantity  
only applicable cross and in auto borrow |
| type | String | Unit type of positive asset, only applicable to margin isolated position  
`1`: it is both base currency before and after placing order  
`2`: before plaing order, it is base currency. after placing order, it is quota currency.  
`3`: before plaing order, it is quota currency. after placing order, it is base currency  
`4`: it is both quota currency before and after placing order |
