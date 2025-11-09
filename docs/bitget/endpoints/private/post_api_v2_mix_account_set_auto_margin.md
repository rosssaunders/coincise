# Set Isolated Position Auto Margin

Frequency limit: 5 times/1s (uid)

### Description[​](#description "Direct link to Description")

Adjust isolated position auto margin

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/mix/account/set-auto-margin

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/account/set-auto-margin" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{"symbol": "btcusdt","autoMargin": "on","marginCoin": "usdt","holdSide": "long"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair |
| autoMargin | String | Yes | Auto margin flag  
`on` auto margin on  
`off` auto margin off |
| marginCoin | String | Yes | Margin coin must be capitalized |
| holdSide | String | Yes | Position direction (no need in cross margin mode).  
long – long position; short – short position |

Response Example

```
{    "code": "00000",    "data": "success",    "msg": "success",    "requestTime": 1627293357336}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| code | String | ‘00000’: success; others: fail |

> **Source:** https://www.bitget.com/api-doc/contract/account/Set-Auto-Margin
