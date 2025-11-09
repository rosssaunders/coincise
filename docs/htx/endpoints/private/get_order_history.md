# GET Order History

**Source:**
[Get Order History](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19589bc57bc)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/order/history (Get Order History)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Get previous futures orders.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                                          | Value Range                                                                                                                                | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| contract_code | String    | true     | Futures symbol is a required field. You must use the specified futures symbol to search for perpetual or delivery futures contracts. | “BTC-USDT” “BTC-USDT-251103”...                                                                                                            |               |
| margin_mode   | String    | true     | Margin mode cross: Full position                                                                                                     |                                                                                                                                            |               |
| state         | String    | false    | Status                                                                                                                               | You can check multiple statuses, separated by commas. "filled":"Finished", "partially_canceled":""Partially filled, "canceled":"Cancelled" |               |
| type          | String    | false    | Order type                                                                                                                           | Enumerate "market", "limit", and "post_only." "market": market order; "limit": limit order; "post_only": post-only order                   |               |
| price_match   | String    | false    | BBO and price are mutually exclusive                                                                                                 | opponent: counterparty price; "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO                                |               |
| start_time    | String    | false    | Starting time of the history, Unix timestamp format in milliseconds.                                                                 | Last 90 days Default value (now) – 48h                                                                                                     |               |
| end_time      | String    | false    | Ending time of the history, Unix timestamp format in milliseconds.                                                                   | Last 90 days Default value (now) – 48h                                                                                                     |               |
| from          | Long      | false    | ID for the query starts at 0 by default.                                                                                             |                                                                                                                                            |               |
| limit         | Integer   | false    | Pagination size defaults to 10, with a maximum limit of 100.                                                                         |                                                                                                                                            |               |
| direct        | String    | false    | prev, next                                                                                                                           |                                                                                                                                            |               |

#### Response Parameter

| Parameter             | Data Type | Required | Description                                                                                                                                                                                                                           | Value Range                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | String    | true     | Query ID                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| contract_code         | String    | true     | Symbol                                                                                                                                                                                                                                | Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"...                                                                                                                                                                                                                                                                                             |
| side                  | String    | true     | Buy or Sell                                                                                                                                                                                                                           | buy; sell                                                                                                                                                                                                                                                                                                                                            |
| position_side         | String    | true     | Position side                                                                                                                                                                                                                         | long: going long; short: going short; both: One-way mode                                                                                                                                                                                                                                                                                             |
| type                  | String    | true     | Order type; enumeration                                                                                                                                                                                                               | "market": market order; "limit": limit order; "post_only": post-only order                                                                                                                                                                                                                                                                           |
| price_match           | String    | true     | BBO and price are mutually exclusive                                                                                                                                                                                                  | opponent: counterparty price; "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO                                                                                                                                                                                                                                          |
| order_id              | String    | true     | Order ID                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| client_order_id       | String    | true     | Order ID you entered                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                      |
| margin_mode           | String    | true     | Margin mode                                                                                                                                                                                                                           | Cross margin; enumeration                                                                                                                                                                                                                                                                                                                            |
| price                 | String    | true     | Price                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                      |
| volume                | String    | true     | Amount                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| lever_rate            | Long      | true     | Leverage                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| state                 | String    | true     | Status                                                                                                                                                                                                                                | filled, partially_canceled, canceled                                                                                                                                                                                                                                                                                                                 |
| order_source          | String    | true     | Order source                                                                                                                                                                                                                          | system: System; web: Website for PC clients, api: API, m: Website for mobile clients, risk: Risk management system, settlement: Delivery settlement, ios: iOS clients, android: Android clients, windows: Windows clients, mac: Mac clients, trigger: Conditional order trigger, tpsl: Take profit or stop loss order, ADL: Auto deleveraging orders |
| reduce_only           | Boolean   | true     | Reduce only                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| time_in_force         | String    | true     | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default.                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                      |
| tp_trigger_price      | String    | true     | Take Profit Trigger Price                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                      |
| tp_order_price        | String    | true     | Take Profit Order Price (No need to fill in the price for the best N-level order type)                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| tp_type               | String    | true     | Take profit order type, if not filled in, default is market: market price, maket: limit price: limit, optimal 5: optimal_5, optimal 10: optimal_10, optimal 20: optimal_20--Field reserved, not open to the public for the time being |                                                                                                                                                                                                                                                                                                                                                      |
| tp_trigger_price_type | int       | false    | The take profit price trigger type, the default is the latest price                                                                                                                                                                   | "last": last price; "market": mark price                                                                                                                                                                                                                                                                                                             |
| sl_trigger_price      | String    | true     | Stop loss trigger price                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| sl_order_price        | String    | true     | Stop loss order price (no need to fill in the price for the optimal N-level order type)                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| sl_type               | String    | true     | Stop loss order type, if not filled in, default is market price, maket: limit price: limit, optimal 5: optimal_5, optimal 10: optimal_10, optimal 20: optimal_20                                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| sl_trigger_price_type | int       | false    | Stop loss price trigger type, the default is the latest price                                                                                                                                                                         | "last": last price; "market": mark price                                                                                                                                                                                                                                                                                                             |
| trade_avg_price       | String    | false    | Average execution price                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| trade_volume          | String    | true     | Execution amount                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| trade_turnover        | String    | true     | Total value executed                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                      |
| fee_currency          | String    | true     | Currency for fee payment; if multiple currencies are used, separate them with a comma.                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| fee                   | String    | true     | Total trading fees in USDT                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                      |
| profit                | String    | true     | Closing profit and loss (calculated using the average position price, excluding realized profit and loss from position settlement).                                                                                                   |                                                                                                                                                                                                                                                                                                                                                      |
| contract_type         | String    | true     | Contract type                                                                                                                                                                                                                         | swap: Perpetual; this_week: Weekly; next_week: Bi-weekly; quarter: Quarterly; next_quarter: Bi-quarterly                                                                                                                                                                                                                                             |
| cancel_reason         | String    | true     | cancel reason                                                                                                                                                                                                                         | "Limit order cancelation by the client","Order cancelation by system","Market order circuit-breaker","Bankruptcy price of market order","Order cancelation due to no matching orders"," Self trading prevention","Number of maker orders matched with your taker orders exceeding limit","Order cancelation due to API timeout"                      |
| created_time          | String    | true     | Order creation time with a UTC timestamp (MS)                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                      |
| updated_time          | String    | true     | Order update time with a UTC timestamp (MS)                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| self_match_prevent    | String    | true     | Prevent self-trading                                                                                                                                                                                                                  | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                       |

Notes: The following actions all fall within the scope of "Order cancelation by
system": "Order cancellation by system". FOK order cancelation-- fok order
cancellation IOC order cancelation-- ioc order cancellation Order cancelation by
the management system-- MGT order cancellation Limit maker order
cancelation--limit-maker order cancellation Order cancelation due to API
timeout--api timeout order cancellation Order cancelation due to forced
liquidation--forced liquidation order cancellation Order cancelation due to
ADL--adl order cancellation Order cancelation due to delivery futures
expiration--delivery contract expiration

#### Request example

{

"contract_code":

"BTC-USDT"

"margin_mode":

"cross"

}

#### Response Example

##### Success Example

{

"code":

200

"message":

"Success"

"data":\[

0:{

"id":

"1342444059268263936"

"side":

"buy"

"type":

"market"

"price":

"0"

"volume":

"6"

"state":

"filled"

"profit":

"-0.303999999999999996"

"contract_code":

"BTC-USDT"

"position_side":

"short"

"price_match":

NULL

"order_id":

"1342444059150655488"

"client_order_id":

"1342444059150655488"

"margin_mode":

"cross"

"lever_rate":

20

"order_source":

"api"

"reduce_only":

true

"time_in_force":

"gtc"

"tp_trigger_price":

""

"tp_order_price":

""

"tp_type":

NULL

"tp_trigger_price_type":

NULL

"sl_trigger_price":

""

"sl_order_price":

""

"sl_type":

NULL

"sl_trigger_price_type":

NULL

"trade_avg_price":

"31769.5"

"trade_volume":

"6"

"trade_turnover":

"190.617"

"fee_currency":

"USDT"

"fee":

"-0.1143702"

"price_protect":

false

"contract_type":

"swap"

"cancel_reason":

""

"created_time":

""

"updated_time":

""

"self_match_prevent":

"cancel_both"

}

1:{

"id":

"1342152155381149696"

"side":

"buy"

"type":

"limit"

"price":

"4100.6"

"volume":

"6"

"state":

"canceled"

"profit":

"0"

"contract_code":

"BTC-USDT"

"position_side":

"both"

"price_match":

NULL

"order_id":

"1342152155259641856"

"client_order_id":

"1342151603610202112"

"margin_mode":

"cross"

"lever_rate":

20

"order_source":

"tpsl"

"reduce_only":

true

"time_in_force":

"gtc"

"tp_trigger_price":

""

"tp_order_price":

""

"tp_type":

NULL

"tp_trigger_price_type":

NULL

"sl_trigger_price":

""

"sl_order_price":

""

"sl_type":

NULL

"sl_trigger_price_type":

NULL

"trade_avg_price":

"0"

"trade_volume":

"0"

"trade_turnover":

"0"

"fee_currency":

"USDT"

"fee":

"0"

"price_protect":

false

"contract_type":

"swap"

"cancel_reason":

""

"created_time":

""

"updated_time":

""

"self_match_prevent":

"cancel_both"

}

2:{

"id":

"1342151603528183808"

"side":

"sell"

"type":

"limit"

"price":

"4000.601"

"volume":

"6"

"state":

"filled"

"profit":

"0"

"contract_code":

"BTC-USDT"

"position_side":

"both"

"price_match":

NULL

"order_id":

"1342151603389898752"

"client_order_id":

"1342151603389898752"

"margin_mode":

"cross"

"lever_rate":

20

"order_source":

"api"

"reduce_only":

false

"time_in_force":

"gtc"

"tp_trigger_price":

"1.8"

"tp_order_price":

"1.8"

"tp_type":

"limit"

"tp_trigger_price_type":

"last"

"sl_trigger_price":

"4100.601"

"sl_order_price":

"4100.6"

"sl_type":

"limit"

"sl_trigger_price_type":

"last"

"trade_avg_price":

"31350.5"

"trade_volume":

"2"

"trade_turnover":

"62.701"

"fee_currency":

"USDT"

"fee":

"-0.0376206"

"price_protect":

false

"contract_type":

"swap"

"cancel_reason":

""

"created_time":

""

"updated_time":

""

"self_match_prevent":

"cancel_both"

}

\]

"ts":

1740108246827

}
