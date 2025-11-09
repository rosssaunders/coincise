# GET Current unfilled order acquisition

**Source:** [Current unfilled order acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a6ad-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_openorders (Current unfilled order acquisition)

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
| contract\_code | string | false | Contract Code,If empty, query all |  | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |
| page\_index | int | false | Page, default 1st page |  | 1 |
| page\_size | int | false | Default 20，no more than 50 |  | 20 |
| sort\_by | string | false | sort fields(descending) | “created\_at” : descending order by order created at, "update\_time": descending order by order update time | created\_at |
| trade\_type | int | false | trade type(Default:all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long | 0 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| data: <list> |  | false |  |  |
| orders: <list> |  | false |  |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | Contract Code | "BTC-USD" ... |
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
| order\_source | string | true | Order Source | （system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl） |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "BTC","ETH"... |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| update\_time | Long | true | order update time ，millesecond timestamp |  |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| ORDERS\_END |  | false |  |  |
| total\_page | int | true | Total Pages |  |
| current\_page | int | true | Current Page |  |
| total\_size | int | true | Total Size |  |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| LIST\_END |  | false |  |  |
| ts | long | true | Timestamp |  |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_open_interest?contract_code=BTC-USD"`

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

"volume":

1

"price":

0.6

"order\_price\_type":

"post\_only"

"order\_type":

1

"direction":

"buy"

"offset":

"open"

"lever\_rate":

20

"order\_id":

771043577949732900

"client\_order\_id":

NULL

"created\_at":

1603872714279

"trade\_volume":

0

"trade\_turnover":

0

"fee":

0

"trade\_avg\_price":

NULL

"margin\_frozen":

0.8333333333333334

"profit":

0

"status":

3

"order\_source":

"api"

"order\_id\_str":

"771043577949732864"

"fee\_asset":

"THETA"

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

1603873042150

}