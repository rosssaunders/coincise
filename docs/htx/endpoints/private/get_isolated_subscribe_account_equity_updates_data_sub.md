# GET [Isolated] Subscribe Account Equity Updates Data(sub)

**Source:** [[Isolated] Subscribe Account Equity Updates Data(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7dbbb-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### accounts.$contract\_code (\[Isolated\] Subscribe Account Equity Updates Data(sub))

Signature verification: No

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
| accounts.\* | accounts.\* | Allowed |
| accounts.contract\_code1 | accounts.\* | Allowed |
| accounts.contract\_code1 | accounts.contract\_code1 | Allowed |
| accounts.contract\_code1 | accounts.contract\_code1 | Not Allowed |
| accounts.\* | accounts.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code |  | "\*" all(it means to subscribe the balance change of all coins), "BTC-USDT"... |
| cid | string | false | Current request's ID |  |  |

Notes:  
A regular push of account is performed every 5 sedconds.The event field of the reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be skipped.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | Operator Name，Subscribe value is sub |  |
| topic | string | true | Subscribe Topic Name |  |
| uid | long | true | account uid |  |
| ts | string | true | Time of Respond Generation, Unit: Millisecond |  |
| event | string | true | Related events of position change notification | notification on account asset change such as commit order(order.open), fulfill order(order.match)(excluding liquidated order and settled orders), settlement and delivery(settlement), fulfill liquidation order(order.liquidation)(including voluntarily fulfilled liquidation order and the fulfilled liquidation order taken over by system ) , cancel order(order.cancel), asset transfer（contract.transfer) (ncluding transfer with exchange accounts, transfer between main account and sub-account, and tranfer between different margin accounts.), system (contract.system), other asset change(other), switch leverage(switch\_lever\_rate), initial margin(init), ADL trade |
| DATA\_START | object array | true |  |  |
| symbol | string | true | Coins. "BTC","ETH"... |  |
| contract\_code | string | true | Contract Code |  |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | Account Equity |  |
| margin\_static | decimal | true | Static Equity |  |
| margin\_position | decimal | true | Position Margi(the margin for holding currenty positions) |  |
| margin\_frozen | decimal | true | Frozen Margin |  |
| margin\_available | decimal | true | Available Margin |  |
| profit\_real | decimal | true | Realized Profits&Losses |  |
| profit\_unreal | decimal | true | Unrealized Profits&Losses |  |
| risk\_rate | decimal | true | Margin Ratio |  |
| liquidation\_price | decimal | true | Liquidation Price |  |
| withdraw\_available | decimal | true | Assets available to withdraw |  |
| lever\_rate | int | true | Leverage |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| margin\_mode | string | true | margin mode isolated : "isolated" |  |
| margin\_account | string | true | margin account "BTC-USDT"... |  |
| position\_mode | string | true | position mode single\_side，dual\_side |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"accounts.BTC-USDT"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"accounts.BTC-USDT"

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

"accounts.btc-usdt"

"ts":

1603711370689

"event":

"order.open"

"data":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"margin\_balance":

79.72434662

"margin\_static":

79.79484662

"margin\_position":

1.31303

"margin\_frozen":

4.0662

"margin\_available":

74.34511662

"profit\_real":

0.03405608

"profit\_unreal":

\-0.0705

"withdraw\_available":

74.34511662

"risk\_rate":

14.745772976801513

"liquidation\_price":

92163.42096277916

"lever\_rate":

10

"adjust\_factor":

0.075

"margin\_asset":

"USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"position\_mode":

"dual\_side"

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

"accounts.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}