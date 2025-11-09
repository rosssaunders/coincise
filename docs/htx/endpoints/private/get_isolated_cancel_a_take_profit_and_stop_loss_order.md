# GET [Isolated]Cancel a Take-profit and Stop-loss Order

**Source:**
[[Isolated]Cancel a Take-profit and Stop-loss Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb87bc0-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_tpsl_cancel (\[Isolated\]Cancel a Take-profit and Stop-loss Order)

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

| Parameter     | Data Type | Required | Description                                                                                   | Value Range    | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------------------------------------- | -------------- | ------------- |
| contract_code | string    | true     | contract code                                                                                 | "BTC-USDT" ... |               |
| order_id      | string    | true     | order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time） |                |               |

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

"795713650661638145"

"err_code":

1061

"err_msg":

"This order doesnt exist."

}

\]

"successes":

"795713650661638144"

}

"ts":

1609754722004

}
