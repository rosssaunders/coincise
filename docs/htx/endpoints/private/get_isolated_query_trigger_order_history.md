# GET [Isolated] Query Trigger Order History

**Source:** [[Isolated] Query Trigger Order History](https://www.htx.com/en-us/opend/newApiPages/?id=8cb87658-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_trigger\_hisorders (\[Isolated\] Query Trigger Order History)

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
| contract\_code | string | true | Contract Code | BTC-USDT |  |
| trade\_type | int | true | Transaction type | 0: All ,1: Open Long,2: Close Short,3: Open Short,4: Close Long, 17:buy(one-way mode), 18:sell(one-way mode)；the system will transfer these parameters into offset and direction and query the requested data. Please note that no data can be requested with parameter out of this range. |  |
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
| DATA\_START |  | true |  |  |
| total\_page | int | true | Total page |  |
| current\_page | int | true | Current page |  |
| total\_size | int | true | Total Size |  |
| ORDERS\_START |  | false |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | Contract Code |  |
| trigger\_type | string | true | trigger： ge Equal to or Greater than；le Less than or Equal to |  |
| volume | decimal | true | Numbers of order placed |  |
| order\_type | int | true | Transaction type：1、Place orders 2、Cancel orders |  |
| direction | string | true | order direction, \[Buy (buy), Sell(sell)\] |  |
| offset | string | true | offset direction \[Open(open), Close(lose), both\] |  |
| lever\_rate | int | true | leverage 1\\5\\10\\20 |  |
| order\_id | long | true | Trigger order ID |  |
| order\_id\_str | string | true | the order ID with string |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders The value is -1 before the trigger orders executed. |  |
| order\_price\_type | string | true | order type "limit": Limit order price，"optimal\_5": Optimal 5 price level，"optimal\_10":Optimal 10 price level，"optimal\_20": the Optimal 20 price level |  |
| status | int | true | Order status (4:Orders accepted、5: Orders failing being placed、6: Orders canceled ) |  |
| order\_source | string | true | Order source( system、web、api、m、risk、settlement、ios、android、windows、mac、trigger) |  |
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
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| reduce\_only | int | false | 0: no, 1: yes |  |
| ORDERS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"trade\_type":

0

"status":

0

"create\_date":

30

"page\_index":

1

"page\_size":

50

"sort\_by":

"created\_at"

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

"BTC"

"contract\_code":

"BTC-USDT"

"trigger\_type":

"ge"

"volume":

1

"order\_type":

1

"direction":

"sell"

"offset":

"open"

"lever\_rate":

10

"order\_id":

3

"order\_id\_str":

"3"

"relation\_order\_id":

"-1"

"order\_price\_type":

"limit"

"status":

6

"order\_source":

"api"

"trigger\_price":

13900

"triggered\_price":

NULL

"order\_price":

13900

"created\_at":

1603705155231

"triggered\_at":

NULL

"order\_insert\_at":

0

"canceled\_at":

1603705159520

"update\_time":

1603705159520

"fail\_code":

NULL

"fail\_reason":

NULL

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"reduce\_only":

0

}

\]

"total\_page":

3

"current\_page":

1

"total\_size":

3

}

"ts":

1603705603369

}