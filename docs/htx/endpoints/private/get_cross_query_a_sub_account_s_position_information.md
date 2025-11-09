# GET [Cross] Query A Sub-Account's Position Information

**Source:** [[Cross] Query A Sub-Account's Position Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb828a7-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_sub\_position\_info (\[Cross\] Query A Sub-Account's Position Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-211225. When both of pair、contract\_type and contract\_code filled in, the contract\_code is the preferred. when no one filled in, return all contract type's data(swap and futures)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| sub\_uid | long | true | sub-account UID |  |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
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
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by “adl\_risk\_percent” | 1、2、3、4、5 |
| new\_risk\_rate | bigdecimal | true | trade partition |  |
| trade\_partition | string | true | new risk rate |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"sub\_uid":

123456

"pair":

"BTC-USDT"

"contract\_type":

"swap"

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

"BTC-USDT-211231"

"volume":

1

"available":

1

"frozen":

0

"cost\_open":

48886.7

"cost\_hold":

48886.7

"profit\_unreal":

\-0.0653

"profit\_rate":

\-0.00133574162297721

"lever\_rate":

1

"position\_margin":

48.952

"direction":

"sell"

"profit":

\-0.0653

"last\_price":

48952

"margin\_asset":

"USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"contract\_type":

"quarter"

"pair":

"BTC-USDT"

"business\_type":

"futures"

"position\_mode":

"dual\_side"

"adl\_risk\_percent":

"3"

"new\_risk\_rate":

""

"trade\_partition":

""

}

\]

"ts":

1638759509329

}