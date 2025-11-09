# GET Order Info

**Source:**
[Get Order Info](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-196a8401f83)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/order (Get Order Info)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 144 requests per UID per 3 seconds. This limit is shared across all
trading interfaces (72 requests/3 seconds) and query interfaces (72 requests/3
seconds) for all symbols and contracts with different expiry dates for a given
UID.

Interface description: Get information about your order.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                                               | Value Range   | Default Value |
| --------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------- | ------------- | ------------- |
| contract_code   | String    | false    | Symbol (trading pair)                                                                                     | "BTC-USDT"... |               |
| margin_mode     | String    | false    | Margin mode: cross (Cross margin)                                                                         |               |               |
| order_id        | String    | false    | Either order_id or client_order_id must be provided. If both are provided, order_id will take precedence. |               |               |
| client_order_id | String    | false    | Order ID as assigned by the user                                                                          |               |               |

#### Response Parameter

| Parameter             | Data Type | Required | Description                                                                                                                                                                                     | Value Range                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | String    | true     | Query ID                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                      |
| contract_code         | String    | true     | Symbol                                                                                                                                                                                          | Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"...                                                                                                                                                                                                                                                                                             |
| side                  | String    | true     | Order side                                                                                                                                                                                      | buy; sell                                                                                                                                                                                                                                                                                                                                            |
| position_side         | String    | true     | Position side                                                                                                                                                                                   | "long": going long; "short": going short; "both": One-way mode                                                                                                                                                                                                                                                                                       |
| type                  | String    | true     | Order type; enumeration                                                                                                                                                                         | "market": market order; "limit": limit order; "post_only": post-only order                                                                                                                                                                                                                                                                           |
| price_match           | String    | false    | BBO                                                                                                                                                                                             | opponent: counterparty price; "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO                                                                                                                                                                                                                                          |
| order_id              | String    | true     | Order ID                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                      |
| client_order_id       | String    | true     | Order ID as assigned by the user                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| margin_mode           | String    | true     | Margin mode                                                                                                                                                                                     | Cross margin; enumeration                                                                                                                                                                                                                                                                                                                            |
| price                 | String    | true     | Order price                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                      |
| volume                | String    | true     | Order size                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| lever_rate            | Long      | true     | Leverage                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                      |
| state                 | String    | true     | Order status                                                                                                                                                                                    | new, partially_filled, filled, partially_canceled, canceled, and rejected                                                                                                                                                                                                                                                                            |
| order_source          | String    | true     | Order source                                                                                                                                                                                    | system: System; web: Website for PC clients, api: API, m: Website for mobile clients, risk: Risk management system, settlement: Delivery settlement, ios: iOS clients, android: Android clients, windows: Windows clients, mac: Mac clients, trigger: Conditional order trigger, tpsl: Take profit or stop loss order, ADL: Auto deleveraging orders |
| reduce_only           | String    | true     | Reduce only                                                                                                                                                                                     | false or true                                                                                                                                                                                                                                                                                                                                        |
| time_in_force         | String    | true     | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default.                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                      |
| tp_trigger_price      | String    | true     | Trigger price of your take profit order                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                      |
| tp_order_price        | String    | true     | Price of your take profit order. (There is no need to input a price when using BBO.)                                                                                                            |                                                                                                                                                                                                                                                                                                                                                      |
| tp_type               | String    | true     | Type of your take profit order. "market" is default with no input. "market": market order; "limit": limit order. "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO. |                                                                                                                                                                                                                                                                                                                                                      |
| tp_trigger_price_type | String    | false    | Trigger price type of your take profit order. The last price is default.                                                                                                                        | "last": last price; "mark": mark price                                                                                                                                                                                                                                                                                                               |
| sl_trigger_price      | String    | true     | Trigger price of your stop loss order                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| sl_order_price        | String    | true     | Price of your stop loss order. (There is no need to input a price when using BBO.)                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| sl_type               | String    | true     | Type of your stop loss order. "market" is default with no input. "market": market order; "limit": limit order. "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO.   |                                                                                                                                                                                                                                                                                                                                                      |
| sl_trigger_price_type | String    | false    | Trigger price type of your stop loss order. The last price is default.                                                                                                                          | "last": last price; "mark": mark price                                                                                                                                                                                                                                                                                                               |
| trade_avg_price       | String    | true     | Average execution price                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                      |
| trade_volume          | String    | true     | Execution amount                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| trade_turnover        | String    | true     | Total value executed                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                      |
| fee_currency          | String    | true     | Currency for fee payment; if multiple currencies are used, separate them with a comma.                                                                                                          |                                                                                                                                                                                                                                                                                                                                                      |
| fee                   | String    | true     | Total trading fees in USDT                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| price_protect         | boolean   | false    | Price protection. "false" is default. The parameter is needed when you set TP/SL.                                                                                                               | false or true                                                                                                                                                                                                                                                                                                                                        |
| profit                | String    | true     | Closing profit and loss (calculated using the average position price, excluding realized profit and loss from position settlement).                                                             |                                                                                                                                                                                                                                                                                                                                                      |
| contract_type         | String    | true     | Contract type                                                                                                                                                                                   | swap: Perpetual; this_week: Weekly; next_week: Bi-weekly; quarter: Quarterly; next_quarter: Bi-quarterly                                                                                                                                                                                                                                             |
| cancel_reason         | String    | true     | cancel reason                                                                                                                                                                                   | "Limit order cancelation by the client","Order cancelation by system","Market order circuit-breaker","Bankruptcy price of market order","Order cancelation due to no matching orders"," Self trading prevention","Number of maker orders matched with your taker orders exceeding limit","Order cancelation due to API timeout"                      |
| created_time          | String    | true     | Order creation time with a UTC timestamp (MS)                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                      |
| updated_time          | String    | true     | Order update time with a UTC timestamp (MS)                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                      |
| self_match_prevent    | String    | true     | Prevent self-trading                                                                                                                                                                            | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                       |

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

"order_id":

"123123123123123"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"id":

"1382748711814639616"

"side":

"buy"

"type":

"market"

"price":

"0"

"volume":

"1"

"state":

"filled"

"profit":

"0"

"contract_code":

"BTC-USDT-250613"

"position_side":

"long"

"price_match":

NULL

"order_id":

1382748711720767500

"client_order_id":

"1382748711720767488"

"margin_mode":

"cross"

"lever_rate":

10

"order_source":

"api"

"reduce_only":

false

"time_in_force":

"gtc"

"tp_trigger_price":

NULL

"tp_order_price":

NULL

"tp_type":

NULL

"tp_trigger_price_type":

NULL

"sl_trigger_price":

NULL

"sl_order_price":

NULL

"sl_type":

NULL

"sl_trigger_price_type":

NULL

"trade_avg_price":

"798"

"trade_volume":

"1"

"trade_turnover":

"0.798"

"fee_currency":

"USDT"

"fee":

"-0.0004788"

"price_protect":

false

"contract_type":

"this_week"

"created_time":

"1749714583106"

"updated_time":

"1749714583117"

"self_match_prevent":

"cancel_both"

"cancel_reason":

NULL

}

"message":

NULL

"success":

true

}
