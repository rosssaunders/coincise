# Bot account

Frequency limit: 10 times/1s (User ID)

Bot account

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/account/bot-assets

Request Example

```
curl "https://api.bitget.com/api/v2/account/bot-assets?accountType=futures" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*******" \  -H "ACCESS-PASSPHRASE:*****" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| accountType | String | No | bot account type  
futures  
spot |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1712131247803,
  "data": [
    {
      "coin": "USDT",
      "available": "84.61136285",
      "equity": "140.94936285",
      "bonus": "0",
      "frozen": "0",
      "usdtValue": "140.949362850622"
    }
  ]
}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| data | List<Object\> | assetsList |
| \> coin | String | coin |
| \> available | String | available |
| \> equity | String | account assets |
| \> bonus | String | trading bonuses |
| \> frozen | String | in orders |
| \> usdtValue | String | USDT values |

> **Source:** https://www.bitget.com/api-doc/common/account/Bot-Assets
