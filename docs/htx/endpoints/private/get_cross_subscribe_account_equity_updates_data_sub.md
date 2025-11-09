# GET [Cross] Subscribe Account Equity Updates Data（sub）

**Source:** [[Cross] Subscribe Account Equity Updates Data（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7dcca-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### accounts\_cross.$margin\_account (\[Cross\] Subscribe Account Equity Updates Data（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode.

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
| accounts\_cross.\* | accounts\_cross.\* | accounts\_cross.margin\_account1 |
| accounts\_cross.margin\_account1 | accounts\_cross.\* | accounts\_cross.margin\_account1 |
| accounts\_cross.margin\_account1 | accounts\_cross.margin\_account1 | accounts\_cross.margin\_account1 |
| accounts\_cross.margin\_account1 | accounts\_cross.margin\_account1 | Not Allowed |
| accounts\_cross.\* | accounts\_cross.margin\_account1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | true | margin account | "USDT"... |  |
| cid | string | false | Current request's ID |  |  |

Notes:  
A regular push of account is performed every 5 sedconds.The event field of the reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be skipped.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | operaton name, fixed as notify; |  |
| topic | string | true | topic |  |
| ts | long | true | server response timestamp |  |
| uid | string | true | uid |  |
| event | string | true | event of margin account update | order.open 、order.match 、settlement、order.liquidation、order.cancel 、contract.transfer、ontract.system、other 、init、napshot 、ADL trade |
| DATA\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| margin\_static | decimal | true | static margin |  |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| profit\_real | decimal | true | realized profits and losses |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| withdraw\_available | decimal | true | available transfer amount |  |
| risk\_rate | decimal | true | margin rate |  |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| CONTRACT\_DETAIL\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| lever\_rate | decimal | true | lever rate |  |
| adjust\_factor | decimal | true | adjustment factor |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| CONTRACT\_DETAIL\_END |  | false |  |  |
| FUTURES\_CONTRACT\_DETAIL\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | future: "BTC-USDT-210625" ... |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| lever\_rate | decimal | true | lever rate |  |
| adjust\_factor | decimal | true | adjustment factor |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| FUTURES\_CONTRACT\_DETAIL\_END |  | false |  |  |

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"accounts\_cross.USDT"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"accounts\_cross.USDT"

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

"accounts\_cross"

"ts":

1640756528985

"event":

"snapshot"

"data":\[

0:{

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"margin\_asset":

"USDT"

"margin\_balance":

20.603401615553835

"margin\_static":

20.475701615553835

"margin\_position":

19.30352

"margin\_frozen":

0

"profit\_real":

\-0.01911684

"profit\_unreal":

0.1277

"withdraw\_available":

1.1721816155538354

"risk\_rate":

25.68347743773394

"position\_mode":

"dual\_side"

"contract\_detail":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"margin\_position":

9.55638

"margin\_frozen":

0

"margin\_available":

1.2998816155538353

"profit\_unreal":

\-0.0102

"liquidation\_price":

27790.709661740086

"lever\_rate":

5

"adjust\_factor":

0.04

"contract\_type":

"swap"

"pair":

"BTC-USDT"

"business\_type":

"swap"

}

\]

"futures\_contract\_detail":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-220325"

"margin\_position":

9.74714

"margin\_frozen":

0

"margin\_available":

1.2998816155538353

"profit\_unreal":

0.1379

"liquidation\_price":

28744.509661740085

"lever\_rate":

5

"adjust\_factor":

0.04

"contract\_type":

"quarter"

"pair":

"BTC-USDT"

"business\_type":

"futures"

}

\]

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

"accounts\_cross.USDT"

"cid":

"40sG903yz80oDFWr"

}