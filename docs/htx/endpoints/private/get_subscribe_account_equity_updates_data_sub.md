# GET Subscribe Account Equity Updates Data(sub)

**Source:** [Subscribe Account Equity Updates Data(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=5d515563-77b6-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### accounts.$contract\_code (Subscribe Account Equity Updates Data(sub))

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
| topic | string | false | Required； Subscribe Topic Name，Required subscribe accounts.$contract\_code Subscribe/unsubscribe the balance change of a given coin，when the value of $contract\_code is “\*”, it means to subscribe/unsubscribe the balance change of all coins; contract\_code is case-insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |

Notes:  
A regular push of account is performed every 5 sedconds.The event field of the reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be skipped.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| op | string | false | Operator Name，Subscribe value is sub |  |
| topic | string | false | Subscribe Topic Name |  |
| uid | string | false | account uid |  |
| event | string | false | Related events of position change notification | notification on account asset change such as commit order(order.open), fulfill order(order.match)(excluding liquidated order and settled orders), settlement and delivery(settlement), fulfill liquidation order(order.liquidation)(including voluntarily fulfilled liquidation order and the fulfilled liquidation order taken over by system ) , cancel order(order.cancel), asset transfer（contract.transfer) (ncluding transfer with exchange accounts, transfer between main account and sub-account, and tranfer between different margin accounts.), system (contract.system), other asset change(other), switch leverage(switch\_lever\_rate), initial margin(init), ADL trade |
| DATA\_START | 1 | false |  |  |
| symbol | string | false | symbol e.g: "BTC","ETH"... |  |
| contract\_code | string | false | Contract Code |  |
| margin\_balance | decimal | false | Account Equity |  |
| margin\_static | decimal | false | Static Equity |  |
| margin\_position | decimal | false | Position Margi(the margin for holding currenty positions) |  |
| margin\_frozen | decimal | false | Frozen Margin |  |
| margin\_available | decimal | false | Available Margin |  |
| profit\_real | decimal | false | Realized Profits&Losses |  |
| profit\_unreal | decimal | false | Unrealized Profits&Losses |  |
| risk\_rate | decimal | false | Margin Ratio |  |
| liquidation\_price | decimal | false | Liquidation Price |  |
| withdraw\_available | decimal | false | Assets available to withdraw |  |
| lever\_rate | int | false | Leverage |  |
| adjust\_factor | decimal | false | Adjustment Factor |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

`curl "https://api.hbdm.com/api/v1/timestamp"`

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"accounts.BTC-USD"

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

"accounts.theta-usd"

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

"margin\_balance":

621.1875601514919

"margin\_static":

621.8795317806124

"margin\_position":

15.822534453568773

"margin\_frozen":

0.8333333333333334

"margin\_available":

604.5316923645898

"profit\_real":

\-0.00791251918785903

"profit\_unreal":

\-0.6919716291205039

"withdraw\_available":

604.5316923645898

"risk\_rate":

36.895418533520264

"liquidation\_price":

0.21045421215080073

"lever\_rate":

20

"adjust\_factor":

0.4

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

"accounts.BTC-USD"

"cid":

"40sG903yz80oDFWr"

}