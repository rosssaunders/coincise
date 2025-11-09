# GET Subscribe Match Order Data（sub)

**Source:**
[Subscribe Match Order Data（sub)](https://www.htx.com/en-us/opend/newApiPages/?id=5d51579e-77b6-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### matchOrders.$contract_code (Subscribe Match Order Data（sub))

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment                         | Address                              |
| ----------------------------------- | ------------------------------------ |
| Online                              | wss://api.hbdm.com/swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                                                                                                                                                 |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required;Operator Name，value for unsubscribe is unsub;                                                                                                                                                                                                     |
| cid        | string | Optional; Client requests unique ID                                                                                                                                                                                                                         |
| topic      | string | Subscribe topic name，Require subscribe public.$contract_code.funding_rate Subscribe/unsubscribe the data of a given contract code; when the $contract_code value is \*, it stands for subscribing/unsubscribing all the funding rates of contract codes，; |

#### Rule description

| Subscribe(sub)                     | Unsubscribe( unsub )               | Rule        |
| ---------------------------------- | ---------------------------------- | ----------- |
| public.\*.funding_rate             | public.\*.funding_rate             | allowd      |
| public.contract_code1.funding_rate | public.\*.funding_rate             | allowd      |
| public.contract_code1.funding_rate | public.contract_code1.funding_rate | allowd      |
| public.contract_code1.funding_rate | public.contract_code2.funding_rate | not allowed |
| public.\*.funding_rate             | public.contract_code1.funding_rate | not allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                                                                                                                              | Value Range | Default Value |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| op        | string    | true     | Required； Operator Name，required subscribe value is sub                                                                                |             |               |
| cid       | string    | false    | Optional; ID Client requests unique ID                                                                                                   |             |               |
| topic     | string    | true     | Required；format: matchOrders.$contract_code; contract_code is case-insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |             |               |

Notes:  
The order status of 'post_only' type pushed by ws is ethier '7:canceled' or
'3:submitted'.  
The orders will be pushed when matched by matching engine.  
The delivery orders will not be pushed.  
The orders transfered from future or to future will not be pushed.  
The netting and forced liquidation orders will not be pushed.  
The orders will generally be pushed faster than the normal orders
subscription.But It's not guranted.  
If there is an order with N trades,including 1 taker and N maker,it will push
N+1 trades at most.

#### Data Update

| Parameter          | Data Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                       | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------ | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op                 | string       | true     | notify;                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| topic              | string       | true     | topic                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ts                 | long         | true     | Time of Respond Generation                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| uid                | string       | true     | account uid                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| symbol             | string       | true     | symbol                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| contract_code      | string       | true     | contract code                                                                                                                                                                                                                                                                                                                                                     | "BTC-USD" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| status             | int          | true     | 1\. Ready to submit the orders; 3. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled;                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| order_id           | long         | true     | order id                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| order_id_str       | string       | true     | order id                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| client_order_id    | long         | true     | the client ID that is filled in when the order is placed                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| order_type         | string       | true     | order type                                                                                                                                                                                                                                                                                                                                                        | 1\. Quotation; 3. Cancelled order; 3. Forced liquidation; 4. Delivery Order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| trade_volume       | decimal      | true     | total filled volume of the order                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| volume             | decimal      | true     | total volume of the order                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| is_tpsl            | int          | true     | whether to set take-profit and stop-loss order                                                                                                                                                                                                                                                                                                                    | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| TRADE_START        | object array | true     |                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| id                 | string       | true     | the global unique id of the trade.                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| trade_id           | long         | true     | In this interface, trade_id is the same with match_id of swap-api/v1/swap_matchresults. trade_id is the result of sets of order execution and trade confirmation. NOTE: trade_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade_id. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| trade_price        | decimal      | true     | trade price                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| trade_volume       | decimal      | true     | trade volume                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| trade_turnover     | decimal      | true     | trade turnover                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| created_at         | long         | true     | created at                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| role               | string       | true     | taker or maker                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| TRADE_END          |              | false    |                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| direction          | string       | true     | Order Direction                                                                                                                                                                                                                                                                                                                                                   | "buy" or "sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| offset             | string       | true     | offset direction                                                                                                                                                                                                                                                                                                                                                  | "open" or "close"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| lever_rate         | int          | true     | lever rate                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| price              | decimal      | true     | trigger price                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| created_at         | long         | true     | created at                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| order_source       | string       | true     | order source                                                                                                                                                                                                                                                                                                                                                      | （system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| order_price_type   | string       | true     | order price type                                                                                                                                                                                                                                                                                                                                                  | order price type: "limit":Limit,"opponent":opponent,"post_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_30":optimal 30，"fok":FOK Order，"ioc":IOC Order, "opponent_ioc": opponent ioc，"lightning_ioc": lightning ioc，"optimal_5_ioc": optimal_5 ioc，"optimal_10_ioc": optimal_10 ioc，"optimal_30_ioc"：optimal_30 ioc，"opponent_fok"： opponent fok，"lightning_fok"：lightning fok，"optimal_5_fok"：optimal_5 fok，"optimal_10_fok"：optimal_10 fok，"optimal_30_fok"：optimal_30 fok |
| self_match_prevent | int          | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

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

"contract_code":

"THETA-USD"

"status":

6

"order_id":

771068893090799600

"order_id_str":

"771068893090799616"

"client_order_id":

NULL

"order_type":

1

"created_at":

1603878749878

"trade":\[

0:{

"trade_id":

49703426706

"id":

"49703426706-771068893090799616-1"

"trade_volume":

1

"trade_price":

0.63191

"trade_turnover":

10

"created_at":

1603878749883

"role":

"taker"

}

\]

"uid":

"123456789"

"volume":

1

"trade_volume":

1

"direction":

"sell"

"offset":

"open"

"lever_rate":

20

"price":

0.63191

"order_source":

"web"

"order_price_type":

"opponent"

"is_tpsl":

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
