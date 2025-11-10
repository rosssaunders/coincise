# Get Margin loan growth rate Data

Frequency limit: 1 times/1s (IP)

### Description[​](#description "Direct link to Description")

The growth rate of borrowed funds for a specific coin in cross and isolated margin accounts.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/margin/market/loan-growth

Request Example

```
curl "https://api.bitget.com/api/v2/margin/market/loan-growth?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair |
| period | String | No | Default:`24h`, support:  
`24h`  
`30d` |
| coin | String | No | Base coin or quete coin, default: base coin |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "ts": "1713942000000",            "growthRate": "-0.96"        },        {            "ts": "1713942000000",            "growthRate": "-0.96"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| growthRate | String | growth ratio |
| ts | String | Millseconds time |

> **Source:** https://www.bitget.com/api-doc/common/apidata/Margin-Loan-Growth
