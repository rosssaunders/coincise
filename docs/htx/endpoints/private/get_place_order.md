# GET Place Order

**Source:**
[Place Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19588768fe7)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/order (Place Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Place an order in futures trading.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter             | Data Type | Required | Description                                                                                                                                                                                     | Value Range                                                                                                 | Default Value            |
| --------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------ |
| contract_code         | String    | true     | Symbol                                                                                                                                                                                          |                                                                                                             |                          |
| margin_mode           | String    | true     | Margin mode: cross (Cross margin                                                                                                                                                                |                                                                                                             |                          |
| position_side         | String    | false    | Position side                                                                                                                                                                                   | long: going long; short: going short; both: One-way mode. You must input long or short and both is default. |                          |
| side                  | String    | true     | Order side                                                                                                                                                                                      | buy; sell                                                                                                   |                          |
| type                  | String    | true     | Order type; enumeration                                                                                                                                                                         | "market": market order; "limit": limit order; "post_only": post-only order                                  |                          |
| price_match           | String    | false    | BBO and price are mutually exclusive                                                                                                                                                            | opponent: counterparty price; "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO |                          |
| client_order_id       | String    | false    | Order ID you entered                                                                                                                                                                            | Clients fill and maintain themselves. the value must be in \[1, 9223372036854775807\]                       |                          |
| price                 | String    | false    | Price, applicable for limit orders only. No price input is required for market orders.                                                                                                          |                                                                                                             |                          |
| volume                | String    | true     | Order size, specifically in Cont                                                                                                                                                                |                                                                                                             |                          |
| reduce_only           | Integer   | false    | Reduce only: 0 is false; 1 is true                                                                                                                                                              |                                                                                                             |                          |
| time_in_force         | String    | false    | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default.                                                                                                                       |                                                                                                             |                          |
| tp_trigger_price      | String    | false    | Trigger price of your take profit order                                                                                                                                                         |                                                                                                             |                          |
| tp_order_price        | String    | false    | Price of your take profit order. (There is no need to input a price when using BBO.)                                                                                                            |                                                                                                             |                          |
| tp_type               | String    | false    | Type of your take profit order. "market" is default with no input. "market": market order; "limit": limit order. "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO. |                                                                                                             |                          |
| tp_trigger_price_type | String    | false    | Trigger price type of your take profit order. The last price is default.                                                                                                                        | "last": last price; "market": mark price                                                                    |                          |
| sl_trigger_price      | String    | false    | SL Trigger Price                                                                                                                                                                                |                                                                                                             |                          |
| sl_order_price        | String    | false    | Price of your stop loss order. (There is no need to input a price when using BBO.)                                                                                                              |                                                                                                             |                          |
| sl_type               | String    | false    | Type of your stop loss order. "market" is default with no input. "market": market order; "limit": limit order. "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO.   |                                                                                                             |                          |
| sl_trigger_price_type | String    | false    | Trigger price type of your stop loss order. The last price is default.                                                                                                                          | "last": last price; "market": mark price                                                                    |                          |
| price_protect         | boolean   | false    | Price protection. "false" is default. The parameter is needed when you set TP/SL.                                                                                                               | false or true                                                                                               |                          |
| self_match_prevent    | String    | false    | Self-trading prevention                                                                                                                                                                         | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders        | cancel_taker by default. |

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                                        | Value Range |
| --------------- | --------- | -------- | -------------------------------------------------------------------------------------------------- | ----------- |
| order_id        | String    | true     | Order ID                                                                                           |             |
| client_order_id | String    | false    | The order ID you entered when placing an order. The ID will not be returned if it is not provided. |             |

Notes: Remark: position_side is the side of your position. This parameter is
optional in the One-way mode. The field is optional, and only "both" can be
entered. However, in Hedge mode, this field is mandatory, and only "long" or
"short" can be selected. In Hedge mode, "side" and "position_side" need to be
combined. Open long (Enter "buy" in the side field; "long" in the position_side
field) Open short (Enter "sell" in the side field; "short" in the position_side
field) Close long (Enter "sell" in the side field; "long" in the position_side
field) Close short (Enter "buy" in the side field; "short" in the position_side
field) In One-way mode, a long position returns "buy," while a short position
returns "sell."

#### Request example

{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

"tp_trigger_price":

"6000"

"tp_order_price":

"6000"

"tp_trigger_price_type":

"last"

"tp_type":

"limit"

"sl_trigger_price":

"4000"

"sl_order_price":

"4000"

"sl_trigger_price_type":

"last"

"sl_type":

"limit"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"client_order_id":

"1329503956647878656"

"order_id":

"1329503956647878656"

}

"message":

"Success"

"ts":

1737020044270

}
