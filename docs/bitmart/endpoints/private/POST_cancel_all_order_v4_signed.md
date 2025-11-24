# POST Cancel All Order(v4) (SIGNED)

**Source:**
[Cancel All Order(v4) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Cancel All Order(v4) (SIGNED)

`Cancel all orders`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/cancel_all`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "side":"buy" }' https://api-cloud.bitmart.com/spot/v4/cancel_all`

| Field  | Type   | Required? | Description                  |
| ------ | ------ | --------- | ---------------------------- |
| symbol | String | No        | Trading pair (e.g. BTC_USDT) |
| side   | String | No        | Order side                   |

\-`buy`  
\-`sell` |

#### Response Data

> Response

```json
{
  "code": 1000,
  "trace": "886fb6ae-456b-4654-b4e0-d681ac05cea1",
  "message": "OK",
  "data": {}
}
```

If code is equal to 1000, it means the cancellation is successful.
