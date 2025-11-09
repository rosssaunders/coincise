# GET Futures Risk Limit

**Source:** [Get Futures Risk Limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195a1c64aef)

**Category:** Basic Information

## Authentication

Required (Private Endpoint)

### /v5/market/risk/limit (Get Futures Risk Limit)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get information from the Futures Risk Limit Table.

#### Request Address

| Environment | Address |
| --- | --- |
| Online (preferred by aws customers) | https://api.hbdm.vn |
| Online | https://api.hbdm.com |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | false | Symbol | "BTC-USDT", "ETH-USDT"…… |  |
| contract\_type | String | false | Contract type | swap: Perpetual; this\_week: Weekly; next\_week: Bi-weekly; quarter: Quarterly; next\_quarter: Bi-quarterly |  |
| margin\_mode | String | false | Margin mode | cross: Cross margin |  |
| tier | String | false | View designated position tier |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| contract\_code | String | true | Symbol | "BTC-USDT", "ETH-USDT"…… |
| contract\_type | String | true | Contract type | swap: Perpetual; this\_week: Weekly; next\_week: Bi-weekly; quarter: Quarterly; next\_quarter: Bi-quarterly |
| margin\_mode | String | true | Margin mode | cross: Cross margin |
| tier | String | true | View designated position tier |  |
| max\_lever | String | true | Current maximum leverage |  |
| maintenance\_margin\_rate | String | true | Current maintenance margin ratio |  |
| max\_volume | String | true | Current maximum position Cont |  |
| min\_volume | String | true | Current minimum position Cont |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

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

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"tier":

1

"max\_lever":

"200"

"maintenance\_margin\_rate":

"0.00385"

"max\_volume":

"400"

"min\_volume":

"1"

}

1:{

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"tier":

2

"max\_lever":

"100"

"maintenance\_margin\_rate":

"0.005"

"max\_volume":

"4000"

"min\_volume":

"401"

}

2:{

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"tier":

3

"max\_lever":

"50"

"maintenance\_margin\_rate":

"0.015"

"max\_volume":

"8000"

"min\_volume":

"4001"

}

3:{

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"tier":

4

"max\_lever":

"30"

"maintenance\_margin\_rate":

"0.02"

"max\_volume":

"120000"

"min\_volume":

"8001"

}

4:{

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"tier":

5

"max\_lever":

"20"

"maintenance\_margin\_rate":

"0.03"

"max\_volume":

"500000"

"min\_volume":

"120000"

}

\]

"ts":

1740126940401

}