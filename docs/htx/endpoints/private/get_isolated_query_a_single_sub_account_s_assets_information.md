# GET [Isolated] Query a single sub-account's assets information

**Source:** [[Isolated] Query a single sub-account's assets information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8251a-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_sub\_account\_info (\[Isolated\] Query a single sub-account's assets information)

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
| contract\_code | string | true | contract code | e.g. "BTC-USDT" |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| risk\_rate | decimal | true | margin rate |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| withdraw\_available | decimal | true | available transfer amount |  |
| lever\_rate | int | true | leverage ratios |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| margin\_static | decimal | true | Static Margin |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| DATA\_END |  | false |  |  |

Notes:  
Only query account information for activated contract sub-account (i.e. sub-accounts that have gained contract trading permission);  
No data return for sub-accounts which has logged in hbdm but have not gained trading permission/activated.

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

"margin\_balance":

20

"margin\_position":

0

"margin\_frozen":

0

"margin\_available":

20

"profit\_real":

0

"profit\_unreal":

0

"risk\_rate":

NULL

"new\_risk\_rate":

""

"trade\_partition":

""

"withdraw\_available":

20

"liquidation\_price":

NULL

"lever\_rate":

5

"adjust\_factor":

0.04

"margin\_static":

20

"contract\_code":

"BTC-USDT"

"margin\_asset":

"USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"position\_mode":

"dual\_side"

}

\]

"ts":

1603698523200

}