# GET Query trader position list

**Source:**
[Query trader position list](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126c2c390)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/position_list (Query trader position list)

Request type: GET

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: Query trader position list

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

#### Response Parameter

| Parameter         | Data Type | Required | Description           | Value Range     |
| ----------------- | --------- | -------- | --------------------- | --------------- |
| tid               | string    | true     | request id            |                 |
| DATA_START        |           | true     |                       |                 |
| POSITIONS_START   | array     | true     |                       |                 |
| margin_mode       | string    | true     | margin mode           | isolated，cross |
| position_side     | string    | true     | position side         | long, short     |
| lever             | string    | true     | lever                 |                 |
| open_avg_price    | string    | true     | Average open price    |                 |
| position_margin   | string    | true     |                       |                 |
| margin_rate       | string    | true     |                       |                 |
| volume            | string    | true     | Quantity of positions |                 |
| liquidation_price | string    | true     | liquidation price     |                 |
| unreal_profit     | string    | true     | unreal profit         |                 |
| profit            | string    | true     | Profit and loss       |                 |
| profit_rate       | string    | true     | Profit and loss Rate  |                 |
| contract_code     | String    | true     | Trading pair          |                 |
| POSITIONS_END     |           | false    |                       |                 |
| DATA_END          |           | false    |                       |                 |
| code              | Long      | true     |                       |                 |

#### Request example

`curl"https://api.hbdm.com/copytrading/trader/position_list"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"positions":\[

0:{

"lever":

"5"

"position_side":

"long"

"contract_code":

"DOT-USDT"

"open_avg_price":

"10"

"volume":

"1"

"margin_mode":

"isolated"

"position_margin":

"2.994"

"margin_rate":

"0.066800267201068804"

"unreal_profit":

"0"

"profit":

"0"

"profit_rate":

"0"

"liquidation_price":

"7.206"

}

1:{

"lever":

"5"

"position_side":

"short"

"contract_code":

"DOT-USDT"

"open_avg_price":

"9.999"

"volume":

"1"

"margin_mode":

"isolated"

"position_margin":

"1.9938006"

"margin_rate":

"0.100361270465293918"

"unreal_profit":

"-0.001"

"profit":

"-0.001"

"profit_rate":

"-0.0005000500050005"

"liquidation_price":

"11.7928006"

}

\]

}

"tid":

"4a5479639bdf4ae997ac79e5dd56062d"

"success":

true

}
