# Get Spot 24H Net Capital Inflow Info

Rate limit: 1 req/s (IP)

### Description[​](#description "Direct link to Description")

Get Spot 24H Net Capital Inflow Info

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/fund-net-flow

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fund-net-flow?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description  |
| :-------- | :----- | :------- | :----------- |
| symbol    | String | Yes      | Trading pair |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "netFlow": "-1.1",            "ts": "1713942000000"        },        {            "netFlow": "-1.1",            "ts": "1713942000000"        },        {            "netFlow": "-1.1",            "ts": "1713942000000"        },        {            "netFlow": "-1.1",            "ts": "1713942000000"        },        {            "netFlow": "-1.1",            "ts": "1713942000000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description         |
| :-------- | :----- | :------------------ |
| netFlow   | String | Whale fund net flow |
| ts        | String | Millseconds time    |

> **Source:** https://www.bitget.com/api-doc/common/apidata/Fund-Net-Flow
