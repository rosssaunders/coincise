# Get Futures Active Long Short Account Data

Rate limit: 1 req/s (IP)

### Description[​](#description "Direct link to Description")

Get Futures Active Long Short Account Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/market/account-long-short

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/account-long-short?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description             |
| :-------- | :----- | :------- | :---------------------- |
| symbol    | String | Yes      | Trading pair            |
| period    | String | No       | \- default:5m, support: |

`5m`  
`15m`  
`30m`  
`1h`  
`2h`  
`4h`  
`6h`  
`12h`  
`1d` |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1656589586807,
  "data": [
    {
      "longAccountRatio": "0.01",
      "shortAccountRatio": "0.12",
      "longShortAccountRatio": "1.2",
      "ts": "1714020600000"
    },
    {
      "longAccountRatio": "0.01",
      "shortAccountRatio": "0.12",
      "longShortAccountRatio": "1.2",
      "ts": "1714020600000"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter             | Type   | Description              |
| :-------------------- | :----- | :----------------------- |
| longAccountRatio      | String | Long Account Ratio       |
| shortAccountRatio     | String | Short Account Ratio      |
| longShortAccountRatio | String | Long Short Account Ratio |
| ts                    | String | Millseconds time         |

> **Source:** https://www.bitget.com/api-doc/common/apidata/Account-Long-Short
