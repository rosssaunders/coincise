# GET Cancel a Take-profit and Stop-loss Order

**Source:**
[Cancel a Take-profit and Stop-loss Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b532-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_tpsl_cancel (Cancel a Take-profit and Stop-loss Order)

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

| Parameter     | Data Type | Required | Description                                                                                   | Value Range   | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------------------------------------- | ------------- | ------------- |
| contract_code | string    | true     | contract code                                                                                 | "BTC-USD" ... |               |
| order_id      | string    | true     | order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time） |               |               |

Notes:  
The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter    | Data Type | Required | Description                                   | Value Range   |
| ------------ | --------- | -------- | --------------------------------------------- | ------------- |
| status       | string    | true     | status                                        | "ok", "error" |
| DATA_START   | object    | true     |                                               | dictionary    |
| ERRORS_START | array     | true     |                                               |               |
| order_id     | string    | true     | order id                                      |               |
| err_code     | long      | false    | error code                                    |               |
| err_msg      | string    | false    | error message                                 |               |
| ERRORS_END   |           | false    |                                               |               |
| successes    | string    | true     | successes orders                              |               |
| DATA_END     |           | false    |                                               |               |
| ts           | long      | true     | Time of Respond Generation，Unit: Millisecond |               |

#### Request example

{

"contract_code":

"BTC-USD"

"direction":

"buy"

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

"796038243887169533"

"err_code":

1061

"err_msg":

"This order doesnt exist."

}

\]

"successes":

"796038243887169537"

}

"ts":

1609832106183

}
