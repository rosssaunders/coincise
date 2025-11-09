# GET [Cross] Get Detail Information of order

**Source:** [[Cross] Get Detail Information of order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8562d-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_order\_detail (\[Cross\] Get Detail Information of order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

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
| order\_id | long | true | order ID |  |  |
| created\_at | long | false | created timestamp |  |  |
| order\_type | int | false | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order; 22. ADL reduction-only order |  |
| page\_index | int | false | page number, default 1st page |  |  |
| page\_size | int | false | default 20，no more than 50 |  |  |

Notes:  
When getting information on order cancellation via query order detail interface, users who type in parameters “created\_at” and “order\_type” can query last 6-hour data, while users who don’t type in parameters “created\_at” and “order\_type” can only query last 2-hour data.  
The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by jaso-bigint package.  
created\_at should use timestamp of long type as 13 bits (include Millisecond), if send the accurate timestamp for "created\_at", query performance will be improved.  
Please note that created\_at can't be "0"

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| lever\_rate | int | true | leverage |  |
| direction | string | true | direction | "buy","sell" |
| offset | string | true | offset | "open", "close", "both" |
| volume | decimal | true | place volume |  |
| price | decimal | true | place price |  |
| created\_at | long | true | created time |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_asset | string | true | margin asset |  |
| margin\_frozen | decimal | true | frozen margin |  |
| profit | decimal | true | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| instrument\_price | decimal | true | liquidation price |  |
| final\_interest | decimal | true | account balance after liquidation |  |
| adjust\_value | decimal | true | adjustment factor of liquidating order |  |
| fee | decimal | true | total fee |  |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| liquidation\_type | string | true | liquidation type |  |
| canceled\_at | long | true | canceled time |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | true | client order ID |  |
| order\_type | string | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order ; 22. ADL reduction-only order |
| status | int | true | order status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| trade\_avg\_price | decimal | true | trade average price |  |
| trade\_turnover | decimal | true | trade total amount |  |
| trade\_volume | decimal | true | trade total amount |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | total real profit of order (calculated with the opening average price, include profit in history settlement.) |  |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| TRADES\_START | object array | true |  |  |
| id | string | true | the global unique ID of the trade |  |
| fee\_asse | string | false | fee asset |  |
| price | string | false | deduction currency price(USDT) |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of linear-swap-api/v1/swap\_cross\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_price | decimal | true | trade price |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade amount |  |
| trade\_fee | decimal | true | trade fee |  |
| role | string | true | taker/maker |  |
| created\_at | long | true | created time |  |
| profit | decimal | true | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.) |  |
| real\_profit | decimal | true | real profit of the transaction (calculated with the opening average price, include profit in history settlement.) |  |
| TRADES\_END |  | false |  |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| self\_match\_prevent\_new | String | true | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders allow: Allow self-trading |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And the real profit (real\_profit) of the transaction information that orders traded after December 10, 2020 has a value.

#### Request example

{

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"order\_id":

"456234321"

"created\_at":

1670559637769

"order\_type":

1

"page\_index":

1

"page\_size":

50

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"instrument\_price":

0

"final\_interest":

0

"adjust\_value":

0

"lever\_rate":

10

"direction":

"sell"

"offset":

"open"

"volume":

1

"price":

13059.8

"created\_at":

1603703614712

"canceled\_at":

0

"order\_source":

"api"

"order\_price\_type":

"opponent"

"margin\_frozen":

0

"profit":

0

"trades":\[

0:{

"trade\_id":

131560927

"trade\_price":

13059.8

"trade\_volume":

1

"trade\_turnover":

13.0598

"trade\_fee":

\-0.00522392

"created\_at":

1603703614715

"role":

"taker"

"fee\_asset":

"USDT"

"real\_profit":

0

"profit":

0

"id":

"131560927-770334322963152896-1"

"fee\_asse":

""

"price":

""

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

"USDT"

"fee":

\-0.00522392

"order\_id":

770334322963152900

"order\_id\_str":

"770334322963152896"

"client\_order\_id":

57012021045

"order\_type":

"1"

"status":

6

"trade\_avg\_price":

13059.8

"trade\_turnover":

13.0598

"trade\_volume":

1

"margin\_asset":

"USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"is\_tpsl":

0

"real\_profit":

0

"reduce\_only":

0

"canceled\_source":

"timeout-canceled-order"

"self\_match\_prevent\_new":

"cancel\_both"

}

"ts":

1603703678477

}