# GET [Isolated] ws cancel an Order

**Source:** [[Isolated] ws cancel an Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1902927d183)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### cancel (\[Isolated\] ws cancel an Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports order cancellation for websocket contracts in isolated position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，cancel |
| cid | string | Optional; ID Client requests unique ID |
| data | string | cancellation parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| DATA\_START |  | false |  |  |  |
| order\_id | string | false | order ID（different IDs are separated by ",", maximum 25 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID (different IDs are separated by ",", maximum 25 orders can be withdrew at one time) |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| DATA\_START |  | false |  |  |  |
| cid | string | false | Current request's ID |  |  |

Notes: Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id。 The return data from cancel An Order Interface only means that order cancelation designation is executed successfully. To check cancelation result, please check your order status at Get Information Of An Order interface. client\_order\_id, order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | false |  |  |
| ERRORS\_START | array | false |  |  |
| order\_id | string | true | Order ID |  |
| err\_code | int | true | Error code |  |
| err\_msg | string | true | Error information |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | Successfully withdrew list of order\_id or client\_order\_id |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

{

"op":

"cancel"

"cid":

"40sG903yz80oDFWr"

"data":{

"order\_id":

"456789133445"

"client\_order\_id":

"4567891312345"

"contract\_code":

"BTC-USDT"

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