# Get Merge Depth

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get Merge Depth

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/market/merge-depth

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/merge-depth?symbol=BTCUSDT&precision=scale0&limit=100"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| precision | String | No | Price precision, return the cumulative depth according to the selected precision as the step size, enumeration value:<br>scale0/scale1/scale2/scale3,<br>scale0 does not merge, the default value, generally speaking,<br>scale1 is the merged depth of the trading pair quotation accuracy <em>10, generally Under normal circumstances,<br>scale2 is the quotation accuracy </em>100. Under normal circumstances,<br>scale3 is the quotation accuracy * 1000.<br>Under normal circumstances, the accuracy corresponding to 0/1/2/3 is based on the actual return parameter "scale". Each trading pair The quotation accuracy is different. Some currency pairs do not have scale 2. Requests for scales that do not exist for the currency pair will be processed according to the maximum scale. Example: A certain trading pair only has scale 0/1, and when scale2 is requested, it is automatically reduced to scale1. 
| limit | String | No | Fixed gear enumeration value：1/5/15/50/max，default:100，When the actual depth does not meet the limit, return according to the actual gear, and pass in max to return the maximum gear of the trading pair. 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "asks": [            [                "38084.5",                "0.0039"            ],            [                "38085.7",                "0.0018"            ],            [                "38086.7",                "0.0310"            ],            [                "38088.2",                "0.5303"            ]        ],        "bids": [            [                "38073.7",                "0.4993000000000000"            ],            [                "38073.4",                "0.4500"            ],            [                "38073.3",                "0.1179"            ],            [                "38071.5",                "0.2162"            ]        ],        "ts": "1622102974025",        "scale":"0.1",        "precision":"scale0",        "isMaxPrecision":"YES"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| asks | Array | Ask depth<br>e.g. ["38084.5","0.5"] ，"38084.5" is price，"0.5" is base coin volume 
| bids | Array | Bid depth 
| precision | String | Current gear, e.g. "scale1" 
| scale | String | Actual precision value, e.g. "0.1" 
| isMaxPrecision | String | Is max precision<br>YES:yes<br>NO:no 
| ts | String | Matching engine timestamp(ms), e.g. 1597026383085

> **Source:** https://www.bitget.com/api-doc/spot/market/Merge-Orderbook
