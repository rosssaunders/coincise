# Get Trade data support symbols

Rate limit: 1 req/1s (IP)

### Description[​](#description "Direct link to Description")

Get Trade data support symbols

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/market/support-symbols

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/support-symbols"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": {        "spotList": ["BTCUSDT","ETHUSDT"],        "futureList": ["BTCUSDT","ETHUSDT"]    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| spotList | List | Spot data symbols 
| futureList | List | Futures data symbols

> **Source:** https://www.bitget.com/api-doc/common/apidata/Get-Big-Data-Symbol
