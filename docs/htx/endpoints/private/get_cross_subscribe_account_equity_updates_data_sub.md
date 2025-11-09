# GET [Cross] Subscribe Account Equity Updates Data（sub）

**Source:**
[[Cross] Subscribe Account Equity Updates Data（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7dcca-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### accounts_cross.$margin_account (\[Cross\] Subscribe Account Equity Updates Data（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY
Verification: Each UID can build at most create 30 WS connections for private
order push at the same time. For each account, contracts of the same underlying
coin only need to subscribe one WS order push, e.g. users only need to create
one WS order push connection for BTC Contract which will automatically push
orders of BTC-USDT contracts. Please note that the rate limit of WS order push
and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode.

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

| Subscribe(sub)                 | Unsubscribe( unsub )           | Rule                           |
| ------------------------------ | ------------------------------ | ------------------------------ |
| accounts_cross.\*              | accounts_cross.\*              | accounts_cross.margin_account1 |
| accounts_cross.margin_account1 | accounts_cross.\*              | accounts_cross.margin_account1 |
| accounts_cross.margin_account1 | accounts_cross.margin_account1 | accounts_cross.margin_account1 |
| accounts_cross.margin_account1 | accounts_cross.margin_account1 | Not Allowed                    |
| accounts_cross.\*              | accounts_cross.margin_account1 | Not Allowed                    |

#### Subscription Parameter

| Parameter      | Data Type | Required | Description          | Value Range | Default Value |
| -------------- | --------- | -------- | -------------------- | ----------- | ------------- |
| margin_account | string    | true     | margin account       | "USDT"...   |               |
| cid            | string    | false    | Current request's ID |             |               |

Notes:  
A regular push of account is performed every 5 sedconds.The event field of the
reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be
skipped.

#### Data Update

| Parameter                     | Data Type    | Required | Description                                            | Value Range                                                                                                                                   |
| ----------------------------- | ------------ | -------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| op                            | string       | false    | operaton name, fixed as notify;                        |                                                                                                                                               |
| topic                         | string       | true     | topic                                                  |                                                                                                                                               |
| ts                            | long         | true     | server response timestamp                              |                                                                                                                                               |
| uid                           | string       | true     | uid                                                    |                                                                                                                                               |
| event                         | string       | true     | event of margin account update                         | order.open 、order.match 、settlement、order.liquidation、order.cancel 、contract.transfer、ontract.system、other 、init、napshot 、ADL trade |
| DATA_START                    | object array | true     |                                                        |                                                                                                                                               |
| margin_mode                   | string       | true     | margin mode                                            | cross: cross margin mode                                                                                                                      |
| margin_account                | string       | true     | margin account                                         | "USDT"...                                                                                                                                     |
| margin_asset                  | string       | true     | margin asset                                           |                                                                                                                                               |
| margin_balance                | decimal      | true     | account equity                                         |                                                                                                                                               |
| margin_static                 | decimal      | true     | static margin                                          |                                                                                                                                               |
| margin_position               | decimal      | true     | position margin (the margin used by current positions) |                                                                                                                                               |
| margin_frozen                 | decimal      | true     | frozen margin                                          |                                                                                                                                               |
| profit_real                   | decimal      | true     | realized profits and losses                            |                                                                                                                                               |
| profit_unreal                 | decimal      | true     | unrealized profits and losses                          |                                                                                                                                               |
| withdraw_available            | decimal      | true     | available transfer amount                              |                                                                                                                                               |
| risk_rate                     | decimal      | true     | margin rate                                            |                                                                                                                                               |
| position_mode                 | string       | true     | position mode                                          | single_side，dual_side                                                                                                                        |
| CONTRACT_DETAIL_START         | object array | true     |                                                        |                                                                                                                                               |
| symbol                        | string       | true     | symbol                                                 | "BTC","ETH"...                                                                                                                                |
| contract_code                 | string       | true     | contract code                                          | swap: "BTC-USDT"...                                                                                                                           |
| margin_position               | decimal      | true     | position margin (the margin used by current positions) |                                                                                                                                               |
| margin_frozen                 | decimal      | true     | frozen margin                                          |                                                                                                                                               |
| margin_available              | decimal      | true     | available margin                                       |                                                                                                                                               |
| profit_unreal                 | decimal      | true     | unrealized profits and losses                          |                                                                                                                                               |
| liquidation_price             | decimal      | true     | estimated liquidation price                            |                                                                                                                                               |
| lever_rate                    | decimal      | true     | lever rate                                             |                                                                                                                                               |
| adjust_factor                 | decimal      | true     | adjustment factor                                      |                                                                                                                                               |
| contract_type                 | string       | true     | contract type                                          | swap, this_week, next_week, quarter, next_quarter                                                                                             |
| pair                          | string       | true     | pair                                                   | such as: “BTC-USDT”                                                                                                                           |
| business_type                 | string       | true     | business type                                          | futures, swap                                                                                                                                 |
| CONTRACT_DETAIL_END           |              | false    |                                                        |                                                                                                                                               |
| FUTURES_CONTRACT_DETAIL_START | object array | true     |                                                        |                                                                                                                                               |
| symbol                        | string       | true     | symbol                                                 | "BTC","ETH"...                                                                                                                                |
| contract_code                 | string       | true     | contract code                                          | future: "BTC-USDT-210625" ...                                                                                                                 |
| margin_position               | decimal      | true     | position margin (the margin used by current positions) |                                                                                                                                               |
| margin_frozen                 | decimal      | true     | frozen margin                                          |                                                                                                                                               |
| margin_available              | decimal      | true     | available margin                                       |                                                                                                                                               |
| profit_unreal                 | decimal      | true     | unrealized profits and losses                          |                                                                                                                                               |
| liquidation_price             | decimal      | true     | estimated liquidation price                            |                                                                                                                                               |
| lever_rate                    | decimal      | true     | lever rate                                             |                                                                                                                                               |
| adjust_factor                 | decimal      | true     | adjustment factor                                      |                                                                                                                                               |
| contract_type                 | string       | true     | contract type                                          | swap, this_week, next_week, quarter, next_quarter                                                                                             |
| pair                          | string       | true     | pair                                                   | such as: “BTC-USDT”                                                                                                                           |
| business_type                 | string       | true     | business type                                          | futures, swap                                                                                                                                 |
| FUTURES_CONTRACT_DETAIL_END   |              | false    |                                                        |                                                                                                                                               |

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"accounts_cross.USDT"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"accounts_cross.USDT"

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

"accounts_cross"

"ts":

1640756528985

"event":

"snapshot"

"data":\[

0:{

"margin_mode":

"cross"

"margin_account":

"USDT"

"margin_asset":

"USDT"

"margin_balance":

20.603401615553835

"margin_static":

20.475701615553835

"margin_position":

19.30352

"margin_frozen":

0

"profit_real":

\-0.01911684

"profit_unreal":

0.1277

"withdraw_available":

1.1721816155538354

"risk_rate":

25.68347743773394

"position_mode":

"dual_side"

"contract_detail":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_position":

9.55638

"margin_frozen":

0

"margin_available":

1.2998816155538353

"profit_unreal":

\-0.0102

"liquidation_price":

27790.709661740086

"lever_rate":

5

"adjust_factor":

0.04

"contract_type":

"swap"

"pair":

"BTC-USDT"

"business_type":

"swap"

}

\]

"futures_contract_detail":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-220325"

"margin_position":

9.74714

"margin_frozen":

0

"margin_available":

1.2998816155538353

"profit_unreal":

0.1379

"liquidation_price":

28744.509661740085

"lever_rate":

5

"adjust_factor":

0.04

"contract_type":

"quarter"

"pair":

"BTC-USDT"

"business_type":

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

"accounts_cross.USDT"

"cid":

"40sG903yz80oDFWr"

}
