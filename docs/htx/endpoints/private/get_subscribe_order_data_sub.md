# GET Subscribe Order Data(sub)

**Source:**
[Subscribe Order Data(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=28c346f8-77ae-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### orders.$symbol (Subscribe Order Data(sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: Each UID can build at most create 30 WS connections for private
order push at the same time. For each account, contracts of the same underlying
coin only need to subscribe one WS order push, e.g. users only need to create
one WS order push connection for BTC Contract which will automatically push
orders of BTC weekly, BTC biweekly and BTC quarterly contracts. Please note that
the rate limit of WS order push and RESTFUL private interface are separated from
each other, with no relations.

#### Subscription Address

| Environment                         | Address                         |
| ----------------------------------- | ------------------------------- |
| Online                              | wss://api.hbdm.com/notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                 |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required； Operator Name，value for unsubscribe is unsub;                                                                   |
| cid        | string | Optional; ID Client requests unique ID                                                                                      |
| topic      | string | Required；Unsubscribe Topic Name, format: orders.$contract_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule        |
| -------------- | -------------------- | ----------- |
| orders.\*      | orders.\*            | Allowed     |
| orders.symbol1 | orders.\*            | Allowed     |
| orders.symbol1 | orders.symbol1       | Allowed     |
| orders.symbol1 | orders.symbol2       | Not Allowed |
| orders.\*      | orders.symbol1       | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                                                                                                                       | Value Range | Default Value |
| --------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| op        | string    | false    | Required； Operator Name，required subscribe value is sub                                                                         |             |               |
| cid       | string    | false    | Optional; ID Client requests unique ID                                                                                            |             |               |
| topic     | string    | false    | Required；Topic name format: orders.$symbol; symbol is case-insenstive.Both uppercase and lowercase are supported. e.g.:"BTC,ETH" |             |               |

Notes:  
The order status of 'post_only' type pushed by ws is ethier '7:canceled' or
'3:submitted'.

#### Data Update

| Parameter          | Data Type | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Value Range                                                                                                                                                  |
| ------------------ | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| op                 | string    | false    | Required;Operator Name，Order push value is notify ;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                              |
| topic              | string    | false    | Required; Order push topic                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                              |
| uid                | string    | false    | account uid                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                              |
| ts                 | long      | false    | Server responses timestamp                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                              |
| symbol             | string    | false    | Coin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                              |
| contract_type      | string    | false    | Contract Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                              |
| contract_code      | string    | false    | Contract Code                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                              |
| volume             | decimal   | false    | Order quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                              |
| price              | decimal   | false    | Order price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                              |
| order_price_type   | string    | false    | Order price type "limit":Limit,"opponent":opponent,"post_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_20":optimal 20，"fok":FOK Order，"ioc":IOC Order, "opponent_ioc": opponent ioc，"lightning_ioc": lightning ioc，"optimal_5_ioc": optimal_5 ioc，"optimal_10_ioc": optimal_10 ioc，"optimal_20_ioc"：optimal_20 ioc，"opponent_fok"： opponent fok，"lightning_fok"：lightning fok，"optimal_5_fok"：optimal_5 fok，"optimal_10_fok"：optimal_10 fok，"optimal_20_fok"：optimal_20 fok |                                                                                                                                                              |
| direction          | string    | false    | "buy" Long "sell": Short                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                              |
| offset             | string    | false    | "open": Open "close": Close                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                              |
| status             | int       | false    | Order status(1. Placing orders to order book; 2 Placing orders to order book; 3. Placed to order book 4. Partially filled; 5 partially filled but cancelled by client; 6. Fully filled; 7. Cancelled;)                                                                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                              |
| lever_rate         | int       | false    | Leverage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                              |
| order_id           | long      | false    | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                              |
| order_id_str       | string    | false    | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                              |
| client_order_id    | long      | false    | Client ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                              |
| order_source       | string    | false    | order source                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                        |
| order_type         | int       | false    | order type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                          |
| created_at         | long      | false    | order creation time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                              |
| canceled_at        | long      | false    | order canceled time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                              |
| trade_volume       | decimal   | false    | trade volume(volume)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                              |
| trade_turnover     | decimal   | false    | Turnover                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                              |
| fee                | decimal   | false    | Fees                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                              |
| trade_avg_price    | decimal   | false    | Average order price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                              |
| margin_frozen      | decimal   | false    | Frozen Margin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                              |
| profit             | decimal   | false    | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                              |
| fee_asset          | string    | false    | the corresponding cryptocurrency to the given fee                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                              |
| liquidation_type   | string    | false    | 0:Not Forced Liquidation Type，1：Netting Type， 2: Partial Takeover，3：All Takeover                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                              |
| is_tpsl            | int       | false    | whether to set take-profit and stop-loss order 1：yes；0：no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                              |
| real_profit        | decimal   | false    | total real profit of order (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                              |
| canceled_source    | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing-canceled-order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                              |
| TRADE_START        |           | false    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                              |
| id                 | string    | false    | the global unique id of the trade.。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                              |
| trade_id           | long      | false    | In this interface, trade_id is the same with match_id of /api/v1/contract_matchresults. trade_id is the result of sets of order execution and trade confirmation. NOTE: trade_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade_id.                                                                                                                                                                                                                                              |                                                                                                                                                              |
| trade_volume       | decimal   | false    | trade volume                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                              |
| trade_price        | decimal   | false    | trade price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                              |
| trade_fee          | decimal   | false    | trading fees                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                              |
| trade_turnover     | decimal   | false    | turnover                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                              |
| created_at         | long      | false    | trade creation time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                              |
| role               | string    | false    | taker or maker                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                              |
| profit             | decimal   | false    | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                              |
| real_profit        | decimal   | false    | real profit of the transaction (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                              |
| self_match_prevent | int       | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| fee_asset          | string    | false    | fee asset                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                              |
| TRADE_END          |           | false    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                              |

Notes:  
The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).  
Only the real profit parameter (real_profit) of the transaction information that
orders created after 0:00 on January 30, 2021 has a value . And of the other
order transaction information that orders created before that times, the real
profit parameter is 0.

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

"contract_type":

"quarter"

"contract_code":

"ADA201225"

"volume":

1

"price":

0.0905

"order_price_type":

"post_only"

"direction":

"sell"

"offset":

"open"

"status":

6

"lever_rate":

20

"order_id":

773207641127878700

"order_id_str":

"773207641127878656"

"client_order_id":

NULL

"order_source":

"web"

"order_type":

1

"created_at":

1604388667146

"trade_volume":

1

"trade_turnover":

10

"fee":

\-0.022099447513812154

"trade_avg_price":

0.0905

"margin_frozen":

0

"profit":

0

"is_tpsl":

0

"real_profit":

0

"canceled_source":

"timeout-canceled-order"

"trade":\[

0:{

"trade_fee":

\-0.022099447513812154

"fee_asset":

"ADA"

"trade_id":

113913755890

"id":

"113913755890-773207641127878656-1"

"trade_volume":

1

"trade_price":

0.0905

"trade_turnover":

10

"created_at":

1604388667194

"real_profit":

0

"profit":

0

"role":

"maker"

}

\]

"canceled_at":

0

"fee_asset":

"ADA"

"uid":

"123456789"

"liquidation_type":

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
