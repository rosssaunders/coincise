# GET Current unfilled trailing order acquisition

**Source:**
[Current unfilled trailing order acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=5d51c0a2-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_track_openorders (Current unfilled trailing order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Trade

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                 | Value Range                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------------------- | --------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code                               | BTC-USD                                                   |               |
| trade_type    | int       | false    | trade type(if not filled in, means all)     | 0:all,1: buy long,2: sell short,3: buy short,4: sell long |               |
| page_index    | int       | false    | page index, if not filled in as 1st         |                                                           |               |
| page_size     | int       | false    | if not filled in as 20, and no more than 50 |                                                           |               |

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
| contract_code    | string       | true     | contract code                                 | BTC-USD                                                                                                   |
| volume           | decimal      | true     | volume                                        |                                                                                                           |
| order_type       | int          | true     | order type: 1. Quotation; 2. Cancelled order  |                                                                                                           |
| direction        | string       | true     | direction                                     | buy, sell                                                                                                 |
| offset           | string       | true     | offset                                        | open, close                                                                                               |
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
| ORDERS_END       |              | false    |                                               |                                                                                                           |
| DATA_END         |              | false    |                                               |                                                                                                           |
| ts               | long         | true     | Time of Respond Generation, Unit: Millisecond |                                                                                                           |

#### Request example

{

"contract_code":

"BTC-USD"

"direction":

"buy"

"offset":

"open"

"lever_rate":

20

"volume":

1

"callback_rate":

0.01

"active_price":

17000

"order_price_type":

"optimal_5"

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

825057944222908400

"order_id_str":

"825057944222908416"

"order_source":

"api"

"created_at":

1616750742739

"order_price_type":

"formula_price"

"status":

2

"callback_rate":

0.003

"active_price":

179

"is_active":

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

1616750875170

}
