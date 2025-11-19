# Get BGB Deduct Info

Rate limit: 5 req/sec/UID

### Description[​](#description "Direct link to Description")

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/account/deduct-info

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/deduct-info" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695808949356,
  "data": {
    "deduct": "on"
  }
}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| deduct | String | on / off |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Deduct-Info
