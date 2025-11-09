# GET [Cross]Current unfilled trailing order acquisition

**Source:**
[[Cross]Current unfilled trailing order acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89614-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_track_openorders (\[Cross\]Current unfilled trailing order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. when both of pair and contract_code filled in,
the contract_code is the preferred. if none of them filled in, it means all open
orders.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                 | Value Range                                                                                            | Default Value |
| ------------- | --------- | -------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------- |
| contract_code | string    | false    | contract code                               | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                    |               |
| pair          | string    | false    | pair                                        | BTC-USDT                                                                                               |               |
| trade_type    | int       | false    | trade type(if not filled in, means all)     | 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |               |
| page_index    | int       | false    | page index, if not filled in as 1st         |                                                                                                        |               |
| page_size     | int       | false    | if not filled in as 20, and no more than 50 |                                                                                                        |               |

#### Response Parameter

| Parameter        | Data Type    | Required | Description                                   | Value Range                                                                                               |
| ---------------- | ------------ | -------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| status           | string       | true     | the result of server handling to request      | "ok" :success, "error": failed                                                                            |
| DATA_START       | object       | true     |                                               | dictionary                                                                                                |
| total_page       | int          | true     | total page                                    |                                                                                                           |
| total_size       | int          | true     | total size                                    |                                                                                                           |
| current_page     | int          | true     | current page                                  |                                                                                                           |
| ORDERS_START     | object array | true     |                                               |                                                                                                           |
| symbol           | string       | true     | symbol                                        |                                                                                                           |
| contract_code    | string       | true     | contract code                                 | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                       |
| volume           | decimal      | true     | volume                                        |                                                                                                           |
| order_type       | int          | true     | order type: 1. Quotation; 2. Cancelled order  |                                                                                                           |
| direction        | string       | true     | direction                                     | buy, sell                                                                                                 |
| offset           | string       | true     | offset                                        | open, close, both                                                                                         |
| lever_rate       | int          | true     | lever rate                                    |                                                                                                           |
| order_id         | long         | true     | trailing order id                             |                                                                                                           |
| order_id_str     | string       | true     | trailing order id in string format            |                                                                                                           |
| order_source     | string       | true     | order source                                  |                                                                                                           |
| created_at       | long         | true     | created at                                    |                                                                                                           |
| order_price_type | string       | true     | order price type                              | optimal_5, optimal_10, optimal_20, formula_price                                                          |
| status           | int          | true     | order status                                  | 2.Ready to submit the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |
| callback_rate    | decimal      | true     | callback rate                                 | such as: 0.01 means 1%                                                                                    |
| active price     | decimal      | true     | active price                                  |                                                                                                           |
| is_active        | int          | true     | Is the active price activated?                | 1: activated; 0: not activated                                                                            |
| margin_mode      | string       | true     | margin mode                                   | cross                                                                                                     |
| margin_account   | string       | true     | margin account                                | e.g：“BTC-USDT”                                                                                           |
| contract_type    | string       | true     | contract type                                 | swap, this_week, next_week, quarter, next_quarter                                                         |
| pair             | string       | true     | pair                                          | such as: “BTC-USDT”                                                                                       |
| business_type    | string       | true     | business type                                 | futures, swap                                                                                             |
| reduce_only      | int          | true     | reduce only                                   | 0: no, 1: yes                                                                                             |
| ORDERS_END       |              | false    |                                               |                                                                                                           |
| DATA_END         |              | false    |                                               |                                                                                                           |
| ts               | long         | true     | Time of Respond Generation, Unit: Millisecond |                                                                                                           |

#### Request example

{

"contract_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"trade_type":

0

"page_index":

1

"page_size":

50

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"orders":\[

0:{

"contract_type":

"quarter"

"business_type":

"futures"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211231"

"volume":

1

"order_type":

1

"direction":

"buy"

"offset":

"open"

"lever_rate":

1

"order_id":

918819679173152800

"order_id_str":

"918819679173152768"

"order_source":

"api"

"created_at":

1639105282359

"order_price_type":

"formula_price"

"status":

2

"callback_rate":

0.03

"active_price":

41111

"is_active":

0

"margin_mode":

"cross"

"margin_account":

"USDT"

"reduce_only":

0

}

\]

"total_page":

1

"current_page":

1

"total_size":

1

}

"ts":

1639105312766

}
