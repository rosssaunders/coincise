# GET Place Flash Close Order

**Source:**
[Place Flash Close Order](https://www.htx.com/en-us/opend/newApiPages/?id=28c31e13-77ae-11ed-9966-0242ac110003)

**Category:** Future Trade Interface

## Authentication

Required (Private Endpoint)

### /api/v1/lightning_close_position (Place Flash Close Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description              | Value Range                                                                                             | Default Value |
| ---------------- | --------- | -------- | ------------------------ | ------------------------------------------------------------------------------------------------------- | ------------- |
| symbol           | string    | false    | Contract Code            | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...                               |               |
| contract_type    | string    | false    | Contract Type            | “this_week”:Weekly，“next_week”:Bi-weekly，“quarter”:Quarterly ,Next Quarterly Contract: "next_quarter" |               |
| contract_code    | string    | false    | Contract Code            | BTC190903                                                                                               |               |
| volume           | long      | true     | Order Quantity(volume)   |                                                                                                         |               |
| direction        | string    | true     | “buy”:Open，“sell”:Close |                                                                                                         |               |
| client_order_id  | long      | false    | Client order ID          | \[1, 9223372036854775807\]                                                                              |               |
| order_price_type | string    | false    | order price type         | "lightning" by default. "lightning_fok": lightning FOK type,"lightning_ioc": lightning IOC type         |               |

Notes:  
Lightning Close Position，is order with rival price and optimal 30 grades. And
the unsettled part will be automatically converted into a limited price order.

#### Response Parameter

| Parameter       | Data Type | Required | Description                                  | Value Range                                            |
| --------------- | --------- | -------- | -------------------------------------------- | ------------------------------------------------------ |
| status          | string    | true     | Request Processing Result                    | "ok" :Order placed successfully, "error"：Order failed |
| ts              | long      | true     | Time of Respond Generation, Unit: Milesecond |                                                        |
| DATA_START      |           | false    |                                              | Dictionary                                             |
| order_id        | long      | true     | Order ID                                     |                                                        |
| order_id_str    | string    | true     | Order ID                                     |                                                        |
| client_order_id | long      | false    | user’s own order ID                          |                                                        |
| DATA_END        |           | false    |                                              |                                                        |

#### Request example

{

"symbol":

"BTC"

"contract_type":

"this_week"

"contract_code":

"BTC190903"

"volume":

1

"direction":

"sell"

"client_order_id":

"123456"

"order_price_type":

"lightning"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order_id":

633766664829804500

"order_id_str":

"633766664829804544"

"client_order_id":

9086

}

"ts":

158797866555

}
