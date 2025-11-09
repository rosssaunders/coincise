# GET Set a Take-profit and Stop-loss Order for an Existing Position

**Source:**
[Set a Take-profit and Stop-loss Order for an Existing Position](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b466-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_tpsl_order (Set a Take-profit and Stop-loss Order for an Existing Position)

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

| Parameter           | Data Type  | Required | Description                                                                                 | Value Range                                                | Default Value |
| ------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------- |
| contract_code       | string     | true     | contract code                                                                               | BTC-USD                                                    |               |
| direction           | string     | true     | direction                                                                                   | "buy", "sell"                                              |               |
| volume              | decimal    | true     | Numbers of orders (volume)                                                                  |                                                            |               |
| tp_trigger_price    | decimal    | false    | Trigger price of take-profit order                                                          |                                                            |               |
| tp_order_price      | decimal    | false    | Order price of take-profit order（The order price is not required to fill in for Optimal N) |                                                            |               |
| tp_order_price_type | string     | false    | Order type of take-profit order                                                             | default is limit; limit，optimal_5，optimal_10，optimal_20 |               |
| sl_trigger_price    | decimal    | false    | Trigger price of stop-loss order                                                            |                                                            |               |
| sl_order_price      | decimal    | false    | Order price of stop-loss order（The order price is not required to fill in for Optimal N）  |                                                            |               |
| sl_order_price_type | string     | false    | Order type of stop-loss order                                                               | default is limit; limit，optimal_5，optimal_10，optimal_20 |               |
| price_protect       | booleanint | false    | price protection, default is false. This parameter is only required when setting tp/sl      | true or false                                              |               |

Notes:  
All take-profit and stop-loss orders are position closing orders.  
The frequency limit of this interface is 5 times per second.  
Fill in at least one of the take-profit trigger price(tp_trigger_price) and
stop-loss trigger price(sl_trigger_price). If all the trigger price is not
filled in, this type of take-profit and stop-loss order will not be placed.

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

"BTC-USD"

"direction":

"buy"

"offset":

"open"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"tp_order":{

"order_id":

796038243887169500

"order_id_str":

"796038243887169536"

}

"sl_order":{

"order_id":

796038243887169500

"order_id_str":

"796038243887169537"

}

}

"ts":

1609831907041

}
