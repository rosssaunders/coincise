# Query User Rate Limit (USER_DATA)

### API Description

Query User Rate Limit

### HTTP Request

GET `/fapi/v1/rateLimit/order`

### Request Weight

**1**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
[
  {
    "rateLimitType": "ORDERS",
    "interval": "SECOND",
    "intervalNum": 10,
    "limit": 10000
  },
  {
    "rateLimitType": "ORDERS",
    "interval": "MINUTE",
    "intervalNum": 1,
    "limit": 20000
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Query-Rate-Limit](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Query-Rate-Limit)
