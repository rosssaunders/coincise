# GET Subscribe Order Data(sub)

**Source:** [Subscribe Order Data(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=28c346f8-77ae-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### orders.$symbol (Subscribe Order Data(sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC weekly, BTC biweekly and BTC quarterly contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| orders.\* | orders.\* | Allowed |
| orders.symbol1 | orders.\* | Allowed |
| orders.symbol1 | orders.symbol1 | Allowed |
| orders.symbol1 | orders.symbol2 | Not Allowed |
| orders.\* | orders.symbol1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| op | string | false | Required； Operator Name，required subscribe value is sub |  |  |
| cid | string | false | Optional; ID Client requests unique ID |  |  |
| topic | string | false | Required；Topic name format: orders.$symbol; symbol is case-insenstive.Both uppercase and lowercase are supported. e.g.:"BTC,ETH" |  |  |

Notes:  
The order status of 'post\_only' type pushed by ws is ethier '7:canceled' or '3:submitted'.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | Required;Operator Name，Order push value is notify ; |  |
| topic | string | false | Required; Order push topic |  |
| uid | string | false | account uid |  |
| ts | long | false | Server responses timestamp |  |
| symbol | string | false | Coin |  |
| contract\_type | string | false | Contract Type |  |
| contract\_code | string | false | Contract Code |  |
| volume | decimal | false | Order quantity |  |
| price | decimal | false | Order price |  |
| order\_price\_type | string | false | Order price type "limit":Limit,"opponent":opponent,"post\_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20，"fok":FOK Order，"ioc":IOC Order, "opponent\_ioc": opponent ioc，"lightning\_ioc": lightning ioc，"optimal\_5\_ioc": optimal\_5 ioc，"optimal\_10\_ioc": optimal\_10 ioc，"optimal\_20\_ioc"：optimal\_20 ioc，"opponent\_fok"： opponent fok，"lightning\_fok"：lightning fok，"optimal\_5\_fok"：optimal\_5 fok，"optimal\_10\_fok"：optimal\_10 fok，"optimal\_20\_fok"：optimal\_20 fok |  |
| direction | string | false | "buy" Long "sell": Short |  |
| offset | string | false | "open": Open "close": Close |  |
| status | int | false | Order status(1. Placing orders to order book; 2 Placing orders to order book; 3. Placed to order book 4. Partially filled; 5 partially filled but cancelled by client; 6. Fully filled; 7. Cancelled;) |  |
| lever\_rate | int | false | Leverage |  |
| order\_id | long | false | Order ID |  |
| order\_id\_str | string | false | Order ID |  |
| client\_order\_id | long | false | Client ID |  |
| order\_source | string | false | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_type | int | false | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| created\_at | long | false | order creation time |  |
| canceled\_at | long | false | order canceled time |  |
| trade\_volume | decimal | false | trade volume(volume) |  |
| trade\_turnover | decimal | false | Turnover |  |
| fee | decimal | false | Fees |  |
| trade\_avg\_price | decimal | false | Average order price |  |
| margin\_frozen | decimal | false | Frozen Margin |  |
| profit | decimal | false | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| fee\_asset | string | false | the corresponding cryptocurrency to the given fee |  |
| liquidation\_type | string | false | 0:Not Forced Liquidation Type，1：Netting Type， 2: Partial Takeover，3：All Takeover |  |
| is\_tpsl | int | false | whether to set take-profit and stop-loss order 1：yes；0：no |  |
| real\_profit | decimal | false | total real profit of order (calculated with the opening average price, include profit in history settlement.) |  |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing-canceled-order |  |
| TRADE\_START |  | false |  |  |
| id | string | false | the global unique id of the trade.。 |  |
| trade\_id | long | false | In this interface, trade\_id is the same with match\_id of /api/v1/contract\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_volume | decimal | false | trade volume |  |
| trade\_price | decimal | false | trade price |  |
| trade\_fee | decimal | false | trading fees |  |
| trade\_turnover | decimal | false | turnover |  |
| created\_at | long | false | trade creation time |  |
| role | string | false | taker or maker |  |
| profit | decimal | false | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.) |  |
| real\_profit | decimal | false | real profit of the transaction (calculated with the opening average price, include profit in history settlement.) |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| fee\_asset | string | false | fee asset |  |
| TRADE\_END |  | false |  |  |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only the real profit parameter (real\_profit) of the transaction information that orders created after 0:00 on January 30, 2021 has a value . And of the other order transaction information that orders created before that times, the real profit parameter is 0.

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"orders.btc"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"orders.btc"

"ts":

1670903745088

"err-code":

0

}

#### Example of a Data Update

{

"op":

"notify"

"topic":

"orders.ada"

"ts":

1604388667226

"symbol":

"ADA"

"contract\_type":

"quarter"

"contract\_code":

"ADA201225"

"volume":

1

"price":

0.0905

"order\_price\_type":

"post\_only"

"direction":

"sell"

"offset":

"open"

"status":

6

"lever\_rate":

20

"order\_id":

773207641127878700

"order\_id\_str":

"773207641127878656"

"client\_order\_id":

NULL

"order\_source":

"web"

"order\_type":

1

"created\_at":

1604388667146

"trade\_volume":

1

"trade\_turnover":

10

"fee":

\-0.022099447513812154

"trade\_avg\_price":

0.0905

"margin\_frozen":

0

"profit":

0

"is\_tpsl":

0

"real\_profit":

0

"canceled\_source":

"timeout-canceled-order"

"trade":\[

0:{

"trade\_fee":

\-0.022099447513812154

"fee\_asset":

"ADA"

"trade\_id":

113913755890

"id":

"113913755890-773207641127878656-1"

"trade\_volume":

1

"trade\_price":

0.0905

"trade\_turnover":

10

"created\_at":

1604388667194

"real\_profit":

0

"profit":

0

"role":

"maker"

}

\]

"canceled\_at":

0

"fee\_asset":

"ADA"

"uid":

"123456789"

"liquidation\_type":

"0"

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"orders.btc"

"cid":

"40sG903yz80oDFWr"

}