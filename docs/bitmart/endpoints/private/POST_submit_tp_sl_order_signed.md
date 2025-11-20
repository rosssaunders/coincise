# POST Submit TP/SL Order (SIGNED)

**Source:** [Submit TP/SL Order (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Submit TP/SL Order (SIGNED)

`Applicable for placing contract TP/SL orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/submit-tp-sl-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "side":2,   "type":"take_profit",   "size":10,   "trigger_price":"2000",   "executive_price":"1450",   "price_type":1,   "plan_category":1,   "client_order_id":"123456789",   "category":"limit" }' https://api-cloud-v2.bitmart.com/contract/private/submit-plan-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |
| type | String | Yes | Order type  
\-`take_profit`  
\-`stop_loss` |
| side | Int | Yes | Order side  
hedge mode  
\-`2`\=buy\_close\_short  
\-`3`\=sell\_close\_long  
oneway mode  
\-`2`\=buy(reduce only)  
\-`3`\=sell(reduce only) |
| size | Int | No | Order size (Number of contracts) Default the size of position |
| trigger\_price | String | Yes | Trigger price |
| executive\_price | String | Yes | Execution price |
| price\_type | Int | Yes | Trigger price type  
\-`1`\=last\_price  
\-`2`\=fair\_price |
| plan\_category | Int | No | TP/SL type  
\-`1`\=TP/SL  
\-`2`\=Position TP/SL(default) |
| client\_order\_id | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) |
| category | String | No | Trigger order type, position TP/SL default `market`  
\-`limit`  
\-`market` |

#### Response Data

> Response

```json
{
  "code": 1000,
  "message": "Ok",
  "data": {
    "order_id": "220609666322019",
    "client_order_id": "123456789"
  },
  "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988"
}
```

| Field | Type | Description |
| --- | --- | --- |
| order\_id | String | Order ID |
| client\_order\_id | String | Client Order ID |