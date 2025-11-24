# Get Leveraged long-short ratio Data

Frequency limit: 1 times/1s (IP)

### Description[​](#description "Direct link to Description")

The long-short position ratio for a specific coin in cross and isolated margin
accounts.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/margin/market/long-short-ratio

Request Example

```
curl "https://api.bitget.com/api/v2/margin/market/long-short-ratio?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description             |
| :-------- | :----- | :------- | :---------------------- |
| symbol    | String | Yes      | Trading pair            |
| period    | String | No       | Default:`24h`, support: |

`24h`  
`30d` | | coin | String | No | Base coin or quete coin, default: base coin |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1656589586807,
  "data": [
    {
      "ts": "1713942000000",
      "longShortRatio": "-0.96"
    },
    {
      "ts": "1713942000000",
      "longShortRatio": "-0.96"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter      | Type   | Description      |
| :------------- | :----- | :--------------- |
| longShortRatio | String | long short ratio |
| ts             | String | Millseconds time |

> **Source:** https://www.bitget.com/api-doc/common/apidata/Margin-Ls-Ratio
