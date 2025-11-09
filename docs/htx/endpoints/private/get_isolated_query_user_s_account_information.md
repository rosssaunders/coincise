# GET [Isolated] Query User’s Account Information

**Source:**
[[Isolated] Query User’s Account Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb81843-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_account_info (\[Isolated\] Query User’s Account Information)

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

| Parameter     | Data Type | Required | Description | Value Range                                                                | Default Value |
| ------------- | --------- | -------- | ----------- | -------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    |             | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |               |

#### Response Parameter

| Parameter          | Data Type  | Required | Description                                   | Value Range            |
| ------------------ | ---------- | -------- | --------------------------------------------- | ---------------------- |
| status             | string     | true     | Request Processing Result                     | "ok" , "error"         |
| DATA_START         |            | false    |                                               |                        |
| symbol             | string     | true     | Variety code                                  | "BTC","ETH"...         |
| contract_code      | string     | true     | contract code                                 | "BTC-USDT" ...         |
| margin_asset       | string     | true     | Margin Asset                                  |                        |
| margin_balance     | decimal    | true     | Account rights                                |                        |
| margin_position    | decimal    | true     | Position Margin                               |                        |
| margin_frozen      | decimal    | true     | Frozen margin                                 |                        |
| margin_available   | decimal    | true     | Available margin                              |                        |
| profit_unreal      | decimal    | true     | Unrealized profit                             |                        |
| risk_rate          | decimal    | true     | risk rate                                     |                        |
| new_risk_rate      | bigdecimal | true     | new risk rate                                 |                        |
| trade_partition    | string     | true     | trade partition                               |                        |
| liquidation_price  | decimal    | true     | Estimated liquidation price                   |                        |
| withdraw_available | decimal    | true     | Available withdrawal                          |                        |
| lever_rate         | decimal    | true     | Leverage Rate                                 |                        |
| adjust_factor      | decimal    | true     | Adjustment Factor                             |                        |
| margin_static      | decimal    | true     | Static Margin                                 |                        |
| margin_mode        | string     | true     | margin mode                                   | isolated : "isolated"  |
| margin_account     | string     | true     | margin account                                | "BTC-USDT"...          |
| position_mode      | string     | true     | position mode                                 | single_side，dual_side |
| DATA_END           |            | false    |                                               |                        |
| ts                 | long       | true     | Time of Respond Generation, Unit: Millisecond |                        |

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

"margin_balance":

99.75505884

"margin_position":

0

"margin_frozen":

12.73

"margin_available":

87.02505884

"profit_real":

0

"profit_unreal":

0

"risk_rate":

7.761218290652003

"new_risk_rate":

""

"trade_partition":

""

"withdraw_available":

87.02505884

"liquidation_price":

NULL

"lever_rate":

10

"adjust_factor":

0.075

"margin_static":

99.75505884

"contract_code":

"BTC-USDT"

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

"ts":

1603697381238

}
