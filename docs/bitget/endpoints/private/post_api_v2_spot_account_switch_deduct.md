# Switch BGB Deduct

Rate Limit: 1 req/sec/UID

### Description[​](#description "Direct link to Description")

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/spot/account/switch-deduct

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/account/switch-deduct" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{"deduct":"on"}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| deduct | String | Yes | on/off |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": true}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |

> **Source:** https://www.bitget.com/api-doc/spot/account/Switch-Deduct
