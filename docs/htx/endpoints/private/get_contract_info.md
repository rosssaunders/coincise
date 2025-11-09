# GET Contract Info

**Source:** [Get Contract Info](https://www.htx.com/en-us/opend/newApiPages/?id=28c2d918-77ae-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /api/v1/contract\_contract\_info (Get Contract Info)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

Interface description: contract elements it can display more futures fields, we recommend you to use it.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC","ETH"... |  |  |
| contract\_type | string | false | "this\_week","next\_week", "quarter" "next\_quarter" |  |  |
| contract\_code | string | false | BTC180914 |  |  |

Notes:  
If there is a number in the Contract Code row，inquiry with Contract\_Code. If there is no number，inquiry by Symbol + Contract Type. One of the query conditions must be chosen.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Product Code | "BTC","ETH"... |
| contract\_code | string | true | Contract Code | "BTC180914" ... |
| contract\_type | string | true | Contract Type | "this\_week","next\_week", "quarter" ,"next\_quarter" |
| contract\_size | decimal | true | Contract Value (USD of one contract) | 10, 100... |
| price\_tick | decimal | true | Minimum Variation of Contract Price | 0.001, 0.01... |
| delivery\_date | string | true | Contract Delivery Date | eg "20180720" |
| create\_date | string | true | Contract Listing Date | eg "20180706" |
| settlement\_time | string | true | Next settlement time（timestamp，unit: millisecond） |  |
| delivery\_time | string | true | delivery time（timestamp，unit: millisecond） |  |
| contract\_status | int | true | Contract Status | 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,5: In Settlement,6: Delivering,7: Settlement Completed,8: Delivered,9: Suspending of Trade |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_api_state"`

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

"BTC210813"

"contract\_type":

"this\_week"

"contract\_size":

100

"price\_tick":

0.01

"delivery\_date":

"20210813"

"delivery\_time":

"1628841600000"

"create\_date":

"20210730"

"contract\_status":

1

"settlement\_time":

"1628668800000"

}

1:{

"symbol":

"ETH"

"contract\_code":

"ETH210813"

"contract\_type":

"this\_week"

"contract\_size":

10

"price\_tick":

0.001

"delivery\_date":

"20210813"

"delivery\_time":

"1628841600000"

"create\_date":

"20210730"

"contract\_status":

1

"settlement\_time":

"1628668800000"

}

\]

"ts":

1628650535608

}