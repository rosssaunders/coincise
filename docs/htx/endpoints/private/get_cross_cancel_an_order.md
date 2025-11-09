# GET [Cross] Cancel An Order

**Source:**
[[Cross] Cancel An Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb84bb2-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_cancel (\[Cross\] Cancel An Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. one of (pair+contract_type) and contract_code
must be filled in(if all of them not filled in, will get 1014 error code); and
all filled in, the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                                         | Value Range                                         | Default Value |
| --------------- | --------- | -------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| order_id        | string    | false    | order ID（different IDs are separated by ",", maximum 25 orders can be withdrew at one time）       |                                                     |               |
| client_order_id | string    | false    | Client order ID (different IDs are separated by ",", maximum 25 orders can be withdrew at one time) |                                                     |               |
| contract_code   | string    | false    | contract code                                                                                       | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair            | string    | false    | pair                                                                                                | BTC-USDT                                            |               |
| contract_type   | string    | false    | contract type                                                                                       | swap, this_week, next_week, quarter, next_quarter   |               |

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
| DATA_START   | object    | true     |                                                           |                |
| ERRORS_START | array     | true     |                                                           |                |
| order_id     | string    | true     | order ID                                                  |                |
| err_code     | int       | true     | error code                                                |                |
| err_msg      | string    | true     | error message                                             |                |
| ERRORS_END   |           | false    |                                                           |                |
| successes    | string    | true     | successfully withdrew list of order_id or client_order_id |                |
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

"pair":

"BTC-USDT"

"contract_type":

"swap"

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

"784054331179532288"

"err_code":

1062

"err_msg":

"Cancelling. Please be patient."

}

\]

"successes":

"784054331179532288"

}

"ts":

1606974744952

}
