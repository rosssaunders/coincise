# GET Query a single sub-account's assets information

**Source:**
[Query a single sub-account's assets information](https://www.htx.com/en-us/opend/newApiPages/?id=5d518cd2-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_sub_account_info (Query a single sub-account's assets information)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description | Value Range                                                               | Default Value |
| ------------- | --------- | -------- | ----------- | ------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    |             | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |               |
| sub_uid       | long      | true     |             | sub-account UID                                                           |               |

#### Response Parameter

| Parameter          | Data Type  | Required | Description                                            | Value Range                                                                              |
| ------------------ | ---------- | -------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| status             | string     | true     | the handling result of requests                        | "ok" , "error"                                                                           |
| ts                 | long       | true     | the create time point of response, unit: ms            |                                                                                          |
| DATA_START         |            | false    |                                                        |                                                                                          |
| symbol             | string     | true     | type code                                              | "BTC","ETH"...when the$contract_code value is "\*", it will subscribe all contract types |
| contract_code      | string     | true     | contract code                                          | e.g. "BTC-USD"                                                                           |
| margin_balance     | decimal    | true     | account equity                                         |                                                                                          |
| margin_position    | decimal    | true     | position margin (the margin used by current positions) |                                                                                          |
| margin_frozen      | decimal    | true     | frozen margin                                          |                                                                                          |
| margin_available   | decimal    | true     | available margin                                       |                                                                                          |
| profit_unreal      | decimal    | true     | unrealized profits and losses                          |                                                                                          |
| risk_rate          | decimal    | true     | margin rate                                            |                                                                                          |
| liquidation_price  | decimal    | true     | estimated liquidation price                            |                                                                                          |
| withdraw_available | decimal    | true     | available transfer amount                              |                                                                                          |
| lever_rate         | int        | true     | leverage ratios                                        |                                                                                          |
| adjust_factor      | decimal    | true     | Adjustment Factor                                      |                                                                                          |
| margin_static      | decimal    | true     | Static Margin                                          |                                                                                          |
| new_risk_rate      | bigdecimal | true     | new risk rate                                          |                                                                                          |
| trade_partition    | string     | true     | trade partition                                        |                                                                                          |
| DATA_END           |            | false    |                                                        |                                                                                          |

Notes:  
Only query account information for activated contract sub-account (i.e.
sub-accounts that have gained contract trading permission);  
No data return for sub-accounts which has logged in hbdm but have not gained
trading permission/activated.

#### Request example

{

"contract_code":

"BTC-USD"

"page_index":

1

"page_size":

20

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

"margin_balance":

100

"margin_position":

0

"margin_frozen":

1.5748031496062993

"margin_available":

98.4251968503937

"profit_real":

0

"profit_unreal":

0

"risk_rate":

63.1

"withdraw_available":

98.4251968503937

"liquidation_price":

NULL

"lever_rate":

20

"adjust_factor":

0.4

"margin_static":

100

"new_risk_rate":

""

"trade_partition":

""

"contract_code":

"THETA-USD"

}

\]

"ts":

1603869680106

}
