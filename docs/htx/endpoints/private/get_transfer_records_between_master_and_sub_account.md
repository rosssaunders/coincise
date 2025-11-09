# GET transfer records between master and sub account

**Source:** [Get transfer records between master and sub account](https://www.htx.com/en-us/opend/newApiPages/?id=28c30a22-77ae-11ed-9966-0242ac110003)

**Category:** Future Account Interface

## Authentication

Required (Private Endpoint)

### /api/v1/contract\_master\_sub\_transfer\_record (Get transfer records between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds. Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | symbol | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |  |
| transfer\_type | string | false | All by default【multiple types need to be joined with ';'】 | 34:transfer to sub account 35:transfer from sub account |  |
| create\_date | int | true | days | days need to be less than or equal to 90 |  |
| page\_index | int | false | 1 by default |  |  |
| page\_size | int | false | 20 by default.less than or equal to 50. | \[1-50\] |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | respone status | "ok" , "error" |
| ts | long | true | response millionseconds. |  |
| DATA\_START | object | true |  |  |
| TRANSFER\_RECORD\_START | objectarray | true |  |  |
| id | long | true | transfer id |  |
| ts | long | true | create timestamp |  |
| symbol | string | true | symbol | "BTC","ETH"... |
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

"symbol":

"BTC"

"transfer\_type":

"34"

"create\_date":

30

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

"data":{

"total\_page":

1

"current\_page":

1

"total\_size":

2

"transfer\_record":\[

0:{

"id":

3657499070

"symbol":

"ADA"

"transfer\_type":

34

"amount":

\-1

"ts":

1604309247860

"sub\_uid":

"123456789"

"sub\_account\_name":

"tom"

}

1:{

"id":

3657420904

"symbol":

"ADA"

"transfer\_type":

34

"amount":

\-50

"ts":

1604301623314

"sub\_uid":

"123456789"

"sub\_account\_name":

"tom"

}

\]

}

"ts":

1604309883224

}