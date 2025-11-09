# GET [Cross] Query A Sub-Account's Assets Information

**Source:**
[[Cross] Query A Sub-Account's Assets Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb82663-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_sub_account_info (\[Cross\] Query A Sub-Account's Assets Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter      | Data Type | Required | Description                                              | Value Range                  | Default Value |
| -------------- | --------- | -------- | -------------------------------------------------------- | ---------------------------- | ------------- |
| sub_uid        | long      | true     | sub-account UID                                          |                              |               |
| margin_account | string    | false    | margin account，return all margin account info when null | "USDT"...，but now only USDT |               |

#### Response Parameter

| Parameter                     | Data Type    | Required | Description                                            | Value Range                                       |
| ----------------------------- | ------------ | -------- | ------------------------------------------------------ | ------------------------------------------------- |
| status                        | string       | true     | Request Processing Result                              | "ok" , "error"                                    |
| ts                            | long         | false    | Time of Respond Generation, Unit: Millisecond          |                                                   |
| DATA_START                    | object array | true     |                                                        |                                                   |
| margin_mode                   | string       | true     | margin mode                                            | cross: cross margin mode                          |
| margin_account                | string       | true     | margin account                                         | "USDT"...                                         |
| margin_asset                  | string       | true     | margin asset                                           |                                                   |
| margin_balance                | decimal      | true     | account equity                                         |                                                   |
| margin_static                 | decimal      | true     | static margin                                          |                                                   |
| margin_position               | decimal      | true     | position margin (the margin used by current positions) |                                                   |
| margin_frozen                 | decimal      | true     | frozen margin                                          |                                                   |
| profit_unreal                 | decimal      | true     | unrealized profits and losses                          |                                                   |
| withdraw_available            | decimal      | true     | available transfer amount                              |                                                   |
| risk_rate                     | decimal      | true     | margin rate                                            |                                                   |
| money_in                      | bigdecimal   | true     | money in                                               |                                                   |
| money_out                     | bigdecimal   | true     | money out                                              |                                                   |
| new_risk_rate                 | bigdecimal   | true     | new risk rate                                          |                                                   |
| position_mode                 | string       | true     | position mode                                          | single_side，dual_side                            |
| CONTRACT_DETAIL_START         | object array | true     |                                                        |                                                   |
| symbol                        | string       | true     | symbol                                                 | "BTC","ETH"...                                    |
| contract_code                 | string       | true     | contract code                                          | swap:"BTC-USDT" ...                               |
| margin_position               | decimal      | true     | position margin (the margin used by current positions) |                                                   |
| margin_frozen                 | decimal      | true     | frozen margin                                          |                                                   |
| margin_available              | decimal      | true     | available margin                                       |                                                   |
| profit_unreal                 | decimal      | true     | unrealized profits and losses                          |                                                   |
| liquidation_price             | decimal      | true     | estimated liquidation price                            |                                                   |
| lever_rate                    | decimal      | true     | lever rate                                             |                                                   |
| adjust_factor                 | decimal      | true     | adjustment factor                                      |                                                   |
| contract_type                 | string       | true     | contract type                                          | swap, this_week, next_week, quarter, next_quarter |
| cross_max_available           | bigdecimal   | true     | cross max available                                    |                                                   |
| trade_partition               | string       | true     | trade partition                                        |                                                   |
| pair                          | string       | true     | pair                                                   | such as: “BTC-USDT”                               |
| business_type                 | string       | true     | business type                                          | futures, swap                                     |
| CONTRACT_DETAIL_END           |              | false    |                                                        |                                                   |
| FUTURES_CONTRACT_DETAIL_START | object array | true     |                                                        |                                                   |
| symbol                        | string       | true     | symbol                                                 | "BTC","ETH"...                                    |
| contract_code                 | string       | true     | contract code                                          | future:"BTC-USDT-211231" ...                      |
| margin_position               | decimal      | true     | position margin (the margin used by current positions) |                                                   |
| margin_frozen                 | decimal      | true     | frozen margin                                          |                                                   |
| margin_available              | decimal      | true     | available margin                                       |                                                   |
| profit_unreal                 | decimal      | true     | unrealized profits and losses                          |                                                   |
| liquidation_price             | decimal      | true     | estimated liquidation price                            |                                                   |
| lever_rate                    | decimal      | true     | lever rate                                             |                                                   |
| adjust_factor                 | decimal      | true     | adjustment factor                                      |                                                   |
| contract_type                 | string       | true     | contract type                                          | swap, this_week, next_week, quarter, next_quarter |
| cross_max_available           | bigdecimal   | true     | cross max available                                    |                                                   |
| trade_partition               | string       | true     | trade partition                                        |                                                   |
| pair                          | string       | true     | pair                                                   | such as: “BTC-USDT”                               |
| business_type                 | string       | true     | business type                                          | futures, swap                                     |
| FUTURES_CONTRACT_DETAIL_END   |              | false    |                                                        |                                                   |
| DATA_END                      |              | false    |                                                        |                                                   |

Notes:  
Only query account information for activated contract sub-account (i.e.
sub-accounts that have gained contract trading permission);  
No data return for sub-accounts which has logged in hbdm but have not gained
trading permission/activated.

#### Request example

{

"sub_uid":

123456

"margin_account":

"USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"futures_contract_detail":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211217"

"margin_position":

0

"margin_frozen":

0

"margin_available":

500

"profit_unreal":

0

"liquidation_price":

NULL

"lever_rate":

5

"adjust_factor":

0.04

"contract_type":

"next_week"

"cross_max_available":

""

"trade_partition":

""

"pair":

"BTC-USDT"

"business_type":

"futures"

}

1:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"margin_position":

0

"margin_frozen":

0

"margin_available":

500

"profit_unreal":

0

"liquidation_price":

NULL

"lever_rate":

5

"adjust_factor":

0.04

"contract_type":

"this_week"

"trade_partition":

""

"pair":

"BTC-USDT"

"business_type":

"futures"

}

2:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211231"

"margin_position":

0

"margin_frozen":

0

"margin_available":

500

"profit_unreal":

0

"liquidation_price":

NULL

"lever_rate":

5

"adjust_factor":

0.04

"contract_type":

"quarter"

"cross_max_available":

""

"trade_partition":

""

"pair":

"BTC-USDT"

"business_type":

"futures"

}

\]

"margin_mode":

"cross"

"margin_account":

"USDT"

"margin_asset":

"USDT"

"margin_balance":

500

"margin_static":

500

"margin_position":

0

"margin_frozen":

0

"profit_real":

0

"profit_unreal":

0

"withdraw_available":

500

"risk_rate":

NULL

"money_in":

""

"money_out":

""

"new_risk_rate":

""

"position_mode":

"dual_side"

"contract_detail":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_position":

0

"margin_frozen":

0

"margin_available":

500

"profit_unreal":

0

"liquidation_price":

NULL

"lever_rate":

5

"adjust_factor":

0.04

"contract_type":

"swap"

"cross_max_available":

""

"trade_partition":

""

"pair":

"BTC-USDT"

"business_type":

"swap"

}

\]

}

\]

"ts":

1638759191747

}
