# GET Query Trigger Order History

**Source:** [Query Trigger Order History](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b2f5-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_trigger\_hisorders (Query Trigger Order History)

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
| contract\_code | string | true | Contract Code | BTC-USD |  |
| trade\_type | int | true | Transaction type | 0: All ,1: Open Long,2: Close Short,3: Open Short,4: Close Long；the system will transfer these parameters into offset and direction and query the requested data. Please note that no data can be requested with parameter out of this range. |  |
| status | string | true | Order Status | data divided with several commas, trigger orders ready to be submitted：0: All (All filled orders),4: Trigger orders successfully submitted,5: Trigger orders failed being submitted, 6: Trigger orders cancelled |  |
| create\_date | int | true | Date | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default. |  |
| page\_index | int | false | Page, 1st page by default without given instruction | page，1st page by default without given instruction | 1 |
| page\_size | int | false | Page 20 by default without given instruction, ，no more than 50 | Page 20 by default without given instruction, ，no more than 50 | 20 |
| sort\_by | string | false | sort fields(descending) | "created\_at"：descending order by order creation time, "update\_time": descending order by order update time | created\_at |

Notes:  
Default to query completed orders (order status is one of 4, 5, 6);

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| total\_page | int | true | Total page |  |
| current\_page | int | true | Current page |  |
| total\_size | int | true | Total Size |  |
| \\ <list\\>(Attribute Name: orders) |  | false |  |  |
| symbol | string | true | Cryptocurrency |  |
| contract\_code | string | true | Contract Code |  |
| trigger\_type | string | true | trigger： ge Equal to or Greater than；le Less than or Equal to |  |
| volume | decimal | true | Numbers of order placed |  |
| order\_type | int | true | Transaction type：1、Place orders 2、Cancel orders |  |
| direction | string | true | order direction, \[Buy (buy), Sell(sell)\] |  |
| offset | string | true | offset direction \[Open(open), Close(lose)\] |  |
| lever\_rate | int | true | lever rate |  |
| order\_id | long | true | Trigger order ID |  |
| order\_id\_str | string | true | the order ID with string |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed. |  |
| order\_price\_type | string | true | order type "limit": Limit order price，"optimal\_5": Optimal 5 price level，"optimal\_10":Optimal 10 price level，"optimal\_20": the Optimal 20 price level |  |
| order\_price\_type | string | true | order price type "limit": limit order，"optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20 |  |
| status | int | true | Order status (4:Orders accepted、5: Orders failing being placed、6: Orders canceled ) |  |
| order\_source | string | true | Order source（system、web、api、m、risk、settlement、ios、android、windows、mac、trigger） |  |
| trigger\_price | decimal | true | trigger price |  |
| triggered\_price | decimal | true | the price when trigger orders executed |  |
| order\_price | decimal | true | the order price preset by the client |  |
| created\_at | long | true | the order creation time |  |
| triggered\_at | long | true | the execution time when orders getting triggered. |  |
| order\_insert\_at | long | true | the time when the triggered orders filled successfully. |  |
| canceled\_at | long | true | Order cancelation time |  |
| update\_time | long | true | order update time，millesecond timestamp |  |
| fail\_code | int | true | the error code when the triggered orders failed to be filled |  |
| fail\_reason | string | true | the error message with failure reason when triggered orders failed to filled. |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"page\_index":

1

"page\_size":

20

"trade\_type":

0

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"orders":\[

0:{

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"trigger\_type":

"ge"

"volume":

25

"order\_type":

1

"direction":

"sell"

"offset":

"open"

"lever\_rate":

20

"order\_id":

7002242

"order\_id\_str":

"7002242"

"relation\_order\_id":

"-1"

"order\_price\_type":

"limit"

"status":

6

"order\_source":

"api"

"trigger\_price":

0.72

"triggered\_price":

NULL

"order\_price":

0.72

"created\_at":

1603874287699

"update\_time":

1603874287699

"triggered\_at":

NULL

"order\_insert\_at":

0

"canceled\_at":

1603874307539

"fail\_code":

NULL

"fail\_reason":

NULL

}

\]

"total\_page":

7

"current\_page":

1

"total\_size":

7

}

"ts":

1603874865911

}