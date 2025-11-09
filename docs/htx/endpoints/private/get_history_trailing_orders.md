# GET History Trailing Orders

**Source:**
[Get History Trailing Orders](https://www.htx.com/en-us/opend/newApiPages/?id=5d51c1e7-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_track_hisorders (Get History Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                              | Value Range                                                                                                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code                                                            | BTC-USD                                                                                                                                                                                   |               |
| status        | string    | true     | order status                                                             | Multiple separated by English commas, Trailing Order status: 0:all(representing all orders in the end state), 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |               |
| trade_type    | int       | true     | trade type(if not filled in, means all)                                  | 0:all,1: buy long,2: sell short,3: buy short,4: sell long                                                                                                                                 |               |
| create_date   | long      | true     | days                                                                     | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default.                   |               |
| page_index    | int       | false    | page index, if not filled in as 1st                                      |                                                                                                                                                                                           |               |
| page_size     | int       | false    | if not filled in as 20, and no more than 50                              |                                                                                                                                                                                           |               |
| sort_by       | string    | false    | sort fields(descending), if not filled in, sort by created_at descending | "create_date"：descending order by order create date , "update_time": descending order by order update time                                                                               |               |

#### Response Parameter

| Parameter          | Data Type    | Required | Description                                                                                                       | Value Range                                                                                               |
| ------------------ | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| status             | string       | true     | the result of server handling to request                                                                          | "ok" :success, "error": failed                                                                            |
| DATA_START         | object       | true     |                                                                                                                   | dictionary                                                                                                |
| total_page         | int          | true     | total page                                                                                                        |                                                                                                           |
| total_size         | int          | true     | total size                                                                                                        |                                                                                                           |
| current_page       | int          | true     | current page                                                                                                      |                                                                                                           |
| ORDERS_START       | object array | true     |                                                                                                                   |                                                                                                           |
| symbol             | string       | true     | symbol                                                                                                            |                                                                                                           |
| contract_code      | string       | true     | contract code                                                                                                     | BTC-USD                                                                                                   |
| volume             | decimal      | true     | volume                                                                                                            |                                                                                                           |
| order_type         | int          | true     | order type: 1. Quotation; 2. Cancelled order                                                                      |                                                                                                           |
| direction          | string       | true     | direction                                                                                                         | buy, sell                                                                                                 |
| offset             | string       | true     | offset                                                                                                            | open, close                                                                                               |
| lever_rate         | int          | true     | lever rate                                                                                                        |                                                                                                           |
| order_id           | long         | true     | trailing order id                                                                                                 |                                                                                                           |
| order_id_str       | string       | true     | trailing order id in string format                                                                                |                                                                                                           |
| order_source       | string       | true     | order source                                                                                                      |                                                                                                           |
| created_at         | long         | true     | created at                                                                                                        |                                                                                                           |
| update_time        | long         | true     | update time, unit: millisecond                                                                                    |                                                                                                           |
| order_price_type   | string       | true     | order price type                                                                                                  | optimal_5, optimal_10, optimal_20, formula_price                                                          |
| status             | int          | true     | order status                                                                                                      | 2.Ready to submit the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |
| canceled_at        | long         | true     | canceled at                                                                                                       |                                                                                                           |
| fail_code          | int          | true     | error code when place limit price order                                                                           |                                                                                                           |
| fail_reason        | string       | true     | error reason when place limit price order                                                                         |                                                                                                           |
| callback_rate      | decimal      | true     | callback rate                                                                                                     | such as: 0.01 means 1%                                                                                    |
| active price       | decimal      | true     | active price                                                                                                      |                                                                                                           |
| is_active          | int          | true     | Is the active price activated?                                                                                    | 1: activated; 0: not activated                                                                            |
| market_limit_price | decimal      | true     | lowest/highest market price (use the lowest price when buy. use the highest when sell)                            |                                                                                                           |
| formula_price      | decimal      | true     | formula price(the lowest (highest) market price\* (1 ± callback rate))                                            |                                                                                                           |
| real_volume        | decimal      | true     | real volume                                                                                                       |                                                                                                           |
| triggered_price    | decimal      | true     | triggered price                                                                                                   |                                                                                                           |
| relation_order_id  | string       | true     | relation_order_id is the string related to the limit orders， The value is -1 before the trigger orders executed. |                                                                                                           |
| ORDERS_END         |              | false    |                                                                                                                   |                                                                                                           |
| DATA_END           |              | false    |                                                                                                                   |                                                                                                           |
| ts                 | long         | true     | Time of Respond Generation, Unit: Millisecond                                                                     |                                                                                                           |

#### Request example

{

"contract_code":

"BTC-USD"

"trade_type":

0

"page_index":

1

"page_size":

20

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"orders":\[

0:{

"symbol":

"LTC"

"contract_code":

"LTC-USD"

"triggered_price":

NULL

"volume":

1

"order_type":

1

"direction":

"sell"

"offset":

"open"

"lever_rate":

5

"order_id":

825057948169748500

"order_id_str":

"825057948169748480"

"order_source":

"api"

"created_at":

1616750743680

"update_time":

1616750784353

"order_price_type":

"formula_price"

"status":

6

"canceled_at":

1616750768281

"fail_code":

NULL

"fail_reason":

NULL

"callback_rate":

0.003

"active_price":

179

"is_active":

0

"market_limit_price":

NULL

"formula_price":

NULL

"real_volume":

0

"relation_order_id":

"-1"

}

\]

"total_page":

1

"current_page":

1

"total_size":

3

}

"ts":

1616751416065

}
