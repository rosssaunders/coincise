# GET [Isolated] Current unfilled order acquisition

**Source:** [[Isolated] Current unfilled order acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=8cb85791-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_openorders (\[Isolated\] Current unfilled order acquisition)

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
| contract\_code | string | false | Contract Code,If empty, query all | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| page\_index | int | false | Page, default 1st page |  | 1 |
| page\_size | int | false | Default 20，no more than 50 |  | 20 |
| sort\_by | string | false | sort fields(descending) | “created\_at”descending order by order created at, "update\_time": descending order by order update time | created\_at |
| trade\_type | int | false | trade type(Default:all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long , 17:buy(one-way mode), 18:sell(one-way mode) | 0 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START | object | false |  |  |
| ORDERS\_START | array | false |  |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | Contract Code | "BTC-USDT" ... |
| volume | decimal | true | Number of Order |  |
| price | decimal | true | Price committed |  |
| order\_price\_type | string | true | type of order price | "limit":Limit,"opponent":opponent,"post\_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20，"fok":FOK Order，"ioc":IOC Order, "opponent\_ioc": opponent ioc，"lightning\_ioc": lightning ioc，"optimal\_5\_ioc": optimal\_5 ioc，"optimal\_10\_ioc": optimal\_10 ioc，"optimal\_20\_ioc"：optimal\_20 ioc，"opponent\_fok"： opponent fok，"lightning\_fok"：lightning fok，"optimal\_5\_fok"：optimal\_5 fok，"optimal\_10\_fok"：optimal\_10 fok，"optimal\_20\_fok"：optimal\_20 fok |
| order\_type | int | true | Order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| direction | string | true | Transaction direction | "buy","sell" |
| offset | string | true | "open": "close" | "open", "close", "both" |
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
| margin\_asset | string | true | margin asset |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |
| order\_source | string | true | Order Source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "USDT"... |
| liquidation\_type | string | true | liquidation type |  |
| canceled\_at | long | true | order Cancellation time |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| update\_time | Long | true | order update time ，millesecond timestamp |  |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| ORDERS\_END |  | false |  |  |
| total\_page | int | true | Total Pages |  |
| current\_page | int | true | Current Page |  |
| total\_size | int | true | Total Size |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| self\_match\_prevent\_new | string | true | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders allow: Allow self-trading |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Timestamp |  |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

{

"contract\_code":

"BTC-USDT"

"page\_index":

1

"page\_size":

50

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

"BTC"

"contract\_code":

"BTC-USDT"

"volume":

1

"price":

13329

"order\_price\_type":

"limit"

"order\_type":

1

"direction":

"sell"

"offset":

"open"

"lever\_rate":

10

"order\_id":

770326042832437200

"client\_order\_id":

57012021028

"created\_at":

1603701640576

"trade\_volume":

0

"trade\_turnover":

0

"fee":

0

"trade\_avg\_price":

NULL

"margin\_frozen":

1.3329

"profit":

0

"status":

3

"order\_source":

"api"

"order\_id\_str":

"770326042832437248"

"fee\_asset":

"USDT"

"liquidation\_type":

NULL

"canceled\_at":

NULL

"margin\_asset":

"USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"is\_tpsl":

0

"update\_time":

1606975980467

"real\_profit":

0

"reduce\_only":

0

}

\]

"total\_page":

2

"current\_page":

1

"total\_size":

2

"self\_match\_prevent\_new":

"cancel\_both"

}

"ts":

1603703993952

}