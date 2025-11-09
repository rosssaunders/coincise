# GET [Cross] Query User's Account Information

**Source:** [[Cross] Query User's Account Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb819b6-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_account\_info (\[Cross\] Query User's Account Information)

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
| margin\_account | string | false | margin account，return all margin account info when null | "USDT"...，but now only USDT |  |

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

"data":\[

0:{

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

10000

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

0

"margin\_frozen":

0

"margin\_available":

10000

"profit\_unreal":

0

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

0

"margin\_available":

10000

"profit\_unreal":

0

"liquidation\_price":

NULL

"lever\_rate":

5

"adjust\_factor":

0.04

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

10000

"margin\_static":

10000

"margin\_position":

0

"margin\_frozen":

0

"profit\_unreal":

0

"withdraw\_available":

10000

"risk\_rate":

NULL

"money\_in":

""

"money\_out":

""

"new\_risk\_rate":

""

"position\_mode":

"dual\_side"

"contract\_detail":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"margin\_position":

0

"margin\_frozen":

0

"margin\_available":

10000

"profit\_unreal":

0

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

\]

"ts":

1638757139907

}