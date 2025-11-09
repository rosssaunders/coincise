# GET Query Assets And Positions

**Source:** [Query Assets And Positions](https://www.htx.com/en-us/opend/newApiPages/?id=5d518799-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_account\_position\_info (Query Assets And Positions)

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
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC-USD","ETH-USD".... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result "ok" , "error" |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | contract symbol |  |
| contract\_code | string | true | contract code |  |
| margin\_balance | decimal | true | Balance Margin |  |
| margin\_static | decimal | true | Balance static |  |
| margin\_position | decimal | true | Postion Margin |  |
| margin\_frozen | decimal | true | Frozen Margin |  |
| margin\_available | decimal | true | Available Margin |  |
| profit\_unreal | decimal | true | Unreadlized Profit |  |
| risk\_rate | decimal | true | risk rate |  |
| withdraw\_available | decimal | true | Available Withdraw |  |
| liquidation\_price | decimal | true | Estimated Liquidation Price |  |
| lever\_rate | decimal | true | Leverage Rate |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| margin\_static | decimal | true | margin static |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| POSITIONS\_START | object array | false |  |  |
| symbol | string | true | Variety Code | "BTC","ETH"... |
| contract\_code | string | true | Contract Code "BTC-USD" ... | "BTC-USD" ... |
| volume | decimal | true | Position Quantity |  |
| available | decimal | true | Available position quatity can be closed |  |
| frozen | decimal | true | forzen postion Quantity |  |
| cost\_open | decimal | true | Opening Average Price |  |
| cost\_hold | decimal | true | Average position price |  |
| profit\_unreal | decimal | true | Unrealized profit |  |
| profit\_rate | decimal | true | Profit Rate |  |
| profit | decimal | true | Profit |  |
| position\_margin | decimal | true | Position Margin |  |
| lever\_rate | int | true | Leverage Rate |  |
| direction | string | true | transaction direction of positions "buy":long "sell":short |  |
| last\_price | decimal | true | Last Price |  |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by adl | 1、2、3、4、5 |
| POSITIONS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

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

"margin\_balance":

713.633454962959

"margin\_position":

15.681846694266717

"margin\_frozen":

13.765413852951653

"margin\_available":

684.1861944157407

"profit\_real":

0

"profit\_unreal":

\-10.289494896088003

"risk\_rate":

23.834290107178404

"withdraw\_available":

684.1861944157407

"liquidation\_price":

0.1985845228428234

"lever\_rate":

20

"adjust\_factor":

0.4

"margin\_static":

723.9229498590471

"new\_risk\_rate":

""

"trade\_partition":

""

"positions":\[

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

\-10.289494896088003

"profit\_rate":

1.0301495814890964

"lever\_rate":

20

"position\_margin":

15.681846694266717

"direction":

"buy"

"profit":

17.03191902168213

"last\_price":

0.63768

"adl\_risk\_percent":

"3"

}

\]

}

\]

"ts":

1603868847514

}