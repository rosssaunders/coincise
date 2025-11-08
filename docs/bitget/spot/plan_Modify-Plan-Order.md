# Modify Plan Order

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Modify Plan Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/spot/trade/modify-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/modify-plan-order" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json" \    -d '{"orderId": "121211212122", "triggerPrice": 0.041222, "executePrice":"0.041272", "size": 156, "orderType":"limit"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderId | String | No | Either 'orderId' or 'clientOid' is required. 
| clientOid | String | No | Either 'orderId' or 'clientOid' is required. 
| triggerPrice | String | Yes | Trigger price 
| orderType | String | Yes | Order type<br>limit: Limit price<br>market: Market price 
| executePrice | String | No | Execution price, cannot be null if orderType=limit 
| size | String | Yes | Quantity to buy<br>If planType=amount, the quote currency is the base coin.<br>If planType=total, the quote currency is the quote coin. 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1668134576535,    "data": {        "orderId": "121211212122",        "clientOid": "121211212122"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID 
| clientOid | String | Client customized ID

> **Source:** https://www.bitget.com/api-doc/spot/plan/Modify-Plan-Order
