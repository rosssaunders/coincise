# Cancel Order

Frequency limit: 10 times/1s

### Description[​](#description "Direct link to Description")

Cancel a pending order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/mix/order/cancel-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/cancel-order" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json" \  -d '{    "orderId": "1",    "symbol": "BTCUSDT",    "productType": "usdt-futures",    "marginCoin": "USDT"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| marginCoin | String | No | Margin coin must be capitalized 
| orderId | String | No | Order ID<br>Either orderId or clientOid is required.<br>If both are present, orderId prevails. 
| clientOid | String | No | Customize order ID<br>Either orderId or clientOid is required.<br>If both are present, orderId prevails. 

Response Example

```
{    "code": "00000",    "data": {        "orderId": "123",        "clientOid": ""    },    "msg": "success",    "requestTime": 1627293504612}
```

### Return Parameter[​](#return-parameter "Direct link to Return Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID 
| clientOid | String | Client customized ID

> **Source:** https://www.bitget.com/api-doc/contract/trade/Cancel-Order
