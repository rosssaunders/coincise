# GET Place a Trailing Order

**Source:**
[Place a Trailing Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51bc0f-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_track_order (Place a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                                                 | Value Range                                                    | Default Value |
| ---------------- | --------- | -------- | --------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------- |
| contract_code    | string    | true     | contract code                                                               | BTC-USD                                                        |               |
| direction        | string    | true     | direction                                                                   | buy, sell                                                      |               |
| offset           | string    | true     | offset                                                                      | open, close                                                    |               |
| lever_rate       | int       | false    | lever rate, is required when open position, is optional when close position |                                                                |               |
| volume           | decimal   | true     | volume(cont)                                                                |                                                                |               |
| callback_rate    | decimal   | true     | callback rate                                                               | Such as: 0.01 means 1%. And must be not less than 0.001 (0.1%) |               |
| active price     | decimal   | true     | active price                                                                |                                                                |               |
| order_price_type | string    | true     | order price type                                                            | optimal_5, optimal_10, optimal_20, formula_price               |               |

Notes:  
When order_price_type is the formula_price, it means that after the tracking
order is triggered successfully, use the lowest (highest) market price \*(1 ±
callback rate) that from statistic since place trading order, as the order price
(the precision is the minimum variation of the contract price and be truncated)
to place a limit price order  
whether filled in with the optimal N or the formula price, there is no guarantee
that the order can be completely filled, which mainly depends on the market
conditions.  
The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter    | Data Type | Required | Description                              | Value Range    |
| ------------ | --------- | -------- | ---------------------------------------- | -------------- |
| status       | string    | true     | the result of server handling to request | "ok" , "error" |
| ts           | long      | true     | timestamp                                |                |
| DATA_START   | object    | true     | the returned data which is successful    |                |
| order_id     | long      | true     | trailing order id \[Globally Unique\]    |                |
| order_id_str | string    | true     | trailing order id in string format       |                |
| DATA_END     |           | false    |                                          |                |

#### Request example

{

"contract_code":

"BTC-USD"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order_id":

825057614106017800

"order_id_str":

"825057614106017792"

}

"ts":

1616750664047

}
