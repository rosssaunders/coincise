# GET Current Position

**Source:** [Get Current Position](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19594266bd8)

**Category:** Positions

## Authentication

Required (Private Endpoint)

### /v5/trade/position/opens (Get Current Position)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get information about your current position.

#### Request Address

| Environment | Address |
| --- | --- |
| Online (preferred by aws customers) | https://api.hbdm.vn |
| Online | https://api.hbdm.com |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | false |  |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| contract\_code | String | true | Symbol |  |
| position\_side | String | true | Position side | The side of your position. Under the buy/sell mode, "both" is default. Under the long/short mode, "long" refers to going long; "short" refers to going short. |
| direction | String | true | Order side | buy; sell |
| margin\_mode | String | true | Margin mode | cross: Cross margin |
| open\_avg\_price | String | true | Avg. entry price mode |  |
| volume | String | true | Position size (Cont) |  |
| available | String | true | Amount of position available to be closed (Cont) |  |
| lever\_rate | String | true | Leverage |  |
| adl\_risk\_percent | String | true | ADL indicator | Level 1, 2, 3, 4, 5, with level 1 representing the lowest risk and level 5 representing the highest risk. |
| liquidation\_price | String | true | Est. liquidation price |  |
| initial\_margin | String | true | Initial margin, only applicable to cross margin mode |  |
| maintenance\_margin | String | true | Maintenance margin margin, only applicable to cross margin mode |  |
| profit\_unreal | String | true | Unrealized PnL |  |
| profit\_rate | String | true | Unrealized PnL percentage PnL |  |
| margin\_rate | String | true | Margin ratio |  |
| margin\_currency | String | true | Margin currency (for pricing) |  |
| last\_price | decima | true | Last price |  |
| contract\_type | String | true | Contract type | swap: Perpetual; this\_week: Weekly; next\_week: Bi-weekly; quarter: Quarterly; next\_quarter: Bi-quarterly |
| created\_time | String | true | Creation time |  |
| updated\_time | String | true | Update time |  |

#### Request example

{

"contract\_code":

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

"contract\_code":

"ETH-USDT"

"position\_side":

"both"

"direction":

"buy"

"margin\_mode":

"cross"

"open\_avg\_price":

"1672.36"

"volume":

"10"

"available":

"10"

"lever\_rate":

5

"adl\_risk\_percent":

NULL

"liquidation\_price":

"-6615323.17169213120630934"

"initial\_margin":

"23.9516"

"maintenance\_margin":

"0.4490925"

"profit\_unreal":

"-47.478"

"profit\_rate":

"-1.9822"

"margin\_rate":

"0.000000681298594547"

"mark\_price":

"1197.58"

"margin\_currency":

"USDT"

"contract\_type":

"swap"

"created\_time":

1740451087505

"updated\_time":

1740451087505

}

\]

"ts":

1740451897695

}