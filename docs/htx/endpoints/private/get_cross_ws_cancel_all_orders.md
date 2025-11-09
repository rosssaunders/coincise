# GET [Cross] ws cancel all Orders

**Source:** [[Cross] ws cancel all Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1902958de26)

**Category:** Websocket Trade

## Authentication

Required (Private Endpoint)

### cross\_cancelall (\[Cross\] ws cancel all Orders)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports all orders cancellation for websocket contracts in cross position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name， cross\_cancelall; |
| cid | string | Optional; ID Client requests unique ID |
| data | string | All cancellation parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |
| cid | string | false | Current request's ID |  |  |

Notes: You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

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
| successes | string | true | the list order which's successful |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

{

"op":

"cross\_cancelall"

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