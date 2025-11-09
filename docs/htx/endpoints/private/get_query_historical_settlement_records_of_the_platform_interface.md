# GET Query historical settlement records of the platform interface

**Source:** [Query historical settlement records of the platform interface](https://www.htx.com/en-us/opend/newApiPages/?id=5d516eca-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_settlement\_records (Query historical settlement records of the platform interface)

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
| contract\_code | string | true | Contract Code | "BTC-USD","ETH-USD"... |  |
| start\_time | long | false | Start time（timestamp，unit: millisecond） | Value range: \[(Current time minus 90 days), Current time\] ，default current time minus 90 days |  |
| end\_time | long | false | End time（timestamp，unit: millisecond） | Value range: (start\_time, current time)，default current time |  |
| page\_index | int | false | Page, default page 1 if not filled |  |  |
| page\_size | int | false | Page items, default 20, shall not exceed 50 |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Response generation time point, unit: millisecond |  |
| DATA\_START | object array | true |  |  |
| SETTLEMENT\_RECORD\_START | object array | true |  |  |
| symbol | string | true | Token Code |  |
| contract\_code | string | true | Contract Code | "BTC-USD" ... |
| settlement\_time | long | true | Settlement Time（timestamp，unit: millisecond）（when the settlement\_type is delivery, the time is delivery time; when the settlement\_type is settlement, the time is settlement time） |  |
| clawback\_ratio | decimal | true | Clawback Ratio |  |
| settlement\_price | decimal | true | Settlement Price（when the settlement\_type is delivery, the price is delivery price; when the settlement\_type is settlement, the price is settlement price；） |  |
| settlement\_type | string | true | Settlement Type | “delivery”：Delivery，“settlement”：Settlement |
| SETTLEMENT\_RECORD\_END |  | false |  |  |
| total\_page | int | true | Total Pages |  |
| current\_page | int | true | Current Page |  |
| total\_size | int | true | Total page items |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/swap-api/v1/swap_settlement_records?contract_code=BTC-USD&sub_uid=321456"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total\_page":

271

"current\_page":

1

"total\_size":

271

"settlement\_record":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USD"

"settlement\_time":

1606377600000

"clawback\_ratio":

0

"settlement\_price":

17596.8

"settlement\_type":

"settlement"

}

\]

}

"ts":

1606379293628

}