# Get Current Orders

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Unfilled Orders

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/trade/unfilled-orders

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/unfilled-orders?symbol=BTCUSDT&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request parameter[​](#request-parameter "Direct link to Request parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | No | Trading pair 
| startTime | String | No | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868 
| endTime | String | No | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868 
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface. 
| limit | String | No | Limit number default 100 max 100 
| orderId | String | No | OrderId 
| tpslType | String | No | order type deafult <code>normal</code><br><code>normal</code> spot order<br><code>tpsl</code> spot tpsl order 
| requestTime | String | No | request Time Unix millisecond timestamp 
| receiveWindow | String | No | valid window period Unix millisecond timestamp Unix millisecond timestamp 

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1695808949356,  "data": [    {      "userId": "**********",      "symbol": "btcusdt",      "orderId": "2222222",      "clientOid": "xxxxxxx",      "priceAvg": "34829.12",      "size": "1",      "orderType": "limit",      "side": "buy",      "status": "new",      "basePrice": "0",      "baseVolume": "0",      "quoteVolume": "0",      "enterPointSource": "WEB",      "presetTakeProfitPrice": "70000",      "executeTakeProfitPrice": "",      "presetStopLossPrice": "10000",      "executeStopLossPrice": "",      "cTime": "1622697148",      "tpslType": "normal",      "triggerPrice": null    }  ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| userId | String | User id 
| symbol | String | Trading pair name 
| orderId | String | Order ID 
| clientOid | String | Client order ID 
| priceAvg | String | Order price 
| size | String | Amount<br>(orderType = <code>limit</code> means base coin; orderType = <code>market</code> means quote coin) 
| orderType | String | Order type<br>limit Limit price<br>market Market price 
| side | String | Direction 
| status | String | Order status<br><code>live</code>:unfilled;<br><code>partially_filled</code>:partially filled;<br><code>filled</code>:filled;<br><code>cancelled</code>:cancelled; 
| basePrice | String | Filled price 
| baseVolume | String | Filled volume in base coin 
| quoteVolume | String | Filled volume in quote coin 
| enterPointSource | String | Client type<br>WEB WEB Client<br>APP APP Client<br>API API Client<br>SYS SYS Client<br>ANDROID ANDROID Client<br>IOS IOS Client 
| orderSource | String | Order source<br>normal: Normal order<br>market: Market order<br>spot_trader_buy: Elite spot trade to buy (elite traders)<br>spot_follower_buy: Copy trade to buy (followers)<br>spot_trader_sell: Elite spot trade to sell (elite traders)<br>spot_follower_sell: Copy trade to sell (followers)<br>strategy_oco_limit: OCO orders 
| presetTakeProfitPrice | String | Take profit trigger price 
| executeTakeProfitPrice | String | Take profit execute price(If the value is empty, it means take profit in market price) 
| presetStopLossPrice | String | Stop loss trigger price 
| executeStopLossPrice | String | Stop loss execute price(If the value is empty, it means stop loss in market price) 
| cTime | String | Creation time, Unix millisecond timestamp, e.g. 1690196141868 
| uTime | String | Update time, Unix millisecond timestamp, e.g. 1690196141868 
| triggerPrice | String | spot tpsl trigger price(Only valid when <code>tpslType</code> is <code>tpsl</code>) 
| tpslType | String | <code>normal</code> spot order<br><code>tpsl</code> spot tpsl order

> **Source:** https://www.bitget.com/api-doc/spot/trade/Get-Unfilled-Orders
