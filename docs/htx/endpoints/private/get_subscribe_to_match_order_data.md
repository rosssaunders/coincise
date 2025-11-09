# GET Subscribe to match order data

**Source:**
[Subscribe to match order data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19711352bcd)

**Category:** Private Channels

## Authentication

Required (Private Endpoint)

### match_orders.$contract_code (Subscribe to match order data)

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket private order transaction push interface (API KEY
verification is required) A UID can establish up to 30 private order transaction
push WS links at the same time. The user only needs to maintain one order push
WS link on one product (including all periodic contracts of the product). A
single link is 50 requests per second, and a single IP link is 100 requests per
second. Note: The frequency limit of the order push WS is separate from the
frequency limit of the user's RESTFUL private interface and does not affect each
other.

Interface description: When events such as order placement, order cancellation,
and transaction occur, messages are pushed from the matching engine.

#### Subscription Address

| Environment                         | Address                               |
| ----------------------------------- | ------------------------------------- |
| Online                              | wss://api.hbdm.com/ws/v5/notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws/v5/notification  |

#### Request Parameter

| Field Name    | Type   | Description                                                    |
| ------------- | ------ | -------------------------------------------------------------- |
| op            | string | Must. Use sub or unsub.                                        |
| cid           | string | Optional. The unique ID of the client.                         |
| topic         | string | Must. match_orders                                             |
| contract_code | string | Must. Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |
| \*             | \*                   | Yes  |
| \*             | contract_code        | No   |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description              | Value Range                                                                                | Default Value |
| ------------- | --------- | -------- | ------------------------ | ------------------------------------------------------------------------------------------ | ------------- |
| contract_code | string    | true     | Symbol. Case-insensitive | All: \* (Delivery and perpetual); Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |               |
| cid           | string    | false    | Current request's ID     |                                                                                            |               |

#### Data Update

| Parameter          | Data Type | Required | Description                                                               | Value Range                                                                                                                                                                                                                                                                                                                                          |
| ------------------ | --------- | -------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op                 | String    | true     | Operation name, with a fixed value of "notify"                            |                                                                                                                                                                                                                                                                                                                                                      |
| topic              | String    | true     | Push topic                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| ts                 | Long      | true     | Timestamp of server response                                              |                                                                                                                                                                                                                                                                                                                                                      |
| uid                | String    | true     | User UID                                                                  |                                                                                                                                                                                                                                                                                                                                                      |
| DATA_START         |           | false    |                                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| contract_code      | String    | true     | Symbol                                                                    | Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"...                                                                                                                                                                                                                                                                                             |
| side               | String    | true     | Buy or Sell                                                               | buy; sell                                                                                                                                                                                                                                                                                                                                            |
| position_side      | String    | true     | Position side                                                             | long: going long; short: going short; both: One-way mode                                                                                                                                                                                                                                                                                             |
| type               | String    | true     | Order type; enumeration                                                   | "market": market order; "limit": limit order; "post_only": post-only order                                                                                                                                                                                                                                                                           |
| price_match        | String    | true     | Price matching                                                            |                                                                                                                                                                                                                                                                                                                                                      |
| order_id           | String    | true     | Order ID                                                                  |                                                                                                                                                                                                                                                                                                                                                      |
| client_order_id    | String    | true     | Order ID you entered                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| margin_mode        | String    | true     | Margin mode                                                               | Cross margin; enumeration                                                                                                                                                                                                                                                                                                                            |
| price              | String    | true     | Price                                                                     |                                                                                                                                                                                                                                                                                                                                                      |
| volume             | String    | true     | Amount                                                                    |                                                                                                                                                                                                                                                                                                                                                      |
| lever_rate         | Long      | true     | Discarded parameters                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| state              | String    | true     | Status                                                                    | new, partially_filled, filled, partially_canceled, canceled, and rejected                                                                                                                                                                                                                                                                            |
| order_source       | String    | true     | Order source                                                              | system: System; web: Website for PC clients, api: API, m: Website for mobile clients, risk: Risk management system, settlement: Delivery settlement, ios: iOS clients, android: Android clients, windows: Windows clients, mac: Mac clients, trigger: Conditional order trigger, tpsl: Take profit or stop loss order, ADL: Auto deleveraging orders |
| reduce_only        | Boolean   | true     | Reduce only                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| time_in_force      | String    | true     | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default. |                                                                                                                                                                                                                                                                                                                                                      |
| trade_price        | String    | true     | Average execution price                                                   |                                                                                                                                                                                                                                                                                                                                                      |
| trade_volume       | String    | true     | Execution amount                                                          |                                                                                                                                                                                                                                                                                                                                                      |
| total_trade_volume | String    | true     | Cumulative transaction volume                                             |                                                                                                                                                                                                                                                                                                                                                      |
| cancel_reason      | String    | true     | cancel reason                                                             | "Limit order cancelation by the client","Order cancelation by system","Market order circuit-breaker","Bankruptcy price of market order","Order cancelation due to no matching orders"," Self trading prevention","Number of maker orders matched with your taker orders exceeding limit","Order cancelation due to API timeout"                      |
| created_time       | String    | true     | Order creation time with a UTC timestamp (MS)                             |                                                                                                                                                                                                                                                                                                                                                      |
| match_time         | String    | true     | Match time with a UTC timestamp (MS)                                      |                                                                                                                                                                                                                                                                                                                                                      |
| self_match_prevent | String    | true     | Prevent self-trading                                                      | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                       |
| DATA_START         |           | false    |                                                                           |                                                                                                                                                                                                                                                                                                                                                      |

#### Subscription Example

{

"op":

"sub"

"cid":

"zTX5sUJscf"

"topic":

"orders"

"contract_code":

"EOS-USDT"

}

#### Example of a Successful Subscription

{

"op":

"auth"

"cid":

"zTX5sUJscf"

"type":

"api"

"err-code":

0

"ts":

1734516850688

"data":{

"user-id":

"41312018"

}

}

#### Example of a Data Update

{

"op":

"notify"

"topic":

"match_orders"

"contract_code":

"BTC-USDT"

"ts":

1755076981482

"uid":

"121993903"

"data":\[

0:{

"side":

"buy"

"type":

"limit"

"price":

"3100"

"volume":

"3"

"state":

"filled"

"id":

"100000034600800-1405240240295698432-1"

"contract_code":

"BTC-USDT"

"contract_type":

"swap"

"order_id":

"1405240240295698432"

"position_side":

"long"

"price_match":

NULL

"client_order_id":

"1405240240295698432"

"margin_mode":

"cross"

"lever_rate":

""

"order_source":

"web"

"reduce_only":

false

"time_in_force":

"gtc"

"cancel_reason":

NULL

"trade_id":

"4467"

"trade_volume":

"3"

"total_trade_volume":

"3"

"trade_price":

"3100"

"trade_turnover":

"9.3"

"role":

"taker"

"created_time":

"1755076981387"

"match_time":

"1755076981448"

"self_match_prevent":

"cancel_both"

}

\]

}

#### Example of a Subscription Cancellation

No data
