# GET [Isolated] Cancel Trigger Order

**Source:**
[[Isolated] Cancel Trigger Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb86f61-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_trigger_cancel (\[Isolated\] Cancel Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The
frequency limit of this interface is 5 times per second.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                              | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | 1         | false    | Case-Insenstive.Both uppercase and lowercase are supported.BTC-USDT...                   |             |               |
| order_id      | 1         | false    | order id. multiple orderids need to be joined by ",".Max number of order ids is 20 once. |             |               |

#### Response Parameter

| Parameter    | Data Type | Required | Description                    | Value Range    |
| ------------ | --------- | -------- | ------------------------------ | -------------- |
| status       | string    | true     | response status                | "ok" , "error" |
| DATA_START   |           | false    |                                |                |
| ERRORS_START |           | false    |                                |                |
| order_id     | string    | true     | order id                       |                |
| err_code     | int       | true     | error code                     |                |
| err_msg      | string    | true     | error messages                 |                |
| ERRORS_END   |           | false    |                                |                |
| successes    | string    | true     | successful orders              |                |
| DATA_END     |           | false    |                                |                |
| ts           | long      | true     | response timestamp millseconds |                |

#### Request example

{

"contract_code":

"BTC-USDT"

"order_id":

"456789123"

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

"34"

"err_code":

1061

"err_msg":

"This order doesnt exist."

}

\]

"successes":

"1"

}

"ts":

1603704887184

}
