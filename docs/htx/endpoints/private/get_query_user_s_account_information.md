# GET Query User’s Account Information

**Source:**
[Query User’s Account Information](https://www.htx.com/en-us/opend/newApiPages/?id=5d5184f4-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_account_info (Query User’s Account Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                                               | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |               |

#### Response Parameter

| Parameter                        | Data Type  | Required | Description                                   | Value Range    |
| -------------------------------- | ---------- | -------- | --------------------------------------------- | -------------- |
| status                           | string     | true     | Request Processing Result                     | "ok" , "error" |
| LIST>(ATTRIBUTE NAME: DATA_START |            | false    |                                               |                |
| symbol                           | string     | true     | Variety code                                  | "BTC","ETH"... |
| contract_code                    | string     | true     | Contract Code                                 | e.g. "BTC-USD" |
| margin_balance                   | decimal    | true     | Account rights                                |                |
| margin_position                  | decimal    | true     | Position Margin                               |                |
| margin_frozen                    | decimal    | true     | Frozen margin                                 |                |
| margin_available                 | decimal    | true     | Available margin                              |                |
| profit_unreal                    | decimal    | true     | Unrealized profit                             |                |
| risk_rate                        | decimal    | true     | risk rate                                     |                |
| new_risk_rate                    | bigdecimal | true     | new risk rate                                 |                |
| trade_partition                  | string     | true     | trade partition                               |                |
| liquidation_price                | decimal    | true     | Estimated liquidation price                   |                |
| withdraw_available               | decimal    | true     | Available withdrawal                          |                |
| lever_rate                       | decimal    | true     | Leverage Rate                                 |                |
| adjust_factor                    | decimal    | true     | Adjustment Factor                             |                |
| margin_static                    | decimal    | true     | Static Margin                                 |                |
| LIST_END                         |            | false    |                                               |                |
| ts                               | long       | true     | Time of Respond Generation, Unit: Millisecond |                |

#### Request example

{

"contract_code":

"THETA-USD"

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

717.6009609625614

"margin_position":

15.4834713942866

"margin_frozen":

13.765413852951653

"margin_available":

688.3520757153232

"profit_real":

0

"profit_unreal":

\-6.321988896485648

"risk_rate":

24.134301218550508

"new_risk_rate":

""

"trade_partition":

""

"withdraw_available":

688.3520757153232

"liquidation_price":

0.1985845228428234

"lever_rate":

20

"adjust_factor":

0.4

"margin_static":

723.9229498590471

"contract_code":

"THETA-USD"

}

\]

"ts":

1603866747447

}
