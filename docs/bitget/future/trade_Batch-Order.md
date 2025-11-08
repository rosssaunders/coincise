# Batch Order

*   Rate limit: 5 requests/second/UID
*   Rate limit: 1 request/second/UID for **copy trading traders**

### Description[​](#description "Direct link to Description")

*   Supports TP/SL feature. If the current underlying asset does not exist in the position, it is intended to preset the TP/SL. If the current underlying exists in the position, it is intended to modify the TP/SL
*   Ignore the `tradeSide` parameter when position mode is in `one-way-mode`

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/mix/order/batch-place-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/batch-place-order" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json" \  -d '{     "symbol": "BTCUSDT",     "productType": "usdt-futures",     "marginMode": "crossed",     "marginCoin": "USDT",     "orderList": [{             "size": "1",             "side": "buy",             "tradeSide": "open",             "orderType": "market",             "force": "gtc",             "clientOid": "123456",             "reduceOnly": "NO",             "presetStopSurplusPrice": "20000",             "presetStopLossPrice": "10000"         }     ] }'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| marginCoin | String | Yes | Margin coin, must be capitalized 
| marginMode | String | Yes | Position mode<br><code>isolated</code>: isolated margin<br><code>crossed</code>: crossed margin 
| orderList | List&lt;String&gt; | Yes | Order list, maximum length: 50 
| &gt;size | String | Yes | Amount 
| &gt;price | String | No | Price of the order.<br>Required if the order type is <code>limit</code> 
| &gt;side | String | Yes | Order direction<br><code>buy</code>: Buy<br><code>sell</code>: Sell 
| &gt;tradeSide | String | No | Direction<br><strong>Only required in hedge-mode</strong><br>Open and Close Notes:<br>For open long, <code>side</code> fill in"buy"; <code>tradeSide</code> should be "Open"<br>For open short, <code>side</code> fill in "sell"; <code>tradeSide</code> should be "open"<br>For close long, <code>side</code> fill in "buy"; <code>tradeSide</code> should be "close"<br>For close short, <code>side</code> fill in "sell";<code>tradeSide</code> should be "close" 
| &gt;orderType | String | Yes | Order type<br><code>limit</code>: limit orders<br><code>market</code>: market orders 
| &gt;force | String | No | Order expiration date.<br>Required if the orderType is <code>limit</code>, default value is <code>gtc</code><br><code>ioc</code>: Immediate or cancel<br><code>fok</code>: Fill or kill<br><code>gtc</code>: Good till canceled<br><code>post_only</code>: Post only 
| &gt;clientOid | String | No | Custom order ID 
| &gt;reduceOnly | String | No | Whether or not to just reduce the position: <code>YES</code>, <code>NO</code><br>Default: <code>NO</code><br>Applicable only in <strong>one-way-position</strong> mode 
| &gt;presetStopSurplusPrice | String | No | Take-profit value<br>No take-profit is set if the field is empty. 
| &gt;presetStopLossPrice | String | No | Stop-loss value<br>No stop-loss is set if the field is empty. 
| &gt;stpMode | String | No | STP Mode, default <code>none</code><br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders 

Response Example

```
{    "code": "00000",    "data": {        "successList": [            {                "orderId": "121211212122",                "clientOid": "BITGET#121211212122"            }        ],        "failureList": []    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| successList | List&lt;Object&gt; | Successful order list 
| &gt;orderId | String | Order ID 
| &gt;clientOid | String | Customize order ID 
| failureList | List&lt;Object&gt; | Failed order list 
| &gt;orderId | String | Order ID 
| &gt;clientOid | String | Customize order ID 
| &gt;errorMsg | String | Failure reason 
| &gt;errorCode | String | Failure code

> **Source:** https://www.bitget.com/api-doc/contract/trade/Batch-Order
