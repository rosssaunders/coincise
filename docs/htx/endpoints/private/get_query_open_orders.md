# GET Query Open Orders

**Source:** [Query Open Orders](https://www.htx.com/en-us/opend/newApiPages/?id=28c317fb-77ae-11ed-9966-0242ac110003)

**Category:** Future Trade Interface

## Authentication

Required (Private Endpoint)

### /api/v1/contract\_openorders (Query Open Orders)

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
| symbol | string | false | symbol,If empty, query all |  | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |
| page\_index | int | false | Page, default 1st page | 1 |  |
| page\_size | int | false | Default 20，no more than 50 | 20 | \[1-50\] |
| sort\_by | string | false | sort fields(descending) | created\_at | “created\_at”descending order by order created at, "update\_time": descending order by order update time |
| trade\_type | int | false | trade type(Default:all) | 0 | 0:all,1: buy long,2: sell short,3: buy short,4: sell long |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START |  | false |  |  |
| ORDERS\_START |  | false |  |  |
| symbol | string | true | Variety code |  |
| contract\_type | string | true | Contract Type | "this\_week","next\_week","quarter","next\_quarter" |
| contract\_code | string | true | Contract Code | "BTC180914" ... |
| volume | decimal | true | Number of Order |  |
| price | decimal | true | Price committed |  |
| order\_price\_type | string | true | order price type | "limit", "opponent","post\_only" Position limit will be applied to post\_only while order limit will not. |
| order\_type | int | true | Order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| direction | string | true | Transaction direction |  |
| offset | string | true | "open": "close" |  |
| lever\_rate | int | true | Leverage Rate | 1\\5\\10\\20 |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | Client order ID |  |
| created\_at | long | true | Order Creation time |  |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_turnover | decimal | true | Transaction aggregate amount |  |
| fee | decimal | true | Service fee |  |
| trade\_avg\_price | decimal | true | Transaction average price |  |
| margin\_frozen | decimal | true | Frozen margin |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| order\_source | string | true | Order Source | ( system. web. api. m. risk. settlement. ios. android. windows. mac. trigger. tpsl) |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "BTC","ETH"... |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| update\_time | Long | true | order update time ，millesecond timestamp |  |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| ORDERS\_END |  | false |  |  |
| total\_page | int | true | Total Pages |  |
| current\_page | int | true | Current Page |  |
| total\_size | int | true | Total Size |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Timestamp |  |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

{

"symbol":

"BTC"

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

"orders":\[

0:{

"symbol":

"ADA"

"contract\_code":

"ADA201225"

"contract\_type":

"quarter"

"volume":

1

"price":

0.0925

"order\_price\_type":

"post\_only"

"order\_type":

1

"direction":

"buy"

"offset":

"close"

"lever\_rate":

20

"order\_id":

773131315209248800

"client\_order\_id":

NULL

"created\_at":

1604370469629

"trade\_volume":

0

"trade\_turnover":

0

"fee":

0

"trade\_avg\_price":

NULL

"margin\_frozen":

0

"profit":

0

"status":

3

"order\_source":

"web"

"order\_id\_str":

"773131315209248768"

"fee\_asset":

"ADA"

"liquidation\_type":

NULL

"canceled\_at":

NULL

"is\_tpsl":

0

"update\_time":

1606975980467

"real\_profit":

0

}

\]

"total\_page":

1

"current\_page":

1

"total\_size":

1

}

"ts":

1604370488518

}