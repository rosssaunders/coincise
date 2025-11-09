# Modify the stop-profit and stop-loss plan order

Speed limit is 10 times/s (UID)

### Description[​](#description "Direct link to Description")

Modify the stop-profit and stop-loss plan order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/order/modify-tpsl-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/modify-tpsl-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"orderId": "1","clientOid": "2","marginCoin": "USDT","productType": "usdt-futures","symbol": "ethusdt","triggerPrice": "2001","triggerType": "fill_price","executePrice": "0","size": "2","rangeRate": ""}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter    | Type   | Required | Description                                                                                                                                                                                                                                                                                                 |
| :----------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId      | String | No       | Take profit and stop loss order number, 'orderId' and 'clientOid' must provide one                                                                                                                                                                                                                          |
| clientOid    | String | No       | Take profit and stop loss client order number, 'orderId' and 'clientOid' must provide one                                                                                                                                                                                                                   |
| marginCoin   | String | Yes      | Margin currency                                                                                                                                                                                                                                                                                             |
| productType  | String | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures                                                                                                                                                            |
| symbol       | String | Yes      | Trading pair, e.g. ETHUSDT                                                                                                                                                                                                                                                                                  |
| triggerPrice | String | Yes      | trigger price                                                                                                                                                                                                                                                                                               |
| triggerType  | String | No       | Trigger type (fill_price (transaction price) mark_price (mark price)                                                                                                                                                                                                                                        |
| executePrice | String | No       | Execution price (if it is 0 or not filled in, it means market price execution. If it is greater than 0, it means limit price execution. When planType (stop-profit and stop-loss type) is moving_plan (moving take-profit and stop-loss), it is not filled in and is fixed to the market price. implement.) |
| size         | String | Yes      | Order quantity<br>For the position take profit and position stop loss orders, the size should be <code>"size":""</code>                                                                                                                                                                                     |
| rangeRate    | String | No       | callback range                                                                                                                                                                                                                                                                                              |

Response Example

```
{    "code": "00000",    "data": {        "orderId": "121212121212",        "clientOid": "BITGET#1627293504612"    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                 |
| :-------- | :----- | :-------------------------- |
| orderId   | String | Trigger order ID            |
| clientOid | String | Customized trigger order ID |

> **Source:** https://www.bitget.com/api-doc/contract/plan/Modify-Tpsl-Order
