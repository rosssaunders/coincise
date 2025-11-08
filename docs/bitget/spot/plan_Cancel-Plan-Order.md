# Cancel Plan Order

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Cancel Plan order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/spot/trade/cancel-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/cancel-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"orderId": "121211212122"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderId | String | No | Either 'orderId' or 'clientOid' is required. 
| clientOid | String | No | Either 'orderId' or 'clientOid' is required. 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134497496,    "data": {        "result":"success"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| result | String | Result is success or failure

> **Source:** https://www.bitget.com/api-doc/spot/plan/Cancel-Plan-Order
