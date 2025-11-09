# GET Subscribe Position Updates(sub)

**Source:** [Subscribe Position Updates(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=5d5156b5-77b6-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### positions.$contract\_code (Subscribe Position Updates(sub))

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required;Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; Client requests unique ID |
| topic | string | Subscribe topic name，Require subscribe public.$contract\_code.funding\_rate Subscribe/unsubscribe the data of a given contract code; when the $contract\_code value is \*, it stands for subscribing/unsubscribing all the funding rates of contract codes，; |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| public.\*.funding\_rate | public.\*.funding\_rate | allowd |
| public.contract\_code1.funding\_rate | public.\*.funding\_rate | allowd |
| public.contract\_code1.funding\_rate | public.contract\_code1.funding\_rate | allowd |
| public.contract\_code1.funding\_rate | public.contract\_code2.funding\_rate | not allowed |
| public.\*.funding\_rate | public.contract\_code1.funding\_rate | not allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| op | string | false | Required；Operator Name，Subscribe value is sub |  |  |
| cid | string | false | Optional ; Client requests unique ID |  |  |
| topic | string | false | Required； Subscribe Topic, Subscribe (positions.$contract\_code) Required Subscribe/unsubscribe the position data of a single coin, when the $contract\_code value is \*, it stands for subscribing the data of all coins. contract\_code is case-insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | Required;Operator Name ; |  |
| topic | string | false | Required; topic |  |
| uid | string | false | account uid |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| event | string | false | Related events of position change notification | notification on account asset change such as commit order(order.open), fulfill order(order.match)(excluding liquidated order and settled orders), settlement and delivery(settlement), fulfill liquidation order(order.liquidation)(including voluntarily fulfilled liquidation order and the fulfilled liquidation order taken over by system ) , cancel order(order.cancel), asset transfer（contract.transfer) (ncluding transfer with exchange accounts, transfer between main account and sub-account, and tranfer between different margin accounts.), system (contract.system), other asset change(other), switch leverage(switch\_lever\_rate), initial margin(init), ADL trade |
| DATA\_START | 1 | false |  |  |
| symbol | string | false | symbol e.g:"BTC","ETH"... |  |
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
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by adl(Pushed every 5 seconds, not updated in real time) | 1、2、3、4、5 |
| DATA\_END |  | false |  |  |

Notes:  
A regular push of position is performed every 5 sedconds.The event field of the reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be skipped.  
When switching leverage with no positions, the event "switch\_lever\_rate" will not be pushed by the position topic.

#### Subscription Example

{

"op":

"sub"

"topic":

"public.btc-usd.contract\_info"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"positions.BTC-USD"

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

"positions.theta-usd"

"ts":

1603878749908

"event":

"order.match"

"data":\[

0:{

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"volume":

1

"available":

1

"frozen":

0

"cost\_open":

0.63191

"cost\_hold":

0.63191

"profit\_unreal":

\-0.00250392214928847

"profit\_rate":

\-0.00316450689071376

"profit":

\-0.00250392214928847

"position\_margin":

0.7911267226784386

"lever\_rate":

20

"direction":

"sell"

"last\_price":

0.63201

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

"positions.BTC-USD"

"cid":

"40sG903yz80oDFWr"

}