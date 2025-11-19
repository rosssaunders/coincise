# Convert

Rate limit: 5 req/sec/UID

### Description[​](#description "Direct link to Description")

Convert

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/convert/trade

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/convert/trade" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \  -d '{"fromCoin": "USDT","fromCoinSize":"444","toCoin":"ETH","cnvtPrice":"0.0005226794534969","toCoinSize":"0.23206967","traceId":"1"}'
```

### request parameters[​](#request-parameters "Direct link to request parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| fromCoin | String | Yes | Quote currency |
| fromCoinSize | String | Yes | Number of currencies |
| cnvtPrice | String | Yes | Results obtained by request for quotation |
| toCoin | String | Yes | Target currency |
| toCoinSize | String | Yes | Number of target currencies converted |
| traceId | String | Yes | RFQ id, valid for 8 seconds |

Response Example

```json
{
  "code": "00000",
  "data": {
    "ts": "1688527221603",
    "cnvtPrice": "0.00052268",
    "toCoinSize": "0.23206967",
    "toCoin": "ETH"
  },
  "msg": "success",
  "requestTime": 1627293612502
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| toCoin | String | Switch |
| toCoinSize | String | Coin swap amount |
| cnvtPrice | String | Swap price |
| ts | String | Conversion time, Unix millisecond timestamps |

> **Source:** https://www.bitget.com/api-doc/common/convert/Trade
