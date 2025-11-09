# GET Query a single sub-account's assets information

**Source:** [Query a single sub-account's assets information](https://www.htx.com/en-us/opend/newApiPages/?id=5d518cd2-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_sub\_account\_info (Query a single sub-account's assets information)

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
| contract\_code | string | false |  | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |
| sub\_uid | long | true |  | sub-account UID |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the handling result of requests | "ok" , "error" |
| ts | long | true | the create time point of response, unit: ms |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | type code | "BTC","ETH"...when the$contract\_code value is "\*", it will subscribe all contract types |
| contract\_code | string | true | contract code | e.g. "BTC-USD" |
| margin\_balance | decimal | true | account equity |  |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| risk\_rate | decimal | true | margin rate |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| withdraw\_available | decimal | true | available transfer amount |  |
| lever\_rate | int | true | leverage ratios |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| margin\_static | decimal | true | Static Margin |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| DATA\_END |  | false |  |  |

Notes:  
Only query account information for activated contract sub-account (i.e. sub-accounts that have gained contract trading permission);  
No data return for sub-accounts which has logged in hbdm but have not gained trading permission/activated.  

#### Request example

{

"contract\_code":

"BTC-USD"

"page\_index":

1

"page\_size":

20

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

100

"margin\_position":

0

"margin\_frozen":

1.5748031496062993

"margin\_available":

98.4251968503937

"profit\_real":

0

"profit\_unreal":

0

"risk\_rate":

63.1

"withdraw\_available":

98.4251968503937

"liquidation\_price":

NULL

"lever\_rate":

20

"adjust\_factor":

0.4

"margin\_static":

100

"new\_risk\_rate":

""

"trade\_partition":

""

"contract\_code":

"THETA-USD"

}

\]

"ts":

1603869680106

}