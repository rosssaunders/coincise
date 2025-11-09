# GET Get Current Position V2 (KEYED)

**Source:**
[Get Current Position V2 (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Current Position V2 (KEYED)

`Applicable for checking the position details a specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/position-v2`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/position-v2?symbol=BTCUSDT`

| Field   | Type   | Required? | Description                          |
| ------- | ------ | --------- | ------------------------------------ |
| symbol  | String | No        | Symbol of the contract(like BTCUSDT) |
| account | String | No        | Trading account                      |

\-`futures`(default)  
\-`copy_trading` |

##### Note

- If `symbol` is not provided, data will only be returned for trading pairs with
  existing positions; trading pairs without positions will not return any data.
- If `symbol` is provided, data will be returned regardless of whether there is
  a position. If the user has no position, the position-related fields will be
  displayed as zero.

#### Response Data

> For One-way position mode:

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol": "BTCUSDT",       "leverage": "51",       "timestamp": 1746687390815,       "current_fee": "0.0000397",       "open_timestamp": 0,       "current_value": "0",       "mark_price": "98952",       "position_value": "0",       "position_cross": "0",       "maintenance_margin": "0",       "close_vol": "0",       "close_avg_price": "0",       "open_avg_price": "0",       "entry_price": "0",       "current_amount": "0",       "position_amount": "5",       "realized_value": "0",       "mark_value": "0",       "account": "futures",       "open_type": "isolated",       "position_side": "both",       "unrealized_pnl": "0",       "liquidation_price": "0",       "max_notional_value": "500000",       "initial_margin": "0"     }   ],   "trace": "37ffeecd-3a6f-494a-8337-5c3a6012abfa" }`

> For Hedge position mode：

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol": "BTCUSDT",       "leverage": "51",       "timestamp": 1746687096451,       "current_fee": "0.0000397",       "open_timestamp": 0,       "current_value": "0",       "mark_price": "98911.62032609",       "position_value": "0",       "position_cross": "0",       "maintenance_margin": "0",       "close_vol": "0",       "close_avg_price": "0",       "open_avg_price": "0",       "entry_price": "0",       "current_amount": "0",       "position_amount": "5",       "realized_value": "0",       "mark_value": "0",       "account": "futures",       "open_type": "isolated",       "position_side": "long",       "unrealized_pnl": "0",       "liquidation_price": "0",       "max_notional_value": "500000",       "initial_margin": "0"     },     {       "symbol": "BTCUSDT",       "leverage": "51",       "timestamp": 1746687096451,       "current_fee": "0.0000397",       "open_timestamp": 0,       "current_value": "0",       "mark_price": "98911.62032609",       "position_value": "0",       "position_cross": "0",       "maintenance_margin": "0",       "close_vol": "0",       "close_avg_price": "0",       "open_avg_price": "0",       "entry_price": "0",       "current_amount": "0",       "position_amount": "5",       "realized_value": "0",       "mark_value": "0",       "account": "futures",       "open_type": "isolated",       "position_side": "short",       "unrealized_pnl": "0",       "liquidation_price": "0",       "max_notional_value": "500000",       "initial_margin": "0"     }   ],   "trace": "ab2131db-5827-45ca-a1be-94522510e107" }`

| Field              | Type   | Description                         |
| ------------------ | ------ | ----------------------------------- |
| leverage           | String | Leverage multiplier                 |
| symbol             | String | Symbol of the contract              |
| current_fee        | String | Current position fees               |
| open_timestamp     | Long   | Opening timestamp                   |
| current_value      | String | Position value based on last price  |
| mark_price         | String | Mark price                          |
| mark_value         | String | Position value based on mark price  |
| position_value     | String | Position value based on entry price |
| open_avg_price     | String | Open average price                  |
| close_avg_price    | String | Close average price                 |
| entry_price        | String | Average entry price of the position |
| close_vol          | String | Close volume                        |
| position_cross     | String | Margin calls to positions           |
| maintenance_margin | String | Maintenance Margin                  |
| open_type          | String | Position margin type                |

\-`cross`  
\-`isolated` | | position_side | String | Position side  
\-`long`  
\-`short`  
\-`both` | | liquidation_price | String | Liquidation price | |
max_notional_value | String | Maximum notional value currently allowed | |
current_amount | String | Current position amount | | position_amount | String |
Current position direction amount  
\-`Hedge mode`\=always positive  
\-`One-way mode`\=positive represent long, negative represent short | |
unrealized_pnl | String | Unrealized PnL | | realized_value | String | Realized
PnL | | initial_margin | String | Position margin | | account | String | Trading
account  
\-`futures`  
\-`copy_trading` | | timestamp | Long | Current timestamp(ms) |
