# Get History Order

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

Get history order(It only supports to get the data within 90days. The older data can be downloaded from web)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/order/orders-history

Request Example

```
curl "https://api.bitget.com/api/v2/mix/order/orders-history?productType=usdt-futures" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderId | String | No | Order ID<br>If both orderId and clientOid are entered, orderId prevails. 
| clientOid | String | No | Customize order ID<br>If both orderId and clientOid are entered, orderId prevails. 
| symbol | String | No | Trading pair, e.g. ETHUSDT 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the endId of the previous request response 
| orderSource | String | No | Order sources<br>normal: Normal order<br>market: market order<br>profit_market: Market TP order<br>loss_market: Market SL order<br>Trader_delegate: Elite trade order<br>trader_profit: Trader takes profit<br>trader_loss: Trader stops loss<br>reverse: Reversed orders<br>trader_reverse: Reversed elite trades<br>profit_limit: Take-profit limit order<br>loss_limit: Stop-loss limit order<br>liquidation: Liquidation order<br>delivery_close_long: close long positions<br>delivery_close_short: close short positions<br>pos_profit_limit: Position take-profit limit order<br>pos_profit_market: Position take-profit market order<br>pos_loss_limit: Position stop-loss limit order<br>pos_loss_market: Position stop-loss market order 
| startTime | String | No | Start timestamp<br>Unix timestamp in milliseconds format, e.g. 1597026383085<br>(For Managed Sub-Account, the StartTime cannot be earlier than the binding time) 
| endTime | String | No | End timestamp<br>Unix timestamp in milliseconds format, e.g. 1597026383085<br> 
| limit | String | No | Number of queries: Maximum: 100, default: 100 

Response Example

```
{    "code": "00000",    "data": {        "entrustedList": [            {                "symbol": "ethusdt",                "size": "100",                "orderId": "123",                "clientOid": "12321",                "baseVolume": "12.1",                "fee": "-0.00854",                "price": "1900",                "priceAvg": "1903",                "status": "filled",                "side": "buy",                "force": "gtc",                "totalProfits": "0",                "posSide": "long",                "marginCoin": "usdt",                "quoteVolume": "22001.21",                "leverage": "20",                "marginMode": "crossed",                "enterPointSource": "api",                "tradeSide": "open",                "posMode": "hedge_mode",                "posAvg": "",                "orderType": "limit",                "orderSource": "normal",                "cTime": "1627293504612",                "uTime": "1627293505612",                "presetStopSurplusPrice": "2001",                "presetStopLossPrice": "1800"            }        ],        "endId": "123"    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| endId | String | Last query ended order ID 
| entrustedList | List&lt;Object&gt; | Order list 
| &gt;symbol | String | Trading pair 
| &gt;size | String | Amount 
| &gt;orderId | String | Order ID 
| &gt;clientOid | String | Custom id 
| &gt;baseVolume | String | Amount of coins traded 
| &gt;fee | String | Transaction fee 
| &gt;price | String | Order price 
| &gt;priceAvg | String | Average order price 
| &gt;status | String | Order status<br><code>filled</code>: All filled<br><code>canceled</code>: the order is cancelled 
| &gt;side | String | Direction<br><code>buy</code>: buy, <code>sell</code>: sell 
| &gt;force | String | Order expiration date<br>(Confirm that if maker is supported)<br><code>ioc</code>: Immediate or cancel<br><code>fok</code>: Fill or kill<br><code>gtc</code>: Good till canceled<br><code>post_only</code>: Post only 
| &gt;totalProfits | String | Total PnL 
| &gt;posSide | String | Position direction<br><code>long</code>: two-way long position<br><code>short</code>: two-way short position<br><code>net</code>: one-way position 
| &gt;marginCoin | String | Margin coin 
| &gt;quoteVolume | String | Trading amount in quoting coin 
| &gt;leverage | String | Leverage 
| &gt;marginMode | String | Margin mode<br><code>isolated</code>: isolated margin<br><code>crossed</code>: cross margin 
| &gt;reduceOnly | String | Reduce only<br><code>YES</code>: Yes,<code>NO</code>: No 
| &gt;enterPointSource | String | Order source<br>WEB: Orders created on the website<br>API: Orders created on API<br>SYS: System managed orders, usually generated by forced liquidation logic<br>ANDROID: Orders created on the Android app<br>IOS: Orders created on the iOS app 
| &gt;tradeSide | String | Direction<br><code>close</code>: Close (open and close mode)<br><code>open</code>: Open (open and close mode)<br><code>reduce_close_long</code>: Liquidate partial long positions for hedge position mode<br><code>reduce_close_short</code>：Liquidate partial short positions for hedge position mode<br><code>burst_close_long</code>：Liquidate long positions for hedge position mode<br><code>burst_close_short</code>：Liquidate short positions for hedge position mode<br><code>offset_close_long</code>：Liquidate partial long positions for netting for hedge position mode<br><code>offset_close_short</code>：Liquidate partial short positions for netting for hedge position mode<br><code>delivery_close_long</code>：Delivery long positions for hedge position mode<br><code>delivery_close_short</code>：Delivery short positions for hedge position mode<br><code>dte_sys_adl_close_long</code>：ADL close long position for hedge position mode<br><code>dte_sys_adl_close_short</code>：ADL close short position for hedge position mode<br><code>buy_single</code>：Buy, one way postion mode<br><code>sell_single</code>：Sell, one way postion mode<br><code>reduce_buy_single</code>：Liquidate partial positions, buy, one way position mode<br><code>reduce_sell_single</code>：Liquidate partial positions, sell, one way position mode<br><code>burst_buy_single</code>：Liquidate short positions, buy, one way postion mode<br><code>burst_sell_single</code>：Liquidate partial positions, sell, one way position mode<br><code>delivery_sell_single</code>：Delivery sell, one way position mode<br><code>delivery_buy_single</code>：Delivery buy, one way position mode<br><code>dte_sys_adl_buy_in_single_side_mode</code>：ADL close position, buy, one way position mode<br><code>dte_sys_adl_sell_in_single_side_mode</code>：ADL close position, sell, one way position mode 
| &gt;posMode | String | Position mode<br><code>one_way_mode</code>: one-way position<br><code>hedge_mode</code>: two-way position 
| &gt;orderType | String | Order type<br>limit: limit order<br>market: market order 
| &gt;orderSource | String | Order sources<br>normal: Normal order<br>market: market order<br>profit_market: Market TP order<br>loss_market: Market SL order<br>Trader_delegate: Elite trade order<br>trader_profit: Trader takes profit<br>trader_loss: Trader stops loss<br>reverse: Reversed orders<br>trader_reverse: Reversed elite trades<br>profit_limit: Take-profit limit order<br>loss_limit: Stop-loss limit order<br>liquidation: Liquidation order<br>delivery_close_long: close long positions<br>delivery_close_short: close short positions<br>pos_profit_limit: Position take-profit limit order<br>pos_profit_market: Position take-profit market order<br>pos_loss_limit: Position stop-loss limit order<br>pos_loss_market: Position stop-loss market order<br>profit_chase: Take Profit Chase Order<br>loss_chase: Stop Loss Chase Order<br>follower_delegate: Follower Delegate Order<br>reduce_offset: Reduce Position Offset Order<br>market_risk: Best Price Risk Handling<br>plan_limit: Limit Plan Order<br>plan_market: Best Price Plan Order<br>pos_loss_limit: Position Stop Loss Limit<br>strategy_positive: Strategy-Positive Grid<br>strategy_reverse: Strategy-Reverse Grid<br>strategy_unlimited: Unlimited Strategy<br>move_limit: Limit Moving Take Profit and Stop Loss<br>move_market: Best Price Moving Take Profit and Stop Loss<br>tracking_limit: Limit Trailing Order<br>tracking_market: Best Price Trailing Order<br>strategy_dca_positive: DCA Strategy-Positive<br>strategy_dca_reverse: DCA Strategy-Reverse<br>strategy_oco_limit: Strategy-OCO Limit Order<br>strategy_oco_trigger: Strategy-OCO Trigger Order<br>modify_order_limit: Limit Modify Order<br>strategy_regular_buy: Strategy-Regular Buy<br>strategy_grid_middle: Strategy-Neutral Grid 
| &gt;cTime | String | Creation time 
| &gt;uTime | String | Last updated time 
| &gt;presetStopSurplusPrice | String | Take profit price 
| &gt;presetStopLossPrice | String | Stop loss price 
| &gt;posAvg | String | Average position price

> **Source:** https://www.bitget.com/api-doc/contract/trade/Get-Orders-History
