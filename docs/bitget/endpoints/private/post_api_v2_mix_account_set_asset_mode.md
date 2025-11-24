# Set USDT-M Futures Asset Mode

Frequency limit: 2 times/1s (uid)

### Description[​](#description "Direct link to Description")

Set USDT-M Futures Asset Mode

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/account/set-asset-mode

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/account/set-asset-mode" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"productType": "USDT-FUTURES","assetMode": "union"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter                                | Type   | Required | Description  |
| :--------------------------------------- | :----- | :------- | :----------- |
| productType                              | String | Yes      | Product type |
| `USDT-FUTURES` USDT professional futures |
| assetMode                                | String | Yes      | Asset mode   |

`single`: Single asset mode  
`union`: Multi-assets mode |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1725848356656,
  "data": "success"
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                               |
| :-------- | :----- | :---------------------------------------- |
| data      | String | 'success' mean set the asset mode success |

> **Source:** https://www.bitget.com/api-doc/contract/account/Set-Asset-Mode
