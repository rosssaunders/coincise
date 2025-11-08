# GET Get All Open Orders (KEYED)

**Source:** [Get All Open Orders (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get All Open Orders (KEYED)

`Applicable for querying contract all open orders`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/get-open-orders`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/get-open-orders?symbol=BTCUSDT&order_state=partially_filled&type=market&limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract(like BTCUSDT) |
| type | string | No | Order type  
\-`limit`  
\- `market`  
\- `trailing` |
| order\_state | string | No | Order state  
\-`all`(default)  
\- `partially_filled` |
| limit | int | No | The number of returned results, with a maximum of 100 and a default of 100 |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "order_id": "220908185908509",       "client_order_id": "BM123",       "price": "14277",       "size": "7216",       "symbol": "BTCUSDT",       "state": 4,       "side": 3,       "type": "limit",       "position_mode": "hedge_mode",       "leverage": "0",       "open_type": "isolated",       "deal_avg_price": "14277",       "deal_size": "7216",       "preset_take_profit_price_type": 1,       "preset_stop_loss_price_type": 2,       "preset_take_profit_price": "68000",       "preset_stop_loss_price": "60000",       "create_time": 1662368173000,       "update_time": 1662368173000     }   ],   "trace": "80ba1f07-1b6f-46ad-81dd-78ac7e9bbccd" }`

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
\- `limit`  
\- `market`  
\- `trailing` |
| position\_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` |
| size | String | Order amount |
| leverage | String | Leverage order multipliers |
| String | String | Leverage order multipliers |
| open\_type | String | Open type  
\-`cross`  
\-`isolated` |
| deal\_avg\_price | String | Average deal price |
| deal\_size | String | Deal amount |
| price | String | Consignment price |
| state | Int | Order status  
\-`2`\=status\_check |
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
| update\_time | Long | Order updated timestamp (ms) |