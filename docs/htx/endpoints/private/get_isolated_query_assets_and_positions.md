# GET [Isolated] Query Assets And Positions

**Source:** [[Isolated] Query Assets And Positions](https://www.htx.com/en-us/opend/newApiPages/?id=8cb81d85-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_account\_position\_info (\[Isolated\] Query Assets And Positions)

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
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC-USDT","ETH-USDT".... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | contract symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_asset | string | true | Margin Asset |  |
| margin\_balance | decimal | true | Balance Margin |  |
| margin\_static | decimal | true | Balance static |  |
| margin\_position | decimal | true | Postion Margin |  |
| margin\_frozen | decimal | true | Frozen Margin |  |
| margin\_available | decimal | true | Available Margin |  |
| profit\_unreal | decimal | true | Unreadlized Profit |  |
| risk\_rate | decimal | true | risk rate |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| rade\_partition | string | true | trade partition |  |
| liquidation\_price | decimal | true | Estimated Liquidation Price |  |
| withdraw\_available | decimal | true | Available Withdraw |  |
| lever\_rate | decimal | true | Leverage Rate |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| POSITIONS\_START | object array | true |  |  |
| symbol | string | true | Variety Code | "BTC","ETH"... |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| contract\_code | string | true | Contract Code | "BTC-USDT" ... |
| volume | decimal | true | Position Quantity |  |
| available | decimal | true | Available position quatity can be closed |  |
| frozen | decimal | true | forzen postion Quantity |  |
| cost\_open | decimal | true | Opening Average Price |  |
| cost\_hold | decimal | true | Average position price |  |
| profit\_unreal | decimal | true | Unrealized profit |  |
| profit\_rate | decimal | true | Profit Rate |  |
| profit | decimal | true | Profit |  |
| margin\_asset | string | true | Margin Asset |  |
| position\_margin | decimal | true | Position Margin |  |
| lever\_rate | int | true | Leverage Rate |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | Last Price |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| POSITIONS\_END |  | false |  |  |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by “adl\_risk\_percent” | 1、2、3、4、5 |
| DATA\_END |  | false |  |  |

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

"contract\_code":

"BTC-USDT"

"margin\_balance":

99.75173164

"margin\_position":

1.30699

"margin\_frozen":

12.73

"margin\_available":

85.71474164

"profit\_real":

\-0.0052272

"profit\_unreal":

0.0019

"risk\_rate":

7.0313477027482385

"new\_risk\_rate":

""

"trade\_partition":

""

"withdraw\_available":

85.71284164

"liquidation\_price":

NULL

"lever\_rate":

10

"adjust\_factor":

0.075

"margin\_static":

99.74983164

"positions":\[

0:{

"symbol":

"BTC"

"new\_risk\_rate":

""

"trade\_partition":

""

"contract\_code":

"BTC-USDT"

"volume":

1

"available":

1

"frozen":

0

"cost\_open":

13068

"cost\_hold":

13068

"profit\_unreal":

0.0019

"profit\_rate":

0.00145393327211509

"lever\_rate":

10

"position\_margin":

1.30699

"direction":

"buy"

"profit":

0.0019

"last\_price":

13069.9

"margin\_asset":

"USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"position\_mode":

"dual\_side"

"adl\_risk\_percent":

"3"

}

\]

"margin\_asset":

"USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"position\_mode":

"dual\_side"

"adl\_risk\_percent":

"3"

}

\]

"ts":

1603697944138

}