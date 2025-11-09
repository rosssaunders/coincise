# GET Order details acquisition

**Source:** [Order details acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a565-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_order\_detail (Order details acquisition)

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
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |
| order\_id | long | true | Order ID |  |  |
| created\_at | long | false | Timestamp |  |  |
| order\_type | int | false | Order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |  |
| page\_index | int | false | Page number, default 1st page |  |  |
| page\_size | int | false | Default 20，no more than 50 |  |  |

Notes:  
When getting information on order cancellation via query order detail interface, users who type in parameters “created\_at” and “order\_type” can query last 6-hour data, while users who don’t type in parameters “created\_at” and “order\_type” can only query last 2-hour data.  
The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by jaso-bigint package.  
created\_at should use timestamp of long type as 13 bits (include Millisecond), if send the accurate timestamp for "created\_at", query performance will be improved.  
eg. the timestamp "2019/10/18 10:26:22" can be changed：1571365582123.It can also directly obtain the timestamp（ts) from the returned ordering interface(swap\_order) to query the corresponding orders.  
Please note that created\_at can't be "0"

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| data<object> |  | false |  |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | Contract Code | "BTC-USD" ... |
| lever\_rate | int | true | Leverage Rate | 1\\5\\10\\20 |
| direction | string | true | Transaction direction |  |
| offset | string | true | "open": "close" |  |
| volume | decimal | true | Number of Order |  |
| price | decimal | true | Price committed |  |
| created\_at | long | true | Creation time |  |
| order\_source | string | true | Order Source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_price\_type | string | true | order price type | "limit", "opponent","post\_only" Position limit will be applied to post\_only while order limit will not. |
| margin\_frozen | decimal | true | Frozen margin |  |
| profit | decimal | true | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | Client order ID |  |
| order\_type | int | false | Order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 10.Orders failed. 11. Orders cancelling. |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_turnover | decimal | true | Transaction aggregate amount |  |
| trade\_avg\_price | decimal | true | Transaction average price |  |
| total\_page | int | true | Page in total |  |
| current\_page | int | true | Current Page |  |
| total\_size | int | true | Total Size |  |
| instrument\_price | decimal | true | Liquidation price |  |
| final\_interest | decimal | true | Account Balance After Liquidation |  |
| adjust\_value | decimal | true | Adjustment Factor of Liquidating Order |  |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "BTC","ETH"... |
| fee | decimal | true | total amount of fees |  |
| liquidation\_type | string | true | Liquidation type | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | total real profit of order (calculated with the opening average price, include profit in history settlement.) |  |
| canceled\_source | string | false | timeout-canceled-order |  |
| LIST> (ATTRIBUTE NAME: TRADES\_START |  | false |  |  |
| id | string | true | the global unique ID of the trade. |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of swap-api/v1/swap\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_price | decimal | true | Match Price |  |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_turnover | decimal | true | Transaction price |  |
| trade\_fee | decimal | true | Transaction Service fee |  |
| role | string | true | taker or maker |  |
| created\_at | long | true | Creation time |  |
| profit | decimal | true | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.) |  |
| real\_profit | decimal | true | real profit of the transaction (calculated with the opening average price, include profit in history settlement.) |  |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| LIST\_END |  | false |  |  |
| OBJECT \_END |  | false |  |  |
| ts | long | true | Timestamp |  |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only the real profit parameter (real\_profit) of the transaction information that orders created after 0:00 on January 30, 2021 has a value . And of the other order transaction information that orders created before that times, the real profit parameter is 0.

#### Request example

{

"order\_id":

"456321"

"client\_order\_id":

"123456"

"contract\_code":

"BTC-USD"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"instrument\_price":

0

"final\_interest":

0

"adjust\_value":

0

"lever\_rate":

20

"direction":

"buy"

"offset":

"close"

"volume":

10

"price":

0.66

"created\_at":

1603727590740

"canceled\_at":

0

"order\_source":

"android"

"order\_price\_type":

"post\_only"

"margin\_frozen":

0

"profit":

1.0803950690222015

"trades":\[

0:{

"trade\_id":

49637561388

"trade\_price":

0.66

"trade\_volume":

10

"trade\_turnover":

100

"trade\_fee":

\-0.030303030303030304

"created\_at":

1603728041854

"role":

"maker"

"fee\_asset":

"THETA"

"real\_profit":

0

"profit":

1.0803950690222015

"id":

"49637561388-770434885714452480-1"

}

\]

"total\_page":

1

"current\_page":

1

"total\_size":

1

"liquidation\_type":

"0"

"fee\_asset":

"THETA"

"fee":

\-0.030303030303030304

"order\_id":

770434885714452500

"order\_id\_str":

"770434885714452480"

"client\_order\_id":

NULL

"order\_type":

"1"

"status":

6

"trade\_avg\_price":

0.66

"trade\_turnover":

100

"trade\_volume":

10

"is\_tpsl":

0

"real\_profit":

0

"canceled\_source":

"timeout-canceled-order"

}

"ts":

1603872939505

}