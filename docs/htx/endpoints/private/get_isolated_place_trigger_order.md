# GET [Isolated] Place Trigger Order

**Source:**
[[Isolated] Place Trigger Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb86c95-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_trigger_order (\[Isolated\] Place Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The
frequency limit of this interface is 5 times per second.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                                                                                         | Value Range   | Default Value |
| ---------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- |
| contract_code    | string    | true     | contract type                                                                                                       | BTC-USDT      |               |
| reduce_only      | int       | false    | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.)                      | 0: no, 1: yes |               |
| trigger_type     | string    | true     | trigger： ge Equal to or Greater than；le Less than or Equal to                                                     |               |               |
| trigger_price    | decimal   | true     | Trigger Price                                                                                                       |               |               |
| order_price      | decimal   | false    | Order Price                                                                                                         |               |               |
| order_price_type | string    | false    | order price type： "limit" by default;"optimal_5", "optimal_10"，"optimal_20"                                       |               |               |
| volume           | long      | true     | volume                                                                                                              |               |               |
| direction        | string    | true     | buy sell                                                                                                            |               |               |
| offset           | string    | false    | open, close, both                                                                                                   |               |               |
| lever_rate       | int       | false    | Long leverage shall be equal to short leverage.high leverage has a high risk factor, so please use it with caution. |               |               |

Notes:  
optimal_5: top 5 optimal BBO price. optimal_10: top 10 optimal BBO price.
optimal_20: top 20 optimal BBO price. limit: the limit order, order_price
needed.  
If you’re holding a position currently, the leverage you choose when placing an
order should be the same as the leverage of your current positions, otherwise,
the order will fail to be placed. If you need a new leverage to place an order,
you should switch the leverage of current positions first by using the Switch
Leverage interface.  
offset, in hedge mode it is a required field, and in one-way mode it is optional
paramater which's value must be both when filled.  
please note that, in the one-way mode, if using the parameter reduce_only=1 to
place an order for opening positions, when the order triggered, it will respond
error message: 1492 Amount of Reduce Only order exceeds the amount available to
close. order will be failed.

#### Response Parameter

| Parameter    | Data Type | Required | Description      | Value Range |
| ------------ | --------- | -------- | ---------------- | ----------- |
| status       | 1         | false    | status: ok,error |             |
| err_code     | 0         | false    | error code       |             |
| err_msg      | 0         | false    | error message    |             |
| DATA_START   |           | false    |                  |             |
| order_id     | 1         | false    | order id.        |             |
| order_id_str | 1         | false    | order id str     |             |
| DATA_END     |           | false    |                  |             |
| ts           | 1         | false    | timestamp        |             |

#### Request example

{

"contract_code":

"BTC-USDT"

"trigger_type":

"ge"

"trigger_price":

1111

"order_price":

1000

"order_price_type":

"limit"

"volume":

111

"direction":

"buy"

"offset":

"open"

"lever_rate":

10

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order_id":

35

"order_id_str":

"35"

}

"ts":

1547521135713

}
