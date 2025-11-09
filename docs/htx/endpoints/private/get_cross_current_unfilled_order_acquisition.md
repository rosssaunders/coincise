# GET [Cross] Current unfilled order acquisition

**Source:** [[Cross] Current unfilled order acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=8cb858fe-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_openorders (\[Cross\] Current unfilled order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair and contract\_code filled in, the contract\_code is the preferred. supports none any parameter filled in, it means all contract code in cross mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| page\_index | int | false | page index, default 1st page |  |  |
| page\_size | int | false | page size, default 20，no more than 50 |  |  |
| sort\_by | string | false | sort fields(Default: “created\_at” descending order) | “created\_at”: descending order by order created at, "update\_time": descending order by order update time |  |
| trade\_type | int | false | trade type(Default:all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long , 17.buy(one-way mode), 18.sell(one-way mode) |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START | object | true |  |  |
| ORDERS\_START | object | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| volume | decimal | true | place volume |  |
| price | decimal | true | place price |  |
| order\_price\_type | string | true | type of order price | "limit":Limit,"opponent":opponent,"post\_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20，"fok":FOK Order，"ioc":IOC Order, "opponent\_ioc": opponent ioc，"lightning\_ioc": lightning ioc，"optimal\_5\_ioc": optimal\_5 ioc，"optimal\_10\_ioc": optimal\_10 ioc，"optimal\_20\_ioc"：optimal\_20 ioc，"opponent\_fok"： opponent fok，"lightning\_fok"：lightning fok，"optimal\_5\_fok"：optimal\_5 fok，"optimal\_10\_fok"：optimal\_10 fok，"optimal\_20\_fok"：optimal\_20 fok |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| direction | string | true | "buy"/"sell" | "buy","sell" |
| offset | string | true | "open"/"close" | "open","close","both" |
| lever\_rate | int | true | leverage |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | true | client order ID |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl |
| created\_at | long | true | created time |  |
| trade\_volume | decimal | true | trade total volume |  |
| trade\_turnover | decimal | true | trade total amount |  |
| fee | decimal | true | service fee |  |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| trade\_avg\_price | decimal | true | trade average price |  |
| margin\_asset | string | true | margin asset |  |
| margin\_frozen | decimal | true | frozen margin |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | order status | 3\. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled |
| liquidation\_type | string | true | liquidation type |  |
| canceled\_at | long | true | canceled time |  |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| update\_time | Long | true | order update time ，millesecond timestamp |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| ORDERS\_END |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| self\_match\_prevent\_new | string | true | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders allow: Allow self-trading |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

{

"contract\_code":

"BTC-USDT"

"pair":

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

"update\_time":

1639104153425

"business\_type":

"swap"

"contract\_type":

"swap"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"volume":

1

"price":

66000

"order\_price\_type":

"post\_only"

"order\_type":

1

"direction":

"sell"

"offset":

"open"

"lever\_rate":

5

"order\_id":

918814943964184600

"client\_order\_id":

NULL

"created\_at":

1639104153393

"trade\_volume":

0

"trade\_turnover":

0

"fee":

0

"trade\_avg\_price":

NULL

"margin\_frozen":

13.2

"profit":

0

"status":

3

"order\_source":

"api"

"order\_id\_str":

"918814943964184578"

"fee\_asset":

"USDT"

"liquidation\_type":

NULL

"canceled\_at":

NULL

"margin\_asset":

"USDT"

"margin\_account":

"USDT"

"margin\_mode":

"cross"

"is\_tpsl":

0

"real\_profit":

0

"reduce\_only":

0

}

\]

"total\_page":

1

"current\_page":

1

"total\_size":

1

"self\_match\_prevent\_new":

"cancel\_both"

}

"ts":

1639104160523

}