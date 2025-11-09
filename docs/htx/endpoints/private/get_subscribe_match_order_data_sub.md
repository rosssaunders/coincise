# GET Subscribe Match Order Data（sub)

**Source:** [Subscribe Match Order Data（sub)](https://www.htx.com/en-us/opend/newApiPages/?id=5d51579e-77b6-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### matchOrders.$contract\_code (Subscribe Match Order Data（sub))

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required;Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; Client requests unique ID |
| topic | string | Subscribe topic name，Require subscribe public.$contract\_code.funding\_rate Subscribe/unsubscribe the data of a given contract code; when the $contract\_code value is \*, it stands for subscribing/unsubscribing all the funding rates of contract codes，; |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| public.\*.funding\_rate | public.\*.funding\_rate | allowd |
| public.contract\_code1.funding\_rate | public.\*.funding\_rate | allowd |
| public.contract\_code1.funding\_rate | public.contract\_code1.funding\_rate | allowd |
| public.contract\_code1.funding\_rate | public.contract\_code2.funding\_rate | not allowed |
| public.\*.funding\_rate | public.contract\_code1.funding\_rate | not allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| op | string | true | Required； Operator Name，required subscribe value is sub |  |  |
| cid | string | false | Optional; ID Client requests unique ID |  |  |
| topic | string | true | Required；format: matchOrders.$contract\_code; contract\_code is case-insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |

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
| op | string | true | notify; |  |
| topic | string | true | topic |  |
| ts | long | true | Time of Respond Generation |  |
| uid | string | true | account uid |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | "BTC-USD" ... |
| status | int | true | 1\. Ready to submit the orders; 3. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id |  |
| client\_order\_id | long | true | the client ID that is filled in when the order is placed |  |
| order\_type | string | true | order type | 1\. Quotation; 3. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| trade\_volume | decimal | true | total filled volume of the order |  |
| volume | decimal | true | total volume of the order |  |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| TRADE\_START | object array | true |  |  |
| id | string | true | the global unique id of the trade. |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of swap-api/v1/swap\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_price | decimal | true | trade price |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade turnover |  |
| created\_at | long | true | created at |  |
| role | string | true | taker or maker |  |
| TRADE\_END |  | false |  |  |
| direction | string | true | Order Direction | "buy" or "sell" |
| offset | string | true | offset direction | "open" or "close" |
| lever\_rate | int | true | lever rate |  |
| price | decimal | true | trigger price |  |
| created\_at | long | true | created at |  |
| order\_source | string | true | order source | （system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl） |
| order\_price\_type | string | true | order price type | order price type: "limit":Limit,"opponent":opponent,"post\_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_30":optimal 30，"fok":FOK Order，"ioc":IOC Order, "opponent\_ioc": opponent ioc，"lightning\_ioc": lightning ioc，"optimal\_5\_ioc": optimal\_5 ioc，"optimal\_10\_ioc": optimal\_10 ioc，"optimal\_30\_ioc"：optimal\_30 ioc，"opponent\_fok"： opponent fok，"lightning\_fok"：lightning fok，"optimal\_5\_fok"：optimal\_5 fok，"optimal\_10\_fok"：optimal\_10 fok，"optimal\_30\_fok"：optimal\_30 fok |
| self\_match\_prevent | int | false | Self trading prevention | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"orders.btc-usd"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"matchOrders.BTC-USD"

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

"matchOrders.theta-usd"

"ts":

1603878749900

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"status":

6

"order\_id":

771068893090799600

"order\_id\_str":

"771068893090799616"

"client\_order\_id":

NULL

"order\_type":

1

"created\_at":

1603878749878

"trade":\[

0:{

"trade\_id":

49703426706

"id":

"49703426706-771068893090799616-1"

"trade\_volume":

1

"trade\_price":

0.63191

"trade\_turnover":

10

"created\_at":

1603878749883

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

"sell"

"offset":

"open"

"lever\_rate":

20

"price":

0.63191

"order\_source":

"web"

"order\_price\_type":

"opponent"

"is\_tpsl":

0

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"matchOrders.BTC-USD"

"cid":

"40sG903yz80oDFWr"

}