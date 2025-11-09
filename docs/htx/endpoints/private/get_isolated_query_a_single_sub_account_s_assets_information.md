# GET [Isolated] Query a single sub-account's assets information

**Source:**
[[Isolated] Query a single sub-account's assets information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8251a-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_sub_account_info (\[Isolated\] Query a single sub-account's assets information)

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

| Parameter     | Data Type | Required | Description                                                                | Value Range | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |             |               |
| sub_uid       | long      | true     | sub-account UID                                                            |             |               |

#### Response Parameter

| Parameter          | Data Type  | Required | Description                                            | Value Range            |
| ------------------ | ---------- | -------- | ------------------------------------------------------ | ---------------------- |
| status             | string     | true     | the handling result of requests                        | "ok" , "error"         |
| ts                 | long       | true     | the create time point of response, unit: ms            |                        |
| DATA_START         |            | false    |                                                        |                        |
| symbol             | string     | true     | type code                                              | "BTC","ETH"...         |
| contract_code      | string     | true     | contract code                                          | e.g. "BTC-USDT"        |
| margin_asset       | string     | true     | margin asset                                           |                        |
| margin_balance     | decimal    | true     | account equity                                         |                        |
| margin_position    | decimal    | true     | position margin (the margin used by current positions) |                        |
| margin_frozen      | decimal    | true     | frozen margin                                          |                        |
| margin_available   | decimal    | true     | available margin                                       |                        |
| profit_unreal      | decimal    | true     | unrealized profits and losses                          |                        |
| risk_rate          | decimal    | true     | margin rate                                            |                        |
| new_risk_rate      | bigdecimal | true     | new risk rate                                          |                        |
| trade_partition    | string     | true     | trade partition                                        |                        |
| liquidation_price  | decimal    | true     | estimated liquidation price                            |                        |
| withdraw_available | decimal    | true     | available transfer amount                              |                        |
| lever_rate         | int        | true     | leverage ratios                                        |                        |
| adjust_factor      | decimal    | true     | Adjustment Factor                                      |                        |
| margin_static      | decimal    | true     | Static Margin                                          |                        |
| margin_mode        | string     | true     | margin mode                                            | isolated : "isolated"  |
| margin_account     | string     | true     | margin account                                         | "BTC-USDT"...          |
| position_mode      | string     | true     | position mode                                          | single_side，dual_side |
| DATA_END           |            | false    |                                                        |                        |

Notes:  
Only query account information for activated contract sub-account (i.e.
sub-accounts that have gained contract trading permission);  
No data return for sub-accounts which has logged in hbdm but have not gained
trading permission/activated.

#### Request example

{

"contract_code":

"BTC-USDT"

"sub_uid":

123456

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

20

"margin_position":

0

"margin_frozen":

0

"margin_available":

20

"profit_real":

0

"profit_unreal":

0

"risk_rate":

NULL

"new_risk_rate":

""

"trade_partition":

""

"withdraw_available":

20

"liquidation_price":

NULL

"lever_rate":

5

"adjust_factor":

0.04

"margin_static":

20

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

1603698523200

}
