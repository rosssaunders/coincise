# GET Get Order History (KEYED)

**Source:**
[Get Order History (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

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

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/order-history?symbol=BTCUSDT&start_time=1662368173&end_time=1662368179`

| Field           | Type   | Required? | Description                          |
| --------------- | ------ | --------- | ------------------------------------ |
| symbol          | String | Yes       | Symbol of the contract(like BTCUSDT) |
| order_id        | String | No        | Order ID                             |
| client_order_id | String | No        | Client-defined OrderId               |
| account         | String | No        | Trading account                      |

\-`futures`  
\-`copy_trading` | | start_time | Long | No | Start time(Timestamp in Seconds) |
| end_time | Long | No | End time(Timestamp in Seconds) |

##### Note

- If the time range `start_time` and `end_time` are not filled in, the default
  query is the data of the last 7 days
- If the time range is filled in, `end_time` must be greater than the value of
  `start_time`, and the maximum query interval of `start_time` and `end_time` is
  90 days
- Each request returns a maximum of 200 records, and any records exceeding that
  will not be returned.

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "order_id": "3000101684062644",       "client_order_id": "PLAN_3000097492004577",       "price": "0",       "trigger_price": "0",       "execution_price": "0",       "size": "1",       "symbol": "BTCUSDT",       "state": 4,       "side": 2,       "type": "market",       "account": "futures",       "position_mode": "hedge_mode",       "leverage": "20",       "open_type": "cross",       "deal_avg_price": "84802",       "deal_size": "1",       "create_time": 1743160485193,       "update_time": 1743160485258,       "activation_price_type": 1,       "activation_price": "0",       "callback_rate": "0",       "preset_take_profit_price_type": 0,       "preset_stop_loss_price_type": 0,       "preset_take_profit_price": "",       "preset_stop_loss_price": ""     }   ],   "trace": "b15f261868b540889e57f826e0420621.80.17434162457898722" }`

| Field           | Type   | Description                                                                      |
| --------------- | ------ | -------------------------------------------------------------------------------- |
| symbol          | String | Symbol of the contract                                                           |
| order_id        | String | Order ID                                                                         |
| client_order_id | String | Client-defined OrderId (If the field is not defined, a empty string is returned) |
| side            | Int    | Order side                                                                       |

hedge mode  
\-`1`\=buy_open_long  
\-`2`\=buy_close_short  
\-`3`\=sell_close_long  
\-`4`\=sell_open_short  
oneway mode  
\-`1`\=buy  
\-`2`\=buy(reduce only)  
\-`3`\=sell(reduce only)  
\-`4`\=sell | | type | String | Order type  
\-`limit`  
\- `market`  
\- `liquidate`  
\- `bankruptcy`  
\- `adl`  
\- `trailing`  
\- `planorder` | | account | String | Trading account  
\-`futures`  
\-`copy_trading` | | position_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` | | leverage | String | Leverage order multipliers | |
open_type | String | Open type  
\-`cross`  
\-`isolated` | | deal_avg_price | String | Average deal price | | deal_size |
String | Deal amount | | price | String | Consignment price | | trigger_price |
String | Trigger price,returned at plan order | | execution_price | String |
Executive price,returned at plan order only  
\-`Market price`\=If the execution price is a market price, return to Market  
\-`Limit price`\=If the execution price is a limit price, return the set limit
price | | state | Int | Order status  
\-`2`\=status_check  
\-`4`\=status_finish | | activation_price | String | Activation price, returned
at trailing order | | callback_rate | String | Callback rate, returned at
trailing order | | activation_price_type | Int | Activation price type, returned
at trailing order  
\-`1`\=last_price  
\-`2`\=fair_price | | executive_order_id | String | Activation Execute Order ID
| | preset_take_profit_price_type | Int | Pre-set TP price type  
\-`0`\=unset  
\-`1`\=last_price  
\-`2`\=fair_price | | preset_stop_loss_price_type | Int | Pre-set SL price
type  
\-`0`\=unset  
\-`1`\=last_price  
\-`2`\=fair_price | | preset_take_profit_price | String | Pre-set TP price | |
preset_stop_loss_price | String | Pre-set SL price | | create_time | Long |
Order created timestamp (ms) | | update_time | Long | Order updated timestamp
(ms) |
