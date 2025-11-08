# GET Get Order History (KEYED)

**Source:** [Get Order History (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Order History (KEYED)

`Applicable for querying contract order history`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/order-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/order-history?symbol=BTCUSDT&start_time=1662368173&end_time=1662368179`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |
| order\_id | String | No | Order ID |
| client\_order\_id | String | No | Client-defined OrderId |
| account | String | No | Trading account  
\-`futures`  
\-`copy_trading` |
| start\_time | Long | No | Start time(Timestamp in Seconds) |
| end\_time | Long | No | End time(Timestamp in Seconds) |

##### Note

-   If the time range `start_time` and `end_time` are not filled in, the default query is the data of the last 7 days
-   If the time range is filled in, `end_time` must be greater than the value of `start_time`, and the maximum query interval of `start_time` and `end_time` is 90 days
-   Each request returns a maximum of 200 records, and any records exceeding that will not be returned.

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "message": "Ok",   "data": [     {       "order_id": "3000101684062644",       "client_order_id": "PLAN_3000097492004577",       "price": "0",       "trigger_price": "0",       "execution_price": "0",       "size": "1",       "symbol": "BTCUSDT",       "state": 4,       "side": 2,       "type": "market",       "account": "futures",       "position_mode": "hedge_mode",       "leverage": "20",       "open_type": "cross",       "deal_avg_price": "84802",       "deal_size": "1",       "create_time": 1743160485193,       "update_time": 1743160485258,       "activation_price_type": 1,       "activation_price": "0",       "callback_rate": "0",       "preset_take_profit_price_type": 0,       "preset_stop_loss_price_type": 0,       "preset_take_profit_price": "",       "preset_stop_loss_price": ""     }   ],   "trace": "b15f261868b540889e57f826e0420621.80.17434162457898722" }`

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
\- `adl`  
\- `trailing`  
\- `planorder` |
| account | String | Trading account  
\-`futures`  
\-`copy_trading` |
| position\_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` |
| leverage | String | Leverage order multipliers |
| open\_type | String | Open type  
\-`cross`  
\-`isolated` |
| deal\_avg\_price | String | Average deal price |
| deal\_size | String | Deal amount |
| price | String | Consignment price |
| trigger\_price | String | Trigger price,returned at plan order |
| execution\_price | String | Executive price,returned at plan order only  
\-`Market price`\=If the execution price is a market price, return to Market  
\-`Limit price`\=If the execution price is a limit price, return the set limit price |
| state | Int | Order status  
\-`2`\=status\_check  
\-`4`\=status\_finish |
| activation\_price | String | Activation price, returned at trailing order |
| callback\_rate | String | Callback rate, returned at trailing order |
| activation\_price\_type | Int | Activation price type, returned at trailing order  
\-`1`\=last\_price  
\-`2`\=fair\_price |
| executive\_order\_id | String | Activation Execute Order ID |
| preset\_take\_profit\_price\_type | Int | Pre-set TP price type  
\-`0`\=unset  
\-`1`\=last\_price  
\-`2`\=fair\_price |
| preset\_stop\_loss\_price\_type | Int | Pre-set SL price type  
\-`0`\=unset  
\-`1`\=last\_price  
\-`2`\=fair\_price |
| preset\_take\_profit\_price | String | Pre-set TP price |
| preset\_stop\_loss\_price | String | Pre-set SL price |
| create\_time | Long | Order created timestamp (ms) |
| update\_time | Long | Order updated timestamp (ms) |