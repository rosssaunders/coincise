# GET Query trader position list

**Source:** [Query trader position list](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126c2c390)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/position\_list (Query trader position list)

Request type: GET

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: Query trader position list

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | string | true | request id |  |
| DATA\_START |  | true |  |  |
| POSITIONS\_START | array | true |  |  |
| margin\_mode | string | true | margin mode | isolated，cross |
| position\_side | string | true | position side | long, short |
| lever | string | true | lever |  |
| open\_avg\_price | string | true | Average open price |  |
| position\_margin | string | true |  |  |
| margin\_rate | string | true |  |  |
| volume | string | true | Quantity of positions |  |
| liquidation\_price | string | true | liquidation price |  |
| unreal\_profit | string | true | unreal profit |  |
| profit | string | true | Profit and loss |  |
| profit\_rate | string | true | Profit and loss Rate |  |
| contract\_code | String | true | Trading pair |  |
| POSITIONS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| code | Long | true |  |  |

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

"position\_side":

"long"

"contract\_code":

"DOT-USDT"

"open\_avg\_price":

"10"

"volume":

"1"

"margin\_mode":

"isolated"

"position\_margin":

"2.994"

"margin\_rate":

"0.066800267201068804"

"unreal\_profit":

"0"

"profit":

"0"

"profit\_rate":

"0"

"liquidation\_price":

"7.206"

}

1:{

"lever":

"5"

"position\_side":

"short"

"contract\_code":

"DOT-USDT"

"open\_avg\_price":

"9.999"

"volume":

"1"

"margin\_mode":

"isolated"

"position\_margin":

"1.9938006"

"margin\_rate":

"0.100361270465293918"

"unreal\_profit":

"-0.001"

"profit":

"-0.001"

"profit\_rate":

"-0.0005000500050005"

"liquidation\_price":

"11.7928006"

}

\]

}

"tid":

"4a5479639bdf4ae997ac79e5dd56062d"

"success":

true

}