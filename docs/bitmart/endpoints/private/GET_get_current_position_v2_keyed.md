# GET Get Current Position V2 (KEYED)

**Source:** [Get Current Position V2 (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

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

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/position-v2?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract(like BTCUSDT) |
| account | String | No | Trading account  
\-`futures`(default)  
\-`copy_trading` |

##### Note

-   If `symbol` is not provided, data will only be returned for trading pairs with existing positions; trading pairs without positions will not return any data.
-   If `symbol` is provided, data will be returned regardless of whether there is a position. If the user has no position, the position-related fields will be displayed as zero.

#### Response Data

> For One-way position mode:

Copy Success

Copy to Clipboard

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol": "BTCUSDT",       "leverage": "51",       "timestamp": 1746687390815,       "current_fee": "0.0000397",       "open_timestamp": 0,       "current_value": "0",       "mark_price": "98952",       "position_value": "0",       "position_cross": "0",       "maintenance_margin": "0",       "close_vol": "0",       "close_avg_price": "0",       "open_avg_price": "0",       "entry_price": "0",       "current_amount": "0",       "position_amount": "5",       "realized_value": "0",       "mark_value": "0",       "account": "futures",       "open_type": "isolated",       "position_side": "both",       "unrealized_pnl": "0",       "liquidation_price": "0",       "max_notional_value": "500000",       "initial_margin": "0"     }   ],   "trace": "37ffeecd-3a6f-494a-8337-5c3a6012abfa" }`

> For Hedge position mode：

Copy Success

Copy to Clipboard

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol": "BTCUSDT",       "leverage": "51",       "timestamp": 1746687096451,       "current_fee": "0.0000397",       "open_timestamp": 0,       "current_value": "0",       "mark_price": "98911.62032609",       "position_value": "0",       "position_cross": "0",       "maintenance_margin": "0",       "close_vol": "0",       "close_avg_price": "0",       "open_avg_price": "0",       "entry_price": "0",       "current_amount": "0",       "position_amount": "5",       "realized_value": "0",       "mark_value": "0",       "account": "futures",       "open_type": "isolated",       "position_side": "long",       "unrealized_pnl": "0",       "liquidation_price": "0",       "max_notional_value": "500000",       "initial_margin": "0"     },     {       "symbol": "BTCUSDT",       "leverage": "51",       "timestamp": 1746687096451,       "current_fee": "0.0000397",       "open_timestamp": 0,       "current_value": "0",       "mark_price": "98911.62032609",       "position_value": "0",       "position_cross": "0",       "maintenance_margin": "0",       "close_vol": "0",       "close_avg_price": "0",       "open_avg_price": "0",       "entry_price": "0",       "current_amount": "0",       "position_amount": "5",       "realized_value": "0",       "mark_value": "0",       "account": "futures",       "open_type": "isolated",       "position_side": "short",       "unrealized_pnl": "0",       "liquidation_price": "0",       "max_notional_value": "500000",       "initial_margin": "0"     }   ],   "trace": "ab2131db-5827-45ca-a1be-94522510e107" }`

| Field | Type | Description |
| --- | --- | --- |
| leverage | String | Leverage multiplier |
| symbol | String | Symbol of the contract |
| current\_fee | String | Current position fees |
| open\_timestamp | Long | Opening timestamp |
| current\_value | String | Position value based on last price |
| mark\_price | String | Mark price |
| mark\_value | String | Position value based on mark price |
| position\_value | String | Position value based on entry price |
| open\_avg\_price | String | Open average price |
| close\_avg\_price | String | Close average price |
| entry\_price | String | Average entry price of the position |
| close\_vol | String | Close volume |
| position\_cross | String | Margin calls to positions |
| maintenance\_margin | String | Maintenance Margin |
| open\_type | String | Position margin type  
\-`cross`  
\-`isolated` |
| position\_side | String | Position side  
\-`long`  
\-`short`  
\-`both` |
| liquidation\_price | String | Liquidation price |
| max\_notional\_value | String | Maximum notional value currently allowed |
| current\_amount | String | Current position amount |
| position\_amount | String | Current position direction amount  
\-`Hedge mode`\=always positive  
\-`One-way mode`\=positive represent long, negative represent short |
| unrealized\_pnl | String | Unrealized PnL |
| realized\_value | String | Realized PnL |
| initial\_margin | String | Position margin |
| account | String | Trading account  
\-`futures`  
\-`copy_trading` |
| timestamp | Long | Current timestamp(ms) |