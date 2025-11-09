# GET [Cross]Cancel a Trailing Order

**Source:**
[[Cross]Cancel a Trailing Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8902c-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_track_cancel (\[Cross\]Cancel a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The
frequency limit of this interface is 5 times per second. The request parameter
"contract_code" supports the contract code of futures, in that the format is
BTC-USDT-210625. one of (pair+contract_type) and contract_code must be filled
in; and all filled in, the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                                      | Value Range                                         | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                                                                                                                    | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                                                                                                             | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                                                                                                                    | swap, this_week, next_week, quarter, next_quarter   |               |
| order_id      | string    | true     | User's trailing order id (multiple order IDs are separated by ",", a maximum of 10 orders are allowed to be withdrawn at a time) |                                                     |               |

#### Response Parameter

| Parameter    | Data Type | Required | Description                                   | Value Range                    |
| ------------ | --------- | -------- | --------------------------------------------- | ------------------------------ |
| status       | string    | true     | the result of server handling to request      | "ok" :success, "error": failed |
| DATA_START   | object    | true     |                                               | dictionary                     |
| ERRORS_START | object    | true     |                                               | dictionary                     |
| order_id     | string    | true     | trailing order id\[Globally Unique\]          |                                |
| err_code     | long      | false    | error code                                    |                                |
| err_msg      | string    | false    | error msg                                     |                                |
| ERRORS_END   |           | false    |                                               |                                |
| successes    | string    | true     | the orders that are success                   |                                |
| DATA_END     |           | false    |                                               |                                |
| ts           | long      | true     | Time of Respond Generation, Unit: Millisecond |                                |

#### Request example

{

"contract_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract_type":

"swap"

"order_id":

"456457123"

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

"826052906719444993"

"err_code":

1061

"err_msg":

"This order doesnt exist."

}

\]

"successes":

"826053970168446976"

}

"ts":

1616988232517

}
