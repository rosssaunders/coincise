# GET Subscribe to order data

**Source:**
[Subscribe to order data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195a208afe7)

**Category:** Private Channels

## Authentication

Required (Private Endpoint)

### orders.$contract_code (Subscribe to order data)

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

Interface description: When placing an order, canceling an order, or more,
messages will be sent.

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
| topic         | string | Must. orders                                                   |
| contract_code | string | Must. Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |
| \*             | contract_code        | yes  |
| \*             | \*                   | no   |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description              | Value Range                                                                                | Default Value |
| ------------- | --------- | -------- | ------------------------ | ------------------------------------------------------------------------------------------ | ------------- |
| contract_code | string    | true     | Symbol. Case-insensitive | All: \* (Delivery and perpetual); Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |               |
| cid           | string    | false    | Current request's ID     |                                                                                            |               |

#### Data Update

| Parameter             | Data Type | Required | Description                                                                                                                                                                                                                           | Value Range                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op                    | String    | true     | Operation name, with a fixed value of "notify"                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                      |
| topic                 | String    | true     | Push topic                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                      |
| ts                    | long      | true     | Timestamp of server response                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                      |
| did                   | String    | true     | User UID                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| DATA_START            | String    | false    |                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                      |
| contract_code         | String    | true     | Symbol                                                                                                                                                                                                                                | Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"...                                                                                                                                                                                                                                                                                             |
| side                  | String    | true     | Buy or Sell                                                                                                                                                                                                                           | buy; sell                                                                                                                                                                                                                                                                                                                                            |
| position_side         | String    | true     | Position side                                                                                                                                                                                                                         | long: going long; short: going short; both: One-way mode                                                                                                                                                                                                                                                                                             |
| type                  | String    | true     | Order type; enumeration                                                                                                                                                                                                               | "market": market order; "limit": limit order; "post_only": post-only order                                                                                                                                                                                                                                                                           |
| price_match           | String    | true     | Price matching                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                      |
| order_id              | String    | true     | Order ID                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| client_order_id       | String    | true     | Order ID you entered                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                      |
| margin_mode           | String    | true     | Margin mode                                                                                                                                                                                                                           | Cross margin; enumeration                                                                                                                                                                                                                                                                                                                            |
| price                 | String    | true     | Price                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                      |
| volume                | String    | true     | Amount                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| lever_rate            | long      | true     | Leverage                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| state                 | String    | true     | Status                                                                                                                                                                                                                                | new, partially_filled, filled, partially_canceled, canceled, and rejected                                                                                                                                                                                                                                                                            |
| order_source          | String    | true     | Order source                                                                                                                                                                                                                          | system: System; web: Website for PC clients, api: API, m: Website for mobile clients, risk: Risk management system, settlement: Delivery settlement, ios: iOS clients, android: Android clients, windows: Windows clients, mac: Mac clients, trigger: Conditional order trigger, tpsl: Take profit or stop loss order, ADL: Auto deleveraging orders |
| reduce_only           | Boolean   | true     | Reduce only                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| time_in_force         | String    | true     | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default.                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                      |
| trade_avg_price       | String    | true     | Average execution price                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| trade_volume          | String    | true     | Execution amount                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| trade_turnover        | String    | true     | Total value executed                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                      |
| fee_currency          | String    | true     | Currency for fee payment; if multiple currencies are used, separate them with a comma.                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| fee                   | String    | true     | Total trading fees in USDT                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                      |
| profit                | String    | true     | Closing PnL                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| contract_type         | String    | true     | Business                                                                                                                                                                                                                              | swap: Perpetual; this_week: Weekly; next_week: Bi-weekly; quarter: Quarterly; next_quarter: Bi-quarterly                                                                                                                                                                                                                                             |
| tp_trigger_price      | String    | true     | Take Profit Trigger Price                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                      |
| tp_order_price        | String    | true     | Take Profit Order Price (No need to fill in the price for the best N-level order type)                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| tp_type               | String    | true     | Take profit order type, if not filled in, default is market: market price, maket: limit price: limit, optimal 5: optimal_5, optimal 10: optimal_10, optimal 20: optimal_20--Field reserved, not open to the public for the time being |                                                                                                                                                                                                                                                                                                                                                      |
| tp_trigger_price_type | int       | false    | The take profit price trigger type, the default is the latest price                                                                                                                                                                   | "last": last price; "market": mark price                                                                                                                                                                                                                                                                                                             |
| sl_trigger_price      | String    | true     | Stop loss trigger price                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| sl_order_price        | String    | true     | Stop loss order price (no need to fill in the price for the optimal N-level order type)                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| sl_type               | String    | true     | Stop loss order type, if not filled in, default is market price, maket: limit price: limit, optimal 5: optimal_5, optimal 10: optimal_10, optimal 20: optimal_20                                                                      |                                                                                                                                                                                                                                                                                                                                                      |
| sl_trigger_price_type | int       | false    | Stop loss price trigger type, the default is the latest price                                                                                                                                                                         | "last": last price; "market": mark price                                                                                                                                                                                                                                                                                                             |
| created_time          | String    | true     | Order creation time with a UTC timestamp (MS)                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                      |
| updated_time          | String    | true     | Order update time with a UTC timestamp (MS)                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| self_match_prevent    | String    | true     | Prevent self-trading                                                                                                                                                                                                                  | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                       |
| DATA_START            |           | true     |                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                      |

Notes: Assuming that the order is traded once and matched with multiple complete
trades, the status pushed by the order channel multiple times is
"filled-completed", but the traded volume may be less than the order volume.
Assuming that the IOC order is partially traded and the remaining orders are
cancelled, the status pushed by the order channel multiple times is
"partially_canceled-partially cancelled", but the traded volume + the cancelled
order volume may be less than the order volume. Suggestion: Whether the traded
volume + the cancelled order volume is equal to the order volume to assist in
determining whether it is the last update

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

`{     "op": "notify",     "topic": "orders",     "contract_code": "SHIB-USDT",     "ts": 1749457082349,     "uid": "502061937",     "data": {         "side": "buy",         "type": "limit",         "price": "0.0000124",         "volume": "2",         "state": "new",         "profit": "0",         "contract_code": "SHIB-USDT",         "position_side": "short",         "price_match": "opponent",         "order_id": "1381668675223068672",         "client_order_id": "1381668675223068672",         "margin_mode": "cross",         "lever_rate": 30,         "order_source": "web",         "reduce_only": true,         "time_in_force": "gtc",         "trade_avg_price": "0",         "trade_volume": "0",         "trade_turnover": "0",         "fee_currency": null,         "fee": "0",         "tp_trigger_price": "",         "tp_order_price": "",         "tp_type": "",         "tp_trigger_price_type": "",         "sl_trigger_price": "",         "sl_order_price": "",         "sl_type": "",         "sl_trigger_price_type": "",         "contract_type": "swap",         "cancel_reason": "",         "created_time": 1749457082341,         "updated_time": 1749457082341, "self_match_prevent": "cancel_both"     } }`

#### Example of a Subscription Cancellation

No data
