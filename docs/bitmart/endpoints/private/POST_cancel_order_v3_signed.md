# POST Cancel Order(v3) (SIGNED)

**Source:**
[Cancel Order(v3) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Cancel Order(v3) (SIGNED)

`Applicable to the cancellation of a specified unfinished order`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v3/cancel_order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol": "BTC_USDT",     "order_id": "112121212" }' https://api-cloud.bitmart.com/spot/v3/cancel_order`

| Field           | Type   | Required?                                          | Description                  |
| --------------- | ------ | -------------------------------------------------- | ---------------------------- |
| symbol          | String | Yes                                                | Trading pair (e.g. BMX_USDT) |
| order_id        | String | order_id, client_order_id, one of them is required | Order ID                     |
| client_order_id | String | order_id, client_order_id, one of them is required | Client-defined Order ID      |

In each request, you must select one of the parameters order_id and
client_order_id to submit

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "result": true   } }`

| Field  | Type    | Description   |
| ------ | ------- | ------------- |
| result | Boolean | Cancel result |

\-`true`\=Cancel successfully  
\-`false`\=Cancel failed |

\`result\` = 'true' indicates successful cancel; \`result\` = 'false' indicates
that the cancel failed because the order was matched or cancelled.
