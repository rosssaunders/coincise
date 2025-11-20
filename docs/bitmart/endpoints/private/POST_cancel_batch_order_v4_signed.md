# POST Cancel Batch Order(v4) (SIGNED)

**Source:** [Cancel Batch Order(v4) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Cancel Batch Order(v4) (SIGNED)

`Cancel all outstanding orders in the specified direction for the specified trading pair or cancel based on the order ID`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/cancel_orders`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "orderIds":[     "5e925f3981"   ],   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/cancel_orders`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BTC\_USDT) |
| orderIds | List | orderIds, clientOrderIds, one of them is required | Order Id List (Limited to 10 ids) |
| clientOrderIds | List | orderIds, clientOrderIds, one of them is required | Client-defined OrderId List (Limited to 10 ids) |
| recvWindow | Long | No | Trade time limit, allowed range (0,60000\], default: 5000 milliseconds |

In each request, you must select one of the parameters orderIds and clientOrderIds to submit

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "c4edbce860164203954f7c3c81d60fc6.309.17022669632770001",
  "data": {
    "successIds": [
      "213055379155243012"
    ],
    "failIds": [],
    "totalCount": 1,
    "successCount": 1,
    "failedCount": 0
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| successIds | List | Successfully canceled order IDs |
| failIds | List | Order IDs that failed to cancel |
| totalCount | Int | Number of submissions |
| successCount | Int | Number of successes |
| failedCount | Int | Number of failures |