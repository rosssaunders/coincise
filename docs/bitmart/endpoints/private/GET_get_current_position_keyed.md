# GET Get Current Position (KEYED)

**Source:**
[Get Current Position (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Current Position (KEYED)

`Applicable for checking the position details a specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/position`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/position?symbol=BTCUSDT`

| Field   | Type   | Required? | Description                          |
| ------- | ------ | --------- | ------------------------------------ |
| symbol  | String | No        | Symbol of the contract(like BTCUSDT) |
| account | String | No        | Trading account                      |

\-`futures`  
\-`copy_trading` |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol": "BTCUSDT",       "leverage": "5",       "timestamp": 1663814313531,       "current_fee": "5.00409471",       "open_timestamp": 1662714817820,       "current_value": "16680.3157",       "mark_value": "16673.27053207877",       "mark_price": "93000.50",       "position_value": "18584.272343943943943944339",       "position_cross": "3798.397624451826977945",       "maintenance_margin": "4798.397624451826977945",       "margin_type":"Isolated",       "position_mode": "hedge_mode",       "close_vol": "100",       "close_avg_price": "20700.7",       "open_avg_price": "20200",       "entry_price": "20201",       "current_amount": "899",       "unrealized_value": "1903.956643943943943944339",       "realized_value": "55.049173071454605573",       "position_type": 2,       "account": "futures"     }   ],   "trace": "ae96cae5-1f09-4ea5-971e-4474a6724bc8" }`

| Field              | Type   | Description                         |
| ------------------ | ------ | ----------------------------------- |
| leverage           | String | Leverage multiplier                 |
| symbol             | String | Symbol of the contract              |
| current_fee        | String | Current position fees               |
| open_timestamp     | Long   | Opening timestamp                   |
| current_value      | String | Position value based on last price  |
| mark_value         | String | Position value based on mark price  |
| mark_price         | String | mark price                          |
| position_value     | String | Position value based on entry price |
| open_avg_price     | String | Open average price                  |
| close_avg_price    | String | Close average price                 |
| entry_price        | String | Average entry price of the position |
| close_vol          | String | Close volume                        |
| position_cross     | String | Margin calls to positions           |
| maintenance_margin | String | Maintenance Margin                  |
| margin_type        | String | Margin type of the position         |

\-`Cross`  
\-`Isolated` | | position_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` | | current_amount | String | Current position amount | |
unrealized_value | String | Unrealized PnL | | realized_value | String |
Realized PnL | | position_type | Int | position type  
\-`1`\=long  
\-`2`\=short | | account | String | Trading account  
\-`futures`  
\-`copy_trading` | | timestamp | Long | Current timestamp(ms) |
