# Cancel Plan Orders in Batch

Rate limit: 5 req/sec/UID

### Description[​](#description "Direct link to Description")

Cancel Plan Orders in Batch

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/spot/trade/batch-cancel-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-cancel-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{ "symbolList": ["BTCUSDT", "ETHUSDT"] }'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbolList | List <String\> | No | Collection of trading pairs: \["BTCUSDT", "ETHUSDT"\],  
If no value is set, all spot trigger orders will be cancelled. |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683876261117,    "data": {        "successList":[{            "orderId": "121211212122",            "clientOid": "121211212122"        }],        "failureList":[{            "orderId": "121211212122",            "clientOid": "121211212122",            "errorMsg": "failure"        }]    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| successList | List<Object\> | The collection of successfully cancelled orders. |
| \>orderId | String | Order ID |
| \>clientOid | String | Customize order ID |
| failureList | List<Object\> | The collection of unsuccessfully cancelled orders. |
| \>orderId | String | Order ID |
| \>clientOid | String | Customize order ID |
| \>errorMsg | String | Failure reason |

> **Source:** https://www.bitget.com/api-doc/spot/plan/Batch-Cancel-Plan-Order
