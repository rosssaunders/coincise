# GET [Isolated] Cancel an Order

**Source:**
[[Isolated] Cancel an Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb84a62-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cancel (\[Isolated\] Cancel an Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                                         | Value Range | Default Value |
| --------------- | --------- | -------- | --------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| order_id        | string    | false    | order ID（different IDs are separated by ",", maximum 25 orders can be withdrew at one time）       |             |               |
| client_order_id | string    | false    | Client order ID (different IDs are separated by ",", maximum 25 orders can be withdrew at one time) |             |               |
| contract_code   | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT"                          |             |               |

Notes:  
Both order_id and client_order_id can be used for order withdrawl，one of them
needed at one time，if both of them are set，the default will be order id。  
The return data from Cancel An Order Interface only means that order cancelation
designation is executed successfully. To check cancelation result, please check
your order status at Get Information Of An Order interface.  
client_order_id, order status query is available for orders placed within 8
hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter    | Data Type | Required | Description                                               | Value Range    |
| ------------ | --------- | -------- | --------------------------------------------------------- | -------------- |
| status       | string    | true     | Request Processing Result                                 | "ok" , "error" |
| DATA_START   | object    | false    |                                                           |                |
| ERRORS_START | array     | false    |                                                           |                |
| order_id     | string    | true     | Order ID                                                  |                |
| err_code     | int       | true     | Error code                                                |                |
| err_msg      | string    | true     | Error information                                         |                |
| ERRORS_END   |           | false    |                                                           |                |
| successes    | string    | true     | Successfully withdrew list of order_id or client_order_id |                |
| DATA_END     |           | false    |                                                           |                |
| ts           | long      | true     | Time of Respond Generation, Unit: Millisecond             |                |

#### Request example

{

"order_id":

"456789133445"

"client_order_id":

"4567891312345"

"contract_code":

"BTC-USDT"

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

"770323133537685504"

"err_code":

1071

"err_msg":

"Repeated withdraw."

}

\]

"successes":

"770323847022211072"

}

"ts":

1603701351602

}
