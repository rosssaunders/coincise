# POST Cancel Order (SIGNED)

**Source:** [Cancel Order (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Cancel Order (SIGNED)

`Applicable for canceling a specific contract order`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/cancel-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  -X POST -d '{   "symbol":"ETHUSDT",   "order_id": "220906179559421" }' https://api-cloud-v2.bitmart.com/contract/private/cancel-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT),（If not submitted order\_id and client\_order\_id, cancel all orders under the symbol） |
| order\_id | String | No | Order ID |
| client\_order\_id | String | No | Client-defined OrderId |

#### Response Data

If code value is 1000, it means the order cancellation is successfully submitted, cancellation results will be pushed by websocket service.

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {   } }`