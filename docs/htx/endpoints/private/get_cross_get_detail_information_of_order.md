# GET [Cross] Get Detail Information of order

**Source:**
[[Cross] Get Detail Information of order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8562d-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_order_detail (\[Cross\] Get Detail Information of order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. one of pair and contract_code must be filled
in(if all of them not filled in, will get 1014 error code); and all filled in,
the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                   | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                 | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                       |               |
| pair          | string    | false    | pair                          | BTC-USDT                                                                                                  |               |
| order_id      | long      | true     | order ID                      |                                                                                                           |               |
| created_at    | long      | false    | created timestamp             |                                                                                                           |               |
| order_type    | int       | false    | order type                    | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order; 22. ADL reduction-only order |               |
| page_index    | int       | false    | page number, default 1st page |                                                                                                           |               |
| page_size     | int       | false    | default 20，no more than 50   |                                                                                                           |               |

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

| Parameter              | Data Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                    | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string       | true     | Request Processing Result                                                                                                                                                                                                                                                                                                                                                      | "ok" , "error"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| DATA_START             | object       | true     |                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| symbol                 | string       | true     | symbol                                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| contract_code          | string       | true     | contract code                                                                                                                                                                                                                                                                                                                                                                  | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| margin_mode            | string       | true     | margin mode                                                                                                                                                                                                                                                                                                                                                                    | cross: cross margin mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| margin_account         | string       | true     | margin account                                                                                                                                                                                                                                                                                                                                                                 | "USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| lever_rate             | int          | true     | leverage                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| direction              | string       | true     | direction                                                                                                                                                                                                                                                                                                                                                                      | "buy","sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| offset                 | string       | true     | offset                                                                                                                                                                                                                                                                                                                                                                         | "open", "close", "both"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| volume                 | decimal      | true     | place volume                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| price                  | decimal      | true     | place price                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long         | true     | created time                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_source           | string       | true     | order source                                                                                                                                                                                                                                                                                                                                                                   | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| order_price_type       | string       | true     | order price type                                                                                                                                                                                                                                                                                                                                                               | "market": Market Order，"limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |
| margin_asset           | string       | true     | margin asset                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| margin_frozen          | decimal      | true     | frozen margin                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| profit                 | decimal      | true     | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| instrument_price       | decimal      | true     | liquidation price                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| final_interest         | decimal      | true     | account balance after liquidation                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| adjust_value           | decimal      | true     | adjustment factor of liquidating order                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee                    | decimal      | true     | total fee                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee_asset              | string       | true     | fee asset                                                                                                                                                                                                                                                                                                                                                                      | （"USDT"...）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| liquidation_type       | string       | true     | liquidation type                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| canceled_at            | long         | true     | canceled time                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id               | long         | true     | order ID                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id_str           | string       | true     | order ID                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| client_order_id        | long         | true     | client order ID                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_type             | string       | true     | order type                                                                                                                                                                                                                                                                                                                                                                     | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order ; 22. ADL reduction-only order                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| status                 | int          | true     | order status                                                                                                                                                                                                                                                                                                                                                                   | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling.                                                                                                                                                                                                                                                                                                                    |
| trade_avg_price        | decimal      | true     | trade average price                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_turnover         | decimal      | true     | trade total amount                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_volume           | decimal      | true     | trade total amount                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| contract_type          | string       | true     | contract type                                                                                                                                                                                                                                                                                                                                                                  | swap, this_week, next_week, quarter, next_quarter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| pair                   | string       | true     | pair                                                                                                                                                                                                                                                                                                                                                                           | such as: “BTC-USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| business_type          | string       | true     | business type                                                                                                                                                                                                                                                                                                                                                                  | futures, swap                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| total_page             | int          | true     | total page                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| current_page           | int          | true     | current page                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| total_size             | int          | true     | total size                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| is_tpsl                | int          | true     | whether to set take-profit and stop-loss order                                                                                                                                                                                                                                                                                                                                 | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| real_profit            | decimal      | true     | total real profit of order (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| reduce_only            | int          | true     | reduce only                                                                                                                                                                                                                                                                                                                                                                    | 0: no, 1: yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| canceled_source        | string       | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TRADES_START           | object array | true     |                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| id                     | string       | true     | the global unique ID of the trade                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee_asse               | string       | false    | fee asset                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| price                  | string       | false    | deduction currency price(USDT)                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_id               | long         | true     | In this interface, trade_id is the same with match_id of linear-swap-api/v1/swap_cross_matchresults. trade_id is the result of sets of order execution and trade confirmation. NOTE: trade_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade_id. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_price            | decimal      | true     | trade price                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_volume           | decimal      | true     | trade volume                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_turnover         | decimal      | true     | trade amount                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_fee              | decimal      | true     | trade fee                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| role                   | string       | true     | taker/maker                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long         | true     | created time                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| profit                 | decimal      | true     | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| real_profit            | decimal      | true     | real profit of the transaction (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TRADES_END             |              | false    |                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| self_match_prevent     | int          | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                                        | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                                                   |
| self_match_prevent_new | String       | true     | Prevent self-trading                                                                                                                                                                                                                                                                                                                                                           | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| DATA_END               |              | false    |                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ts                     | long         | true     | timestamp                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

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

"pair":

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
