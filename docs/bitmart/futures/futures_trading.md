# Futures Trading

## Get Trade Fee Rate (KEYED)

`Applicable for querying trade fee rate`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/trade-fee-rate`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/trade-fee-rate?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "symbol": "BTCUSDT",     "taker_fee_rate": "0.0006",     "maker_fee_rate": "0.0002"   },   "trace": "638d5048-ad21-4a4b-1234-d0756fbfc7ba" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract 
| taker_fee_rate | String | Taker fee rate 
| maker_fee_rate | String | Maker fee rate 

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
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| order_id | String | Yes | Order ID 
| account | String | No | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": "220906179895578",     "client_order_id": "BM123",     "price": "1",     "size": "1000",     "symbol": "BTCUSDT",     "state": 2,     "side": 1,     "type": "limit",     "position_mode": "hedge_mode",     "account": "futures",     "leverage": "5",     "open_type": "isolated",     "deal_avg_price": "0",     "deal_size": "1000",     "create_time": 1662368173000,     "update_time": 1662368173000   },   "trace": "638d5048-ad21-4a4b-9365-d0756fbfc7ba" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract 
| order_id | String | Order ID 
| client_order_id | String | Client-defined OrderId (If the field is not defined, a empty string is returned) 
| side | Int | Order side<br>hedge mode<br>-<code>1</code>=buy_open_long<br>-<code>2</code>=buy_close_short<br>-<code>3</code>=sell_close_long<br>-<code>4</code>=sell_open_short<br>oneway mode<br>-<code>1</code>=buy<br>-<code>2</code>=buy(reduce only)<br>-<code>3</code>=sell(reduce only)<br>-<code>4</code>=sell 
| type | String | Order type<br>-<code>limit</code><br>- <code>market</code><br>- <code>liquidate</code><br>- <code>bankruptcy</code><br>-<code>adl</code> 
| position_mode | String | Position mode<br>-<code>hedge_mode</code><br>-<code>one_way_mode</code> 
| account | String | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 
| leverage | String | Leverage order multipliers 
| open_type | String | Open type<br>-<code>cross</code><br>-<code>isolated</code> 
| deal_avg_price | String | Average deal price 
| deal_size | String | Deal amount 
| price | String | Consignment price 
| size | String | Order amount 
| state | Int | Order status<br>-<code>1</code>=status_approval<br>-<code>2</code>=status_check<br>-<code>4</code>=status_finish 
| activation_price | String | Activation price, returned at trailing order 
| callback_rate | String | Callback rate, returned at trailing order 
| activation_price_type | Int | Activation price type, returned at trailing order<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| preset_take_profit_price_type | Int | Pre-set TP price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| preset_stop_loss_price_type | Int | Pre-set SL price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| preset_take_profit_price | String | Pre-set TP price 
| preset_stop_loss_price | String | Pre-set SL price 
| create_time | Long | Order created timestamp (ms) 
| update_time | Long | Latest transaction timestamp (ms) 

## Get Order History (KEYED)

`Applicable for querying contract order history`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/order-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/order-history?symbol=BTCUSDT&start_time=1662368173&end_time=1662368179`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| account | String | No | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 
| start_time | Long | No | Start time(Timestamp in Seconds) 
| end_time | Long | No | End time(Timestamp in Seconds) 

##### Note

*   If the time range `start_time` and `end_time` are not filled in, the default query is the data of the last 7 days
*   If the time range is filled in, `end_time` must be greater than the value of `start_time`, and the maximum query interval of `start_time` and `end_time` is 90 days
*   Each request returns a maximum of 200 records, and any records exceeding that will not be returned.

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "order_id": "3000101684062644",       "client_order_id": "PLAN_3000097492004577",       "price": "0",       "trigger_price": "0",       "execution_price": "0",       "size": "1",       "symbol": "BTCUSDT",       "state": 4,       "side": 2,       "type": "market",       "account": "futures",       "position_mode": "hedge_mode",       "leverage": "20",       "open_type": "cross",       "deal_avg_price": "84802",       "deal_size": "1",       "create_time": 1743160485193,       "update_time": 1743160485258,       "activation_price_type": 1,       "activation_price": "0",       "callback_rate": "0",       "preset_take_profit_price_type": 0,       "preset_stop_loss_price_type": 0,       "preset_take_profit_price": "",       "preset_stop_loss_price": ""     }   ],   "trace": "b15f261868b540889e57f826e0420621.80.17434162457898722" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract 
| order_id | String | Order ID 
| client_order_id | String | Client-defined OrderId (If the field is not defined, a empty string is returned) 
| side | Int | Order side<br>hedge mode<br>-<code>1</code>=buy_open_long<br>-<code>2</code>=buy_close_short<br>-<code>3</code>=sell_close_long<br>-<code>4</code>=sell_open_short<br>oneway mode<br>-<code>1</code>=buy<br>-<code>2</code>=buy(reduce only)<br>-<code>3</code>=sell(reduce only)<br>-<code>4</code>=sell 
| type | String | Order type<br>-<code>limit</code><br>- <code>market</code><br>- <code>liquidate</code><br>- <code>bankruptcy</code><br>- <code>adl</code><br>- <code>trailing</code><br>- <code>planorder</code> 
| account | String | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 
| position_mode | String | Position mode<br>-<code>hedge_mode</code><br>-<code>one_way_mode</code> 
| leverage | String | Leverage order multipliers 
| open_type | String | Open type<br>-<code>cross</code><br>-<code>isolated</code> 
| deal_avg_price | String | Average deal price 
| deal_size | String | Deal amount 
| price | String | Consignment price 
| trigger_price | String | Trigger price,returned at plan order 
| execution_price | String | Executive price,returned at plan order only<br>-<code>Market price</code>=If the execution price is a market price, return to Market<br>-<code>Limit price</code>=If the execution price is a limit price, return the set limit price 
| state | Int | Order status<br>-<code>2</code>=status_check<br>-<code>4</code>=status_finish 
| activation_price | String | Activation price, returned at trailing order 
| callback_rate | String | Callback rate, returned at trailing order 
| activation_price_type | Int | Activation price type, returned at trailing order<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| executive_order_id | String | Activation Execute Order ID 
| preset_take_profit_price_type | Int | Pre-set TP price type<br>-<code>0</code>=unset<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| preset_stop_loss_price_type | Int | Pre-set SL price type<br>-<code>0</code>=unset<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| preset_take_profit_price | String | Pre-set TP price 
| preset_stop_loss_price | String | Pre-set SL price 
| create_time | Long | Order created timestamp (ms) 
| update_time | Long | Order updated timestamp (ms) 

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
| symbol | String | No | Symbol of the contract(like BTCUSDT) 
| type | string | No | Order type<br>-<code>limit</code><br>- <code>market</code><br>- <code>trailing</code> 
| order_state | string | No | Order state<br>-<code>all</code>(default)<br>- <code>partially_filled</code> 
| limit | int | No | The number of returned results, with a maximum of 100 and a default of 100 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "order_id": "220908185908509",       "client_order_id": "BM123",       "price": "14277",       "size": "7216",       "symbol": "BTCUSDT",       "state": 4,       "side": 3,       "type": "limit",       "position_mode": "hedge_mode",       "leverage": "0",       "open_type": "isolated",       "deal_avg_price": "14277",       "deal_size": "7216",       "preset_take_profit_price_type": 1,       "preset_stop_loss_price_type": 2,       "preset_take_profit_price": "68000",       "preset_stop_loss_price": "60000",       "create_time": 1662368173000,       "update_time": 1662368173000     }   ],   "trace": "80ba1f07-1b6f-46ad-81dd-78ac7e9bbccd" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract 
| order_id | String | Order ID 
| client_order_id | String | Client-defined OrderId (If the field is not defined, a empty string is returned) 
| side | Int | Order side<br>hedge mode<br>-<code>1</code>=buy_open_long<br>-<code>2</code>=buy_close_short<br>-<code>3</code>=sell_close_long<br>-<code>4</code>=sell_open_short<br>oneway mode<br>-<code>1</code>=buy<br>-<code>2</code>=buy(reduce only)<br>-<code>3</code>=sell(reduce only)<br>-<code>4</code>=sell 
| type | String | Order type<br>- <code>limit</code><br>- <code>market</code><br>- <code>trailing</code> 
| position_mode | String | Position mode<br>-<code>hedge_mode</code><br>-<code>one_way_mode</code> 
| size | String | Order amount 
| leverage | String | Leverage order multipliers 
| String | String | Leverage order multipliers 
| open_type | String | Open type<br>-<code>cross</code><br>-<code>isolated</code> 
| deal_avg_price | String | Average deal price 
| deal_size | String | Deal amount 
| price | String | Consignment price 
| state | Int | Order status<br>-<code>2</code>=status_check 
| activation_price | String | Activation price, returned at trailing order 
| callback_rate | String | Callback rate, returned at trailing order 
| activation_price_type | Int | Activation price type, returned at trailing order<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| preset_take_profit_price_type | Int | Pre-set TP price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| preset_stop_loss_price_type | Int | Pre-set SL price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| preset_take_profit_price | String | Pre-set TP price 
| preset_stop_loss_price | String | Pre-set SL price 
| create_time | Long | Order created timestamp (ms) 
| update_time | Long | Order updated timestamp (ms) 

## Get All Current Plan Orders (KEYED)

`Applicable for querying contract all plan orders`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/current-plan-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/current-plan-order?symbol=BTCUSDT&type=market&limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract(like BTCUSDT) 
| type | String | No | Order type<br>-<code>limit</code><br>- <code>market</code> 
| limit | int | No | The number of returned results, with a maximum of 100 and a default of 100 
| plan_type | String | No | Plan order type<br>-<code>plan</code><br>- <code>profit_loss</code><br>default all 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "order_id": "220908185908509",       "client_order_id": "BM123",       "executive_price": "14277",       "trigger_price": "14277",       "size": "7216",       "symbol": "BTCUSDT",       "state": 4,       "side": 3,       "mode": 1,       "position_mode": "hedge_mode",       "price_way": 2,       "price_type": 1,       "plan_category": 2,       "type": "stop_loss",       "leverage": "0",       "open_type": "isolated",       "create_time": 1662368173000,       "update_time": 1662368173000     }   ],   "trace": "80ba1f07-1b6f-46ad-81dd-78ac7e9bbccd" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract 
| order_id | String | Order ID 
| client_order_id | String | Client-defined OrderId (If the field is not defined, a empty string is returned) 
| side | Int | Order side<br>hedge mode<br>-<code>1</code>=buy_open_long<br>-<code>2</code>=buy_close_short<br>-<code>3</code>=sell_close_long<br>-<code>4</code>=sell_open_short<br>oneway mode<br>-<code>1</code>=buy<br>-<code>2</code>=buy(reduce only)<br>-<code>3</code>=sell(reduce only)<br>-<code>4</code>=sell 
| mode | Int | Order mode<br>-<code>1</code>=GTC<br>-<code>2</code>=FOK<br>-<code>3</code>=IOC<br>-<code>4</code>=Maker Only 
| position_mode | String | Position mode<br>-<code>hedge_mode</code><br>-<code>one_way_mode</code> 
| price_way | Int | Price way<br>-<code>1</code>=price_way_long<br>-<code>2</code>=price_way_short 
| price_type | Int | Trigger price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| type | String | Order type<br>- <code>plan</code><br>- <code>take_profit</code><br>- <code>stop_loss</code> 
| plan_category | Int | TP/SL type<br>- <code>1</code>=TP/SL<br>- <code>2</code>=Position TP/SL 
| size | String | Order amount 
| leverage | String | Leverage order multipliers 
| open_type | String | Open type<br>-<code>cross</code><br>-<code>isolated</code> 
| executive_price | String | Executive price 
| trigger_price | String | Trigger price 
| state | Int | Order status<br>-<code>1</code>=status_approval<br>-<code>2</code>=status_check 
| preset_take_profit_price_type | Int | Pre-set TP price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| preset_stop_loss_price_type | Int | Pre-set SL price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| preset_take_profit_price | String | Pre-set TP price 
| preset_stop_loss_price | String | Pre-set SL price 
| create_time | Long | Order created timestamp (ms) 
| update_time | Long | Order updated timestamp (ms) 

## Get Current Position (KEYED)

`Applicable for checking the position details a specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/position`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/position?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract(like BTCUSDT) 
| account | String | No | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol": "BTCUSDT",       "leverage": "5",       "timestamp": 1663814313531,       "current_fee": "5.00409471",       "open_timestamp": 1662714817820,       "current_value": "16680.3157",       "mark_value": "16673.27053207877",       "mark_price": "93000.50",       "position_value": "18584.272343943943943944339",       "position_cross": "3798.397624451826977945",       "maintenance_margin": "4798.397624451826977945",       "margin_type":"Isolated",       "position_mode": "hedge_mode",       "close_vol": "100",       "close_avg_price": "20700.7",       "open_avg_price": "20200",       "entry_price": "20201",       "current_amount": "899",       "unrealized_value": "1903.956643943943943944339",       "realized_value": "55.049173071454605573",       "position_type": 2,       "account": "futures"     }   ],   "trace": "ae96cae5-1f09-4ea5-971e-4474a6724bc8" }`

| Field | Type | Description |
| --- | --- | --- |
| leverage | String | Leverage multiplier 
| symbol | String | Symbol of the contract 
| current_fee | String | Current position fees 
| open_timestamp | Long | Opening timestamp 
| current_value | String | Position value based on last price 
| mark_value | String | Position value based on mark price 
| mark_price | String | mark price 
| position_value | String | Position value based on entry price 
| open_avg_price | String | Open average price 
| close_avg_price | String | Close average price 
| entry_price | String | Average entry price of the position 
| close_vol | String | Close volume 
| position_cross | String | Margin calls to positions 
| maintenance_margin | String | Maintenance Margin 
| margin_type | String | Margin type of the position<br>-<code>Cross</code><br>-<code>Isolated</code> 
| position_mode | String | Position mode<br>-<code>hedge_mode</code><br>-<code>one_way_mode</code> 
| current_amount | String | Current position amount 
| unrealized_value | String | Unrealized PnL 
| realized_value | String | Realized PnL 
| position_type | Int | position type<br>-<code>1</code>=long<br>-<code>2</code>=short 
| account | String | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 
| timestamp | Long | Current timestamp(ms) 

## Get Current Position V2 (KEYED)

`Applicable for checking the position details a specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/position-v2`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/position-v2?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract(like BTCUSDT) 
| account | String | No | Trading account<br>-<code>futures</code>(default)<br>-<code>copy_trading</code> 

##### Note

*   If `symbol` is not provided, data will only be returned for trading pairs with existing positions; trading pairs without positions will not return any data.
*   If `symbol` is provided, data will be returned regardless of whether there is a position. If the user has no position, the position-related fields will be displayed as zero.

#### Response Data

> For One-way position mode:

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol": "BTCUSDT",       "leverage": "51",       "timestamp": 1746687390815,       "current_fee": "0.0000397",       "open_timestamp": 0,       "current_value": "0",       "mark_price": "98952",       "position_value": "0",       "position_cross": "0",       "maintenance_margin": "0",       "close_vol": "0",       "close_avg_price": "0",       "open_avg_price": "0",       "entry_price": "0",       "current_amount": "0",       "position_amount": "5",       "realized_value": "0",       "mark_value": "0",       "account": "futures",       "open_type": "isolated",       "position_side": "both",       "unrealized_pnl": "0",       "liquidation_price": "0",       "max_notional_value": "500000",       "initial_margin": "0"     }   ],   "trace": "37ffeecd-3a6f-494a-8337-5c3a6012abfa" }`

> For Hedge position mode：

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol": "BTCUSDT",       "leverage": "51",       "timestamp": 1746687096451,       "current_fee": "0.0000397",       "open_timestamp": 0,       "current_value": "0",       "mark_price": "98911.62032609",       "position_value": "0",       "position_cross": "0",       "maintenance_margin": "0",       "close_vol": "0",       "close_avg_price": "0",       "open_avg_price": "0",       "entry_price": "0",       "current_amount": "0",       "position_amount": "5",       "realized_value": "0",       "mark_value": "0",       "account": "futures",       "open_type": "isolated",       "position_side": "long",       "unrealized_pnl": "0",       "liquidation_price": "0",       "max_notional_value": "500000",       "initial_margin": "0"     },     {       "symbol": "BTCUSDT",       "leverage": "51",       "timestamp": 1746687096451,       "current_fee": "0.0000397",       "open_timestamp": 0,       "current_value": "0",       "mark_price": "98911.62032609",       "position_value": "0",       "position_cross": "0",       "maintenance_margin": "0",       "close_vol": "0",       "close_avg_price": "0",       "open_avg_price": "0",       "entry_price": "0",       "current_amount": "0",       "position_amount": "5",       "realized_value": "0",       "mark_value": "0",       "account": "futures",       "open_type": "isolated",       "position_side": "short",       "unrealized_pnl": "0",       "liquidation_price": "0",       "max_notional_value": "500000",       "initial_margin": "0"     }   ],   "trace": "ab2131db-5827-45ca-a1be-94522510e107" }`

| Field | Type | Description |
| --- | --- | --- |
| leverage | String | Leverage multiplier 
| symbol | String | Symbol of the contract 
| current_fee | String | Current position fees 
| open_timestamp | Long | Opening timestamp 
| current_value | String | Position value based on last price 
| mark_price | String | Mark price 
| mark_value | String | Position value based on mark price 
| position_value | String | Position value based on entry price 
| open_avg_price | String | Open average price 
| close_avg_price | String | Close average price 
| entry_price | String | Average entry price of the position 
| close_vol | String | Close volume 
| position_cross | String | Margin calls to positions 
| maintenance_margin | String | Maintenance Margin 
| open_type | String | Position margin type<br>-<code>cross</code><br>-<code>isolated</code> 
| position_side | String | Position side<br>-<code>long</code><br>-<code>short</code><br>-<code>both</code> 
| liquidation_price | String | Liquidation price 
| max_notional_value | String | Maximum notional value currently allowed 
| current_amount | String | Current position amount 
| position_amount | String | Current position direction amount<br>-<code>Hedge mode</code>=always positive<br>-<code>One-way mode</code>=positive represent long, negative represent short 
| unrealized_pnl | String | Unrealized PnL 
| realized_value | String | Realized PnL 
| initial_margin | String | Position margin 
| account | String | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 
| timestamp | Long | Current timestamp(ms) 

## Get Current Position Risk Details(KEYED)

`Applicable for checking the position risk details a specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/position-risk`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/position-risk?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract(like BTCUSDT) 
| account | String | No | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol":"BTCUSDT",       "position_amt":"1",       "mark_price":"67957.7",       "unrealized_profit":"969.6",       "liquidation_price":"64245",       "leverage":"20",       "max_notional_value":"3000000",       "margin_type":"Isolated",       "isolated_margin":"3078.51948691",       "position_side":"Long",       "notional":"66988.1",       "update_time":1712390438,       "account": "futures"     }   ],   "trace": "ae96cae5-1f09-4ea5-971e-4474a6724bc8" }`

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like BTCUSDT) 
| position_amt | String | Position amount 
| mark_price | String | Mark Price of the contract 
| unrealized_profit | String | Unrealized profit of the position 
| liquidation_price | String | LiquidationPrice of the position 
| leverage | String | Position leverage 
| max_notional_value | String | Maximum notional value for the current risk level 
| margin_type | String | Margin type of the position<br>-<code>Cross</code><br>-<code>Isolated</code> 
| isolated_margin | String | Margin for the isolated position 
| position_side | String | Position side<br>-<code>Long</code><br>-<code>Short</code> 
| notional | String | notional = position_amt*mark_Price 
| account | String | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 
| update_time | Long | Unix timestamp in milliseconds for when the last updated time occurred 

## Get Order Trade (KEYED)

`Applicable for querying contract order trade detail`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/trades`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/trades?symbol=BTCUSDT&start_time=1662368173&end_time=1662368179`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| account | String | No | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 
| start_time | Long | No | Start time(Timestamp in Seconds) 
| end_time | Long | No | End time(Timestamp in Seconds) 

##### Note

*   If the time range `start_time` and `end_time` are not filled in, the default query is the data of the last 7 days
*   If the time range is filled in, `end_time` must be greater than the value of `start_time`, and the maximum query interval of `start_time` and `end_time` is 90 days
*   Each request returns a maximum of 200 records, and any records exceeding that will not be returned.
*   Supported query order types: `limit`, `market`, `liquidate`, `bankruptcy`, `adl`, `trailing`

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [{     "order_id": "220921197409432",     "trade_id": "1141853921",     "symbol": "BTCUSDT",     "side": 1,     "price": "19313.3",     "vol": "108",     "exec_type": "Maker",     "profit": false,     "realised_profit": "-0.00832",     "paid_fees": "0",     "account": "futures",     "create_time": 1663663818589   }],   "trace": "638d5048-ad21-4a4b-9365-d0756fbfc7ba" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract 
| order_id | String | Order ID 
| trade_id | String | Trade detail ID 
| side | Int | Order side<br>hedge mode<br>-<code>1</code>=buy_open_long<br>-<code>2</code>=buy_close_short<br>-<code>3</code>=sell_close_long<br>-<code>4</code>=sell_open_short<br>oneway mode<br>-<code>1</code>=buy<br>-<code>2</code>=buy(reduce only)<br>-<code>3</code>=sell(reduce only)<br>-<code>4</code>=sell 
| price | String | Deal price 
| vol | String | Deal vol 
| profit | Boolean | Profitable or not 
| exec_type | String | Liquidity type<br>-<code>Taker</code><br>-<code>Maker</code> 
| realised_profit | String | realised profit 
| paid_fees | String | paid fees 
| account | String | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 
| create_time | Long | Transaction create timestamp (ms) 

## Get Transaction History (KEYED)

`Applicable for querying futures transaction history`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/transaction-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/transaction-history?symbol=BTCUSDT&start_time=1662368173000&end_time=1662368179000`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract 
| flow_type | Int | No | Type<br>- <code>0</code> = All (default)<br>- <code>1</code> = Transfer<br>- <code>2</code> = Realized PNL<br>- <code>3</code> = Funding Fee<br>- <code>4</code> = Commission Fee<br>- <code>5</code> = Liquidation Clearance 
| account | String | No | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 
| start_time | Long | No | Start time(Timestamp in Milliseconds) 
| end_time | Long | No | End time(Timestamp in Milliseconds) 
| page_size | Int | No | Default 100; max 1000 

*   If `start_time` and `end_time` are not sent, only data from the last 7 days will be returned.
*   If `type` is not sent, all types of account profit and loss transaction history will be returned.

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol": "",       "type": "Transfer",       "amount": "-0.37500000",       "asset": "USDT",       "account": "futures",       "time": "1570608000000",       "tran_id": "9689322392"     },     {       "symbol": "BTCUSDT",       "type": "Commission Fee",       "amount": "-0.01000000",       "asset": "USDT",       "account": "futures",       "time": "1570636800000",       "tran_id": "9689322392"     }   ],   "trace": "80ba1f07-1b6f-46ad-81dd-78ac7e9bbccd" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract 
| flow_type | Int | Type<br>- <code>0</code> = All (default)<br>- <code>1</code> = Transfer<br>- <code>2</code> = Realized PNL<br>- <code>3</code> = Funding Fee<br>- <code>4</code> = Commission Fee<br>- <code>5</code> = Liquidation Clearance 
| type | String | Type<br>- <code>Transfer</code><br>- <code>Realized PNL</code><br>- <code>Funding Fee</code><br>- <code>Commission Fee</code><br>- <code>Liquidation Clearance</code> 
| account | String | Trading account<br>-<code>futures</code><br>-<code>copy_trading</code> 
| amount | String | Amount, supports positive and negative values 
| asset | String | Transaction currency 
| time | String | Transaction timestamp, timestamp in ms 
| tran_id | String | Transaction ID 

## Get Transfer List (SIGNED)

`Query futures account transfer records`

#### Request URl

`POST https://api-cloud-v2.bitmart.com/account/v1/transfer-contract-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "currency":"USDT",     "time_start":1684391137804,     "time_end":1684392577804,     "page":1,     "limit":10,     "recvWindow":5000 }' https://api-cloud-v2.bitmart.com/account/v1/transfer-contract-list`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currency | String | No | Currency (like <code>USDT</code>) 
| time_start | Long | No | Start time(Timestamp in Milliseconds, e.g. 1681701557927) 
| time_end | Long | No | End time (Timestamp in Milliseconds, e.g. 1681701557927) 
| page | Int | Yes | Number of pages, allowed range [1,1000] 
| limit | Int | Yes | Number of queries, allowed range [10,100] 
| recvWindow | Long | No | Trade time limit, allowed range (0,60000], default: 5000 milliseconds 

##### Note

*   If the time range `time_start` and `time_end` are not filled in, all data will be displayed by default.
*   When filling in the time range, `time_end` must be greater than the value of `time_start`.
*   If only `time_start` is filled in, query the historical records starting from the timestamp.
*   If only `time_end` is filled in, query the historical records starting from this timestamp.

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"82abff12-b9d9-4f66-89ea-3b604c6d84",     "data":{         "records":[{             "transfer_id":"664651258694168576",             "currency":"USDT",             "amount":"0.1",             "type":"contract_to_spot",             "state":"FINISHED",             "timestamp":1638631674326         }]     } }`

| Field | Type | Description |
| --- | --- | --- |
| transfer_id | String | ID 
| currency | String | Currency 
| amount | String | Amount 
| type | String | Type<br>-<code>spot_to_contract</code><br>-<code>contract_to_spot</code> 
| state | String | Result<br>-<code>PROCESSING</code>=Waiting to execute<br>-<code>FINISHED</code>=Successful transfer<br>-<code>FAILED</code>=Transfer failed 
| timestamp | Long | Transfer creation time in milliseconds, e.g. 1638631674326 

## Submit Order (SIGNED)

`Applicable for placing contract orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/submit-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "client_order_id":"BM1234",   "side":4,   "mode":1,   "type":"limit",   "leverage":"1",   "open_type":"isolated",   "size":10,   "price":"2000" }' https://api-cloud-v2.bitmart.com/contract/private/submit-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| client_order_id | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) 
| type | String | No | Order type<br>-<code>limit</code>(default)<br>-<code>market</code> 
| side | Int | Yes | Order side<br>hedge mode<br>-<code>1</code>=buy_open_long<br>-<code>2</code>=buy_close_short<br>-<code>3</code>=sell_close_long<br>-<code>4</code>=sell_open_short<br>oneway mode<br>-<code>1</code>=buy<br>-<code>2</code>=buy(reduce only)<br>-<code>3</code>=sell(reduce only)<br>-<code>4</code>=sell 
| leverage | String | No | Order leverage 
| open_type | String | No | Open type, required at close position<br>-<code>cross</code><br>-<code>isolated</code> 
| mode | Int | No | Order mode<br>-<code>1</code>=GTC(default)<br>-<code>2</code>=FOK<br>-<code>3</code>=IOC<br>-<code>4</code>=Maker Only 
| price | String | Yes | Order price, required at limit order 
| size | Int | Yes | Order size (Number of contracts) 
| preset_take_profit_price_type | Int | No | Pre-set TP price type<br>-<code>1</code>=last_price(default)<br>-<code>2</code>=fair_price 
| preset_stop_loss_price_type | Int | No | Pre-set SL price type<br>-<code>1</code>=last_price(default)<br>-<code>2</code>=fair_price 
| preset_take_profit_price | String | No | Pre-set TP price 
| preset_stop_loss_price | String | No | Pre-set SL price 
| stp_mode | Int | No | Self Trading Protection<br>-<code>1</code>=cancel_maker(default)<br>-<code>2</code>=cancel_taker<br>-<code>3</code>=cancel_both 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": 220609666322019,     "price": "25637.2"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| order_id | Int | Order ID 
| price | String | Order Submit Price，if submit market type order，will return string："market price" 

## Modify Limit Order (SIGNED)

`Applicable for modifying contract limit orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/modify-limit-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "order_id":220906179559421,   "client_order_id":"123456",   "price":"1450",   "size":1 }' https://api-cloud-v2.bitmart.com/contract/private/modify-limit-order`

| 参数 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| order_id | Int | No | Order ID(order_id or client_order_id must give one) 
| client_order_id | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) 
| price | String | No | Order Price（price or size must give one） 
| size | String | No | Order Size（size or price must give one） 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": 220609666322019,     "client_order_id": "123456"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| order_id | Int | Order ID 
| client_order_id | String | Client Order ID 

## Cancel Order (SIGNED)

`Applicable for canceling a specific contract order`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/cancel-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "order_id": "220906179559421" }' https://api-cloud-v2.bitmart.com/contract/private/cancel-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT),（If not submitted order_id and client_order_id, cancel all orders under the symbol） 
| order_id | String | No | Order ID 
| client_order_id | String | No | Client-defined OrderId 

#### Response Data

If code value is 1000, it means the order cancellation is successfully submitted, cancellation results will be pushed by websocket service.

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {   } }`

## Cancel All Orders (SIGNED)

`Applicable for batch order cancellation under a particular contract`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/cancel-orders`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT" }' https://api-cloud-v2.bitmart.com/contract/private/cancel-orders`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 

#### Response Data

If code value is 1000, it means the order cancellation is successfully submitted, cancellation results will be pushed by websocket service.

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {   } }`

## Timed Cancel All Orders (SIGNED)

`Applicable for canceling all contract orders timed`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/cancel-all-after`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{    "timeout":10,    "symbol":"BTCUSDT" }' https://api-cloud-v2.bitmart.com/contract/private/cancel-all-after`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| timeout | Int | Yes | The duration of canceling orders(second,minimum value: 5 seconds) 0:Canceling the setting 
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 

#### Response Data

If code value is 1000, it means the order cancellation is successfully submitted, cancellation results will be pushed by websocket service.

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {     "result": true,     "set_time": 1743064715,     "cancel_time": 1743064725   } }`

| Field | type | Description |
| --- | --- | --- |
| result | Bool | Is the setting successful: true/false 
| set_time | Int | Set time, timestamp 
| cancel_time | Int | The first time of cancel, timestamp 

## Submit Plan Order (SIGNED)

`Applicable for placing contract plan orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/submit-plan-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "side":4,   "mode":1,   "type":"limit",   "leverage":"1",   "open_type":"isolated",   "size":10,   "trigger_price":"2000",   "executive_price":"1450",   "price_type":1,   "price_way":1 }' https://api-cloud-v2.bitmart.com/contract/private/submit-plan-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| type | String | No | Order type<br>-<code>limit</code>(default)<br>-<code>market</code><br>-<code>take_profit</code><br>-<code>stop_loss</code> 
| side | Int | Yes | Order side<br>hedge mode<br>-<code>1</code>=buy_open_long<br>-<code>2</code>=buy_close_short<br>-<code>3</code>=sell_close_long<br>-<code>4</code>=sell_open_short<br>oneway mode<br>-<code>1</code>=buy<br>-<code>2</code>=buy(reduce only)<br>-<code>3</code>=sell(reduce only)<br>-<code>4</code>=sell 
| leverage | String | Yes | Order leverage 
| open_type | String | Yes | Open type, required at close position<br>-<code>cross</code><br>-<code>isolated</code> 
| mode | Int | No | Order mode<br>-<code>1</code>=GTC(default)<br>-<code>2</code>=FOK<br>-<code>3</code>=IOC<br>-<code>4</code>=Maker Only 
| size | Int | Yes | Order size (Number of contracts) 
| trigger_price | String | Yes | Trigger price 
| executive_price | String | No | Execution price for plan order, mandatory when type = limit 
| price_way | Int | Yes | Price way<br>-<code>1</code>=price_way_long<br>-<code>2</code>=price_way_short 
| price_type | Int | Yes | Trigger price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| plan_category | Int | No | TP/SL type<br>-<code>1</code>=TP/SL<br>-<code>2</code>=Position TP/SL 
| preset_take_profit_price_type | Int | No | Pre-set TP price type<br>-<code>1</code>=last_price(default)<br>-<code>2</code>=fair_price 
| preset_stop_loss_price_type | Int | No | Pre-set SL price type<br>-<code>1</code>=last_price(default)<br>-<code>2</code>=fair_price 
| preset_take_profit_price | String | No | Pre-set TP price 
| preset_stop_loss_price | String | No | Pre-set SL price 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": 220609666322019   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| order_id | Int | Order ID 

## Cancel Plan Order (SIGNED)

`Applicable for canceling a specific contract plan order`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/cancel-plan-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "order_id": "220906179559421",   "client_order_id": "123456789" }' https://api-cloud-v2.bitmart.com/contract/private/cancel-plan-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| order_id | String | No | Order ID 
| client_order_id | String | No | Client Order ID 

#### Response Data

If code value is 1000, it means the order cancellation is successfully submitted, cancellation results will be pushed by websocket service.

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {   } }`

## Transfer (SIGNED)

`Transfer between spot account and contract account`

#### Request URl

`POST https://api-cloud-v2.bitmart.com/account/v1/transfer-contract`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "currency":"USDT",   "amount":"10",   "type":"spot_to_contract",   "recvWindow":5000 }' https://api-cloud-v2.bitmart.com/account/v1/transfer-contract`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currency | String | Yes | Currency (Only <code>USDT</code> is supported) 
| amount | String | Yes | Transfer amount，allowed range[0.01,10000000000] 
| type | String | Yes | Transfer type<br>-<code>spot_to_contract</code><br>-<code>contract_to_spot</code> 
| recvWindow | Long | No | Trade time limit, allowed range (0,60000], default: 5000 milliseconds 

#### Response Data

> Response

`{   "message":"OK",   "code":1000,   "trace":"34018ca3-fe24-446a-9e1d-f82edfb3e3",   "data":{     "currency":"USDT",     "amount":"10"   } }`

| Field | Type | Description |
| --- | --- | --- |
| currency | String | currency 
| amount | String | Amount successfully transferred 

code returns 1000, which means the transfer is successful.

## Submit Leverage (SIGNED)

`Applicable for adjust contract leverage` \`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/submit-leverage`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "leverage":"5",   "open_type":"isolated" }' https://api-cloud-v2.bitmart.com/contract/private/submit-leverage`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| leverage | String | No | Order leverage 
| open_type | String | Yes | Open type, required at close position<br>-<code>cross</code><br>-<code>isolated</code> 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "symbol":"ETHUSDT",     "leverage":"5",     "open_type":"isolated",     "max_value":"100"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like BTCUSDT) 
| leverage | String | Order leverage 
| open_type | String | Open type, required at close position<br>-<code>cross</code><br>-<code>isolated</code> 
| max_value | String | Maximum leverage 

## Submit TP/SL Order (SIGNED)

`Applicable for placing contract TP/SL orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/submit-tp-sl-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "side":2,   "type":"take_profit",   "size":10,   "trigger_price":"2000",   "executive_price":"1450",   "price_type":1,   "plan_category":1,   "client_order_id":"123456789",   "category":"limit" }' https://api-cloud-v2.bitmart.com/contract/private/submit-plan-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| type | String | Yes | Order type<br>-<code>take_profit</code><br>-<code>stop_loss</code> 
| side | Int | Yes | Order side<br>hedge mode<br>-<code>2</code>=buy_close_short<br>-<code>3</code>=sell_close_long<br>oneway mode<br>-<code>2</code>=buy(reduce only)<br>-<code>3</code>=sell(reduce only) 
| size | Int | No | Order size (Number of contracts) Default the size of position 
| trigger_price | String | Yes | Trigger price 
| executive_price | String | Yes | Execution price 
| price_type | Int | Yes | Trigger price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| plan_category | Int | No | TP/SL type<br>-<code>1</code>=TP/SL<br>-<code>2</code>=Position TP/SL(default) 
| client_order_id | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) 
| category | String | No | Trigger order type, position TP/SL default <code>market</code><br>-<code>limit</code><br>-<code>market</code> 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": "220609666322019",     "client_order_id": "123456789"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| order_id | String | Order ID 
| client_order_id | String | Client Order ID 

## Modify Plan Order (SIGNED)

`Applicable for modifying contract plan orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/modify-plan-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "order_id":"220906179559421",   "trigger_price":"2000",   "executive_price":"1450",   "price_type":1,   "type":"limit" }' https://api-cloud-v2.bitmart.com/contract/private/modify-plan-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| order_id | String | No | Order ID(order_id or client_order_id must give one) 
| trigger_price | String | Yes | Trigger price 
| executive_price | String | No | Execution price for plan order, mandatory when type = limit 
| price_type | Int | Yes | Trigger price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| type | String | Yes | Order type<br>-<code>limit</code><br>-<code>market</code> 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": "220609666322019"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| order_id | String | Order ID 

## Modify Preset Plan Order (SIGNED)

`Applicable for modifying contract preset plan orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/modify-preset-plan-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "order_id":"220609666322019",   "preset_take_profit_price":"2000",   "preset_stop_loss_price":"1900",   "preset_take_profit_price_type":1,   "preset_stop_loss_price_type":1 }' https://api-cloud-v2.bitmart.com/contract/private/modify-preset-plan-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| order_id | String | Yes | Order ID 
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| preset_take_profit_price_type | Int | No | Pre-set TP price type<br>-<code>1</code>=last_price(default)<br>-<code>2</code>=fair_price 
| preset_stop_loss_price_type | Int | No | Pre-set SL price type<br>-<code>1</code>=last_price(default)<br>-<code>2</code>=fair_price 
| preset_take_profit_price | String | No | Pre-set TP price 
| preset_stop_loss_price | String | No | Pre-set SL price 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": "220609666322019"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| order_id | String | Order ID 

## Modify TP/SL Order (SIGNED)

`Applicable for modifying TP/SL orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/modify-tp-sl-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "trigger_price":"2100",   "executive_price":"2100",   "price_type":2,   "order_id":"37758000001",   "client_order_id":"",   "plan_category":2,   "category": "limit" }' https://api-cloud-v2.bitmart.com/contract/private/modify-tp-sl-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| order_id | String | No | Order ID(order_id or client_order_id must give one) 
| client_order_id | String | No | Client order ID(order_id or client_order_id must give one) 
| trigger_price | String | Yes | Trigger price 
| executive_price | String | No | Execution price for order, mandatory when plan_category = 1 
| price_type | Int | Yes | Trigger price type<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 
| plan_category | Int | No | TP/SL type<br>-<code>1</code>=TP/SL<br>-<code>2</code>=Position TP/SL 
| category | String | No | Order type, Position TP/SL default <code>market</code><br>-<code>limit</code><br>-<code>market</code> 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": "220609666322019"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| order_id | String | Order ID 

## Submit Trail Order (SIGNED)

`Applicable for placing contract trail orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/submit-trail-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "side":4,   "leverage":"1",   "open_type":"isolated",   "size":10,   "activation_price":"2000",   "callback_rate":"1",   "activation_price_type":1 }' https://api-cloud-v2.bitmart.com/contract/private/submit-trail-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| side | Int | Yes | Order side<br>hedge mode<br>-<code>1</code>=buy_open_long<br>-<code>2</code>=buy_close_short<br>-<code>3</code>=sell_close_long<br>-<code>4</code>=sell_open_short<br>oneway mode<br>-<code>1</code>=buy<br>-<code>2</code>=buy(reduce only)<br>-<code>3</code>=sell(reduce only)<br>-<code>4</code>=sell 
| leverage | String | Yes | Order leverage 
| open_type | String | Yes | Open type, required at close position<br>-<code>cross</code><br>-<code>isolated</code> 
| size | Int | Yes | Order size (Number of contracts) 
| activation_price | String | Yes | Activation price, required at trailing order 
| callback_rate | String | Yes | Callback rate, required at trailing order, min 0.1, max 5 where 1 for 1% 
| activation_price_type | Int | Yes | Activation price type, required at trailing order<br>-<code>1</code>=last_price<br>-<code>2</code>=fair_price 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "order_id": 220609666322019   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| order_id | Int | Order ID 

## Cancel Trail Order (SIGNED)

`Applicable for canceling a specific contract trail order`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/cancel-trail-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "order_id": "220906179559421" }' https://api-cloud-v2.bitmart.com/contract/private/cancel-trail-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| order_id | String | No | Order ID 

#### Response Data

If code value is 1000, it means the order cancellation is successfully submitted, cancellation results will be pushed by websocket service.

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {   } }`

## Set Position Mode (SIGNED)

`Applicable for setting position mode`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/set-position-mode`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "position_mode":"one_way_mode" }' https://api-cloud-v2.bitmart.com/contract/private/set-position-mode`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| position_mode | String | Yes | Position Mode<br>-<code>hedge_mode</code><br>-<code>one_way_mode</code> 

#### Response Data

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {     "position_mode":"one_way_mode"   } }`

| Field | Type | Description |
| --- | --- | --- |
| position_mode | String | Position Mode<br>-<code>hedge_mode</code><br>-<code>one_way_mode</code> 

## Get Position Mode (KEYED)

`Applicable for getting position mode`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/get-position-mode`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

None

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'  https://api-cloud-v2.bitmart.com/contract/private/get-position-mode`

#### Response Data

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {     "position_mode":"one_way_mode"   } }`

| Field | Type | Description |
| --- | --- | --- |
| position_mode | String | Position Mode<br>-<code>hedge_mode</code><br>-<code>one_way_mode</code>
