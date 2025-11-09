# GET Cancel All Trigger Orders

**Source:**
[Cancel All Trigger Orders](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b14a-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_trigger_cancelall (Cancel All Trigger Orders)

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

| Parameter     | Data Type | Required | Description                                                          | Value Range | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | true     | contract code,"BTC-USD" ...                                          |             |               |
| direction     | string    | false    | Transaction direction(if not filled in means all) \["buy" , "sell"\] |             |               |
| offset        | string    | false    | offset direction（if not filled in means all） \["open" , "close"\]  |             |               |

Notes:  
You can fill in only one of direction and offset to cancel the orders. (such as
direction=buy, all buy orders will be cancelled, including "open" and "close"
offset)  
The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter                     | Data Type | Required | Description                       | Value Range    |
| ----------------------------- | --------- | -------- | --------------------------------- | -------------- |
| status                        | string    | true     | status                            | "ok" , "error" |
| DATA_START                    |           | false    |                                   |                |
| LIST>(DATA NAME: ERRORS_START |           | false    |                                   |                |
| order_id                      | string    | true     | order id                          |                |
| err_code                      | int       | true     | error code                        |                |
| err_msg                       | string    | true     | error message                     |                |
| LIST_END                      |           | false    |                                   |                |
| successes                     | string    | true     | successful orders                 |                |
| DATA_END                      |           | false    |                                   |                |
| ts                            | long      | true     | response timestamp in millseconds |                |

#### Request example

{

"contract_code":

"BTC-USD"

"trade_type":

0

"status":

"0"

"create_date":

30

"page_index":

1

"page_size":

20

"sort_by":

"created_at"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[\]

"successes":

"7002240,7002241"

}

"ts":

1603874352762

}
