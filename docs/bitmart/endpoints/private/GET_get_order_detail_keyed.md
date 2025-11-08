# GET Get Order Detail (KEYED)

**Source:** [Get Order Detail (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Order Detail (KEYED)

`Applicable for querying contract order detail`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/order?symbol=BTCUSDT&order_id=220609666322019`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |
| order\_id | String | Yes | Order ID |
| account | String | No | Trading account  
\-`futures`  
\-`copy_trading` |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": "220906179895578",     "client_order_id": "BM123",     "price": "1",     "size": "1000",     "symbol": "BTCUSDT",     "state": 2,     "side": 1,     "type": "limit",     "position_mode": "hedge_mode",     "account": "futures",     "leverage": "5",     "open_type": "isolated",     "deal_avg_price": "0",     "deal_size": "1000",     "create_time": 1662368173000,     "update_time": 1662368173000   },   "trace": "638d5048-ad21-4a4b-9365-d0756fbfc7ba" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract |
| order\_id | String | Order ID |
| client\_order\_id | String | Client-defined OrderId (If the field is not defined, a empty string is returned) |
| side | Int | Order side  
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
| type | String | Order type  
\-`limit`  
\- `market`  
\- `liquidate`  
\- `bankruptcy`  
\-`adl` |
| position\_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` |
| account | String | Trading account  
\-`futures`  
\-`copy_trading` |
| leverage | String | Leverage order multipliers |
| open\_type | String | Open type  
\-`cross`  
\-`isolated` |
| deal\_avg\_price | String | Average deal price |
| deal\_size | String | Deal amount |
| price | String | Consignment price |
| size | String | Order amount |
| state | Int | Order status  
\-`1`\=status\_approval  
\-`2`\=status\_check  
\-`4`\=status\_finish |
| activation\_price | String | Activation price, returned at trailing order |
| callback\_rate | String | Callback rate, returned at trailing order |
| activation\_price\_type | Int | Activation price type, returned at trailing order  
\-`1`\=last\_price  
\-`2`\=fair\_price |
| preset\_take\_profit\_price\_type | Int | Pre-set TP price type  
\-`1`\=last\_price  
\-`2`\=fair\_price |
| preset\_stop\_loss\_price\_type | Int | Pre-set SL price type  
\-`1`\=last\_price  
\-`2`\=fair\_price |
| preset\_take\_profit\_price | String | Pre-set TP price |
| preset\_stop\_loss\_price | String | Pre-set SL price |
| create\_time | Long | Order created timestamp (ms) |
| update\_time | Long | Latest transaction timestamp (ms) |