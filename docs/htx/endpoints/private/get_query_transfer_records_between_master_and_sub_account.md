# GET Query transfer records between master and sub account

**Source:** [Query transfer records between master and sub account](https://www.htx.com/en-us/opend/newApiPages/?id=5d519cb8-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_master\_sub\_transfer\_record (Query transfer records between master and sub account)

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
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |
| transfer\_type | string | false | All by default【multiple types need to be joined with ';'】 | 34:transfer to sub account 35:transfer from sub account |  |
| create\_date | int | true | days | days need to be less than or equal to 90 |  |
| page\_index | int | false | 1 by default | 1 |  |
| page\_size | int | false | 20 by default.less than or equal to 50. | 20 |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | respone status | "ok" , "error" |
| ts | long | true | response millionseconds. |  |
| DATA\_START | object | true |  |  |
| TRANSFER\_RECORD\_START | object array | true |  |  |
| id | long | true | transfer id |  |
| ts | long | true | create timestamp |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC\_USD",... |
| sub\_uid | string | true | subaccount uid |  |
| sub\_account\_name | string | true | subaccount name |  |
| transfer\_type | int | true | transfer type | transfer from subaccount：35，transfer to subaccount:34 |
| amount | decimal | true | amount |  |
| TRANSFER\_RECORD\_END |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"page\_index":

1

"page\_size":

20

"sort\_by":

"created\_at"

"trade\_type":

0

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total\_page":

2

"current\_page":

1

"total\_size":

4

"transfer\_record":\[

0:{

"id":

927517392

"symbol":

"THETA"

"transfer\_type":

35

"amount":

10

"ts":

1603871064212

"sub\_uid":

"123456789"

"sub\_account\_name":

"tom"

"contract\_code":

"THETA-USD"

}

1:{

"id":

927489221

"symbol":

"THETA"

"transfer\_type":

34

"amount":

\-100

"ts":

1603869236524

"sub\_uid":

"123456789"

"sub\_account\_name":

"tom"

"contract\_code":

"THETA-USD"

}

\]

}

"ts":

1603871223290

}