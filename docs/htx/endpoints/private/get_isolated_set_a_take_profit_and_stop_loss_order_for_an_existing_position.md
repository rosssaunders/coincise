# GET [Isolated]Set a Take-profit and Stop-loss Order for an Existing Position

**Source:**
[[Isolated]Set a Take-profit and Stop-loss Order for an Existing Position](https://www.htx.com/en-us/opend/newApiPages/?id=8cb87911-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_tpsl_order (\[Isolated\]Set a Take-profit and Stop-loss Order for an Existing Position)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: All take-profit and stop-loss orders are position closing
orders. This interface only supports isolated margin mode. The frequency limit
of this interface is 5 times per second. Fill in at least one of the take-profit
trigger price(tp_trigger_price) and stop-loss trigger price(sl_trigger_price).
If all the trigger price is not filled in, this type of take-profit and
stop-loss order will not be placed.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter           | Data Type  | Required | Description                                                                                 | Value Range                                                         | Default Value |
| ------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------- |
| contract_code       | string     | true     | contract code                                                                               | BTC-USDT                                                            |               |
| direction           | string     | true     | direction                                                                                   | "buy", "sell"                                                       |               |
| volume              | decimal    | true     | Numbers of orders (volume)                                                                  |                                                                     |               |
| tp_trigger_price    | decimal    | false    | Trigger price of take-profit order                                                          |                                                                     |               |
| tp_order_price      | decimal    | false    | Order price of take-profit order（The order price is not required to fill in for Optimal N) |                                                                     |               |
| tp_order_price_type | string     | false    | Order type of take-profit order                                                             | default is market; market，limit，optimal_5，optimal_10，optimal_20 |               |
| sl_trigger_price    | decimal    | false    | Trigger price of stop-loss order                                                            |                                                                     |               |
| sl_order_price      | decimal    | false    | Order price of stop-loss order（The order price is not required to fill in for Optimal N）  |                                                                     |               |
| sl_order_price_type | string     | false    | Order type of stop-loss order                                                               | default is market; market，limit，optimal_5，optimal_10，optimal_20 |               |
| price_protect       | booleanint | false    | price protection, default is false. This parameter is only required when setting tp/sl      | true or false                                                       |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                                                              | Value Range    |
| -------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------- | -------------- |
| status         | string    | true     | status                                                                                                   | "ok" , "error" |
| ts             | long      | true     | time stamp                                                                                               |                |
| DATA_START     | object    | false    | Returned data when order is placed successfully, and will not be returned when order fails to be placed. |                |
| TP_ORDER_START | object    | true     | Order placing result of take-profit order                                                                |                |
| order_id       | long      | true     | order id                                                                                                 |                |
| order_id_str   | string    | true     | order id (string)                                                                                        |                |
| TP_ORDER_END   |           | false    |                                                                                                          |                |
| SL_ORDER_START | object    | true     | Order placing result of stop-loss order                                                                  |                |
| order_id       | long      | true     | order id                                                                                                 |                |
| order_id_str   | string    | true     | order id (string)                                                                                        |                |
| SL_ORDER_END   |           | false    |                                                                                                          |                |
| DATA_END       |           | false    |                                                                                                          |                |
| err_code       | int       | false    | error code（only when order fails to be placed）                                                         |                |
| err_msg        | string    | false    | error message（only when order fails to be placed）                                                      |                |

Notes:  
When only take-profit order or stop-loss order is set , the accordingly returned
"sl_order" or "tp_order" will be empty.

#### Request example

{

"contract_code":

"btc-usdt"

"direction":

"sell"

"volume":

1

"tp_trigger_price":

32000

"tp_order_price":

32000

"tp_order_price_type":

"optimal_5"

"sl_trigger_price":

"29000"

"sl_order_price":

"29000"

"sl_order_price_type":

"optimal_5"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"tp_order":{

"order_id":

795713650661638100

"order_id_str":

"795713650661638144"

}

"sl_order":{

"order_id":

795713650665832400

"order_id_str":

"795713650665832448"

}

}

"ts":

1609754517975

}
