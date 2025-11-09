# GET Cancel an Order

**Source:**
[Cancel an Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a18b-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_cancel (Cancel an Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                                         | Value Range | Default Value |
| --------------- | --------- | -------- | --------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| order_id        | string    | false    | Order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time）       |             |               |
| client_order_id | string    | false    | Client order ID (different IDs are separated by ",", maximum 10 orders can be withdrew at one time) |             |               |
| contract_code   | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD"                           |             |               |

Notes:  
Both order_id and client_order_id can be used for order withdrawl，one of them
needed at one time，if both of them are set，the default will be order id。  
The return data from Cancel An Order Interface only means that order cancelation
designation is executed successfully. To check cancelation result, please check
your order status at Get Information Of An Order interface.  
client_order_id, order status query is available for orders placed within 8
hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter                          | Data Type | Required | Description                                               | Value Range    |
| ---------------------------------- | --------- | -------- | --------------------------------------------------------- | -------------- |
| status                             | string    | true     | Request Processing Result                                 | "ok" , "error" |
| DICT>(ATTRIBUTE NAME: DATA_START   |           | false    |                                                           |                |
| LIST>(ATTRIBUTE NAME: ERRORS_START |           | false    |                                                           |                |
| order_id                           | string    | true     | Order ID                                                  |                |
| err_code                           | int       | true     | Error code                                                |                |
| err_msg                            | string    | true     | Error information                                         |                |
| LIST_END                           |           | false    |                                                           |                |
| successes                          | string    | true     | Successfully withdrew list of order_id or client_order_id |                |
| DICT_END                           |           | false    |                                                           |                |
| ts                                 | long      | true     | Time of Respond Generation, Unit: Millisecond             |                |

#### Request example

{

"order_id":

"123456"

"client_order_id":

"321456"

"contract_code":

"BTC-USD"

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

"768503271974985728"

"err_code":

1061

"err_msg":

"This order doesnt exist."

}

\]

"successes":

"771038212360937472"

}

"ts":

1603871877639

}
