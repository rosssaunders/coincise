# Stop-profit and stop-loss plan orders

Speed limit is 10 times/s (UID)

### Description[​](#description "Direct link to Description")

Place a stop-profit and stop-loss plan order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/mix/order/place-tpsl-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/place-tpsl-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"marginCoin": "USDT","productType": "usdt-futures","symbol": "ethusdt","planType": "profit_plan","triggerPrice": "2000","triggerType": "mark_price","executePrice": "0","holdSide": "long","size": "1","rangeRate": "","clientOid": "1234"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| marginCoin | String | Yes | Margin currency (Capitalized) 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| symbol | String | Yes | Trading pair, e.g. ETHUSDT 
| planType | String | Yes | Take profit and stop loss type<br>profit_plan: take profit plan;<br>loss_plan: stop loss plan;<br>moving_plan: trailing stop;<br>pos_profit: position take profit;<br>pos_loss: position stop loss 
| triggerPrice | String | Yes | Trigger price 
| triggerType | String | No | Trigger type<br>fill_price: market price;<br>mark_price: mark price 
| executePrice | String | No | Execution price<br>If it is 0 or not filled in, it means market price execution.If it is greater than 0, it means limit price execution.<br>Do not fill in this parameters when <code>planType</code> is moving_plan, it only executs in market price. 
| holdSide | String | Yes | Two-way position:(long: long position, short: short position)<br>one-way position: (buy: long position, sell: short position) 
| size | String | Yes | Order quantity(base coin)<br>It's required when <code>planType</code> is profit_plan, loss_plan or moving_plan,and should be greater than 0;<br>It's NOT required when <code>planType</code> is pos_profit or pos_loss 
| rangeRate | String | No | Callback range<br>It's required only in <code>planType</code> is moving_plan 
| clientOid | String | No | Customize order ID 
| stpMode | String | No | STP Mode, default <code>none</code><br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders 

Response Example

```
{    "code": "00000",    "data": {        "orderId": "121212121212",        "clientOid": "BITGET#1627293504612"    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Trigger order ID 
| clientOid | String | Customized trigger order ID

> **Source:** https://www.bitget.com/api-doc/contract/plan/Place-Tpsl-Order
