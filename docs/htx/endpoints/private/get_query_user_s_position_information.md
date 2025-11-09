# GET Query User’s Position Information

**Source:** [Query User’s Position Information](https://www.htx.com/en-us/opend/newApiPages/?id=5d518648-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_position\_info (Query User’s Position Information)

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
| contract\_code | string | false | Contract Code | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| LIST>(ATTRIBUTE NAME: DATA\_START |  | false |  |  |
| symbol | string | true | Variety code | "BTC","ETH"... |
| contract\_code | string | true | Contract Code | e.g. "BTC-USD" |
| volume | decimal | true | Position quantity |  |
| available | decimal | true | Available position can be closed |  |
| frozen | decimal | true | frozen |  |
| cost\_open | decimal | true | Opening average price |  |
| cost\_hold | decimal | true | Average price of position |  |
| profit\_unreal | decimal | true | Unrealized profit and loss |  |
| profit\_rate | decimal | true | Profit rate |  |
| profit | decimal | true | profit |  |
| position\_margin | decimal | true | Position margin |  |
| lever\_rate | int | true | Leverage rate |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | Latest price |  |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by adl | 1、2、3、4、5 |
| liq\_px | string | true | Estimated liquidation price |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| LIST\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

Notes:  
f there are symbols in the settlement or delivery period,error code 1080(1080 In settlement or delivery. Unable to get positions of some contracts. ) will return without request parameters. It's suggested to query the position info with request parameters to avoid raising the error code and not being able to query the position.

#### Request example

{

"contract\_code":

"BTC-USD"

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

20

"available":

20

"frozen":

0

"cost\_open":

0.6048347107438017

"cost\_hold":

0.65931

"profit\_unreal":

\-10.5257562398811

"profit\_rate":

1.0158596753357925

"lever\_rate":

20

"position\_margin":

15.693659761456372

"direction":

"buy"

"profit":

16.795657677889032

"last\_price":

0.6372

"adl\_risk\_percent":

"3"

"liq\_px":

"112"

"new\_risk\_rate":

""

"trade\_partition":

""

}

\]

"ts":

1603868312729

}