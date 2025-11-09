# GET [Isolated] Query User’s Account Information

**Source:** [[Isolated] Query User’s Account Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb81843-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_account\_info (\[Isolated\] Query User’s Account Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false |  | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_asset | string | true | Margin Asset |  |
| margin\_balance | decimal | true | Account rights |  |
| margin\_position | decimal | true | Position Margin |  |
| margin\_frozen | decimal | true | Frozen margin |  |
| margin\_available | decimal | true | Available margin |  |
| profit\_unreal | decimal | true | Unrealized profit |  |
| risk\_rate | decimal | true | risk rate |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| liquidation\_price | decimal | true | Estimated liquidation price |  |
| withdraw\_available | decimal | true | Available withdrawal |  |
| lever\_rate | decimal | true | Leverage Rate |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| margin\_static | decimal | true | Static Margin |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

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

"margin\_balance":

99.75505884

"margin\_position":

0

"margin\_frozen":

12.73

"margin\_available":

87.02505884

"profit\_real":

0

"profit\_unreal":

0

"risk\_rate":

7.761218290652003

"new\_risk\_rate":

""

"trade\_partition":

""

"withdraw\_available":

87.02505884

"liquidation\_price":

NULL

"lever\_rate":

10

"adjust\_factor":

0.075

"margin\_static":

99.75505884

"contract\_code":

"BTC-USDT"

"margin\_asset":

"USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"position\_mode":

"dual\_side"

}

\]

"ts":

1603697381238

}