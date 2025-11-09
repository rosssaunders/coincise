# Get OrderBook Depth

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get OrderBook Depth

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/market/orderbook

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/orderbook?symbol=BTCUSDT&type=step0&limit=100"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair |
| type | String | No | Default：step0： The value enums：step0，step1，step2，step3，step4，step5 |
| limit | String | No | Number of queries: Default: 150, maximum: 150 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1698303884579,    "data": {        "asks": [            [                "34567.15",                "0.0131"            ],            [                "34567.25",                "0.0144"            ]        ],        "bids": [            [                "34567",                "0.2917"            ],            [                "34566.85",                "0.0145"            ]        ],        "ts": "1698303884584"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| asks | Array | Ask depth  
e.g. \["38084.5","0.5"\] ，"38084.5" is price，"0.5" is base coin volume |
| bids | Array | Bid depth |
| ts | String | Matching engine timestamp(ms), e.g. 1597026383085 |

> **Source:** https://www.bitget.com/api-doc/spot/market/Get-Orderbook
