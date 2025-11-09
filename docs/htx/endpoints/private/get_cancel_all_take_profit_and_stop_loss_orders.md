# GET Cancel all Take-profit and Stop-loss Orders

**Source:**
[Cancel all Take-profit and Stop-loss Orders](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b66b-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_tpsl_cancelall (Cancel all Take-profit and Stop-loss Orders)

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

| Parameter     | Data Type | Required | Description                                       | Value Range        | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------- | ------------------ | ------------- |
| contract_code | string    | true     | contract code                                     | "BTC-USD" ...      |               |
| direction     | string    | false    | Transaction direction(if not filled in means all) | \["buy" , "sell"\] |               |

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

"796038243887169536,796039239967260672,796039239971454976"

}

"ts":

1609832157586

}
