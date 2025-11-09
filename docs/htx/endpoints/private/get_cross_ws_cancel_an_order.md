# GET [Cross] ws cancel an Order

**Source:**
[[Cross] ws cancel an Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-190293b5999)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### cross_cancel (\[Cross\] ws cancel an Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports order cancellation for
websocket contracts in cross position mode.

#### Subscription Address

| Environment                         | Address                              |
| ----------------------------------- | ------------------------------------ |
| Online                              | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade  |

#### Request Parameter

| Field Name | Type   | Description                             |
| ---------- | ------ | --------------------------------------- |
| op         | string | Required； Operator Name，cross_cancel; |
| cid        | string | Optional; ID Client requests unique ID  |
| data       | string | cancellation parameters                 |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter       | Data Type | Required | Description                                                                                         | Value Range                                         | Default Value |
| --------------- | --------- | -------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| order_id        | string    | false    | order ID（different IDs are separated by ",", maximum 25 orders can be withdrew at one time）       |                                                     |               |
| client_order_id | string    | false    | Client order ID (different IDs are separated by ",", maximum 25 orders can be withdrew at one time) |                                                     |               |
| contract_code   | string    | false    | contract code                                                                                       | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair            | string    | false    | pair                                                                                                | BTC-USDT                                            |               |
| contract_type   | string    | false    | contract type                                                                                       | swap, this_week, next_week, quarter, next_quarter   |               |
| cid             | string    | false    | Current request's ID                                                                                |                                                     |               |

Notes: Both order_id and client_order_id can be used for order withdrawl，one of
them needed at one time，if both of them are set，the default will be order
id。 The return data from cancel An Order Interface only means that order
cancelation designation is executed successfully. To check cancelation result,
please check your order status at Get Information Of An Order interface.
client_order_id, order status query is available for orders placed within 8
hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Data Update

| Parameter    | Data Type | Required | Description                                               | Value Range    |
| ------------ | --------- | -------- | --------------------------------------------------------- | -------------- |
| status       | string    | true     | Request Processing Result                                 | "ok" , "error" |
| DATA_START   | object    | true     |                                                           |                |
| ERRORS_START | array     | true     |                                                           |                |
| order_id     | string    | true     | order ID                                                  |                |
| err_code     | int       | true     | error code                                                |                |
| err_msg      | string    | true     | error message                                             |                |
| ERRORS_END   |           | false    |                                                           |                |
| successes    | string    | true     | successfully withdrew list of order_id or client_order_id |                |
| DATA_END     |           | false    |                                                           |                |
| ts           | long      | true     | Time of Respond Generation, Unit: Millisecond             |                |

#### Subscription Example

{

"op":

"cross_cancel"

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
