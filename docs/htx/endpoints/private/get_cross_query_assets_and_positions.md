# GET [Cross] Query Assets And Positions

**Source:**
[[Cross] Query Assets And Positions](https://www.htx.com/en-us/opend/newApiPages/?id=8cb81e77-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_account_position_info (\[Cross\] Query Assets And Positions)

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

| Parameter      | Data Type | Required | Description    | Value Range                  | Default Value |
| -------------- | --------- | -------- | -------------- | ---------------------------- | ------------- |
| margin_account | string    | true     | margin account | "USDT"...，but now only USDT |               |

#### Response Parameter

| Parameter                     | Data Type    | Required | Description                                                                                      | Value Range                                         |
| ----------------------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| status                        | string       | true     | Request Processing Result                                                                        | "ok" , "error"                                      |
| ts                            | long         | false    | Time of Respond Generation, Unit: Millisecond                                                    |                                                     |
| DATA_START                    | object array | true     |                                                                                                  |                                                     |
| margin_mode                   | string       | true     | margin mode                                                                                      | cross: cross margin mode                            |
| margin_account                | string       | true     | margin account                                                                                   | "USDT"...                                           |
| margin_asset                  | string       | true     | margin asset                                                                                     |                                                     |
| margin_balance                | decimal      | true     | account equity                                                                                   |                                                     |
| margin_static                 | decimal      | true     | static margin                                                                                    |                                                     |
| margin_position               | decimal      | true     | position margin (summary of all contract)                                                        |                                                     |
| margin_frozen                 | decimal      | true     | frozen margin (summary of all contract)                                                          |                                                     |
| profit_unreal                 | decimal      | true     | unrealized profits and losses (summary of all contract)                                          |                                                     |
| withdraw_available            | decimal      | true     | available transfer amount                                                                        |                                                     |
| risk_rate                     | decimal      | true     | margin rate                                                                                      |                                                     |
| money_in                      | bigdecimal   | true     | money in                                                                                         |                                                     |
| money_out                     | bigdecimal   | true     | money out                                                                                        |                                                     |
| new_risk_rate                 | bigdecimal   | true     | new risk rate                                                                                    |                                                     |
| position_mode                 | string       | true     | position mode                                                                                    | single_side，dual_side                              |
| CONTRACT_DETAIL_START         | object array | true     |                                                                                                  |                                                     |
| symbol                        | string       | true     | symbol                                                                                           | "BTC","ETH"...                                      |
| contract_code                 | string       | true     | contract code                                                                                    | swap: "BTC-USDT"...                                 |
| margin_position               | decimal      | true     | position margin (the margin used by current positions)                                           |                                                     |
| margin_frozen                 | decimal      | true     | frozen margin                                                                                    |                                                     |
| margin_available              | decimal      | true     | available margin                                                                                 |                                                     |
| profit_unreal                 | decimal      | true     | unrealized profits and losses                                                                    |                                                     |
| liquidation_price             | decimal      | true     | estimated liquidation price                                                                      |                                                     |
| lever_rate                    | decimal      | true     | lever rate                                                                                       |                                                     |
| adjust_factor                 | decimal      | true     | adjustment factor                                                                                |                                                     |
| contract_type                 | string       | true     | contract type                                                                                    | swap, this_week, next_week, quarter, next_quarter   |
| cross_max_available           | bigdecimal   | true     | cross max available                                                                              |                                                     |
| trade_partition               | string       | true     | trade partition                                                                                  |                                                     |
| pair                          | string       | true     | pair                                                                                             | such as: “BTC-USDT”                                 |
| business_type                 | string       | true     | business type                                                                                    | futures, swap                                       |
| CONTRACT_DETAIL_END           |              | false    |                                                                                                  |                                                     |
| FUTURES_CONTRACT_DETAIL_START | object array | true     |                                                                                                  |                                                     |
| symbol                        | string       | true     | symbol                                                                                           | "BTC","ETH"...                                      |
| contract_code                 | string       | true     | contract code                                                                                    | future: "BTC-USDT-210625" ...                       |
| margin_position               | decimal      | true     | position margin (the margin used by current positions)                                           |                                                     |
| margin_frozen                 | decimal      | true     | frozen margin                                                                                    |                                                     |
| margin_available              | decimal      | true     | available margin                                                                                 |                                                     |
| profit_unreal                 | decimal      | true     | unrealized profits and losses                                                                    |                                                     |
| liquidation_price             | decimal      | true     | estimated liquidation price                                                                      |                                                     |
| lever_rate                    | decimal      | true     | lever rate                                                                                       |                                                     |
| adjust_factor                 | decimal      | true     | adjustment factor                                                                                |                                                     |
| contract_type                 | string       | true     | contract type                                                                                    | swap, this_week, next_week, quarter, next_quarter   |
| cross_max_available           | bigdecimal   | true     | cross max available                                                                              |                                                     |
| trade_partition               | string       | true     | trade partition                                                                                  |                                                     |
| pair                          | string       | true     | pair                                                                                             | such as: “BTC-USDT”                                 |
| business_type                 | string       | true     | business type                                                                                    | futures, swap                                       |
| FUTURES_CONTRACT_DETAIL_END   |              | false    |                                                                                                  |                                                     |
| POSITIONS_START               | object array | true     |                                                                                                  |                                                     |
| symbol                        | string       | true     | symbol                                                                                           | "BTC","ETH"...                                      |
| new_risk_rate                 | bigdecimal   | true     | cross max available                                                                              |                                                     |
| trade_partition               | string       | true     | trade partition                                                                                  |                                                     |
| contract_code                 | string       | true     | contract code                                                                                    | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin_mode                   | string       | true     | margin mode                                                                                      | cross: cross margin mode                            |
| margin_account                | string       | true     | margin account                                                                                   | "USDT"...                                           |
| volume                        | decimal      | true     | position quantity                                                                                |                                                     |
| available                     | decimal      | true     | available position can be closed                                                                 |                                                     |
| frozen                        | decimal      | true     | frozen quantity                                                                                  |                                                     |
| cost_open                     | decimal      | true     | opening average price                                                                            |                                                     |
| cost_hold                     | decimal      | true     | average price of position                                                                        |                                                     |
| profit_unreal                 | decimal      | true     | unrealized profits and losses                                                                    |                                                     |
| profit_rate                   | decimal      | true     | profit rate                                                                                      |                                                     |
| profit                        | decimal      | true     | profit                                                                                           |                                                     |
| margin_asset                  | string       | true     | margin asset                                                                                     |                                                     |
| position_margin               | decimal      | true     | position margin                                                                                  |                                                     |
| lever_rate                    | int          | true     | lever rate                                                                                       |                                                     |
| direction                     | string       | true     | transaction direction of positions                                                               | "buy":long "sell":short                             |
| last_price                    | decimal      | true     | latest price                                                                                     |                                                     |
| contract_type                 | string       | true     | contract type                                                                                    | swap, this_week, next_week, quarter, next_quarter   |
| pair                          | string       | true     | pair                                                                                             | such as: “BTC-USDT”                                 |
| business_type                 | string       | true     | business type                                                                                    | futures, swap                                       |
| position_mode                 | string       | true     | position mode                                                                                    | single_side，dual_side                              |
| POSITIONS_END                 |              | false    |                                                                                                  |                                                     |
| adl_risk_percent              | decimal      | false    | The risk level of the current position being forced to reduce the position by “adl_risk_percent” | 1、2、3、4、5                                       |
| DATA_END                      |              | false    |                                                                                                  |                                                     |

#### Request example

{

"margin_account":

"USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"positions":\[

0:{

"symbol":

"BTC"

"new_risk_rate":

""

"trade_partition":

""

"contract_code":

"BTC-USDT"

"volume":

1

"available":

1

"frozen":

0

"cost_open":

48945.9

"cost_hold":

48945.9

"profit_unreal":

0.0342

"profit_rate":

0.00349365319669267

"lever_rate":

5

"position_margin":

9.79602

"direction":

"buy"

"profit":

0.0342

"last_price":

48980.1

"margin_asset":

"USDT"

"margin_mode":

"cross"

"margin_account":

"USDT"

"contract_type":

"swap"

"pair":

"BTC-USDT"

"business_type":

"swap"

"position_mode":

"dual_side"

}

1:{

"symbol":

"BTC"

"new_risk_rate":

""

"trade_partition":

""

"contract_code":

"BTC-USDT-211210"

"volume":

1

"available":

1

"frozen":

0

"cost_open":

48929.7

"cost_hold":

48929.7

"profit_unreal":

0.0369

"profit_rate":

0.003770715945530015

"lever_rate":

5

"position_margin":

9.79332

"direction":

"buy"

"profit":

0.0369

"last_price":

48966.6

"margin_asset":

"USDT"

"margin_mode":

"cross"

"margin_account":

"USDT"

"contract_type":

"this_week"

"pair":

"BTC-USDT"

"business_type":

"futures"

"position_mode":

"dual_side"

}

\]

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

9716.43771679

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

9.79332

"margin_frozen":

0

"margin_available":

9716.43771679

"profit_unreal":

0.0369

"liquidation_price":

NULL

"lever_rate":

5

"adjust_factor":

0.04

"contract_type":

"this_week"

"cross_max_available":

""

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

264

"margin_available":

9716.43771679

"profit_unreal":

0

"liquidation_price":

NULL

"lever_rate":

1

"adjust_factor":

0.005

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

10000.02705679

"margin_static":

9999.95595679

"margin_position":

19.58934

"margin_frozen":

264

"profit_real":

\-0.04404321

"profit_unreal":

0.0711

"withdraw_available":

9716.36661679

"risk_rate":

4752.827989089614

"money_in":

""

"money_out":

""

"new_risk_rate":

""

"position_mode":

"dual_side"

"adl_risk_percent":

"3"

"contract_detail":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_position":

9.79602

"margin_frozen":

0

"margin_available":

9716.43771679

"profit_unreal":

0.0342

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

"ts":

1638758699818

}
