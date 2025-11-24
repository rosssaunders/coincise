# Get Futures Long and Short Ratio Data

Rate limit: 1 req/1s (IP)

### Description[​](#description "Direct link to Description")

Get Futures Long and Short Ratio Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/market/long-short

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/long-short?symbol=BTCUSDT"
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
`1Dutc` |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1656589586807,
  "data": [
    {
      "longRatio": "0.01",
      "shortRatio": "0.12",
      "longShortRatio": "1.2",
      "ts": "1714020600000"
    },
    {
      "longRatio": "0.01",
      "shortRatio": "0.12",
      "longShortRatio": "1.2",
      "ts": "1714020600000"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter      | Type   | Description      |
| :------------- | :----- | :--------------- |
| longRatio      | String | Long Ratio       |
| shortRatio     | String | Short Ratio      |
| longShortRatio | String | Long Short Ratio |
| ts             | String | Millseconds time |

> **Source:** https://www.bitget.com/api-doc/common/apidata/Long-Short
