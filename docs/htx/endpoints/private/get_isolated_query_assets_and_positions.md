# GET [Isolated] Query Assets And Positions

**Source:**
[[Isolated] Query Assets And Positions](https://www.htx.com/en-us/opend/newApiPages/?id=8cb81d85-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_account_position_info (\[Isolated\] Query Assets And Positions)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                                                           | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC-USDT","ETH-USDT".... |               |

#### Response Parameter

| Parameter          | Data Type    | Required | Description                                                                                      | Value Range             |
| ------------------ | ------------ | -------- | ------------------------------------------------------------------------------------------------ | ----------------------- |
| status             | string       | true     | Request Processing Result                                                                        | "ok" , "error"          |
| ts                 | long         | true     | Time of Respond Generation, Unit: Millisecond                                                    |                         |
| DATA_START         | object array | true     |                                                                                                  |                         |
| symbol             | string       | true     | contract symbol                                                                                  | "BTC","ETH"...          |
| contract_code      | string       | true     | contract code                                                                                    | "BTC-USDT" ...          |
| margin_asset       | string       | true     | Margin Asset                                                                                     |                         |
| margin_balance     | decimal      | true     | Balance Margin                                                                                   |                         |
| margin_static      | decimal      | true     | Balance static                                                                                   |                         |
| margin_position    | decimal      | true     | Postion Margin                                                                                   |                         |
| margin_frozen      | decimal      | true     | Frozen Margin                                                                                    |                         |
| margin_available   | decimal      | true     | Available Margin                                                                                 |                         |
| profit_unreal      | decimal      | true     | Unreadlized Profit                                                                               |                         |
| risk_rate          | decimal      | true     | risk rate                                                                                        |                         |
| new_risk_rate      | bigdecimal   | true     | new risk rate                                                                                    |                         |
| rade_partition     | string       | true     | trade partition                                                                                  |                         |
| liquidation_price  | decimal      | true     | Estimated Liquidation Price                                                                      |                         |
| withdraw_available | decimal      | true     | Available Withdraw                                                                               |                         |
| lever_rate         | decimal      | true     | Leverage Rate                                                                                    |                         |
| adjust_factor      | decimal      | true     | Adjustment Factor                                                                                |                         |
| margin_mode        | string       | true     | margin mode                                                                                      | isolated : "isolated"   |
| margin_account     | string       | true     | margin account                                                                                   | "BTC-USDT"...           |
| position_mode      | string       | true     | position mode                                                                                    | single_side，dual_side  |
| POSITIONS_START    | object array | true     |                                                                                                  |                         |
| symbol             | string       | true     | Variety Code                                                                                     | "BTC","ETH"...          |
| new_risk_rate      | bigdecimal   | true     | new risk rate                                                                                    |                         |
| trade_partition    | string       | true     | trade partition                                                                                  |                         |
| contract_code      | string       | true     | Contract Code                                                                                    | "BTC-USDT" ...          |
| volume             | decimal      | true     | Position Quantity                                                                                |                         |
| available          | decimal      | true     | Available position quatity can be closed                                                         |                         |
| frozen             | decimal      | true     | forzen postion Quantity                                                                          |                         |
| cost_open          | decimal      | true     | Opening Average Price                                                                            |                         |
| cost_hold          | decimal      | true     | Average position price                                                                           |                         |
| profit_unreal      | decimal      | true     | Unrealized profit                                                                                |                         |
| profit_rate        | decimal      | true     | Profit Rate                                                                                      |                         |
| profit             | decimal      | true     | Profit                                                                                           |                         |
| margin_asset       | string       | true     | Margin Asset                                                                                     |                         |
| position_margin    | decimal      | true     | Position Margin                                                                                  |                         |
| lever_rate         | int          | true     | Leverage Rate                                                                                    |                         |
| direction          | string       | true     | transaction direction of positions                                                               | "buy":long "sell":short |
| last_price         | decimal      | true     | Last Price                                                                                       |                         |
| margin_mode        | string       | true     | margin mode                                                                                      | isolated : "isolated"   |
| margin_account     | string       | true     | margin account                                                                                   | "BTC-USDT"...           |
| position_mode      | string       | true     | position mode                                                                                    | single_side，dual_side  |
| POSITIONS_END      |              | false    |                                                                                                  |                         |
| adl_risk_percent   | decimal      | false    | The risk level of the current position being forced to reduce the position by “adl_risk_percent” | 1、2、3、4、5           |
| DATA_END           |              | false    |                                                                                                  |                         |

#### Request example

{

"contract_code":

"BTC-USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_balance":

99.75173164

"margin_position":

1.30699

"margin_frozen":

12.73

"margin_available":

85.71474164

"profit_real":

\-0.0052272

"profit_unreal":

0.0019

"risk_rate":

7.0313477027482385

"new_risk_rate":

""

"trade_partition":

""

"withdraw_available":

85.71284164

"liquidation_price":

NULL

"lever_rate":

10

"adjust_factor":

0.075

"margin_static":

99.74983164

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

13068

"cost_hold":

13068

"profit_unreal":

0.0019

"profit_rate":

0.00145393327211509

"lever_rate":

10

"position_margin":

1.30699

"direction":

"buy"

"profit":

0.0019

"last_price":

13069.9

"margin_asset":

"USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"position_mode":

"dual_side"

"adl_risk_percent":

"3"

}

\]

"margin_asset":

"USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"position_mode":

"dual_side"

"adl_risk_percent":

"3"

}

\]

"ts":

1603697944138

}
