# Trigger Sub Order

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

Get trigger executed futures orders

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/order/plan-sub-order

Request Example

```
curl "https://api.bitget.com/api/v2/mix/order/plan-sub-order?planOrderId=xxxxxxxxxxxxxxxxxx&productType=USDT-FUTURES&planType=normal_plan" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description        |
| :-------- | :----- | :------- | :----------------- |
| planType  | String | Yes      | Trigger order type |

normal_plan: average trigger order  
track_plan: trailing stop order | | planOrderId | String | Yes | Trigger order
ID | | productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1710813939206,
  "data": [
    {
      "orderId": "xxxxxxxxxxxxx",
      "price": "0.4188",
      "type": "limit",
      "status": "success"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                |
| :-------- | :----- | :------------------------- |
| orderId   | String | Futures order ID           |
| price     | String | Price of the futures order |
| type      | String | Order type                 |

limit  
market | | status | String | Plan order trigger status  
success: trigger success  
fail: trigger failed  
cancelled: cancelled  
in_progress: trigger spot placing order  
in_progress_tracking: tracking trigger |

> **Source:** https://www.bitget.com/api-doc/contract/plan/Plan-Sub-Orders
