# POST Submit Plan Order (SIGNED)

**Source:**
[Submit Plan Order (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Submit Plan Order (SIGNED)

`Applicable for placing contract plan orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/submit-plan-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  -X POST -d '{   "symbol":"ETHUSDT",   "side":4,   "mode":1,   "type":"limit",   "leverage":"1",   "open_type":"isolated",   "size":10,   "trigger_price":"2000",   "executive_price":"1450",   "price_type":1,   "price_way":1 }' https://api-cloud-v2.bitmart.com/contract/private/submit-plan-order`

| Field  | Type   | Required? | Description                          |
| ------ | ------ | --------- | ------------------------------------ |
| symbol | String | Yes       | Symbol of the contract(like BTCUSDT) |
| type   | String | No        | Order type                           |

\-`limit`(default)  
\-`market`  
\-`take_profit`  
\-`stop_loss` | | side | Int | Yes | Order side  
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
\-`isolated` | | mode | Int | No | Order mode  
\-`1`\=GTC(default)  
\-`2`\=FOK  
\-`3`\=IOC  
\-`4`\=Maker Only | | size | Int | Yes | Order size (Number of contracts) | |
trigger_price | String | Yes | Trigger price | | executive_price | String | No |
Execution price for plan order, mandatory when type = limit | | price_way | Int
| Yes | Price way  
\-`1`\=price_way_long  
\-`2`\=price_way_short | | price_type | Int | Yes | Trigger price type  
\-`1`\=last_price  
\-`2`\=fair_price | | plan_category | Int | No | TP/SL type  
\-`1`\=TP/SL  
\-`2`\=Position TP/SL | | preset_take_profit_price_type | Int | No | Pre-set TP
price type  
\-`1`\=last_price(default)  
\-`2`\=fair_price | | preset_stop_loss_price_type | Int | No | Pre-set SL price
type  
\-`1`\=last_price(default)  
\-`2`\=fair_price | | preset_take_profit_price | String | No | Pre-set TP price
| | preset_stop_loss_price | String | No | Pre-set SL price |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": 220609666322019   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field    | Type | Description |
| -------- | ---- | ----------- |
| order_id | Int  | Order ID    |
