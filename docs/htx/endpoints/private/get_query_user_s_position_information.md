# GET Query User’s Position Information

**Source:**
[Query User’s Position Information](https://www.htx.com/en-us/opend/newApiPages/?id=5d518648-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_position_info (Query User’s Position Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                                                | Default Value |
| ------------- | --------- | -------- | ------------- | -------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | Contract Code | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |               |

#### Response Parameter

| Parameter                        | Data Type  | Required | Description                                                                       | Value Range             |
| -------------------------------- | ---------- | -------- | --------------------------------------------------------------------------------- | ----------------------- |
| status                           | string     | true     | Request Processing Result                                                         | "ok" , "error"          |
| LIST>(ATTRIBUTE NAME: DATA_START |            | false    |                                                                                   |                         |
| symbol                           | string     | true     | Variety code                                                                      | "BTC","ETH"...          |
| contract_code                    | string     | true     | Contract Code                                                                     | e.g. "BTC-USD"          |
| volume                           | decimal    | true     | Position quantity                                                                 |                         |
| available                        | decimal    | true     | Available position can be closed                                                  |                         |
| frozen                           | decimal    | true     | frozen                                                                            |                         |
| cost_open                        | decimal    | true     | Opening average price                                                             |                         |
| cost_hold                        | decimal    | true     | Average price of position                                                         |                         |
| profit_unreal                    | decimal    | true     | Unrealized profit and loss                                                        |                         |
| profit_rate                      | decimal    | true     | Profit rate                                                                       |                         |
| profit                           | decimal    | true     | profit                                                                            |                         |
| position_margin                  | decimal    | true     | Position margin                                                                   |                         |
| lever_rate                       | int        | true     | Leverage rate                                                                     |                         |
| direction                        | string     | true     | transaction direction of positions                                                | "buy":long "sell":short |
| last_price                       | decimal    | true     | Latest price                                                                      |                         |
| adl_risk_percent                 | decimal    | false    | The risk level of the current position being forced to reduce the position by adl | 1、2、3、4、5           |
| liq_px                           | string     | true     | Estimated liquidation price                                                       |                         |
| new_risk_rate                    | bigdecimal | true     | new risk rate                                                                     |                         |
| trade_partition                  | string     | true     | trade partition                                                                   |                         |
| LIST_END                         |            | false    |                                                                                   |                         |
| ts                               | long       | true     | Time of Respond Generation, Unit: Millisecond                                     |                         |

Notes:  
f there are symbols in the settlement or delivery period,error code 1080(1080 In
settlement or delivery. Unable to get positions of some contracts. ) will return
without request parameters. It's suggested to query the position info with
request parameters to avoid raising the error code and not being able to query
the position.

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

\-10.5257562398811

"profit_rate":

1.0158596753357925

"lever_rate":

20

"position_margin":

15.693659761456372

"direction":

"buy"

"profit":

16.795657677889032

"last_price":

0.6372

"adl_risk_percent":

"3"

"liq_px":

"112"

"new_risk_rate":

""

"trade_partition":

""

}

\]

"ts":

1603868312729

}
