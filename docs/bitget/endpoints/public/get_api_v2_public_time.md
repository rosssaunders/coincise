# Get Server Time

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Getting server time,Unix millisecond timestamp

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/public/time

Request Example

```
curl "https://api.bitget.com/api/v2/public/time"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| N/A       |      |          |             |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1688008631614,
  "data": {
    "serverTime": "1688008631614"
  }
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter  | Type   | Description                                                 |
| :--------- | :----- | :---------------------------------------------------------- |
| serverTime | String | Server time, Unix millisecond timestamp, e.g. 1690196141868 |

> **Source:** https://www.bitget.com/api-doc/common/public/Get-Server-Time
