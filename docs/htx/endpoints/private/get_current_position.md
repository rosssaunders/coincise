# GET Current Position

**Source:**
[Get Current Position](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19594266bd8)

**Category:** Positions

## Authentication

Required (Private Endpoint)

### /v5/trade/position/opens (Get Current Position)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Get information about your current position.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online (preferred by aws customers) | https://api.hbdm.vn  |
| Online                              | https://api.hbdm.com |

#### Request Parameter

| Parameter     | Data Type | Required | Description | Value Range | Default Value |
| ------------- | --------- | -------- | ----------- | ----------- | ------------- |
| contract_code | String    | false    |             |             |               |

#### Response Parameter

| Parameter          | Data Type | Required | Description                                                     | Value Range                                                                                                                                                   |
| ------------------ | --------- | -------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| contract_code      | String    | true     | Symbol                                                          |                                                                                                                                                               |
| position_side      | String    | true     | Position side                                                   | The side of your position. Under the buy/sell mode, "both" is default. Under the long/short mode, "long" refers to going long; "short" refers to going short. |
| direction          | String    | true     | Order side                                                      | buy; sell                                                                                                                                                     |
| margin_mode        | String    | true     | Margin mode                                                     | cross: Cross margin                                                                                                                                           |
| open_avg_price     | String    | true     | Avg. entry price mode                                           |                                                                                                                                                               |
| volume             | String    | true     | Position size (Cont)                                            |                                                                                                                                                               |
| available          | String    | true     | Amount of position available to be closed (Cont)                |                                                                                                                                                               |
| lever_rate         | String    | true     | Leverage                                                        |                                                                                                                                                               |
| adl_risk_percent   | String    | true     | ADL indicator                                                   | Level 1, 2, 3, 4, 5, with level 1 representing the lowest risk and level 5 representing the highest risk.                                                     |
| liquidation_price  | String    | true     | Est. liquidation price                                          |                                                                                                                                                               |
| initial_margin     | String    | true     | Initial margin, only applicable to cross margin mode            |                                                                                                                                                               |
| maintenance_margin | String    | true     | Maintenance margin margin, only applicable to cross margin mode |                                                                                                                                                               |
| profit_unreal      | String    | true     | Unrealized PnL                                                  |                                                                                                                                                               |
| profit_rate        | String    | true     | Unrealized PnL percentage PnL                                   |                                                                                                                                                               |
| margin_rate        | String    | true     | Margin ratio                                                    |                                                                                                                                                               |
| margin_currency    | String    | true     | Margin currency (for pricing)                                   |                                                                                                                                                               |
| last_price         | decima    | true     | Last price                                                      |                                                                                                                                                               |
| contract_type      | String    | true     | Contract type                                                   | swap: Perpetual; this_week: Weekly; next_week: Bi-weekly; quarter: Quarterly; next_quarter: Bi-quarterly                                                      |
| created_time       | String    | true     | Creation time                                                   |                                                                                                                                                               |
| updated_time       | String    | true     | Update time                                                     |                                                                                                                                                               |

#### Request example

{

"contract_code":

"eth-usdt"

}

#### Response Example

##### Success Example

{

"code":

200

"message":

"Success"

"data":\[

0:{

"contract_code":

"ETH-USDT"

"position_side":

"both"

"direction":

"buy"

"margin_mode":

"cross"

"open_avg_price":

"1672.36"

"volume":

"10"

"available":

"10"

"lever_rate":

5

"adl_risk_percent":

NULL

"liquidation_price":

"-6615323.17169213120630934"

"initial_margin":

"23.9516"

"maintenance_margin":

"0.4490925"

"profit_unreal":

"-47.478"

"profit_rate":

"-1.9822"

"margin_rate":

"0.000000681298594547"

"mark_price":

"1197.58"

"margin_currency":

"USDT"

"contract_type":

"swap"

"created_time":

1740451087505

"updated_time":

1740451087505

}

\]

"ts":

1740451897695

}
