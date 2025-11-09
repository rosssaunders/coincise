# GET Query User’s Account Information

**Source:** [Query User’s Account Information](https://www.htx.com/en-us/opend/newApiPages/?id=5d5184f4-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_account\_info (Query User’s Account Information)

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
| contract\_code | string | false | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| LIST>(ATTRIBUTE NAME: DATA\_START |  | false |  |  |
| symbol | string | true | Variety code | "BTC","ETH"... |
| contract\_code | string | true | Contract Code | e.g. "BTC-USD" |
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
| LIST\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"THETA-USD"

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

"margin\_balance":

717.6009609625614

"margin\_position":

15.4834713942866

"margin\_frozen":

13.765413852951653

"margin\_available":

688.3520757153232

"profit\_real":

0

"profit\_unreal":

\-6.321988896485648

"risk\_rate":

24.134301218550508

"new\_risk\_rate":

""

"trade\_partition":

""

"withdraw\_available":

688.3520757153232

"liquidation\_price":

0.1985845228428234

"lever\_rate":

20

"adjust\_factor":

0.4

"margin\_static":

723.9229498590471

"contract\_code":

"THETA-USD"

}

\]

"ts":

1603866747447

}