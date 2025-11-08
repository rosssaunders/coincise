# Place Trigger Order

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

The interface for placing an trigger or trailing stop order with TP/SL setting feature.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/mix/order/place-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/place-plan-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{ "planType":"normal_plan", "symbol": "BTCUSDT", "productType": "USDT-FUTURES", "marginMode": "isolated", "marginCoin": "USDT", "size": "0.01", "price": "24000", "callbackRatio": "", "triggerPrice": "24100", "triggerType": "mark_price", "side": "buy", "tradeSide": "open", "orderType":"limit", "clientOid": "121212121212", "reduceOnly": "NO", "presetStopSurplusPrice": "", "stopSurplusTriggerPrice": "", "stopSurplusTriggerType": "", "presetStopLossPrice": "", "stopLossTriggerPrice": "", "stopLossTriggerType": "" }'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| planType | String | Yes | Trigger order type<br><code>normal_plan</code>: Trigger order<br><code>track_plan</code>: Trailing stop order 
| symbol | String | Yes | Trading pair, e.g. ETHUSDT 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| marginMode | String | Yes | Position mode<br><code>isolated</code>: isolated margin<br><code>crossed</code>: cross margin 
| marginCoin | String | Yes | Margin coin 
| size | String | Yes | Amount(base coin) 
| price | String | No | Price<br>1. For <code>track_plan</code>, it must be empty.<br>2. For <code>normal_plan</code>, it is required when orderType is <code>limit</code>;It must be empty when orderType is <code>market</code>. 
| callbackRatio | String | No | Callback rate (applies to trailing stop orders only)<br>1. Required for trailing stop orders and the rate cannot be greater than 10. 
| triggerPrice | String | Yes | Trigger price 
| triggerType | String | Yes | Trigger type<br>1. Required when placing a trigger order or a trailing stop order.<br>mark_price: Mark price<br>fill_price: Lastest price 
| side | String | Yes | Order direction<br><code>buy</code>; <code>sell</code> 
| tradeSide | String | No | Direction<br><code>open</code>: Open; <code>close</code>: Close<br>1. Only required in hedge position mode<br>Notes:<br>For open long, "side" fill in "buy"; tradeSide should be "open"<br>For open short, "side" fill in "sell"; tradeSide should be "open"<br>For close long, "side" fill in "buy"; "tradeSide" should be "close"<br>For close short, "side" fill in "sell"; "tradeSide" should be "close" 
| orderType | String | Yes | Order type<br><code>limit</code>: limit order<br><code>market</code>: market order<br>1. For <code>track_plan</code>, it is required and must be <code>market</code> 
| clientOid | String | No | Customize order ID 
| reduceOnly | String | No | Whether or not to just reduce the position.<br><code>yes</code>: Yes; <code>no</code>: No(default)<br>1. Only applicable in buy/sell (one-way position) mode 
| stopSurplusTriggerPrice | String | No | Take-profit trigger price/Take-profit ratio<br>1. For <code>normal_plan</code>, it represents the take-profit trigger price<br>2. For <code>track_plan</code>, it represents the take-profit percentage, with a maximum of 999.99 and a minimum of 0.01<br>3. If left empty or set to 0, no take-profit will be set by default 
| stopSurplusExecutePrice | String | No | Take-profit execute price<br>1. For <code>track_plan</code>, it must be empty.<br>2. For a <code>normal_plan</code> that has stopSurplusTriggerPrice parameter set, if it is empty or set to 0, it represents a market order execution; if not empty and greater than 0, it represents a limit order execution 
| stopSurplusTriggerType | String | No | Take-profit trigger type<br><code>fill_price</code>: Lastest price<br><code>mark_price</code>: Mark price<br>1. For orders that have stopSurplusTriggerPrice parameter set, it is required<br>2. For <code>track_plan</code>, it only accepts <code>fill_price</code> 
| stopLossTriggerPrice | String | No | Stop-loss trigger price/Stop-loss ratio<br>1. For <code>normal_plan</code>, it represents the stop-loss trigger price<br>2. For <code>track_plan</code>, it represents the stop-loss percentage, with a maximum of 999.99 and a minimum of 0.01<br>3. If left empty or set to 0, no stop-loss will be set by default 
| stopLossExecutePrice | String | No | Stop-loss execute price<br>1. For <code>track_plan</code>, it must be empty.<br>2. For a <code>normal_plan</code> that has stopLossTriggerPrice parameter set, if it is empty or set to 0, it represents a market order execution; if not empty and greater than 0, it represents a limit order execution 
| stopLossTriggerType | String | No | Stop-loss trigger type<br><code>fill_price</code>: Lastest price<br><code>mark_price</code>: Mark price<br>1. For orders that have stopLossTriggerPrice parameter set, it is required<br>2. For <code>track_plan</code>, it only accepts <code>fill_price</code> 
| stpMode | String | No | STP Mode<br><code>none</code> not setting STP(default)<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders 

Response Example

```
{    "code": "00000",    "data": {        "orderId": "121212121212",        "clientOid": "BITGET#121212121212"    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Trigger order ID 
| clientOid | String | Customized trigger order ID

> **Source:** https://www.bitget.com/api-doc/contract/plan/Place-Plan-Order
