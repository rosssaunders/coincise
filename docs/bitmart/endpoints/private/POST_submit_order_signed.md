# POST Submit Order (SIGNED)

**Source:** [Submit Order (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Submit Order (SIGNED)

`Applicable for placing contract orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/submit-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  -X POST -d '{   "symbol":"ETHUSDT",   "client_order_id":"BM1234",   "side":4,   "mode":1,   "type":"limit",   "leverage":"1",   "open_type":"isolated",   "size":10,   "price":"2000" }' https://api-cloud-v2.bitmart.com/contract/private/submit-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |
| client\_order\_id | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) |
| type | String | No | Order type  
\-`limit`(default)  
\-`market` |
| side | Int | Yes | Order side  
hedge mode  
\-`1`\=buy\_open\_long  
\-`2`\=buy\_close\_short  
\-`3`\=sell\_close\_long  
\-`4`\=sell\_open\_short  
oneway mode  
\-`1`\=buy  
\-`2`\=buy(reduce only)  
\-`3`\=sell(reduce only)  
\-`4`\=sell |
| leverage | String | No | Order leverage |
| open\_type | String | No | Open type, required at close position  
\-`cross`  
\-`isolated` |
| mode | Int | No | Order mode  
\-`1`\=GTC(default)  
\-`2`\=FOK  
\-`3`\=IOC  
\-`4`\=Maker Only |
| price | String | Yes | Order price, required at limit order |
| size | Int | Yes | Order size (Number of contracts) |
| preset\_take\_profit\_price\_type | Int | No | Pre-set TP price type  
\-`1`\=last\_price(default)  
\-`2`\=fair\_price |
| preset\_stop\_loss\_price\_type | Int | No | Pre-set SL price type  
\-`1`\=last\_price(default)  
\-`2`\=fair\_price |
| preset\_take\_profit\_price | String | No | Pre-set TP price |
| preset\_stop\_loss\_price | String | No | Pre-set SL price |
| stp\_mode | Int | No | Self Trading Protection  
\-`1`\=cancel\_maker(default)  
\-`2`\=cancel\_taker  
\-`3`\=cancel\_both |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": 220609666322019,     "price": "25637.2"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| order\_id | Int | Order ID |
| price | String | Order Submit Price，if submit market type order，will return string："market price" |