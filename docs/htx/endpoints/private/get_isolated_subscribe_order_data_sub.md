# GET [Isolated] Subscribe Order Data(sub)

**Source:** [[Isolated] Subscribe Order Data(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7d8d9-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### orders.$contract\_code (\[Isolated\] Subscribe Order Data(sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: This interface only supports isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

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
| orders.contract\_code1 | orders.\* | Allowed |
| orders.contract\_code1 | orders.contract\_code1 | Allowed |
| orders.contract\_code1 | orders.contract\_code1 | Not Allowed |
| orders.\* | orders.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "\*" all(it means to subscribe the all ) "BTC-USDT","ETH-USDT"... |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | Required;Operator Name，Order push value is notify ; |  |
| topic | string | true | Required; Order push topic |  |
| uid | long | true | account uid |  |
| ts | string | true | Server responses timestamp |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | Contract Code |  |
| volume | decimal | true | Order quantity |  |
| price | decimal | true | Order price |  |
| order\_price\_type | string | true | type of order price | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| direction | string | true | "buy" Long "sell": Short |  |
| offset | string | true | "open": Open "close": Close, "both" |  |
| status | int | true | Order status(1. Placing orders to order book; 2 Placing orders to order book; 3. Placed to order book 4. Partially filled; 5 partially filled but cancelled by client; 6. Fully filled; 7. Cancelled; 11Cancelling) |  |
| lever\_rate | int | true | Leverage |  |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | Client ID |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| created\_at | long | true | order creation time |  |
| trade\_volume | decimal | true | trade volume(coin)) |  |
| trade\_turnover | decimal | true | Turnover |  |
| fee | decimal | true | Fees |  |
| trade\_avg\_price | decimal | true | Average order price |  |
| margin\_frozen | string | true | Frozen Margin |  |
| margin\_asset | decimal | true | margin\_asset |  |
| profit | decimal | true | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| liquidation\_type | decimal | true | Liquidation type, 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |  |
| canceled\_at | long | true | Canceled time |  |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee |  |
| margin\_mode | string | true | margin mode isolated : "isolated" |  |
| margin\_account | string | true | margin account "BTC-USDT"... |  |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order 1：yes；0：no |  |
| real\_profit | decimal | true | total real profit of order (calculated with the opening average price, include profit in history settlement.) |  |
| reduce\_only | int | true | reduce only 0: no, 1: yes |  |
| canceled\_source | string | false | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing |  |
| TRADE\_START | object array | true |  |  |
| id | string | true | the global unique ID of the trade. |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of linear-swap-api/v1/swap\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_price | decimal | true | trade price |  |
| trade\_fee | decimal | true | trading fees |  |
| trade\_turnover | decimal | true | turnover |  |
| created\_at | long | true | trade creation time |  |
| role | string | true | taker or maker |  |
| real\_profit | decimal | true | real profit of the transaction (calculated with the opening average price, include profit in history settlement.) |  |
| profit | decimal | true | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.) |  |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee |  |
| price | string | false | deduction currency price(USDT) |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| TRADE\_END |  | false |  |  |
| self\_match\_prevent\_new | string | true | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders allow: Allow self-trading |

Notes:  
The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).  
Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And the real profit (real\_profit) of the transaction information that orders traded after December 10, 2020 has a value.

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"orders.btc-usdt"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"orders.btc-usdt"

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

"orders.btc-usdt"

"ts":

1489474082831

"uid":

"123456789"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"volume":

111

"price":

1111

"order\_price\_type":

"limit"

"direction":

"buy"

"offset":

"open"

"status":

6

"lever\_rate":

10

"order\_id":

758684042347171800

"order\_id\_str":

"758684042347171840"

"client\_order\_id":

10683

"order\_source":

"web"

"order\_type":

1

"created\_at":

1408076414000

"trade\_volume":

1

"trade\_turnover":

1200

"fee":

0

"liquidation\_type":

"0"

"trade\_avg\_price":

10

"margin\_asset":

"USDT"

"margin\_frozen":

10

"profit":

2

"canceled\_at":

1408076414000

"fee\_asset":

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

"trade":\[

0:{

"trade\_id":

14469

"id":

"14469-758684042347171840-1"

"trade\_volume":

1

"trade\_price":

123.4555

"trade\_fee":

0.234

"fee\_asset":

"USDT"

"price":

""

"trade\_turnover":

34.123

"created\_at":

1490759594752

"role":

"maker"

"profit":

2

"real\_profit":

0

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"orders.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}