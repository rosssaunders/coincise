# GET [Cross] Query User's Position Information

**Source:**
[[Cross] Query User's Position Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb81c49-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_position_info (\[Cross\] Query User's Position Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-211225. When both of pair、contract_type and
contract_code filled in, the contract_code is the preferred. when no one filled
in, return all contract type's data(swap and futures)

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                         | Default Value |
| ------------- | --------- | -------- | ------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-211225" ... |               |
| pair          | string    | false    | pair          | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type | swap, this_week, next_week, quarter, next_quarter   |               |

#### Response Parameter

| Parameter         | Data Type    | Required | Description                                                                                      | Value Range                                         |
| ----------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| status            | string       | true     | Request Processing Result                                                                        | "ok" , "error"                                      |
| ts                | long         | true     | Time of Respond Generation, Unit: Millisecond                                                    |                                                     |
| DATA_START        | object array | true     |                                                                                                  |                                                     |
| symbol            | string       | true     | symbol                                                                                           | "BTC","ETH"...                                      |
| contract_code     | string       | true     | contract code                                                                                    | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin_mode       | string       | true     | margin mode                                                                                      | cross: cross margin mode                            |
| margin_account    | string       | true     | margin account                                                                                   | "USDT"...                                           |
| volume            | decimal      | true     | position quantity                                                                                |                                                     |
| available         | decimal      | true     | available position can be closed                                                                 |                                                     |
| frozen            | decimal      | true     | frozen quantity                                                                                  |                                                     |
| cost_open         | decimal      | true     | opening average price                                                                            |                                                     |
| cost_hold         | decimal      | true     | average price of position                                                                        |                                                     |
| profit_unreal     | decimal      | true     | unrealized profits and losses                                                                    |                                                     |
| profit_rate       | decimal      | true     | profit rate                                                                                      |                                                     |
| profit            | decimal      | true     | profit                                                                                           |                                                     |
| margin_asset      | string       | true     | margin asset                                                                                     |                                                     |
| position_margin   | decimal      | true     | position margin                                                                                  |                                                     |
| lever_rate        | int          | true     | lever rate                                                                                       |                                                     |
| direction         | string       | true     | transaction direction of positions                                                               | "buy":long "sell":short                             |
| last_price        | decimal      | true     | latest price                                                                                     |                                                     |
| contract_type     | string       | true     | contract type                                                                                    | swap, this_week, next_week, quarter, next_quarter   |
| pair              | string       | true     | pair                                                                                             | such as: “BTC-USDT”                                 |
| business_type     | string       | true     | business type                                                                                    | futures, swap                                       |
| position_mode     | string       | true     | position mode                                                                                    | single_side，dual_side                              |
| liquidation_price | decimal      | false    | Estimated liquidation price                                                                      |                                                     |
| adl_risk_percent  | decimal      | false    | The risk level of the current position being forced to reduce the position by “adl_risk_percent” | 1、2、3、4、5                                       |
| DATA_END          |              | false    |                                                                                                  |                                                     |

#### Request example

{

"contract_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract_type":

"swap"

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

48945.9

"cost_hold":

48945.9

"profit_unreal":

\-0.0038

"profit_rate":

\-0.00038818368852141

"lever_rate":

5

"position_margin":

9.78842

"direction":

"buy"

"profit":

\-0.0038

"last_price":

48942.1

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

"adl_risk_percent":

"3"

}

1:{

"symbol":

"BTC"

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

\-0.0498

"profit_rate":

\-0.00508893371510555

"lever_rate":

5

"position_margin":

9.77598

"direction":

"buy"

"profit":

\-0.0498

"last_price":

48879.9

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

"adl_risk_percent":

"3"

}

\]

"ts":

1638758525147

}
