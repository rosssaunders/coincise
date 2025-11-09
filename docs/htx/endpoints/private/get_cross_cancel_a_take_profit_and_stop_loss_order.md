# GET [Cross]Cancel a Take-profit and Stop-loss Order

**Source:**
[[Cross]Cancel a Take-profit and Stop-loss Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb87c9e-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_tpsl_cancel (\[Cross\]Cancel a Take-profit and Stop-loss Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports cross margin mode. The
frequency limit of this interface is 5 times per second. The request parameter
"contract_code" supports the contract code of futures, in that the format is
BTC-USDT-210625. one of (pair+contract_type) and contract_code must be filled
in(if all of them not filled in, will get 1014 error code); and all filled in,
the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                   | Value Range                                         | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                                                                                 | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                                                                          | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                                                                                 | swap, this_week, next_week, quarter, next_quarter   |               |
| order_id      | string    | true     | order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time） |                                                     |               |

#### Response Parameter

| Parameter    | Data Type | Required | Description                                   | Value Range   |
| ------------ | --------- | -------- | --------------------------------------------- | ------------- |
| status       | string    | true     | status                                        | "ok", "error" |
| DATA_START   | object    | true     |                                               | dictionary    |
| ERRORS_START | object    | true     |                                               | dictionary    |
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

"BTC-USDT"

"pair":

"BTC-USDT"

"contract_type":

"swap"

"order_id":

"2345567123"

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

"795714078698749956"

"err_code":

1061

"err_msg":

"This order doesnt exist."

}

\]

"successes":

"795714078698749952"

}

"ts":

1609754775942

}
