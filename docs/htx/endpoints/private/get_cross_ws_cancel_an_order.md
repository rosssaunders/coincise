# GET [Cross] ws cancel an Order

**Source:** [[Cross] ws cancel an Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-190293b5999)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### cross\_cancel (\[Cross\] ws cancel an Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports order cancellation for websocket contracts in cross position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，cross\_cancel; |
| cid | string | Optional; ID Client requests unique ID |
| data | string | cancellation parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | order ID（different IDs are separated by ",", maximum 25 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID (different IDs are separated by ",", maximum 25 orders can be withdrew at one time) |  |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| cid | string | false | Current request's ID |  |  |

Notes: Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id。 The return data from cancel An Order Interface only means that order cancelation designation is executed successfully. To check cancelation result, please check your order status at Get Information Of An Order interface. client\_order\_id, order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| ERRORS\_START | array | true |  |  |
| order\_id | string | true | order ID |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error message |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | successfully withdrew list of order\_id or client\_order\_id |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

{

"op":

"cross\_cancel"

"cid":

"40sG903yz80oDFWr"

"data":{

"order\_id":

"456789133445"

"client\_order\_id":

"4567891312345"

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract\_type":

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

"order\_id":

"770323133537685504"

"err\_code":

1071

"err\_msg":

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