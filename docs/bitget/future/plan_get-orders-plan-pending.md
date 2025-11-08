# Get Pending Trigger Order

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

Can be used to query one or all current trigger orders.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/order/orders-plan-pending

Request Example

```
curl -X GET "https://api.bitget.com/api/v2/mix/order/orders-plan-pending?orderId=123&clientOid=1234&planType=profit_loss&productType=USDT-FUTURES" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderId | String | No | Trigger order ID<br>Either orderId or clientOid is required. If both are entered, orderId prevails. 
| clientOid | String | No | Customized trigger order ID<br>Either orderId or clientOid is required. If both are entered, orderId prevails. 
| symbol | String | No | Trading pair, e.g. ETHUSDT 
| planType | String | Yes | Trigger order type<br>normal_plan: average trigger order<br>track_plan: trailing stop order<br>profit_loss: take profit and stop loss orders(including the profit_plan, loss_plan, moving_plan, pos_profit and pos_loss) 
| symbol | String | No | Trading pair, e.g. ETHUSDT 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the endId of the corresponding interface. 
| startTime | String | No | Start timestamp<br>Unix timestamp in milliseconds format, e.g. 1597026383085<br>(The maximum time span supported is three months. The default end time is three months if no value is set for the end time. ) 
| endTime | String | No | End timestamp<br>Unix timestamp in milliseconds format, e.g. 1597026383085<br>(The maximum time span supported is three months. The default start time is three months ago if no value is set for the start time. ) 
| limit | String | No | Number of queries: Default: 100, maximum: 100 

Response Example

```
{    "code": "00000",    "data": {        "entrustedList": [            {                "planType": "normal_plan",                "symbol": "ethusdt",                "size": "1",                "orderId": "123",                "clientOid": "121212",                "price": "1900",                "executePrice": "1900",                "callbackRatio": "",                "triggerPrice": "1901",                "triggerType": "mark_price",                "planStatus": "not_trigger",                "side": "buy",                "posSide": "long",                "marginCoin": "usdt",                "marginMode": "crossed",                "enterPointSource": "api",                "tradeSide": "open",                "posMode": "hedge_mode",                "orderType": "limit",                "orderSource": "normal",                "cTime": "1627293504612",                "uTime": "",                "stopSurplusExecutePrice": "2001",                "stopSurplusTriggerPrice": "2002",                "stopSurplusTriggerType": "fill_price",                "stopLossExecutePrice": "1800",                "stopLossTriggerPrice": "1820",                "stopLossTriggerType": "fill_price"            }        ],        "endId": "123"    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| entrustedList | List&lt;String&gt; | Order list 
| &gt;planType | String | Trigger order type<br>normal_plan: average trigger order<br>track_plan: trailing stop order 
| &gt;symbol | String | Trading pair 
| &gt;size | String | Amount 
| &gt;orderId | String | Trigger order ID 
| &gt;clientOid | String | Customized trigger order ID 
| &gt;price | String | Order execute price<br>For a common trigger order, it represents the order execute price.<br>For a trailing stop order, the value doesn't exist. 
| &gt;executePrice | String | Execute Price 
| &gt;callbackRatio | String | Implementation of the callback rate. (Range 1-10)<br>Only exists when the order is a trailing stop order. 
| &gt;triggerPrice | String | Trigger price<br>It appears for both common trigger orders and trailing stop orders. 
| &gt;triggerType | String | Trigger type<br>It appears for both common trigger orders and trailing stop orders.<br>fill_price: filled price<br>mark_price: mark price<br>index_price: index price 
| &gt;planStatus | String | Order status<br>For a current trigger order, the status will only be <code>live</code> 
| &gt;side | String | Direction<br>Buy; Sell 
| &gt;posSide | String | Position direction<br>long: hedge mode long position<br>short: hedge mode short position<br>net: one-way position 
| &gt;marginCoin | String | Margin coin 
| &gt;marginMode | String | Margin mode<br><code>isolated</code>: isolated margin mode<br><code>crossed</code>: crossed margin 
| &gt;enterPointSource | String | Order source<br>WEB: Orders created on the website<br>API: Orders created on API<br>SYS: System managed orders, usually generated by forced liquidation logic<br>ANDROID: Orders created on the Android app<br>IOS: Orders created on the iOS app 
| &gt;tradeSide | String | Direction<br>open: Open (hedge-mode)<br>close: Close (hedge-mode) 
| &gt;posMode | String | Position mode<br>one_way_mode: one-way mode<br>hedge_mode: hedge mode 
| &gt;orderType | String | Order type<br><code>limit</code>: limit order<br><code>market</code>: market order 
| &gt;orderSource | String | Order sources<br>normal: Normal order<br>market: Market order<br>profit_market: Market TP order<br>loss_market: Market SL order<br>Trader_delegate: Elite trade order<br>trader_profit: Trader takes profit<br>trader_loss: Trader stops loss<br>trader_reverse: Reversed elite trades<br>profit_limit: Take-profit limit order<br>loss_limit: Stop-loss limit order<br>delivery_close_short: close short positions<br>pos_profit_limit: Position take-profit limit order<br>pos_profit_market: Position take-profit market order<br>pos_loss_limit: Position stop-loss limit order<br>pos_loss_market: Position stop-loss market order 
| &gt;cTime | String | Creation time 
| &gt;uTime | String | Last updated time 
| &gt;stopSurplusExecutePrice | String | Setting take profit execution price 
| &gt;stopSurplusTriggerPrice | String | Setting take-profit trigger price 
| &gt;stopSurplusTriggerType | String | Setting take-profit trigger type<br>fill_price: filled price<br>mark_price: mark price<br>index_price: index price 
| &gt;stopLossExecutePrice | String | Setting stop loss execution price 
| &gt;stopLossTriggerPrice | String | Setting stop-loss trigger price 
| &gt;stopLossTriggerType | String | Setting stop-loss trigger type<br>fill_price: filled price<br>mark_price: mark price<br>index_price: index price 
| endId | String | This is used when idLessThan/idGreaterThan is set as a range.

> **Source:** https://www.bitget.com/api-doc/contract/plan/get-orders-plan-pending
