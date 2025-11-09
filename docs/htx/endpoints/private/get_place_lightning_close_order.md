# GET Place Lightning Close Order

**Source:**
[Place Lightning Close Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51ae6b-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_lightning_close_position (Place Lightning Close Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                                                                     | Value Range                | Default Value |
| ---------------- | --------- | -------- | ----------------------------------------------------------------------------------------------- | -------------------------- | ------------- |
| contract_code    | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD"                       |                            |               |
| volume           | long      | true     | Order Quantity(volume)                                                                          |                            |               |
| direction        | string    | true     | “buy”:Open，“sell”:Close                                                                        |                            |               |
| client_order_id  | long      | false    | Client needs to provide unique API and have to maintain the API themselves afterwards.          | \[1, 9223372036854775807\] |               |
| order_price_type | string    | false    | "lightning" by default. "lightning_fok": lightning FOK type,"lightning_ioc": lightning IOC type |                            |               |

Notes:  
Lightning Close Position，is order with rival price and optimal 30 grades. And
the unsettled part will be automatically converted into a limited price order.

#### Response Parameter

| Parameter       | Data Type | Required | Description                                   | Value Range                                            |
| --------------- | --------- | -------- | --------------------------------------------- | ------------------------------------------------------ |
| status          | string    | true     | Request Processing Result                     | "ok" :Order placed successfully, "error"：Order failed |
| ts              | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                        |
| DATA_START      |           | false    |                                               | Dictionary                                             |
| order_id        | long      | true     | Order ID                                      |                                                        |
| order_id_str    | string    | true     | Order ID                                      |                                                        |
| client_order_id | long      | false    | user’s own order ID                           |                                                        |
| DATA_END        |           | false    |                                               |                                                        |

#### Request example

{

"sub_uid":

"123456789"

"contract_code":

"BTC_USD"

"amount":

"123"

"type":

"master_to_sub"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order_id":

770434885714452500

"order_id_str":

"770434885714452480"

"client_order_id":

9086

}

"ts":

158797866555

}
