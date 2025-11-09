# GET [Cross] Subscribe Order Data（sub）

**Source:**
[[Cross] Subscribe Order Data（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7da4b-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### orders_cross.$contract_code (\[Cross\] Subscribe Order Data（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY
Verification: Each UID can build at most create 30 WS connections for private
order push at the same time. For each account, contracts of the same underlying
coin only need to subscribe one WS order push, e.g. users only need to create
one WS order push connection for BTC Contract which will automatically push
orders of BTC-USDT contracts. Please note that the rate limit of WS order push
and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625.

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

| Subscribe(sub)              | Unsubscribe( unsub )        | Rule        |
| --------------------------- | --------------------------- | ----------- |
| orders_cross.\*             | orders_cross.\*             | Allowed     |
| orders_cross.contract_code1 | orders_cross.\*             | Allowed     |
| orders_cross.contract_code1 | orders_cross.contract_code1 | Allowed     |
| orders_cross.contract_code1 | orders_cross.contract_code1 | Not Allowed |
| orders_cross.\*             | orders_cross.contract_code1 | Not Allowed |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description          | Value Range | Default Value                                                                  |
| ------------- | --------- | -------- | -------------------- | ----------- | ------------------------------------------------------------------------------ |
| contract_code | string    | true     | contract code        |             | all: \* (swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| cid           | string    | false    | Current request's ID |             |                                                                                |

#### Data Update

| Parameter              | Data Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                    | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op                     | string       | true     | operation name, fixed as notify                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| topic                  | string       | true     | topic                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ts                     | long         | true     | server response timestamp                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| uid                    | string       | true     | uid                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| symbol                 | string       | true     | symbol                                                                                                                                                                                                                                                                                                                                                                         | "BTC","ETH"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| contract_code          | string       | true     | contract code                                                                                                                                                                                                                                                                                                                                                                  | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| margin_mode            | string       | true     | margin mode                                                                                                                                                                                                                                                                                                                                                                    | cross: cross margin mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_account         | string       | true     | margin account                                                                                                                                                                                                                                                                                                                                                                 | "USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| volume                 | decimal      | true     | place volume                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| price                  | decimal      | true     | place price                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_price_type       | string       | true     | type of order price                                                                                                                                                                                                                                                                                                                                                            | "market": Market Order，"limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |
| direction              | string       | true     | direction                                                                                                                                                                                                                                                                                                                                                                      | "buy"/"sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| offset                 | string       | true     | offset                                                                                                                                                                                                                                                                                                                                                                         | "open","close","both"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| status                 | int          | true     | order status                                                                                                                                                                                                                                                                                                                                                                   | 1\. Placing orders to order book; 2 Placing orders to order book; 3. Placed to order book 4. Partially filled; 5 partially filled but cancelled by client; 6. Fully filled; 7. Cancelled; 11Cancelling                                                                                                                                                                                                                                                                                                                                                         |
| lever_rate             | int          | true     | leverage                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id               | long         | true     | order ID                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id_str           | string       | true     | order ID                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| client_order_id        | long         | true     | client order ID                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_source           | string       | true     | order source                                                                                                                                                                                                                                                                                                                                                                   | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| order_type             | int          | true     | order type                                                                                                                                                                                                                                                                                                                                                                     | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| created_at             | long         | true     | created time                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_volume           | decimal      | true     | trade total amount                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_turnover         | decimal      | true     | trade amount                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee                    | decimal      | true     | service fee                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_avg_price        | decimal      | true     | trade average price                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| margin_asset           | string       | true     | margin asset                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| margin_frozen          | decimal      | true     | frozen margin                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| profit                 | decimal      | true     | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| liquidation_type       | decimal      | true     | liquidation type 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| canceled_at            | long         | true     | canceled time                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee_asset              | string       | true     | fee asset                                                                                                                                                                                                                                                                                                                                                                      | “USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| is_tpsl                | int          | true     | whether to set take-profit and stop-loss order                                                                                                                                                                                                                                                                                                                                 | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| real_profit            | decimal      | true     | total real profit of order (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| contract_type          | string       | true     | contract type                                                                                                                                                                                                                                                                                                                                                                  | swap, this_week, next_week, quarter, next_quarter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| pair                   | string       | true     | pair                                                                                                                                                                                                                                                                                                                                                                           | such as: “BTC-USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| business_type          | string       | true     | business type                                                                                                                                                                                                                                                                                                                                                                  | futures, swap                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| reduce_only            | int          | true     | reduce only                                                                                                                                                                                                                                                                                                                                                                    | 0: no, 1: yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| canceled_source        | string       | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TRADE_START            | object array | true     |                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| id                     | string       | true     | the global unique ID of the trade.                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_id               | long         | true     | In this interface, trade_id is the same with match_id of linear-swap-api/v1/swap_cross_matchresults. trade_id is the result of sets of order execution and trade confirmation. NOTE: trade_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade_id. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_volume           | decimal      | true     | trade quantity                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_price            | decimal      | true     | trade price                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_fee              | decimal      | true     | trade fee                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_turnover         | decimal      | true     | trade amount                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long         | true     | trade time                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| role                   | string       | true     | taker/maker                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| real_profit            | decimal      | true     | real profit of the transaction (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| profit                 | decimal      | true     | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee_asset              | string       | true     | fee asset                                                                                                                                                                                                                                                                                                                                                                      | “USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| price                  | string       | false    | deduction currency price(USDT)                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| self_match_prevent     | int          | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                                        | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                                                   |
| TRADE_END              | string       | true     |                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| self_match_prevent_new | string       | true     | Prevent self-trading                                                                                                                                                                                                                                                                                                                                                           | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Notes:  
The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).  
Only of the order information that orders created after 0:00 on January 30,
2021, the real profit (real_profit) parameter has a value. And the real profit
(real_profit) of the transaction information that orders traded after December
10, 2020 has a value.

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"orders_cross.btc-usdt"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"orders_cross.btc-usdt"

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

"contract_code":

"BTC-USDT"

"volume":

111

"price":

1111

"order_price_type":

"limit"

"direction":

"buy"

"offset":

"open"

"status":

6

"lever_rate":

10

"order_id":

758684042347171800

"order_id_str":

"758684042347171840"

"client_order_id":

10683

"order_source":

"web"

"order_type":

1

"created_at":

1408076414000

"trade_volume":

1

"trade_turnover":

1200

"fee":

0

"liquidation_type":

"0"

"trade_avg_price":

10

"margin_asset":

"USDT"

"margin_frozen":

10

"profit":

2

"canceled_at":

1408076414000

"fee_asset":

"USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"is_tpsl":

0

"real_profit":

0

"reduce_only":

0

"canceled_source":

"timeout-canceled-order"

"self_match_prevent_new":

"cancel_both"

"trade":\[

0:{

"trade_id":

14469

"id":

"14469-758684042347171840-1"

"trade_volume":

1

"trade_price":

123.4555

"trade_fee":

0.234

"fee_asset":

"USDT"

"price":

""

"trade_turnover":

34.123

"created_at":

1490759594752

"role":

"maker"

"profit":

2

"real_profit":

0

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"orders_cross.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}
