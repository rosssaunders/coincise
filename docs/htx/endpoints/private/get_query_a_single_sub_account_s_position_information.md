# GET Query a single sub-account's position information

**Source:**
[Query a single sub-account's position information](https://www.htx.com/en-us/opend/newApiPages/?id=5d518e1a-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_sub_position_info (Query a single sub-account's position information)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                               | Value Range | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |             |               |
| sub_uid       | long      | true     | sub-account UID                                                           |             |               |

#### Response Parameter

| Parameter        | Data Type  | Required | Description                                                                       | Value Range             |
| ---------------- | ---------- | -------- | --------------------------------------------------------------------------------- | ----------------------- |
| status           | string     | true     | the handling result of requests                                                   | "ok" , "error"          |
| ts               | long       | true     | the create time point of response, unit: ms                                       |                         |
| DATA_START       |            | false    |                                                                                   |                         |
| symbol           | string     | true     | type code                                                                         | "BTC","ETH"...          |
| contract_code    | string     | true     | contract code                                                                     | "BTC-USD" ...           |
| volume           | decimal    | true     | open interest                                                                     |                         |
| available        | decimal    | true     | available positions to close                                                      |                         |
| frozen           | decimal    | true     | amount of frozen positions                                                        |                         |
| cost_open        | decimal    | true     | average price of open positions                                                   |                         |
| cost_hold        | decimal    | true     | average price of positions                                                        |                         |
| profit_unreal    | decimal    | true     | unrealized profits and losses                                                     |                         |
| profit_rate      | decimal    | true     | profit rate                                                                       |                         |
| profit           | decimal    | true     | profits                                                                           |                         |
| position_margin  | decimal    | true     | position margin                                                                   |                         |
| lever_rate       | int        | true     | leverage ratios                                                                   |                         |
| direction        | string     | true     | transaction direction of positions                                                | "buy":long "sell":short |
| last_price       | decimal    | true     | Latest price                                                                      |                         |
| adl_risk_percent | decimal    | false    | The risk level of the current position being forced to reduce the position by adl | 1、2、3、4、5           |
| liq_px           | string     | true     | Estimated liquidation price                                                       |                         |
| new_risk_rate    | bigdecimal | true     | new risk rate                                                                     |                         |
| trade_partition  | string     | true     | trade partition                                                                   |                         |
| DATA_END         |            | false    |                                                                                   |                         |

#### Request example

{

"contract_code":

"BTC-USD"

"lever_rate":

10

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

2

"available":

2

"frozen":

0

"cost_open":

0.62995

"cost_hold":

0.62995

"profit_unreal":

\-0.0166228057147171

"profit_rate":

\-0.01047153645998604

"lever_rate":

20

"position_margin":

1.586596433331218

"direction":

"sell"

"profit":

\-0.0166228057147171

"last_price":

0.63028

"adl_risk_percent":

"3"

"liq_px":

"9980"

"new_risk_rate":

""

"trade_partition":

""

}

\]

"ts":

1603869954515

}
