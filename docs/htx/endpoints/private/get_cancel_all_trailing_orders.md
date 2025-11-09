# GET Cancel All Trailing Orders

**Source:**
[Cancel All Trailing Orders](https://www.htx.com/en-us/opend/newApiPages/?id=5d51bfd0-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_track_cancelall (Cancel All Trailing Orders)

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

| Parameter     | Data Type | Required | Description                            | Value Range | Default Value |
| ------------- | --------- | -------- | -------------------------------------- | ----------- | ------------- |
| contract_code | string    | true     | contract code                          | BTC-USD     |               |
| direction     | string    | false    | direction(if not filled in, means all) | buy, sell   |               |
| offset        | string    | false    | offset (if not filled in, means all)   | open, close |               |

Notes:  
You can fill in only one of direction and offset to cancel the orders. (such as
direction=buy, all buy orders will be cancelled, including "open" and "close"
offset)  
The frequency limit of this interface is 5 times per second.

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

"BTC-USD"

"status":

"0"

"trade_type":

0

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

"825057614106017792,825057886882578432"

}

"ts":

1616750829839

}
