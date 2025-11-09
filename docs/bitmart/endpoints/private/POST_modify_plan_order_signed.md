# POST Modify Plan Order (SIGNED)

**Source:**
[Modify Plan Order (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Modify Plan Order (SIGNED)

`Applicable for modifying contract plan orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/modify-plan-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  -X POST -d '{   "symbol":"ETHUSDT",   "order_id":"220906179559421",   "trigger_price":"2000",   "executive_price":"1450",   "price_type":1,   "type":"limit" }' https://api-cloud-v2.bitmart.com/contract/private/modify-plan-order`

| Field           | Type   | Required? | Description                                                 |
| --------------- | ------ | --------- | ----------------------------------------------------------- |
| symbol          | String | Yes       | Symbol of the contract(like BTCUSDT)                        |
| order_id        | String | No        | Order ID(order_id or client_order_id must give one)         |
| trigger_price   | String | Yes       | Trigger price                                               |
| executive_price | String | No        | Execution price for plan order, mandatory when type = limit |
| price_type      | Int    | Yes       | Trigger price type                                          |

\-`1`\=last_price  
\-`2`\=fair_price | | type | String | Yes | Order type  
\-`limit`  
\-`market` |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": "220609666322019"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| order_id | String | Order ID    |
