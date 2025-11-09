# GET [Isolated] Query a single sub-account's position information

**Source:**
[[Isolated] Query a single sub-account's position information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb827d0-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_sub_position_info (\[Isolated\] Query a single sub-account's position information)

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

| Parameter        | Data Type  | Required | Description                                                                                      | Value Range             |
| ---------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------ | ----------------------- |
| status           | string     | true     | the handling result of requests                                                                  | "ok" , "error"          |
| ts               | long       | true     | the create time point of response, unit: ms                                                      |                         |
| DATA_START       |            | false    |                                                                                                  |                         |
| symbol           | string     | true     | type code                                                                                        | "BTC","ETH"...          |
| contract_code    | string     | true     | contract code                                                                                    | "BTC-USDT" ...          |
| margin_asset     | string     | true     | margin asset                                                                                     |                         |
| volume           | decimal    | true     | open interest                                                                                    |                         |
| available        | decimal    | true     | available positions to close                                                                     |                         |
| frozen           | decimal    | true     | amount of frozen positions                                                                       |                         |
| cost_open        | decimal    | true     | average price of open positions                                                                  |                         |
| cost_hold        | decimal    | true     | average price of positions                                                                       |                         |
| profit_unreal    | decimal    | true     | unrealized profits and losses                                                                    |                         |
| profit_rate      | decimal    | true     | profit rate                                                                                      |                         |
| profit           | decimal    | true     | profits                                                                                          |                         |
| position_margin  | decimal    | true     | position margin                                                                                  |                         |
| lever_rate       | int        | true     | leverage ratios                                                                                  |                         |
| direction        | string     | true     | transaction direction of positions                                                               | "buy":long "sell":short |
| last_price       | decimal    | true     | Latest price                                                                                     |                         |
| margin_mode      | string     | true     | margin mode                                                                                      | isolated : "isolated"   |
| margin_account   | string     | true     | margin account                                                                                   | "BTC-USDT"...           |
| position_mode    | string     | true     | position mode                                                                                    | single_side，dual_side  |
| adl_risk_percent | decimal    | false    | The risk level of the current position being forced to reduce the position by “adl_risk_percent” | 1、2、3、4、5           |
| new_risk_rate    | bigdecimal | true     | new risk rate                                                                                    |                         |
| trade_partition  | string     | true     | trade partition                                                                                  |                         |
| DATA_END         |            | false    |                                                                                                  |                         |

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

"contract_code":

"BTC-USDT"

"volume":

1

"available":

1

"frozen":

0

"cost_open":

13038.7

"cost_hold":

13038.7

"profit_unreal":

0

"profit_rate":

0

"lever_rate":

10

"position_margin":

1.30387

"direction":

"buy"

"profit":

0

"last_price":

13038.7

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

"new_risk_rate":

""

"trade_partition":

""

}

\]

"ts":

1603699081114

}
