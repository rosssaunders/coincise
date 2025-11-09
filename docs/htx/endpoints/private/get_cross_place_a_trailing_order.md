# GET [Cross]Place a Trailing Order

**Source:**
[[Cross]Place a Trailing Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb88bb5-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_track_order (\[Cross\]Place a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The
frequency limit of this interface is 5 times per second. The request parameter
"contract_code" supports the contract code of futures, in that the format is
BTC-USDT-210625. one of (pair+contract_type) and contract_code must be filled
in; and all filled in, the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                                                                    | Value Range                                                    | Default Value |
| ---------------- | --------- | -------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------- |
| contract_code    | string    | false    | contract code                                                                                  | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...            |               |
| pair             | string    | false    | pair                                                                                           | BTC-USDT                                                       |               |
| contract_type    | string    | false    | contract type                                                                                  | swap, this_week, next_week, quarter, next_quarter              |               |
| reduce_only      | int       | false    | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes                                                  |               |
| direction        | string    | true     | direction                                                                                      | buy, sell                                                      |               |
| offset           | string    | false    | offset                                                                                         | open, close, both                                              |               |
| lever_rate       | int       | false    | lever rate, is required when open position, is optional when close position                    |                                                                |               |
| volume           | decimal   | true     | volume(cont)                                                                                   |                                                                |               |
| callback_rate    | decimal   | true     | callback rate                                                                                  | Such as: 0.01 means 1%. And must be not less than 0.001 (0.1%) |               |
| active price     | decimal   | true     | active price                                                                                   |                                                                |               |
| order_price_type | string    | true     | order price type                                                                               | optimal_5, optimal_10, optimal_20, formula_price               |               |

Notes:  
When order_price_type is the formula_price, it means that after the tracking
order is triggered successfully, use the lowest (highest) market price \*(1 ±
callback rate) that from statistic since place trading order, as the order price
(the precision is the minimum variation of the contract price and be truncated)
to place a limit price order  
whether filled in with the optimal N or the formula price, there is no guarantee
that the order can be completely filled, which mainly depends on the market
conditions.  
offset, in hedge mode it is a required field, and in one-way mode it is optional
paramater which's value must be both when filled.  
please note that, in the one-way mode, if using the parameter reduce_only=1 to
place an order for opening positions, when the order triggered, it will respond
error message: 1492 Amount of Reduce Only order exceeds the amount available to
close. order will be failed.

#### Response Parameter

| Parameter    | Data Type | Required | Description                              | Value Range    |
| ------------ | --------- | -------- | ---------------------------------------- | -------------- |
| status       | string    | true     | the result of server handling to request | "ok" , "error" |
| ts           | long      | true     | timestamp                                |                |
| DATA_START   | object    | true     | the returned data which is successful    |                |
| order_id     | long      | true     | trailing order id\[Globally Unique\]     |                |
| order_id_str | string    | true     | trailing order id in string format       |                |
| DATA_END     |           | false    |                                          |                |

#### Request example

{

"contract_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract_type":

"swap"

"reduce_only":

0

"direction":

"buy"

"offset":

"open"

"lever_rate":

20

"volume":

100

"callback_rate":

0.01

"active_price":

1670

"order_price_type":

"optimal_5"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order_id":

826052906719445000

"order_id_str":

"826052906719444992"

}

"ts":

1616987960287

}
