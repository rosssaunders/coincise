# GET Cancel Trigger Order

**Source:**
[Cancel Trigger Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b077-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_trigger_cancel (Cancel Trigger Order)

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

| Parameter     | Data Type | Required | Description                                                                              | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.BTC-USD...                    |             |               |
| order_id      | string    | true     | order id. multiple orderids need to be joined by ",".Max number of order ids is 10 once. |             |               |

Notes:  
The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter                      | Data Type | Required | Description                    | Value Range    |
| ------------------------------ | --------- | -------- | ------------------------------ | -------------- |
| status                         | string    | true     | response status                | "ok" , "error" |
| DATA_START                     |           | false    |                                |                |
| successes                      | string    | true     | successful orders              |                |
| LIST>(FIELD NAME: ERRORS_START |           | false    |                                |                |
| order_id                       | string    | true     | order id                       |                |
| err_code                       | int       | true     | error code                     |                |
| err_msg                        | string    | true     | error messages                 |                |
| LIST_END                       |           | false    |                                |                |
| DATA_END                       |           | false    |                                |                |
| ts                             | long      | true     | response timestamp millseconds |                |

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

"errors":\[

0:{

"order_id":

"7002236"

"err_code":

1061

"err_msg":

"This order doesnt exist."

}

\]

"successes":

"7002242"

}

"ts":

1603874307323

}
