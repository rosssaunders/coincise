# GET [Cross]Cancel All Trailing Orders

**Source:**
[[Cross]Cancel All Trailing Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_track_cancelall (\[Cross\]Cancel All Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The
frequency limit of this interface is 5 times per second. You can fill in only
one of direction and offset to cancel the orders. (such as direction=buy, all
buy orders will be cancelled, including "open" and "close" offset) The request
parameter "contract_code" supports the contract code of futures, in that the
format is BTC-USDT-210625. one of (pair+contract_type) and contract_code must be
filled in(if all of them not filled in, will get 1014 error code); and all
filled in, the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                            | Value Range                                         | Default Value |
| ------------- | --------- | -------- | -------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                          | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                   | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                          | swap, this_week, next_week, quarter, next_quarter   |               |
| direction     | string    | false    | direction(if not filled in, means all) | buy, sell                                           |               |
| offset        | string    | false    | offset (if not filled in, means all)   | open, close                                         |               |

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

"direction":

"buy"

"offset":

"close"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[\]

"successes":

"826054813483597824,826054818734866432,826054867657228288"

}

"ts":

1616988442893

}
