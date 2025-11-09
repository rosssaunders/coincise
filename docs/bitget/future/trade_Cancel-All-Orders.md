# Cancel All Orders

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/order/cancel-all-orders

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/cancel-all-orders" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json" \  -d '{    "productType": "USDT-FUTURES",    "marginCoin": "USDT"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter     | Type   | Required | Description                                                                                                                                      |
| :------------ | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| productType   | String | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |
| marginCoin    | String | No       | Margin coin, must be capitalized                                                                                                                 |
| requestTime   | String | No       | request Time Unix millisecond timestamp                                                                                                          |
| receiveWindow | String | No       | valid window period Unix millisecond timestamp Unix millisecond timestamp                                                                        |

Response Example

```
{    "code": "00000",    "data": {        "successList": [            {                "orderId": "121211212122",                "clientOid": "BITGET#121211212122"            }        ],        "failureList": [            {                "orderId": "232",                "clientOid": "321342",                "errorMsg": "notExistend"            }        ]    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type               | Description                                        |
| :------------ | :----------------- | :------------------------------------------------- |
| successList   | List&lt;Object&gt; | The collection of successfully cancelled orders.   |
| &gt;orderId   | String             | Order ID                                           |
| &gt;clientOid | String             | Customize order ID                                 |
| failureList   | List&lt;Object&gt; | The collection of unsuccessfully cancelled orders. |
| &gt;orderId   | String             | Order ID                                           |
| &gt;clientOid | String             | Customize order ID                                 |
| &gt;errorMsg  | String             | Failure reason                                     |
| &gt;errorCode | String             | Error code                                         |

> **Source:** https://www.bitget.com/api-doc/contract/trade/Cancel-All-Orders
