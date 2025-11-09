# GET 【Coin-M Swaps】Query user’s settlement records

**Source:** [【Coin-M Swaps】Query user’s settlement records](https://www.htx.com/en-us/opend/newApiPages/?id=5d5191f6-77b6-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_user\_settlement\_records (【Coin-M Swaps】Query user’s settlement records)

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
| contract\_code | string | true | contract code |  |  |
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
| SETTLEMENT\_RECORDS\_START | object array | true |  |  |
| symbol | string | true | Coin Code | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USD" ... |
| margin\_balance\_init | decimal | true | Initial account equity for this term |  |
| margin\_balance | decimal | true | Account equity after settlement for this term |  |
| settlement\_profit\_real | decimal | true | Realized PnL for this term |  |
| settlement\_time | long | true | Settlement time for this term; delivery time if at the delivery. |  |
| clawback | decimal | true | Clawback for this term |  |
| funding\_fee | decimal | true | Funding for this term |  |
| offset\_profitloss | decimal | true | Current term PnL of positions closed |  |
| fee | decimal | true | Transaction fee for this term |  |
| fee\_asset | string | true | Transaction Fee Coin |  |
| POSITIONS\_START | object array | true |  |  |
| symbol | string | true | Coin Code | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USD" ... |
| direction | string | true | Position Direction | \[buy : sell\] |
| volume | decimal | true | Position volume before the settlement of this term（volume） |  |
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

#### Request example

{

"contract":

"BTC-USD"

"type":

1

"start\_time":

1660119810000

"end\_time":

1660274746031

"direct":

"next"

"from\_id":

1110

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total\_page":

231

"current\_page":

1

"total\_size":

231

"settlement\_records":\[

0:{

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"margin\_balance\_init":

716.9105820184488

"margin\_balance":

723.9229498590471

"settlement\_profit\_real":

7.012367840598277

"settlement\_time":

1603843204027

"clawback":

0

"funding\_fee":

0.15243320057344192

"offset\_profitloss":

0

"fee":

0

"fee\_asset":

"THETA"

"positions":\[

0:{

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"direction":

"buy"

"volume":

20

"cost\_open":

0.6048347107438017

"cost\_hold\_pre":

0.64473

"cost\_hold":

0.65931

"settlement\_profit\_unreal":

6.859934640024835

"settlement\_price":

0.65931

"settlement\_type":

"settlement"

}

\]

}

\]

}

"ts":

1603870588781

}