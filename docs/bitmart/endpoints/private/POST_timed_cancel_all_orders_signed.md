# POST Timed Cancel All Orders (SIGNED)

**Source:** [Timed Cancel All Orders (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Timed Cancel All Orders (SIGNED)

`Applicable for canceling all contract orders timed`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/cancel-all-after`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  -X POST -d '{    "timeout":10,    "symbol":"BTCUSDT" }' https://api-cloud-v2.bitmart.com/contract/private/cancel-all-after`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| timeout | Int | Yes | The duration of canceling orders(second,minimum value: 5 seconds) 0:Canceling the setting |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |

#### Response Data

If code value is 1000, it means the order cancellation is successfully submitted, cancellation results will be pushed by websocket service.

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {     "result": true,     "set_time": 1743064715,     "cancel_time": 1743064725   } }`

| Field | type | Description |
| --- | --- | --- |
| result | Bool | Is the setting successful: true/false |
| set\_time | Int | Set time, timestamp |
| cancel\_time | Int | The first time of cancel, timestamp |