# GET [Isolated] Query User’s Position Information

**Source:**
[[Isolated] Query User’s Position Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb81b5a-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_position_info (\[Isolated\] Query User’s Position Information)

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

| Parameter     | Data Type | Required | Description                                                                 | Value Range | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USDT" |             |               |

#### Response Parameter

| Parameter          | Data Type | Required | Description                                                                                      | Value Range             |
| ------------------ | --------- | -------- | ------------------------------------------------------------------------------------------------ | ----------------------- |
| status             | string    | true     | Request Processing Result                                                                        | "ok" , "error"          |
| DATA_START         |           | false    |                                                                                                  |                         |
| symbol             | string    | true     | Variety code                                                                                     | "BTC","ETH"...          |
| contract_code      | string    | true     | contract code                                                                                    | e.g. "BTC-USDT"         |
| volume             | decimal   | true     | Position quantity                                                                                |                         |
| available          | decimal   | true     | Available position can be closed                                                                 |                         |
| frozen             | decimal   | true     | frozen                                                                                           |                         |
| cost_open          | decimal   | true     | Opening average price                                                                            |                         |
| cost_hold          | decimal   | true     | Average price of position                                                                        |                         |
| profit_unreal      | decimal   | true     | Unrealized profit and loss                                                                       |                         |
| profit_rate        | decimal   | true     | Profit rate                                                                                      |                         |
| profit             | decimal   | true     | profit                                                                                           |                         |
| margin_asset       | string    | true     | Margin Asset                                                                                     |                         |
| position_margin    | decimal   | true     | Position margin                                                                                  |                         |
| lever_rate         | int       | true     | Leverage rate                                                                                    |                         |
| direction          | string    | true     | transaction direction of positions                                                               | "buy":long "sell":short |
| last_price         | decimal   | true     | Latest price                                                                                     |                         |
| margin_mode        | string    | true     | margin mode                                                                                      | isolated : "isolated"   |
| margin_account     | string    | true     | margin account                                                                                   | "BTC-USDT"...           |
| position_mode      | string    | true     | position mode                                                                                    | single_side，dual_side  |
| withdraw_available | decimal   | false    | Not the same account is empty, the unified account is the margin amount for position adjustmen   |                         |
| risk_rate          | decimal   | false    | margin rate                                                                                      |                         |
| liquidation_price  | decimal   | false    | Estimated liquidation price                                                                      |                         |
| adl_risk_percent   | decimal   | false    | The risk level of the current position being forced to reduce the position by “adl_risk_percent” | 1、2、3、4、5           |
| DATA_END           |           | false    |                                                                                                  |                         |
| ts                 | long      | true     | Time of Respond Generation, Unit: Millisecond                                                    |                         |

Notes:  
If there are symbols in the settlement or delivery period,error code 1080(1080
In settlement or delivery. Unable to get positions of some contracts.) will
return without request parameters. It's suggested to query the position info
with request parameters to avoid raising the error code and not being able to
query the position.

#### Request example

`{ "contract": "BTC-USDT", }`

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

13068

"cost_hold":

13068

"profit_unreal":

0

"profit_rate":

0

"lever_rate":

10

"position_margin":

1.3068

"direction":

"buy"

"profit":

0

"last_price":

13068

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

1603697821846

}
