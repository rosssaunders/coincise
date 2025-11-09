# GET Current Orders

**Source:**
[Get Current Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19589587da5)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/order/opens (Get Current Orders)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Get unfilled futures orders. If no request parameters are
specified, you will get all open orders sorted on the creation time in
chronological order.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                  | Value Range         | Default Value |
| --------------- | --------- | -------- | ------------------------------------------------------------ | ------------------- | ------------- |
| contract_code   | String    | false    | Symbol                                                       |                     |               |
| margin_mode     | String    | false    | Margin mode                                                  | cross: Cross margin |               |
| order_id        | String    | false    | Order ID                                                     |                     |               |
| client_order_id | String    | false    | Order ID you entered                                         |                     |               |
| from            | long      | false    | ID for the query starts at 0 by default.                     |                     |               |
| limit           | Intege    | false    | Pagination size defaults to 10, with a maximum limit of 100. |                     |               |
| direct          | String    | false    | prev, next                                                   |                     |               |

#### Response Parameter

| Parameter             | Data Type | Required | Description                                                                                                                                                                                                                           | Value Range                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | String    | true     | Query ID                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| contract_code         | String    | true     | Symbol                                                                                                                                                                                                                                | Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"...                                                                                                                                                                                                                                                                                             |
| side                  | String    | true     | Buy or Sell                                                                                                                                                                                                                           | buy; sell                                                                                                                                                                                                                                                                                                                                            |
| position_side         | String    | true     | Position side                                                                                                                                                                                                                         | long: going long; short: going short; both: One-way mode                                                                                                                                                                                                                                                                                             |
| type                  | String    | true     | Order type                                                                                                                                                                                                                            | "market": market order; "limit": limit order; "post_only": post-only order                                                                                                                                                                                                                                                                           |
| price_match           | String    | true     | BBO and price are mutually exclusive                                                                                                                                                                                                  | opponent: counterparty price; "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO                                                                                                                                                                                                                                          |
| order_id              | String    | true     | Order ID                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| client_order_id       | String    | true     | Order ID you entered                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                      |
| margin_mode           | String    | true     | Margin mode                                                                                                                                                                                                                           | cross: Cross margin                                                                                                                                                                                                                                                                                                                                  |
| price                 | String    | true     | Price, applicable for limit orders only. No price input is required for market orders.                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| volume                | String    | true     | Order size, specifically in Cont                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| lever_rate            | Long      | true     | Leverage                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| state                 | String    | true     | Status                                                                                                                                                                                                                                | new, partially_filled, filled, partially_canceled, canceled, and rejected                                                                                                                                                                                                                                                                            |
| order_source          | String    | true     | Order source                                                                                                                                                                                                                          | system: System; web: Website for PC clients, api: API, m: Website for mobile clients, risk: Risk management system, settlement: Delivery settlement, ios: iOS clients, android: Android clients, windows: Windows clients, mac: Mac clients, trigger: Conditional order trigger, tpsl: Take profit or stop loss order, ADL: Auto deleveraging orders |
| reduce_only           | Boolean   | true     | Reduce only                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| time_in_force         | String    | true     | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| tp_trigger_price      | String    | true     | Take Profit Trigger Price                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                      |
| tp_order_price        | String    | true     | Take Profit Order Price (No need to fill in the price for the best N-level order type)                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| tp_type               | String    | true     | Take profit order type, if not filled in, default is market: market price, maket: limit price: limit, optimal 5: optimal_5, optimal 10: optimal_10, optimal 20: optimal_20--Field reserved, not open to the public for the time being |                                                                                                                                                                                                                                                                                                                                                      |
| tp_trigger_price_type | int       | false    | The take profit price trigger type, the default is the latest price                                                                                                                                                                   | "last": last price; "market": mark price                                                                                                                                                                                                                                                                                                             |
| sl_trigger_price      | String    | true     | Stop loss trigger price                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| sl_order_price        | String    | true     | Stop loss order price (no need to fill in the price for the optimal N-level order type)                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| sl_type               | String    | true     | Stop loss order type, if not filled in, default is market price, maket: limit price: limit, optimal 5: optimal_5, optimal 10: optimal_10, optimal 20: optimal_20                                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| sl_trigger_price_type | int       | false    | Stop loss price trigger type, the default is the latest price                                                                                                                                                                         | "last": last price; "market": mark price                                                                                                                                                                                                                                                                                                             |
| trade_avg_price       | String    | true     | Average execution price                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| trade_volume          | String    | true     | Execution amount                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| trade_turnover        | String    | true     | Total value executed                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                      |
| fee_currency          | String    | true     | Currency for fee payment; if multiple currencies are used, separate them with a comma.                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| fee                   | String    | true     | Total trading fees in USDT                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                      |
| profit                | String    | true     | Closing PnL                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| contract_type         | String    | true     | Contract type                                                                                                                                                                                                                         | swap: Perpetual; this_week: Weekly; next_week: Bi-weekly; quarter: Quarterly; next_quarter: Bi-quarterly                                                                                                                                                                                                                                             |
| created_time          | Long      | true     | Order creation time with a UTC timestamp (MS)                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                      |
| updated_time          | Long      | true     | Order update time with a UTC timestamp (MS)                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| self_match_prevent    | String    | true     | Prevent self-trading                                                                                                                                                                                                                  | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                       |

#### Request example

{

"margin_mode":

"cross"

"from":

"1331225286568849408"

"limit":

"2"

"direct":

"next"

"contract_code":

""

"order_id":

""

"client_order_id":

""

}

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"client_order_id":

"1331226415994253312"

"contract_code":

"BTC-USDT-241122"

"contract_type":

"this_week"

"created_time":

"1737430710575"

"fee":

"0"

"fee_currency":

""

"id":

"1331226415994253312"

"lever_rate":

5

"margin_mode":

"cross"

"order_id":

"1331226415994253312"

"order_source":

"web"

"position_side":

"long"

"price":

"6409.114"

"price_match":

"optimal_20"

"price_protect":

""

"profit":

""

"reduce_only":

""

"side":

"buy"

"sl_order_price":

""

"sl_trigger_price":

""

"sl_trigger_price_type":

""

"sl_type":

"0"

"state":

3

"time_in_force":

"gtc"

"tp_order_price":

""

"tp_trigger_price":

""

"tp_trigger_price_type":

""

"tp_type":

"0"

"trade_avg_price":

"0"

"trade_turnover":

"0"

"trade_volume":

"0"

"type":

"limit"

"updated_time":

"1737455579520"

"self_match_prevent":

"cancel_both"

"volume":

"1"

}

1:{

"client_order_id":

"1331268439239704576"

"contract_code":

"BTC-USDT-241129"

"contract_type":

"next_week"

"created_time":

"1737440729999"

"fee":

"0"

"fee_currency":

""

"id":

"1331268439239704576"

"lever_rate":

5

"margin_mode":

"cross"

"order_id":

"1331268439239704576"

"order_source":

"api"

"position_side":

"long"

"price":

"5000"

"price_match":

""

"price_protect":

""

"profit":

""

"reduce_only":

""

"side":

"buy"

"sl_order_price":

""

"sl_trigger_price":

""

"sl_trigger_price_type":

""

"sl_type":

"0"

"state":

3

"time_in_force":

"gtc"

"tp_order_price":

""

"tp_trigger_price":

""

"tp_trigger_price_type":

""

"tp_type":

"0"

"trade_avg_price":

"0"

"trade_turnover":

"0"

"trade_volume":

"0"

"type":

"limit"

"updated_time":

"1737455579520"

"self_match_prevent":

"cancel_both"

"volume":

"1"

}

\]

"message":

"Success"

"ts":

1737455581526

}
