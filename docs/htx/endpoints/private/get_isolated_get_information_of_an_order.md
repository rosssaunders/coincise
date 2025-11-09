# GET [Isolated] Get Information of an Order

**Source:** [[Isolated] Get Information of an Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb85222-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_order\_info (\[Isolated\] Get Information of an Order)

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
| order\_id | string | false | Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time) |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |

Notes:  
When getting information on order cancellation via get order Information interface, users can only query last 2-hour data  
At least one of order\_id and client\_order\_id must be filled in  
Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id. The order completed( 5.partially fulfilled but cancelled by client; 6. Fully fulfilled; 7. Cancelled; ) will be deleted after the settlement of funding rate on 00:00(GMT+8), 08:00(GMT+8) and 16:00(GMT+8).  
client\_order\_id，order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | eg."BTC" |
| contract\_code | string | true | Contract Code | "BTC-USDT" ... |
| volume | decimal | true | Numbers of order |  |
| price | decimal | true | Price committed |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| order\_type | int | true | Order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| direction | string | true | Transaction direction | "buy":"sell" |
| offset | string | true | "open": "close" | "open", "close", "both" |
| lever\_rate | int | true | Leverage rate | 1\\5\\10\\20 |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | Client order ID |  |
| created\_at | long | true | Creation time |  |
| canceled\_at | long | true | Canceled time |  |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_turnover | decimal | true | Transaction aggregate amount |  |
| fee | decimal | true | Service fee |  |
| trade\_avg\_price | decimal | true | Transaction average price |  |
| margin\_frozen | decimal | true | Frozen margin |  |
| margin\_asset | string | true | margin asset |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| order\_source | string | true | Order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "USDT"... |
| liquidation\_type | string | true | Liquidation type | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| fee\_amount | decimal | true | HTX fee amount |  |
| fee\_quote\_amount | decimal | true | fee\_quote\_amount |  |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| self\_match\_prevent\_new | string | true | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders allow: Allow self-trading |
| DATA\_END |  | false |  |  |
| ts | long | true | Timestamp |  |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

{

"order\_id":

"456789321"

"client\_order\_id":

"456234321"

"contract\_code":

"BTC-USDT"

}

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

"BTC-USDT"

"volume":

1

"price":

13059.8

"order\_price\_type":

"opponent"

"order\_type":

1

"direction":

"sell"

"offset":

"open"

"lever\_rate":

10

"order\_id":

770334322963152900

"client\_order\_id":

57012021045

"created\_at":

1603703614712

"trade\_volume":

1

"trade\_turnover":

13.0598

"fee":

\-0.00522392

"trade\_avg\_price":

13059.8

"margin\_frozen":

0

"profit":

0

"status":

6

"order\_source":

"api"

"order\_id\_str":

"770334322963152896"

"fee\_asset":

"USDT"

"liquidation\_type":

"0"

"canceled\_at":

0

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

"fee\_amount":

11

"fee\_quote\_amount":

11

"canceled\_source":

"timeout-canceled-order"

"self\_match\_prevent\_new":

"cancel\_both"

}

\]

"ts":

1603703631815

}