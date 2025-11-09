# GET Query Assets And Positions

**Source:**
[Query Assets And Positions](https://www.htx.com/en-us/opend/newApiPages/?id=5d518799-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_account_position_info (Query Assets And Positions)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                                                         | Default Value |
| ------------- | --------- | -------- | ------------- | ----------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC-USD","ETH-USD".... |               |

#### Response Parameter

| Parameter          | Data Type    | Required | Description                                                                       | Value Range    |
| ------------------ | ------------ | -------- | --------------------------------------------------------------------------------- | -------------- |
| status             | string       | true     | Request Processing Result "ok" , "error"                                          |                |
| ts                 | long         | true     | Time of Respond Generation, Unit: Millisecond                                     |                |
| DATA_START         | object array | true     |                                                                                   |                |
| symbol             | string       | true     | contract symbol                                                                   |                |
| contract_code      | string       | true     | contract code                                                                     |                |
| margin_balance     | decimal      | true     | Balance Margin                                                                    |                |
| margin_static      | decimal      | true     | Balance static                                                                    |                |
| margin_position    | decimal      | true     | Postion Margin                                                                    |                |
| margin_frozen      | decimal      | true     | Frozen Margin                                                                     |                |
| margin_available   | decimal      | true     | Available Margin                                                                  |                |
| profit_unreal      | decimal      | true     | Unreadlized Profit                                                                |                |
| risk_rate          | decimal      | true     | risk rate                                                                         |                |
| withdraw_available | decimal      | true     | Available Withdraw                                                                |                |
| liquidation_price  | decimal      | true     | Estimated Liquidation Price                                                       |                |
| lever_rate         | decimal      | true     | Leverage Rate                                                                     |                |
| adjust_factor      | decimal      | true     | Adjustment Factor                                                                 |                |
| margin_static      | decimal      | true     | margin static                                                                     |                |
| new_risk_rate      | bigdecimal   | true     | new risk rate                                                                     |                |
| trade_partition    | string       | true     | trade partition                                                                   |                |
| POSITIONS_START    | object array | false    |                                                                                   |                |
| symbol             | string       | true     | Variety Code                                                                      | "BTC","ETH"... |
| contract_code      | string       | true     | Contract Code "BTC-USD" ...                                                       | "BTC-USD" ...  |
| volume             | decimal      | true     | Position Quantity                                                                 |                |
| available          | decimal      | true     | Available position quatity can be closed                                          |                |
| frozen             | decimal      | true     | forzen postion Quantity                                                           |                |
| cost_open          | decimal      | true     | Opening Average Price                                                             |                |
| cost_hold          | decimal      | true     | Average position price                                                            |                |
| profit_unreal      | decimal      | true     | Unrealized profit                                                                 |                |
| profit_rate        | decimal      | true     | Profit Rate                                                                       |                |
| profit             | decimal      | true     | Profit                                                                            |                |
| position_margin    | decimal      | true     | Position Margin                                                                   |                |
| lever_rate         | int          | true     | Leverage Rate                                                                     |                |
| direction          | string       | true     | transaction direction of positions "buy":long "sell":short                        |                |
| last_price         | decimal      | true     | Last Price                                                                        |                |
| adl_risk_percent   | decimal      | false    | The risk level of the current position being forced to reduce the position by adl | 1、2、3、4、5  |
| POSITIONS_END      |              | false    |                                                                                   |                |
| DATA_END           |              | false    |                                                                                   |                |

#### Request example

{

"contract_code":

"BTC-USD"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"THETA"

"contract_code":

"THETA-USD"

"margin_balance":

713.633454962959

"margin_position":

15.681846694266717

"margin_frozen":

13.765413852951653

"margin_available":

684.1861944157407

"profit_real":

0

"profit_unreal":

\-10.289494896088003

"risk_rate":

23.834290107178404

"withdraw_available":

684.1861944157407

"liquidation_price":

0.1985845228428234

"lever_rate":

20

"adjust_factor":

0.4

"margin_static":

723.9229498590471

"new_risk_rate":

""

"trade_partition":

""

"positions":\[

0:{

"symbol":

"THETA"

"contract_code":

"THETA-USD"

"volume":

20

"available":

20

"frozen":

0

"cost_open":

0.6048347107438017

"cost_hold":

0.65931

"profit_unreal":

\-10.289494896088003

"profit_rate":

1.0301495814890964

"lever_rate":

20

"position_margin":

15.681846694266717

"direction":

"buy"

"profit":

17.03191902168213

"last_price":

0.63768

"adl_risk_percent":

"3"

}

\]

}

\]

"ts":

1603868847514

}
