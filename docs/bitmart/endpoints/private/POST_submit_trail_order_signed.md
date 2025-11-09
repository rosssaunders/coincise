# POST Submit Trail Order (SIGNED)

**Source:**
[Submit Trail Order (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Submit Trail Order (SIGNED)

`Applicable for placing contract trail orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/submit-trail-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  -X POST -d '{   "symbol":"ETHUSDT",   "side":4,   "leverage":"1",   "open_type":"isolated",   "size":10,   "activation_price":"2000",   "callback_rate":"1",   "activation_price_type":1 }' https://api-cloud-v2.bitmart.com/contract/private/submit-trail-order`

| Field  | Type   | Required? | Description                          |
| ------ | ------ | --------- | ------------------------------------ |
| symbol | String | Yes       | Symbol of the contract(like BTCUSDT) |
| side   | Int    | Yes       | Order side                           |

hedge mode  
\-`1`\=buy_open_long  
\-`2`\=buy_close_short  
\-`3`\=sell_close_long  
\-`4`\=sell_open_short  
oneway mode  
\-`1`\=buy  
\-`2`\=buy(reduce only)  
\-`3`\=sell(reduce only)  
\-`4`\=sell | | leverage | String | Yes | Order leverage | | open_type | String
| Yes | Open type, required at close position  
\-`cross`  
\-`isolated` | | size | Int | Yes | Order size (Number of contracts) | |
activation_price | String | Yes | Activation price, required at trailing order |
| callback_rate | String | Yes | Callback rate, required at trailing order, min
0.1, max 5 where 1 for 1% | | activation_price_type | Int | Yes | Activation
price type, required at trailing order  
\-`1`\=last_price  
\-`2`\=fair_price |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": 220609666322019   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field    | Type | Description |
| -------- | ---- | ----------- |
| order_id | Int  | Order ID    |
