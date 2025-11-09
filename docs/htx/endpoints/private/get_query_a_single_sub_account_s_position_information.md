# GET Query a single sub-account's position information

**Source:** [Query a single sub-account's position information](https://www.htx.com/en-us/opend/newApiPages/?id=5d518e1a-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_sub\_position\_info (Query a single sub-account's position information)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |
| sub\_uid | long | true | sub-account UID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the handling result of requests | "ok" , "error" |
| ts | long | true | the create time point of response, unit: ms |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | type code | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USD" ... |
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
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by adl | 1、2、3、4、5 |
| liq\_px | string | true | Estimated liquidation price |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"lever\_rate":

10

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"volume":

2

"available":

2

"frozen":

0

"cost\_open":

0.62995

"cost\_hold":

0.62995

"profit\_unreal":

\-0.0166228057147171

"profit\_rate":

\-0.01047153645998604

"lever\_rate":

20

"position\_margin":

1.586596433331218

"direction":

"sell"

"profit":

\-0.0166228057147171

"last\_price":

0.63028

"adl\_risk\_percent":

"3"

"liq\_px":

"9980"

"new\_risk\_rate":

""

"trade\_partition":

""

}

\]

"ts":

1603869954515

}