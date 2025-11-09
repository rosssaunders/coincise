# GET [Isolated] Subscribe Match Order Data（sub)

**Source:**
[[Isolated] Subscribe Match Order Data（sub)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7e05a-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### matchOrders.$contract_code (\[Isolated\] Subscribe Match Order Data（sub))

Signature verification: No

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY
Verification: Each UID can build at most create 30 WS connections for private
order push at the same time. For each account, contracts of the same underlying
coin only need to subscribe one WS order push, e.g. users only need to create
one WS order push connection for BTC Contract which will automatically push
orders of BTC-USDT contracts. Please note that the rate limit of WS order push
and RESTFUL private interface are separated from each other, with no relations.

Interface description: This interface only supports isolated margin mode.

#### Subscription Address

| Environment                         | Address                                     |
| ----------------------------------- | ------------------------------------------- |
| Online                              | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                 |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required； Operator Name，value for unsubscribe is unsub;                                                                   |
| cid        | string | Optional; ID Client requests unique ID                                                                                      |
| topic      | string | Required；Unsubscribe Topic Name, format: orders.$contract_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub)             | Unsubscribe( unsub )       | Rule        |
| -------------------------- | -------------------------- | ----------- |
| matchOrders.\*             | matchOrders.\*             | Allowed     |
| matchOrders.contract_code1 | matchOrders.\*             | Allowed     |
| matchOrders.contract_code1 | matchOrders.contract_code1 | Allowed     |
| matchOrders.contract_code1 | matchOrders.contract_code1 | Not Allowed |
| matchOrders.\*             | matchOrders.contract_code1 | Not Allowed |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description          | Value Range                                                        | Default Value |
| ------------- | --------- | -------- | -------------------- | ------------------------------------------------------------------ | ------------- |
| contract_code | string    | true     | contract code        | "\*" all(it means to subscribe the all match orders) "BTC-USDT"... |               |
| cid           | string    | false    | Current request's ID |                                                                    |               |

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

| Parameter              | Data Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                              | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op                     | string       | false    | notify                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| topic                  | string       | true     | topic                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ts                     | long         | true     | server response timestamp                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| uid                    | string       | true     | account uid                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| symbol                 | string       | true     | symbol                                                                                                                                                                                                                                                                                                                                                                   | "BTC","ETH"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| contract_code          | string       | true     | contract code                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| status                 | int          | true     | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled;                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id               | long         | true     | order id                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id_str           | string       | true     | order id                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| client_order_id        | long         | true     | client order id                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_type             | int          | true     | order_type                                                                                                                                                                                                                                                                                                                                                               | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| trade_volume           | decimal      | true     | trade volume                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| volume                 | decimal      | true     | volume                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| direction              | string       | true     | direction                                                                                                                                                                                                                                                                                                                                                                | "buy" : "sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| offset                 | string       | true     | offset                                                                                                                                                                                                                                                                                                                                                                   | "open", "close", "both"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| lever_rate             | int          | true     | lever rate                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| price                  | decimal      | true     | price                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long         | true     | created time                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_source           | string       | true     | order source                                                                                                                                                                                                                                                                                                                                                             | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| order_price_type       | string       | true     | type of order price                                                                                                                                                                                                                                                                                                                                                      | "market": Market Order，"limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |
| margin_mode            | string       | true     | margin mode                                                                                                                                                                                                                                                                                                                                                              | isolated : "isolated"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| margin_account         | string       | true     | margin account                                                                                                                                                                                                                                                                                                                                                           | "BTC-USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| is_tpsl                | int          | true     | whether to set take-profit and stop-loss order                                                                                                                                                                                                                                                                                                                           | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| reduce_only            | int          | true     | reduce only                                                                                                                                                                                                                                                                                                                                                              | 0: no, 1: yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| TRADE_START            | object array | true     |                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| id                     | string       | true     | the global unique id of the trade.                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_id               | long         | true     | In this interface, trade_id is the same with match_id of linear-swap-api/v1/swap_matchresults. trade_id is the result of sets of order execution and trade confirmation. NOTE: trade_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade_id. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_price            | decimal      | true     | trade price                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_volume           | decimal      | true     | trade volume（cont）                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_turnover         | decimal      | true     | trade turnover                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long         | true     | created time                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| role                   | string       | true     | taker or maker                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| self_match_prevent     | int          | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                                  | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                                                   |
| TRADE_END              |              | false    |                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| self_match_prevent_new | string       | true     | Prevent self-trading                                                                                                                                                                                                                                                                                                                                                     | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                                                                                                                                                                                                                                 |

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

"contract_code":

"BTC-USDT"

"status":

6

"order_id":

758688290195656700

"order_id_str":

"758688290195656704"

"client_order_id":

NULL

"order_type":

1

"created_at":

1600926984112

"trade":\[

0:{

"trade_id":

14470

"id":

"14470-758688290195656704-1"

"trade_volume":

1

"trade_price":

10329.11

"trade_turnover":

103.2911

"created_at":

1600926986046

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

"buy"

"offset":

"open"

"lever_rate":

5

"price":

10329.11

"order_source":

"web"

"order_price_type":

"opponent"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"is_tpsl":

0

"reduce_only":

0

"self_match_prevent_new":

"cancel_both"

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
