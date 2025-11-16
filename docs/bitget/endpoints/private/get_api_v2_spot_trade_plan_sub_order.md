# Get Plan Sub Order

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Plan Sub Order

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/trade/plan-sub-order

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/plan-sub-order?planOrderId=xxxxxxxxxxxxxxxxxx" \  -H "ACCESS-KEY:your apiKey" \    -H "ACCESS-SIGN:*" \    -H "ACCESS-PASSPHRASE:*" \    -H "ACCESS-TIMESTAMP:1659076670000" \    -H "locale:en-US" \    -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter   | Type   | Required | Description   |
| :---------- | :----- | :------- | :------------ |
| planOrderId | String | yes      | Plan Order ID |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1710813939206,    "data": [        {            "orderId": "xxxxxxxxxxxxx",            "price": "0.4188",            "type": "limit",            "status": "success"        }    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type    | Description   |
| :-------- | :------ | :------------ |
| orderId   | boolean | Spot order ID |
| price     | String  | Order price   |
| type      | String  | Order type    |

limit Limit price  
market Market price | | status | String | Plan order trigger status  
success: trigger success  
fail: trigger failed  
cancelled: cancelled  
in_progress: trigger spot placing order  
in_progress_tracking: tracking trigger |

> **Source:** https://www.bitget.com/api-doc/spot/plan/Get-Plan-Sub-Order
