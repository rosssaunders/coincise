# Flash Close Position

Frequency limit: 1 time/1s (User ID)

### Description[​](#description "Direct link to Description")

close position at market price

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/order/close-positions

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/close-positions" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json" \  -d '{"symbol": "BTCUSDT","productType":"USDT-FUTURES","holdSide": "long"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol      | String | No       | Trading pair                                                                                                                                                                                                                                                                                                                                                                                |
| holdSide    | String | Optional | Position direction<br>1. In one-way position mode(buy or sell): This field should be left blank. Will be ignored if filled in.<br>2. In hedge-mode position(open or close): All positions will be closed if the field is left blank; Positions of the specified direction will be closed is the field is filled in.<br><code>long</code>: Long position; <code>short</code>: Short position |
| productType | String | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures                                                                                                                                                                                                                                            |

Response Example

```
{    "code": "00000",     "data": {        "successList": [            {                "orderId": "123",                 "clientOid": "xxxxx",                "symbol": "BTCUSDT"            }        ],         "failureList": [            {                "orderId": "1234",                 "clientOid": "321",                 "symbol": "BTCUSDT",                "errorMsg": "xxx",                 "errorCode": "xxxx"            }        ]    },     "msg": "success",     "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type               | Description                                                                                                                         |
| :------------ | :----------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| successList   | List&lt;Object&gt; | The collection of successfully closed orders                                                                                        |
| &gt;orderId   | String             | Order ID                                                                                                                            |
| &gt;clientOid | String             | Customize order ID                                                                                                                  |
| &gt;symbol    | String             | The Symbol                                                                                                                          |
| failureList   | List&lt;Object&gt; | The collection of unsuccessfully closed orders<br>The close order may fail when the pair is in delivery or in risk control handling |
| &gt;orderId   | String             | Order ID                                                                                                                            |
| &gt;clientOid | String             | Customize order ID                                                                                                                  |
| &gt;symbol    | String             | The Symbol                                                                                                                          |
| &gt;errorMsg  | String             | Failure reason                                                                                                                      |
| &gt;errorCode | String             | Failure code                                                                                                                        |

> **Source:** https://www.bitget.com/api-doc/contract/trade/Flash-Close-Position
