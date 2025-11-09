# GET [Isolated] Order details acquisition

**Source:**
[[Isolated] Order details acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=8cb854d2-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_order_detail (\[Isolated\] Order details acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |                                                                                                           |               |
| order_id      | long      | true     | Order ID                                                                   |                                                                                                           |               |
| created_at    | long      | false    | Timestamp                                                                  |                                                                                                           |               |
| order_type    | int       | false    | Order type                                                                 | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order; 22. ADL reduction-only order |               |
| page_index    | int       | false    | Page number, default 1st page                                              |                                                                                                           |               |
| page_size     | int       | false    | Default 20，no more than 50                                                |                                                                                                           |               |

Notes:  
When getting information on order cancellation via query order detail interface,
users who type in parameters “created_at” and “order_type” can query last 6-hour
data, while users who don’t type in parameters “created_at” and “order_type” can
only query last 2-hour data.  
The return order_id is 18 bits, it will make mistake when nodejs and JavaScript
analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by
default. so the number over 18 bits need be parsed by jaso-bigint package.  
created_at should use timestamp of long type as 13 bits (include Millisecond),
if send the accurate timestamp for "created_at", query performance will be
improved.  
Please note that created_at can't be "0"

#### Response Parameter

| Parameter              | Data Type | Required | Description                                                                                                                                                                                                                                                                                                                                                              | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string    | true     | Request Processing Result                                                                                                                                                                                                                                                                                                                                                | "ok" , "error"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| DATA_START             |           | false    |                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| symbol                 | string    | true     | Variety code                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| contract_code          | string    | true     | Contract Code                                                                                                                                                                                                                                                                                                                                                            | "BTC-USDT" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| lever_rate             | int       | true     | Leverage Rate                                                                                                                                                                                                                                                                                                                                                            | 1\\5\\10\\20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| direction              | string    | true     | Transaction direction                                                                                                                                                                                                                                                                                                                                                    | "buy", "sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| offset                 | string    | true     | "open": "close"                                                                                                                                                                                                                                                                                                                                                          | "open", "close", "both"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| volume                 | decimal   | true     | Number of Order                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| price                  | decimal   | true     | Price committed                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long      | true     | Creation time                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| canceled_at            | long      | true     | Canceled time                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_source           | string    | true     | Order Source                                                                                                                                                                                                                                                                                                                                                             | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| order_price_type       | string    | true     | order price type                                                                                                                                                                                                                                                                                                                                                         | "market": Market Order，"limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |
| margin_frozen          | decimal   | true     | Frozen margin                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| margin_asset           | string    | true     | margin asset                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| profit                 | decimal   | true     | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id               | long      | true     | Order ID                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id_str           | string    | true     | Order ID                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| client_order_id        | long      | true     | Client order ID                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_type             | string    | true     | order type                                                                                                                                                                                                                                                                                                                                                               | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order ; 22. ADL reduction-only order                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| status                 | int       | true     | status                                                                                                                                                                                                                                                                                                                                                                   | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling.                                                                                                                                                                                                                                                                                                                    |
| trade_volume           | decimal   | true     | Transaction quantity                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_turnover         | decimal   | true     | Transaction aggregate amount                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_avg_price        | decimal   | true     | Transaction average price                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| total_page             | int       | true     | Page in total                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| current_page           | int       | true     | Current Page                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| total_size             | int       | true     | Total Size                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| instrument_price       | decimal   | true     | Liquidation price                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| final_interest         | decimal   | true     | Account Balance After Liquidation                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| adjust_value           | decimal   | true     | Adjustment Factor of Liquidating Order                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee_asset              | string    | true     | the corresponding cryptocurrency to the given fee                                                                                                                                                                                                                                                                                                                        | "USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| fee                    | decimal   | true     | total amount of fees                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| liquidation_type       | string    | true     | Liquidation type                                                                                                                                                                                                                                                                                                                                                         | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| margin_mode            | string    | true     | margin mode                                                                                                                                                                                                                                                                                                                                                              | isolated : "isolated"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| margin_account         | string    | true     | margin account                                                                                                                                                                                                                                                                                                                                                           | "BTC-USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| is_tpsl                | int       | true     | whether to set take-profit and stop-loss order                                                                                                                                                                                                                                                                                                                           | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| real_profit            | decimal   | true     | total real profit of order (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| reduce_only            | int       | true     | reduce only                                                                                                                                                                                                                                                                                                                                                              | 0: no, 1: yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| canceled_source        | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TRADES_START           |           | false    |                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| id                     | string    | true     | the global unique ID of the trade.                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee_asse               | string    | false    | fee asset                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| price                  | string    | false    | deduction currency price(USDT)                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_id               | long      | true     | In this interface, trade_id is the same with match_id of linear-swap-api/v1/swap_matchresults. trade_id is the result of sets of order execution and trade confirmation. NOTE: trade_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade_id. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_price            | decimal   | true     | Match Price                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_volume           | decimal   | true     | Transaction quantity                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_turnover         | decimal   | true     | Transaction price                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_fee              | decimal   | true     | Transaction Service fee                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| role                   | string    | true     | taker or maker                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long      | true     | Creation time                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| profit                 | decimal   | true     | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| real_profit            | decimal   | true     | real profit of the transaction (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TRADES_END             |           | false    |                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| self_match_prevent     | int       | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                                  | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                                                   |
| self_match_prevent_new | String    | true     | Prevent self-trading                                                                                                                                                                                                                                                                                                                                                     | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| DATA \_END             |           | false    |                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ts                     | long      | true     | Timestamp                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

Notes:  
The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).  
Only of the order information that orders created after 0:00 on January 30,
2021, the real profit (real_profit) parameter has a value. And the real profit
(real_profit) of the transaction information that orders traded after December
10, 2020 has a value.

#### Request example

{

"contract_code":

"BTC-USDT"

"order_id":

"456234321"

"created_at":

1670559637769

"order_type":

1

"page_index":

1

"page_size":

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

"contract_code":

"BTC-USDT"

"instrument_price":

0

"final_interest":

0

"adjust_value":

0

"lever_rate":

10

"direction":

"sell"

"offset":

"open"

"volume":

1

"price":

13059.8

"created_at":

1603703614712

"canceled_at":

0

"order_source":

"api"

"order_price_type":

"opponent"

"margin_frozen":

0

"profit":

0

"trades":\[

0:{

"trade_id":

131560927

"trade_price":

13059.8

"trade_volume":

1

"trade_turnover":

13.0598

"trade_fee":

\-0.00522392

"created_at":

1603703614715

"role":

"taker"

"fee_asset":

"USDT"

"real_profit":

0

"profit":

0

"id":

"131560927-770334322963152896-1"

"fee_asse":

""

"price":

""

}

\]

"total_page":

1

"current_page":

1

"total_size":

1

"liquidation_type":

"0"

"fee_asset":

"USDT"

"fee":

\-0.00522392

"order_id":

770334322963152900

"order_id_str":

"770334322963152896"

"client_order_id":

57012021045

"order_type":

"1"

"status":

6

"trade_avg_price":

13059.8

"trade_turnover":

13.0598

"trade_volume":

1

"margin_asset":

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

}

"ts":

1603703678477

}
