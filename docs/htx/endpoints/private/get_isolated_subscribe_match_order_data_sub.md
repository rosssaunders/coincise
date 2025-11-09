# GET [Isolated] Subscribe Match Order Data（sub)

**Source:** [[Isolated] Subscribe Match Order Data（sub)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7e05a-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### matchOrders.$contract\_code (\[Isolated\] Subscribe Match Order Data（sub))

Signature verification: No

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
| matchOrders.\* | matchOrders.\* | Allowed |
| matchOrders.contract\_code1 | matchOrders.\* | Allowed |
| matchOrders.contract\_code1 | matchOrders.contract\_code1 | Allowed |
| matchOrders.contract\_code1 | matchOrders.contract\_code1 | Not Allowed |
| matchOrders.\* | matchOrders.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "\*" all(it means to subscribe the all match orders) "BTC-USDT"... |  |
| cid | string | false | Current request's ID |  |  |

Notes:  
The order status of 'post\_only' type pushed by ws is ethier '7:canceled' or '3:submitted'.  
The orders will be pushed when matched by matching engine.  
The delivery orders will not be pushed.  
The orders transfered from future or to future will not be pushed.  
The netting and forced liquidation orders will not be pushed.  
The orders will generally be pushed faster than the normal orders subscription.But It's not guranted.  
If there is an order with N trades,including 1 taker and N maker,it will push N+1 trades at most.  

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string  | false | notify |  |
| topic | string | true | topic |  |
| ts | long | true | server response timestamp |  |
| uid | string | true | account uid |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code |  |
| status | int | true | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id |  |
| client\_order\_id | long | true | client order id |  |
| order\_type | int | true | order\_type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| trade\_volume | decimal | true | trade volume |  |
| volume | decimal | true | volume |  |
| direction | string | true | direction | "buy" : "sell" |
| offset | string | true | offset | "open", "close", "both" |
| lever\_rate | int | true | lever rate |  |
| price | decimal | true | price |  |
| created\_at | long | true | created time |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl |
| order\_price\_type | string | true | type of order price | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| TRADE\_START | object array | true |  |  |
| id | string | true | the global unique id of the trade. |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of linear-swap-api/v1/swap\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_price | decimal | true | trade price |  |
| trade\_volume | decimal | true | trade volume（cont） |  |
| trade\_turnover | decimal | true | trade turnover |  |
| created\_at | long | true | created time |  |
| role | string | true | taker or maker |  |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| TRADE\_END |  | false |  |  |
| self\_match\_prevent\_new | string | true | Prevent self-trading | cancel\_taker: Cancel a taker order cancel\_maker: Cancel a maker order cancel\_both: Cancel all orders allow: Allow self-trading |

#### Subscription Example

{

"op":

"sub"

"topic":

"matchOrders.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"matchOrders.BTC-USDT"

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

"matchOrders.btc-usdt"

"ts":

1600926986125

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"status":

6

"order\_id":

758688290195656700

"order\_id\_str":

"758688290195656704"

"client\_order\_id":

NULL

"order\_type":

1

"created\_at":

1600926984112

"trade":\[

0:{

"trade\_id":

14470

"id":

"14470-758688290195656704-1"

"trade\_volume":

1

"trade\_price":

10329.11

"trade\_turnover":

103.2911

"created\_at":

1600926986046

"role":

"taker"

}

\]

"uid":

"123456789"

"volume":

1

"trade\_volume":

1

"direction":

"buy"

"offset":

"open"

"lever\_rate":

5

"price":

10329.11

"order\_source":

"web"

"order\_price\_type":

"opponent"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"is\_tpsl":

0

"reduce\_only":

0

"self\_match\_prevent\_new":

"cancel\_both"

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"matchOrders.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}