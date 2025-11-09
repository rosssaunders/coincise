# GET [Cross] Subscribe Position Updates（sub）

**Source:**
[[Cross] Subscribe Position Updates（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7df0f-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### positions_cross.$contract_code (\[Cross\] Subscribe Position Updates（sub）)

Signature verification: No

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY
Verification: Each UID can build at most create 30 WS connections for private
order push at the same time. For each account, contracts of the same underlying
coin only need to subscribe one WS order push, e.g. users only need to create
one WS order push connection for BTC Contract which will automatically push
orders of BTC-USDT contracts. Please note that the rate limit of WS order push
and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625.

#### Subscription Address

| Environment                         | Address                                     |
| ----------------------------------- | ------------------------------------------- |
| Online                              | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                 |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required； Operator Name，value for unsubscribe is unsub;                                                                   |
| cid        | string | Optional; ID Client requests unique ID                                                                                      |
| topic      | string | Required；Unsubscribe Topic Name, format: orders.$contract_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub)                 | Unsubscribe( unsub )           | Rule        |
| ------------------------------ | ------------------------------ | ----------- |
| positions_cross.\*             | positions_cross.\*             | Allowed     |
| positions_cross.contract_code1 | positions_cross.\*             | Allowed     |
| positions_cross.contract_code1 | positions_cross.contract_code1 | Allowed     |
| positions_cross.contract_code1 | positions_cross.contract_code1 | Not Allowed |
| positions_cross.\*             | positions_cross.contract_code1 | Not Allowed |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description          | Value Range                                                                   | Default Value |
| ------------- | --------- | -------- | -------------------- | ----------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code        | all: \*(swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| cid           | string    | false    | Current request's ID |                                                                               |               |

#### Data Update

| Parameter        | Data Type    | Required | Description                                                                                                                         | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op               | string       | false    | operaton name, fixed as notify;                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| topic            | string       | true     | topic                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ts               | long         | true     | server response timestamp                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| uid              | string       | true     | uid                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| event            | string       | true     | Related events of position change notification                                                                                      | notification on account asset change such as commit order(order.open), fulfill order(order.match)(excluding liquidated order and settled orders), settlement and delivery(settlement), fulfill liquidation order(order.liquidation)(including voluntarily fulfilled liquidation order and the fulfilled liquidation order taken over by system ) , cancel order(order.cancel), asset transfer（contract.transfer) (ncluding transfer with exchange accounts, transfer between main account and sub-account, and tranfer between different margin accounts.), system (contract.system), other asset change(other), switch leverage(switch_lever_rate), initial margin(init), ADL trade |
| DATA_START       | object array | true     |                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| symbol           | string       | true     | symbol                                                                                                                              | "BTC","ETH"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| contract_code    | string       | true     | contract code                                                                                                                       | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| margin_mode      | string       | true     | margin mode                                                                                                                         | cross: cross margin mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| margin_account   | string       | true     | margin account                                                                                                                      | "USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| volume           | decimal      | true     | position quantity                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| available        | decimal      | true     | positions available to close                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| frozen           | decimal      | true     | positions frozen                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| cost_open        | decimal      | true     | opening average price                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| cost_hold        | decimal      | true     | average price of position                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| profit_unreal    | decimal      | true     | unrealized profits and losses                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| profit_rate      | decimal      | true     | profit rate                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| profit           | decimal      | true     | profit                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_asset     | string       | true     | margin asset                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| position_margin  | decimal      | true     | position margin                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| lever_rate       | int          | true     | leverage                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| direction        | string       | true     | transaction direction of positions                                                                                                  | "buy":long "sell":short                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| last_price       | decimal      | true     | latest trade price                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| contract_type    | string       | true     | contract type                                                                                                                       | swap, this_week, next_week, quarter, next_quarter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| pair             | string       | true     | pair                                                                                                                                | such as: “BTC-USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| business_type    | string       | true     | business type                                                                                                                       | futures, swap                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| position_mode    | string       | true     | position mode                                                                                                                       | single_side，dual_side                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| adl_risk_percent | decimal      | false    | The risk level of the current position being forced to reduce the position by adl(Pushed every 5 seconds, not updated in real time) | 1、2、3、4、5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| DATA_END         |              | false    |                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

Notes:  
A regular push of position is performed every 5 sedconds.The event field of the
reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be
skipped.  
When switching leverage with no positions, the event "switch_lever_rate" will
not be pushed by the position topic.  
In the one-way position mode: only push the data of contract which with the
position (that is, only push the data of the one-way non-empty position), if
there is no position, it will not be pushed

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"positions_cross.BTC-USDT"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"positions_cross.BTC-USDT"

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

"positions_cross.btc-usdt"

"ts":

1639107468139

"event":

"order.match"

"data":\[

0:{

"contract_type":

"swap"

"pair":

"BTC-USDT"

"business_type":

"swap"

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"volume":

1

"available":

1

"frozen":

0

"cost_open":

48284.9

"cost_hold":

48284.9

"profit_unreal":

\-0.0001

"profit_rate":

\-0.000010355204214985

"profit":

\-0.0001

"margin_asset":

"USDT"

"position_margin":

9.65696

"lever_rate":

5

"direction":

"buy"

"last_price":

48284.8

"margin_mode":

"cross"

"margin_account":

"USDT"

"position_mode":

"dual_side"

"adl_risk_percent":

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

"positions_cross.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}
