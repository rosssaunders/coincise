# GET [Cross] Query Assets And Positions

**Source:** [[Cross] Query Assets And Positions](https://www.htx.com/en-us/opend/newApiPages/?id=8cb81e77-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_account\_position\_info (\[Cross\] Query Assets And Positions)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | true | margin account | "USDT"...，but now only USDT |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| margin\_static | decimal | true | static margin |  |
| margin\_position | decimal | true | position margin (summary of all contract) |  |
| margin\_frozen | decimal | true | frozen margin (summary of all contract) |  |
| profit\_unreal | decimal | true | unrealized profits and losses (summary of all contract) |  |
| withdraw\_available | decimal | true | available transfer amount |  |
| risk\_rate | decimal | true | margin rate |  |
| money\_in | bigdecimal | true | money in |  |
| money\_out | bigdecimal | true | money out |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| CONTRACT\_DETAIL\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| lever\_rate | decimal | true | lever rate |  |
| adjust\_factor | decimal | true | adjustment factor |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| cross\_max\_available | bigdecimal | true | cross max available |  |
| trade\_partition | string | true | trade partition |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| CONTRACT\_DETAIL\_END |  | false |  |  |
| FUTURES\_CONTRACT\_DETAIL\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | future: "BTC-USDT-210625" ... |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| lever\_rate | decimal | true | lever rate |  |
| adjust\_factor | decimal | true | adjustment factor |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| cross\_max\_available | bigdecimal | true | cross max available |  |
| trade\_partition | string | true | trade partition |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| FUTURES\_CONTRACT\_DETAIL\_END |  | false |  |  |
| POSITIONS\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| new\_risk\_rate | bigdecimal | true | cross max available |  |
| trade\_partition | string | true | trade partition |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| volume | decimal | true | position quantity |  |
| available | decimal | true | available position can be closed |  |
| frozen | decimal | true | frozen quantity |  |
| cost\_open | decimal | true | opening average price |  |
| cost\_hold | decimal | true | average price of position |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| profit\_rate | decimal | true | profit rate |  |
| profit | decimal | true | profit |  |
| margin\_asset | string | true | margin asset |  |
| position\_margin | decimal | true | position margin |  |
| lever\_rate | int | true | lever rate |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | latest price |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| POSITIONS\_END |  | false |  |  |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by “adl\_risk\_percent” | 1、2、3、4、5 |
| DATA\_END |  | false |  |  |

#### Request example

{

"margin\_account":

"USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

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

48945.9

"cost\_hold":

48945.9

"profit\_unreal":

0.0342

"profit\_rate":

0.00349365319669267

"lever\_rate":

5

"position\_margin":

9.79602

"direction":

"buy"

"profit":

0.0342

"last\_price":

48980.1

"margin\_asset":

"USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"contract\_type":

"swap"

"pair":

"BTC-USDT"

"business\_type":

"swap"

"position\_mode":

"dual\_side"

}

1:{

"symbol":

"BTC"

"new\_risk\_rate":

""

"trade\_partition":

""

"contract\_code":

"BTC-USDT-211210"

"volume":

1

"available":

1

"frozen":

0

"cost\_open":

48929.7

"cost\_hold":

48929.7

"profit\_unreal":

0.0369

"profit\_rate":

0.003770715945530015

"lever\_rate":

5

"position\_margin":

9.79332

"direction":

"buy"

"profit":

0.0369

"last\_price":

48966.6

"margin\_asset":

"USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"contract\_type":

"this\_week"

"pair":

"BTC-USDT"

"business\_type":

"futures"

"position\_mode":

"dual\_side"

}

\]

"futures\_contract\_detail":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211217"

"margin\_position":

0

"margin\_frozen":

0

"margin\_available":

9716.43771679

"profit\_unreal":

0

"liquidation\_price":

NULL

"lever\_rate":

5

"adjust\_factor":

0.04

"contract\_type":

"next\_week"

"cross\_max\_available":

""

"trade\_partition":

""

"pair":

"BTC-USDT"

"business\_type":

"futures"

}

1:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"margin\_position":

9.79332

"margin\_frozen":

0

"margin\_available":

9716.43771679

"profit\_unreal":

0.0369

"liquidation\_price":

NULL

"lever\_rate":

5

"adjust\_factor":

0.04

"contract\_type":

"this\_week"

"cross\_max\_available":

""

"trade\_partition":

""

"pair":

"BTC-USDT"

"business\_type":

"futures"

}

2:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211231"

"margin\_position":

0

"margin\_frozen":

264

"margin\_available":

9716.43771679

"profit\_unreal":

0

"liquidation\_price":

NULL

"lever\_rate":

1

"adjust\_factor":

0.005

"contract\_type":

"quarter"

"cross\_max\_available":

""

"trade\_partition":

""

"pair":

"BTC-USDT"

"business\_type":

"futures"

}

\]

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"margin\_asset":

"USDT"

"margin\_balance":

10000.02705679

"margin\_static":

9999.95595679

"margin\_position":

19.58934

"margin\_frozen":

264

"profit\_real":

\-0.04404321

"profit\_unreal":

0.0711

"withdraw\_available":

9716.36661679

"risk\_rate":

4752.827989089614

"money\_in":

""

"money\_out":

""

"new\_risk\_rate":

""

"position\_mode":

"dual\_side"

"adl\_risk\_percent":

"3"

"contract\_detail":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"margin\_position":

9.79602

"margin\_frozen":

0

"margin\_available":

9716.43771679

"profit\_unreal":

0.0342

"liquidation\_price":

NULL

"lever\_rate":

5

"adjust\_factor":

0.04

"contract\_type":

"swap"

"cross\_max\_available":

""

"trade\_partition":

""

"pair":

"BTC-USDT"

"business\_type":

"swap"

}

\]

}

"ts":

1638758699818

}