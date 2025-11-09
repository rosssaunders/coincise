# GET [Isolated] Query a single sub-account's position information

**Source:** [[Isolated] Query a single sub-account's position information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb827d0-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_sub\_position\_info (\[Isolated\] Query a single sub-account's position information)

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
| contract\_code | string | false | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| sub\_uid | long | true | sub-account UID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the handling result of requests | "ok" , "error" |
| ts | long | true | the create time point of response, unit: ms |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | type code | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_asset | string | true | margin asset |  |
| volume | decimal | true | open interest |  |
| available | decimal | true | available positions to close |  |
| frozen | decimal | true | amount of frozen positions |  |
| cost\_open | decimal | true | average price of open positions |  |
| cost\_hold | decimal | true | average price of positions |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| profit\_rate | decimal | true | profit rate |  |
| profit | decimal | true | profits |  |
| position\_margin | decimal | true | position margin |  |
| lever\_rate | int | true | leverage ratios |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | Latest price |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by “adl\_risk\_percent” | 1、2、3、4、5 |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"sub\_uid":

123456

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

"volume":

1

"available":

1

"frozen":

0

"cost\_open":

13038.7

"cost\_hold":

13038.7

"profit\_unreal":

0

"profit\_rate":

0

"lever\_rate":

10

"position\_margin":

1.30387

"direction":

"buy"

"profit":

0

"last\_price":

13038.7

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

"new\_risk\_rate":

""

"trade\_partition":

""

}

\]

"ts":

1603699081114

}