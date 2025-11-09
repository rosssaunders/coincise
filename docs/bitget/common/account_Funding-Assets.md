# Funding Assets

Frequency limit: 10 times/1s (User ID)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/account/funding-assets

Request Example

```
curl "https://api.bitget.com/api/v2/account/funding-assets" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*******" \  -H "ACCESS-PASSPHRASE:*****" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description      |
| :-------- | :----- | :------- | :--------------- |
| coin      | String | No       | default all coin |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1712129301188,  "data": [    {      "coin": "USDT",      "available": "326",      "frozen": "",      "usdtValue": "326"    }  ]}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter      | Type               | Description |
| :------------- | :----------------- | :---------- |
| data           | List&lt;Object&gt; | assets List |
| &gt; coin      | String             | coin        |
| &gt; available | String             | available   |
| &gt; frozen    | String             | forzen      |
| &gt; usdtValue | String             | USDT value  |

> **Source:** https://www.bitget.com/api-doc/common/account/Funding-Assets
