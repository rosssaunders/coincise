# Place Plan Order

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Place plan order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/spot/trade/place-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/place-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"symbol": "TRXUSDT", "side": "buy", "triggerPrice": 0.041572, "executePrice": "0.041572", "size": 151, "triggerType": "market_price", "orderType": "limit","clientOid": "12345"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair name, e.g. BTCUSDT 
| side | String | Yes | Direction<br><code>buy</code>: Buy<br><code>sell</code>: Sell 
| triggerPrice | String | Yes | Trigger price 
| orderType | String | Yes | Order type<br><code>limit</code>: Limit orders<br><code>market</code>: Market orders 
| executePrice | String | No | Execution price<br>it's required when <code>orderType</code>=<code>limit</code> 
| planType | String | No | Order type<br><code>amount</code>: By amount of the order(base coin)<br><code>total</code>: By trading volume of the order(quote coin)<br>The default value is <code>amount</code> 
| size | String | Yes | Quantity to buy<br>If <code>planType</code>=<code>amount</code>, it is the base coin.<br>If <code>planType</code>=<code>total</code>, it is the quote coin. 
| triggerType | String | Yes | Trigger type<br><code>fill_price</code>: filled price<br><code>mark_price</code>: mark price 
| clientOid | String | No | Client customized ID 
| stpMode | String | No | STP Mode, default <code>none</code><br><code>none</code> not setting STP<br><code>cancel_taker</code> cancel taker order<br><code>cancel_maker</code> cancel maker order<br><code>cancel_both</code> cancel both of taker and maker orders 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134576535,    "data": {        "orderId": "121211212122",        "clientOid": "121211212122"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID 
| clientOid | String | Client customized ID

> **Source:** https://www.bitget.com/api-doc/spot/plan/Place-Plan-Order
