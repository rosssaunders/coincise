# GET [Isolated] Subscribe Account Equity Updates Data(sub)

**Source:**
[[Isolated] Subscribe Account Equity Updates Data(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7dbbb-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### accounts.$contract_code (\[Isolated\] Subscribe Account Equity Updates Data(sub))

Signature verification: No

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY
Verification: Each UID can build at most create 30 WS connections for private
order push at the same time. For each account, contracts of the same underlying
coin only need to subscribe one WS order push, e.g. users only need to create
one WS order push connection for BTC Contract which will automatically push
orders of BTC-USDT contracts. Please note that the rate limit of WS order push
and RESTFUL private interface are separated from each other, with no relations.

Interface description: This interface only supports isolated margin mode.

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

| Subscribe(sub)          | Unsubscribe( unsub )    | Rule        |
| ----------------------- | ----------------------- | ----------- |
| accounts.\*             | accounts.\*             | Allowed     |
| accounts.contract_code1 | accounts.\*             | Allowed     |
| accounts.contract_code1 | accounts.contract_code1 | Allowed     |
| accounts.contract_code1 | accounts.contract_code1 | Not Allowed |
| accounts.\*             | accounts.contract_code1 | Not Allowed |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description          | Value Range | Default Value                                                                  |
| ------------- | --------- | -------- | -------------------- | ----------- | ------------------------------------------------------------------------------ |
| contract_code | string    | true     | contract code        |             | "\*" all(it means to subscribe the balance change of all coins), "BTC-USDT"... |
| cid           | string    | false    | Current request's ID |             |                                                                                |

Notes:  
A regular push of account is performed every 5 sedconds.The event field of the
reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be
skipped.

#### Data Update

| Parameter          | Data Type    | Required | Description                                               | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | ------------ | -------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op                 | string       | false    | Operator Name，Subscribe value is sub                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| topic              | string       | true     | Subscribe Topic Name                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| uid                | long         | true     | account uid                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ts                 | string       | true     | Time of Respond Generation, Unit: Millisecond             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| event              | string       | true     | Related events of position change notification            | notification on account asset change such as commit order(order.open), fulfill order(order.match)(excluding liquidated order and settled orders), settlement and delivery(settlement), fulfill liquidation order(order.liquidation)(including voluntarily fulfilled liquidation order and the fulfilled liquidation order taken over by system ) , cancel order(order.cancel), asset transfer（contract.transfer) (ncluding transfer with exchange accounts, transfer between main account and sub-account, and tranfer between different margin accounts.), system (contract.system), other asset change(other), switch leverage(switch_lever_rate), initial margin(init), ADL trade |
| DATA_START         | object array | true     |                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| symbol             | string       | true     | Coins. "BTC","ETH"...                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| contract_code      | string       | true     | Contract Code                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_asset       | string       | true     | margin asset                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_balance     | decimal      | true     | Account Equity                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_static      | decimal      | true     | Static Equity                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_position    | decimal      | true     | Position Margi(the margin for holding currenty positions) |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_frozen      | decimal      | true     | Frozen Margin                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_available   | decimal      | true     | Available Margin                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| profit_real        | decimal      | true     | Realized Profits&Losses                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| profit_unreal      | decimal      | true     | Unrealized Profits&Losses                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| risk_rate          | decimal      | true     | Margin Ratio                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| liquidation_price  | decimal      | true     | Liquidation Price                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| withdraw_available | decimal      | true     | Assets available to withdraw                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| lever_rate         | int          | true     | Leverage                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| adjust_factor      | decimal      | true     | Adjustment Factor                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_mode        | string       | true     | margin mode isolated : "isolated"                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_account     | string       | true     | margin account "BTC-USDT"...                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| position_mode      | string       | true     | position mode single_side，dual_side                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| DATA_END           |              | false    |                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

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

"contract_code":

"BTC-USDT"

"margin_balance":

79.72434662

"margin_static":

79.79484662

"margin_position":

1.31303

"margin_frozen":

4.0662

"margin_available":

74.34511662

"profit_real":

0.03405608

"profit_unreal":

\-0.0705

"withdraw_available":

74.34511662

"risk_rate":

14.745772976801513

"liquidation_price":

92163.42096277916

"lever_rate":

10

"adjust_factor":

0.075

"margin_asset":

"USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"position_mode":

"dual_side"

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
