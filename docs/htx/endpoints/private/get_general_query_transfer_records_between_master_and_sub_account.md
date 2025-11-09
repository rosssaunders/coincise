# GET [General] Query transfer records between master and sub account

**Source:** [[General] Query transfer records between master and sub account](https://www.htx.com/en-us/opend/newApiPages/?id=8cb83c2c-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_master\_sub\_transfer\_record (\[General\] Query transfer records between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | true | margin account | "BTC-USDT","USDT"... |  |
| transfer\_type | string | false | All by default(multiple types need to be joined with ',') | 34:transfer to sub account 35:transfer from sub account |  |
| create\_date | int | true | days | days need to be less than or equal to 90 |  |
| page\_index | int | false | 1 by default |  |  |
| page\_size | int | false | 20 by default.less than or equal to 50. | \[1-50\] |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | respone status | "ok" , "error" |
| ts | long | true | response millionseconds. |  |
| DATA\_START | object | true |  |  |
| TRANSFER\_RECORD\_START | object array | true |  |  |
| id | long | true | transfer id |  |
| ts | long | true | create timestamp |  |
| asset | string | true | asset | "USDT"... |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| from\_margin\_account | string | true | from margin account | "BTC-USDT"... |
| to\_margin\_account | string | true | to margin account | "BTC-USDT"... |
| sub\_uid | string | true | subaccount uid |  |
| sub\_account\_name | string | true | subaccount name |  |
| transfer\_type | int | true | transfer type | 35:transfer from subaccount; 34:transfer to subaccount; |
| amount | decimal | true | amount |  |
| TRANSFER\_RECORD\_END |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"margin\_account":

"BTC-USDT"

"transfer\_type":

"34"

"create\_date":

30

"page\_index":

1

"page\_size":

50

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

2

"transfer\_record":\[

0:{

"id":

57920

"transfer\_type":

34

"amount":

\-10

"ts":

1603700211125

"sub\_uid":

"123436789"

"sub\_account\_name":

"tom"

"margin\_account":

"BTC-USDT"

"asset":

"USDT"

"to\_margin\_account":

"BTC-USDT"

"from\_margin\_account":

"BTC-USDT"

}

\]

}

"ts":

1603700414957

}