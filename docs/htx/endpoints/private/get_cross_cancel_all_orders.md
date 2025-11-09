# GET [Cross] Cancel All Orders

**Source:**
[[Cross] Cancel All Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb84ea6-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_cancelall (\[Cross\] Cancel All Orders)

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

| Parameter     | Data Type | Required | Description                                                          | Value Range                                         | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                                                        | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                                                 | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                                                        | swap, this_week, next_week, quarter, next_quarter   |               |
| direction     | string    | false    | Transaction direction(if not filled in means all) \["buy" , "sell"\] |                                                     |               |
| offset        | string    | false    | offset direction（if not filled in means all） \["open" , "close"\]  |                                                     |               |

Notes:  
You can fill in only one of direction and offset to cancel the orders. (such as
direction=buy, all buy orders will be cancelled, including "open" and "close"
offset)

#### Response Parameter

| Parameter    | Data Type | Required | Description                                   | Value Range    |
| ------------ | --------- | -------- | --------------------------------------------- | -------------- |
| status       | string    | true     | Request Processing Result                     | "ok" , "error" |
| DATA_START   | object    | true     |                                               |                |
| ERRORS_START | array     | true     |                                               |                |
| order_id     | string    | true     | order ID                                      |                |
| err_code     | int       | true     | error code                                    |                |
| err_msg      | string    | true     | error message                                 |                |
| ERRORS_END   |           | false    |                                               |                |
| successes    | string    | true     | the list order which's successful             |                |
| DATA_END     |           | false    |                                               |                |
| ts           | long      | true     | Time of Respond Generation, Unit: Millisecond |                |

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

"open"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[\]

"successes":

"784055473531781120,784055473842159616"

}

"ts":

1606974998510

}
