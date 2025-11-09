# GET Query user’s settlement records

**Source:** [Query user’s settlement records](https://www.htx.com/en-us/opend/newApiPages/?id=28c2fb51-77ae-11ed-9966-0242ac110003)

**Category:** Future Account Interface

## Authentication

Required (Private Endpoint)

### /api/v1/contract\_user\_settlement\_records (Query user’s settlement records)

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
| symbol | string | true | contract symbol | "BTC","ETH"... |  |
| start\_time | long | false | start time（Timestamp，Unit: Millisecond） | Value Range: \[(current time - 90 days), current time\] ，default current day - 90 days |  |
| end\_time | long | false | end time（Timestamp，Unit: Millisecond） | Value Range: (start\_time, current time\]，default current time |  |
| page\_index | int | false | Page | 1st page by default without given instruction |  |
| page\_size | int | false | page size | Page 20 by default without given instruction, ，no more than 50 |  |

Notes:  
The data is queried in reverse order by default; the newer the data, the closer to the front.  
If the start time or the end time is not within the value range, the system will report an error 1067 to indicate the parameter is invalid.  
Query users' settlement records with settlement start time behind the start\_time but before the end\_time.  
This interface only supports users to query data for the last 90 days.  

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START | object | true |  |  |
| SETTLEMENT\_RECORDS\_START | objectarray | true |  |  |
| symbol | string | true | Contract Code | "BTC","ETH"... |
| margin\_balance\_init | decimal | true | Initial account equity for this term |  |
| margin\_balance | decimal | true | Account equity after settlement for this term |  |
| settlement\_profit\_real | decimal | true | Realized PnL for this term |  |
| settlement\_time | long | true | Settlement time for this term; delivery time if at the delivery. |  |
| clawback | decimal | true | Clawback for this term |  |
| delivery\_fee | decimal | true | Delivery fee for this term（total fee of long and short positions）, the field has value only when the positions are at the delivery |  |
| offset\_profitloss | decimal | true | Current term PnL of positions closed |  |
| fee | decimal | true | Transaction fee for this term |  |
| fee\_asset | string | true | Transaction Fee Coin |  |
| POSITIONS\_START | objectarray | true |  |  |
| symbol | string | true | Coin Code | "BTC","ETH"... |
| contract\_code | string | true | Contract Code | "BTC200619" ... |
| direction | string | true | Position Direction | \[buy : sell \] |
| volume | decimal | true | Position volume before the settlement of this term（cont） |  |
| cost\_open | decimal | true | Open price |  |
| cost\_hold\_pre | decimal | true | Average position price before the settlement of this term |  |
| cost\_hold | decimal | true | Average position price after the settlement of this term |  |
| settlement\_profit\_unreal | decimal | true | Unrealized PnL for this term |  |
| settlement\_price | decimal | true | Settlement price for this term; delivery price if at the delivery. |  |
| settlement\_type | string | true | Settlement Type | settlement: settlement；delivery: delivery； |
| POSITIONS\_END |  | false |  |  |
| SETTLEMENT\_RECORDS\_END |  | false |  |  |
| total\_page | int | true | Total Pages |  |
| current\_page | int | true | Current Page |  |
| total\_size | int | true | Total Size |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Timestamp |  |

Notes:  
Rule:  
settlement\_time for this term is the start time of the settlement.  
As long as the user has had funds, there will be settlement records. If the user queried has no settlement record, no data will be returned. (data will be an empty array)

#### Request example

{

"symbol":

"BTC"

"start\_time":

1660119810000

"end\_time":

1660274746031

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

13

"current\_page":

1

"total\_size":

13

"settlement\_records":\[

0:{

"symbol":

"ADA"

"margin\_balance\_init":

436.4159070661078

"margin\_balance":

436.7956042232747

"settlement\_profit\_real":

0.37969715716693053

"settlement\_time":

1604044800130

"clawback":

0

"delivery\_fee":

0

"offset\_profitloss":

13.259773191595539

"fee":

\-0.5653571299770925

"fee\_asset":

"ADA"

"positions":\[

0:{

"symbol":

"ADA"

"contract\_code":

"ADA201225"

"direction":

"buy"

"volume":

2

"cost\_open":

0.098

"cost\_hold\_pre":

0.098

"cost\_hold":

0.092423

"settlement\_profit\_unreal":

\-12.314718904451516

"settlement\_price":

0.092423

"settlement\_type":

"settlement"

}

\]

}

\]

}

"ts":

1604305358564

}