# Simultaneous Stop-profit and stop-loss plan orders

Speed limit is 10 times/s (UID)

### Description[​](#description "Direct link to Description")

Place a stop-profit and stop-loss plan order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/mix/order/place-pos-tpsl

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/place-pos-tpsl" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{        "marginCoin": "USDT",        "productType": "usdt-futures",        "symbol": "BTCUSDT",        "stopSurplusTriggerPrice": "69000",        "stopSurplusTriggerType": "mark_price",        "stopSurplusExecutePrice": "69001",        "stopLossTriggerPrice": "55001",        "stopLossTriggerType": "mark_price",        "stopLossExecutePrice": "55000",        "holdSide": "long"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| marginCoin | String | Yes | Margin currency 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| symbol | String | Yes | Trading pair, e.g. ETHUSDT 
| stopSurplusTriggerPrice | String | No | Take Profit Trigger price 
| stopSurplusSize | String | No | Order quantity(base coin)，if filled it's profit_plan，if not filled，it's pos_profit 
| stopSurplusTriggerType | String | No | Take Profit Trigger type<br>fill_price: market price;<br>mark_price: mark price 
| stopSurplusExecutePrice | String | No | Take Profit Execution price<br>If it is 0 or not filled in, it means market price execution.If it is greater than 0, it means limit price execution. 
| stopLossTriggerPrice | String | No | Stop Loss Trigger price 
| stopLossSize | String | No | Order quantity(base coin)，if filled it's loss_plan，if not filled，it's pos_loss 
| stopLossTriggerType | String | No | Stop Loss Trigger type<br>fill_price: market price;<br>mark_price: mark price 
| stopLossExecutePrice | String | No | Stop Loss Execution price<br>If it is 0 or not filled in, it means market price execution.If it is greater than 0, it means limit price execution.<br> 
| holdSide | String | Yes | Two-way position:(long: long position, short: short position)<br>one-way position: (buy: long position, sell: short position) 
| stpMode | String | No | STP Mode, default <code>none</code><br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders 
| stopSurplusClientOid | String | No | Take-profit order custom order ID 
| stopLossClientOid | String | No | Stop-loss order custom order ID 

Response Example

```
{  "code": "00000",  "data": [    {      "orderId": "xxxxxxxx",      "stopSurplusClientOid": "xxxxxxxx",      "stopLossClientOid": "xxxxxxxx"    },    {      "orderId": "xxxxxxxx",      "stopSurplusClientOid": "xxxxxxxx",      "stopLossClientOid": "xxxxxxxx"    }  ],  "msg": "success",  "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Trigger order ID 
| stopSurplusClientOid | String | Take-profit order custom order ID 
| stopLossClientOid | String | Stop-loss order custom order ID

> **Source:** https://www.bitget.com/api-doc/contract/plan/Place-Pos-Tpsl-Order
