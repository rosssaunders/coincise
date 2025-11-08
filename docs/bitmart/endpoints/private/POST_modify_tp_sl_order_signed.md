# POST Modify TP/SL Order (SIGNED)

**Source:** [Modify TP/SL Order (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Modify TP/SL Order (SIGNED)

`Applicable for modifying TP/SL orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/modify-tp-sl-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  -X POST -d '{   "symbol":"ETHUSDT",   "trigger_price":"2100",   "executive_price":"2100",   "price_type":2,   "order_id":"37758000001",   "client_order_id":"",   "plan_category":2,   "category": "limit" }' https://api-cloud-v2.bitmart.com/contract/private/modify-tp-sl-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |
| order\_id | String | No | Order ID(order\_id or client\_order\_id must give one) |
| client\_order\_id | String | No | Client order ID(order\_id or client\_order\_id must give one) |
| trigger\_price | String | Yes | Trigger price |
| executive\_price | String | No | Execution price for order, mandatory when plan\_category = 1 |
| price\_type | Int | Yes | Trigger price type  
\-`1`\=last\_price  
\-`2`\=fair\_price |
| plan\_category | Int | No | TP/SL type  
\-`1`\=TP/SL  
\-`2`\=Position TP/SL |
| category | String | No | Order type, Position TP/SL default `market`  
\-`limit`  
\-`market` |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": "220609666322019"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| order\_id | String | Order ID |