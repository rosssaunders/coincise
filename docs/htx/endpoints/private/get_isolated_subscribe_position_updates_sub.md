# GET [Isolated] Subscribe Position Updates(sub)

**Source:** [[Isolated] Subscribe Position Updates(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7de1c-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### positions.$contract\_code (\[Isolated\] Subscribe Position Updates(sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: This interface only supports isolated margin mode.

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
| positions.\* | positions.\* | Allowed |
| positions.contract\_code1 | positions.\* | Allowed |
| positions.contract\_code1 | positions.contract\_code1 | Allowed |
| positions.contract\_code1 | positions.contract\_code1 | Not Allowed |
| positions.\* | positions.symbol1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "\*" all(it means to subscribe the all positions) "BTC-USDT"... |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | Required;Operator Name ; |  |
| topic | string | false | Required; topic |  |
| uid | string | false | account uid |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| event | string | false | Related events of position change notification | notification on account asset change such as commit order(order.open), fulfill order(order.match)(excluding liquidated order and settled orders), settlement and delivery(settlement), fulfill liquidation order(order.liquidation)(including voluntarily fulfilled liquidation order and the fulfilled liquidation order taken over by system ) , cancel order(order.cancel), asset transfer（contract.transfer) (ncluding transfer with exchange accounts, transfer between main account and sub-account, and tranfer between different margin accounts.), system (contract.system), other asset change(other), switch leverage(switch\_lever\_rate), initial margin(init), ADL trade |
| DATA\_START | array object | false |  |  |
| symbol | string | false | Coin. "BTC","ETH"... |  |
| contract\_code | string | false | Contract Code |  |
| volume | decimal | false | Open Interest |  |
| available | decimal | false | Positions available to close |  |
| frozen | decimal | false | Frozen Margin |  |
| cost\_open | decimal | false | Open price |  |
| cost\_hold | decimal | false | Position Price |  |
| profit\_unreal | decimal | false | Unrealized Profits&Losses |  |
| profit\_rate | decimal | false | Profit/Losses Ratio |  |
| profit | decimal | false | Profits/Losses |  |
| position\_margin | decimal | false | Position Margin |  |
| lever\_rate | int | false | Leverage |  |
| direction | string | false | transaction direction of positions "buy":long "sell":short |  |
| last\_price | decimal | false | Last Price |  |
| margin\_asset | string | false | Margin Asset |  |
| margin\_mode | string | false | margin mode isolated : "isolated" |  |
| margin\_account | string | false | margin account "BTC-USDT"... |  |
| position\_mode | string | false | position mode single\_side，dual\_side |  |
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

"positions.BTC-USDT"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"positions.BTC-USDT"

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

"positions"

"ts":

1603711371803

"event":

"snapshot"

"data":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"volume":

1

"available":

0

"frozen":

1

"cost\_open":

13059.8

"cost\_hold":

13059.8

"profit\_unreal":

\-0.0705

"profit\_rate":

\-0.05398244996094886

"profit":

\-0.0705

"position\_margin":

1.31303

"lever\_rate":

10

"direction":

"sell"

"last\_price":

13130.3

"margin\_asset":

"USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

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

"positions.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}