# GET [Cross] Subscribe Position Updates（sub）

**Source:** [[Cross] Subscribe Position Updates（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7df0f-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### positions\_cross.$contract\_code (\[Cross\] Subscribe Position Updates（sub）)

Signature verification: No

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| positions\_cross.\* | positions\_cross.\* | Allowed |
| positions\_cross.contract\_code1 | positions\_cross.\* | Allowed |
| positions\_cross.contract\_code1 | positions\_cross.contract\_code1 | Allowed |
| positions\_cross.contract\_code1 | positions\_cross.contract\_code1 | Not Allowed |
| positions\_cross.\* | positions\_cross.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | all: \*(swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | operaton name, fixed as notify; |  |
| topic | string | true | topic |  |
| ts | long | true | server response timestamp |  |
| uid | string | true | uid |  |
| event | string | true | Related events of position change notification | notification on account asset change such as commit order(order.open), fulfill order(order.match)(excluding liquidated order and settled orders), settlement and delivery(settlement), fulfill liquidation order(order.liquidation)(including voluntarily fulfilled liquidation order and the fulfilled liquidation order taken over by system ) , cancel order(order.cancel), asset transfer（contract.transfer) (ncluding transfer with exchange accounts, transfer between main account and sub-account, and tranfer between different margin accounts.), system (contract.system), other asset change(other), switch leverage(switch\_lever\_rate), initial margin(init), ADL trade |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| volume | decimal | true | position quantity |  |
| available | decimal | true | positions available to close |  |
| frozen | decimal | true | positions frozen |  |
| cost\_open | decimal | true | opening average price |  |
| cost\_hold | decimal | true | average price of position |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| profit\_rate | decimal | true | profit rate |  |
| profit | decimal | true | profit |  |
| margin\_asset | string | true | margin asset |  |
| position\_margin | decimal | true | position margin |  |
| lever\_rate | int | true | leverage |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | latest trade price |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by adl(Pushed every 5 seconds, not updated in real time) | 1、2、3、4、5 |
| DATA\_END |  | false |  |  |

Notes:  
A regular push of position is performed every 5 sedconds.The event field of the reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be skipped.  
When switching leverage with no positions, the event "switch\_lever\_rate" will not be pushed by the position topic.  
In the one-way position mode: only push the data of contract which with the position (that is, only push the data of the one-way non-empty position), if there is no position, it will not be pushed

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"positions\_cross.BTC-USDT"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"positions\_cross.BTC-USDT"

"ts":

1670903745088

"err-code":

0

}

#### Example of a Data Update

{

"op":

"notify"

"topic":

"positions\_cross.btc-usdt"

"ts":

1639107468139

"event":

"order.match"

"data":\[

0:{

"contract\_type":

"swap"

"pair":

"BTC-USDT"

"business\_type":

"swap"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"volume":

1

"available":

1

"frozen":

0

"cost\_open":

48284.9

"cost\_hold":

48284.9

"profit\_unreal":

\-0.0001

"profit\_rate":

\-0.000010355204214985

"profit":

\-0.0001

"margin\_asset":

"USDT"

"position\_margin":

9.65696

"lever\_rate":

5

"direction":

"buy"

"last\_price":

48284.8

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"position\_mode":

"dual\_side"

"adl\_risk\_percent":

"3"

}

\]

"uid":

"123456789"

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"positions\_cross.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}