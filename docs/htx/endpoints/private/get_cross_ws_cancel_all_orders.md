# GET [Cross] ws cancel all Orders

**Source:**
[[Cross] ws cancel all Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1902958de26)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### cross_cancelall (\[Cross\] ws cancel all Orders)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports all orders cancellation for
websocket contracts in cross position mode.

#### Subscription Address

| Environment                         | Address                              |
| ----------------------------------- | ------------------------------------ |
| Online                              | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade  |

#### Request Parameter

| Field Name | Type   | Description                                 |
| ---------- | ------ | ------------------------------------------- |
| op         | string | Required； Operator Name， cross_cancelall; |
| cid        | string | Optional; ID Client requests unique ID      |
| data       | string | All cancellation parameters                 |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description                                                          | Value Range                                         | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                                                        | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                                                 | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                                                        | swap, this_week, next_week, quarter, next_quarter   |               |
| direction     | string    | false    | Transaction direction(if not filled in means all) \["buy" , "sell"\] |                                                     |               |
| offset        | string    | false    | offset direction（if not filled in means all） \["open" , "close"\]  |                                                     |               |
| cid           | string    | false    | Current request's ID                                                 |                                                     |               |

Notes: You can fill in only one of direction and offset to cancel the orders.
(such as direction=buy, all buy orders will be cancelled, including "open" and
"close" offset)

#### Data Update

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

#### Subscription Example

{

"op":

"cross_cancelall"

"cid":

"40sG903yz80oDFWr"

"data":{

"order_id":

"456789133445"

"client_order_id":

"4567891312345"

"contract_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract_type":

"swap"

}

}

#### Example of a Successful Subscription

{

"status":

"ok"

"cid":

"40sG903yz80oDFWr"

"data":{

"errors":\[

0:{

"order_id":

"770323133537685504"

"err_code":

1071

"err_msg":

"Repeated withdraw."

}

\]

"successes":

"770323847022211072"

}

"ts":

1603701351602

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
