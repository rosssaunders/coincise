# Get Spot Whale Net Flow Data

Rate limit: 1 req/s (IP)

### Description[​](#description "Direct link to Description")

Get spot fund flow

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/whale-net-flow

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fund-flow?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description  |
| :-------- | :----- | :------- | :----------- |
| symbol    | String | Yes      | Trading pair |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1656589586807,
  "data": [
    {
      "volume": "-1.1",
      "date": "1713942000000"
    },
    {
      "volume": "-1.1",
      "date": "1713942000000"
    },
    {
      "volume": "-1.1",
      "date": "1713942000000"
    },
    {
      "volume": "-1.1",
      "date": "1713942000000"
    },
    {
      "volume": "-1.1",
      "date": "1713942000000"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description           |
| :-------- | :----- | :-------------------- |
| volume    | String | Whale buy sell volume |
| date      | String | Millseconds time      |

> **Source:** https://www.bitget.com/api-doc/common/apidata/Whale-Net-Flow
