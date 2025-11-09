# GET Query information on Tiered Adjustment Factor

**Source:** [Query information on Tiered Adjustment Factor](https://www.htx.com/en-us/opend/newApiPages/?id=5d516401-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_adjustfactor (Query information on Tiered Adjustment Factor)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Case-Insenstive.e.g. "BTC-USD" |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | Contract Code | e.g. "BTC-USD" |
| LIST\_START |  | false |  |  |
| lever\_rate | int | true | Leverage |  |
| LADDERS\_START |  | false |  |  |
| min\_size | decimal | true | Min net position limit |  |
| max\_size | decimal | true | Max net position limit |  |
| ladder | int | true | Tier |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| LADDERS\_END |  | false |  |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_adjustfactor?contract_code=BTC-USD"`

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

"BTC-USD"

"list":\[

0:{

"lever\_rate":

125

"ladders":\[

0:{

"ladder":

0

"min\_size":

0

"max\_size":

1999

"adjust\_factor":

0.65

}

1:{

"ladder":

1

"min\_size":

2000

"max\_size":

9999

"adjust\_factor":

0.8

}

2:{

"ladder":

2

"min\_size":

10000

"max\_size":

NULL

"adjust\_factor":

0.85

}

\]

}

\]

}

\]

"ts":

1603865852805

}