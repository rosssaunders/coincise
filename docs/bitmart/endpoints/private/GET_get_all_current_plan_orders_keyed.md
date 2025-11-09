# GET Get All Current Plan Orders (KEYED)

**Source:**
[Get All Current Plan Orders (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get All Current Plan Orders (KEYED)

`Applicable for querying contract all plan orders`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/current-plan-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/current-plan-order?symbol=BTCUSDT&type=market&limit=10`

| Field  | Type   | Required? | Description                          |
| ------ | ------ | --------- | ------------------------------------ |
| symbol | String | No        | Symbol of the contract(like BTCUSDT) |
| type   | String | No        | Order type                           |

\-`limit`  
\- `market` | | limit | int | No | The number of returned results, with a
maximum of 100 and a default of 100 | | plan_type | String | No | Plan order
type  
\-`plan`  
\- `profit_loss`  
default all |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "order_id": "220908185908509",       "client_order_id": "BM123",       "executive_price": "14277",       "trigger_price": "14277",       "size": "7216",       "symbol": "BTCUSDT",       "state": 4,       "side": 3,       "mode": 1,       "position_mode": "hedge_mode",       "price_way": 2,       "price_type": 1,       "plan_category": 2,       "type": "stop_loss",       "leverage": "0",       "open_type": "isolated",       "create_time": 1662368173000,       "update_time": 1662368173000     }   ],   "trace": "80ba1f07-1b6f-46ad-81dd-78ac7e9bbccd" }`

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
\-`4`\=sell | | mode | Int | Order mode  
\-`1`\=GTC  
\-`2`\=FOK  
\-`3`\=IOC  
\-`4`\=Maker Only | | position_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` | | price_way | Int | Price way  
\-`1`\=price_way_long  
\-`2`\=price_way_short | | price_type | Int | Trigger price type  
\-`1`\=last_price  
\-`2`\=fair_price | | type | String | Order type  
\- `plan`  
\- `take_profit`  
\- `stop_loss` | | plan_category | Int | TP/SL type  
\- `1`\=TP/SL  
\- `2`\=Position TP/SL | | size | String | Order amount | | leverage | String |
Leverage order multipliers | | open_type | String | Open type  
\-`cross`  
\-`isolated` | | executive_price | String | Executive price | | trigger_price |
String | Trigger price | | state | Int | Order status  
\-`1`\=status_approval  
\-`2`\=status_check | | preset_take_profit_price_type | Int | Pre-set TP price
type  
\-`1`\=last_price  
\-`2`\=fair_price | | preset_stop_loss_price_type | Int | Pre-set SL price
type  
\-`1`\=last_price  
\-`2`\=fair_price | | preset_take_profit_price | String | Pre-set TP price | |
preset_stop_loss_price | String | Pre-set SL price | | create_time | Long |
Order created timestamp (ms) | | update_time | Long | Order updated timestamp
(ms) |
