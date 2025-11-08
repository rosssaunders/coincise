# Get History Trigger Order

Speed limit is 10 times/s (UID)

### Description[​](#description "Direct link to Description")

Can be used to query one or all previous common orders and trigger orders.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/order/orders-plan-history

Request Example

```
curl "https://api.bitget.com/api/v2/mix/order/orders-plan-history?planType=normal_plan&symbol=ETHUSDT&productType=usdt-futures" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderId | String | No | Order ID<br>Either orderId or clientOid is required. If both are entered, orderId prevails. 
| clientOid | String | No | Customize order ID<br>Either orderId or clientOid is required. If both are entered, orderId prevails. 
| planType | String | Yes | Order type<br><code>normal_plan</code>: trigger order<br><code>track_plan</code>: trailing stop order<br><code>profit_loss</code>: take profit and stop loss orders(including the profit_plan, loss_plan, moving_plan, pos_profit and pos_loss) 
| planStatus | String | No | Trigger order status<br>If not specified, all states will be queried<br>executed: the order triggered<br>fail_execute: Failed to trigger<br>cancelled: Cancelled 
| symbol | String | No | Trading pair, e.g. ETHUSDT 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the endId of the corresponding interface. 
| startTime | String | No | Start timestamp<br>Unix timestamp in milliseconds format, e.g. 1597026383085<br>(The maximum time span supported is three months. The default end time is three months if no value is set for the end time. )<br>(For Managed Sub-Account, the StartTime cannot be earlier than the binding time) 
| endTime | String | No | End timestamp<br>Unix timestamp in milliseconds format, e.g. 1597026383085<br>(The maximum time span supported is three months. The default start time is three months ago if no value is set for the start time. ) 
| limit | String | No | Number of queries: Default: 100, maximum: 100 

Response Example

```
{    "code": "00000",    "data": {        "entrustedList": [            {                "planType": "normal_plan",                "symbol": "ethusdt",                "size": "1",                "orderId": "123",                "executeOrderId": "123456",                "clientOid": "",                "planStatus": "executed",                "price": "1990",                "executePrice": "1990",                "priceAvg": "1999.2",                "baseVolume": "1",                "callbackRatio": "",                "triggerPrice": "1989",                "triggerType": "fill_price",                "side": "buy",                "posSide": "long",                "marginCoin": "usdt",                "marginMode": "crossed",                "enterPointSource": "api",                "tradeSide": "open",                "posMode": "hedge_mode",                "orderType": "limit",                "cTime": "1627293504612",                "uTime": "",                "stopSurplusExecutePrice": "2001",                "stopSurplusTriggerPrice": "2002",                "stopSurplusTriggerType": "fill_price",                "stopLossExecutePrice": "1800",                "stopLossTriggerPrice": "1820",                "stopLossTriggerType": "fill_price"            }        ],        "endId": "123"    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| entrustedList | List&lt;String&gt; | Order list 
| &gt;planType | String | Trigger order type<br>normal_plan: average trigger order<br>track_plan: trailing stop order 
| &gt;symbol | String | Trading pair 
| &gt;size | String | Amount 
| &gt;orderId | String | Trigger order ID 
| &gt;executeOrderId | String | the order ID after plan triggered 
| &gt;clientOid | String | Customized trigger order ID 
| &gt;planStatus | String | Order status<br><code>executed</code>: the order triggered<br><code>fail_execute</code>: Failed to trigger<br><code>cancelled</code>: Cancelled 
| &gt;price | String | Order price<br>For a common trigger order, it represents the order price.<br>For a trailing stop order, this field doesn't exist. 
| &gt;executePrice | String | Execute Price 
| &gt;baseVolume | String | Amount of coins traded<br>It is only available when the order status is triggered. 
| callbackRatio | String | Implementation of the callback rate. (Maximum 1-10)<br>Only exists for trailing stop orders. 
| &gt;triggerPrice | String | Trigger price<br>It appears for both common trigger orders and trailing stop orders. 
| &gt;triggerType | String | Trigger type<br>It appears for both common trigger orders and trailing stop orders.<br>fill_price: filled price<br>mark_price: mark price 
| &gt;side | String | Direction<br>Buy; Sell 
| &gt;posSide | String | Position direction<br><code>long</code>: hedge mode long position<br><code>short</code>: hedge mode short position<br><code>net</code>: one-way position 
| &gt;marginCoin | String | Margin coin 
| &gt;marginMode | String | Margin mode<br><code>isolated</code>: isolated margin<br><code>crossed</code>: cross margin 
| &gt;enterPointSource | String | Order source<br>WEB: Orders created on the website<br>API: Orders created on API<br>SYS: System managed orders, usually generated by forced liquidation logic<br>ANDROID: Orders created on the Android app<br>IOS: Orders created on the iOS app 
| &gt;tradeSide | String | Direction<br>open (open and close mode)<br>close: Close (open and close mode) 
| &gt;posMode | String | Position mode<br>one_way_mode: one-way mode<br>hedge_mode: hedge mode 
| &gt;orderType | String | Order type<br>limit: limit order<br>market 
| &gt;cTime | String | Creation time 
| &gt;uTime | String | Last updated time 
| &gt;stopSurplusExecutePrice | String | Setting take-profit strike price 
| &gt;stopSurplusTriggerPrice | String | Setting take-profit trigger price 
| &gt;stopSurplusTriggerType | String | Setting take-profit trigger type<br>fill_price: filled price<br>mark_price: mark price 
| &gt;stopLossExecutePrice | String | Setting stop-loss strike price 
| &gt;stopLossTriggerPrice | String | Setting stop-loss trigger price 
| &gt;stopLossTriggerType | String | Setting stop-loss trigger type<br>fill_price: filled price<br>mark_price: mark price 
| endId | String | The last Trigger order ID.<br>This is used when idLessThan/idGreaterThan is set as a range.

> **Source:** https://www.bitget.com/api-doc/contract/plan/orders-plan-history
