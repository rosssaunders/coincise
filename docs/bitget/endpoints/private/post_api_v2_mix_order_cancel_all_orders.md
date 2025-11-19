# Cancel All Orders

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/mix/order/cancel-all-orders

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/cancel-all-orders" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:zh-CN" \  -H "Content-Type: application/json" \  -d '{    "productType": "USDT-FUTURES",    "marginCoin": "USDT"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |
| marginCoin | String | No | Margin coin, must be capitalized |
| requestTime | String | No | request Time Unix millisecond timestamp |
| receiveWindow | String | No | valid window period Unix millisecond timestamp Unix millisecond timestamp |

Response Example

```json
{
  "code": "00000",
  "data": {
    "successList": [
      {
        "orderId": "121211212122",
        "clientOid": "BITGET#121211212122"
      }
    ],
    "failureList": [
      {
        "orderId": "232",
        "clientOid": "321342",
        "errorMsg": "notExistend"
      }
    ]
  },
  "msg": "success",
  "requestTime": 1627293504612
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| successList | List<Object\> | The collection of successfully cancelled orders. |
| \>orderId | String | Order ID |
| \>clientOid | String | Customize order ID |
| failureList | List<Object\> | The collection of unsuccessfully cancelled orders. |
| \>orderId | String | Order ID |
| \>clientOid | String | Customize order ID |
| \>errorMsg | String | Failure reason |
| \>errorCode | String | Error code |

> **Source:** https://www.bitget.com/api-doc/contract/trade/Cancel-All-Orders
