# GET Order details acquisition

**Source:**
[Order details acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a565-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_order_detail (Order details acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                               | Value Range                                                                         | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |                                                                                     |               |
| order_id      | long      | true     | Order ID                                                                  |                                                                                     |               |
| created_at    | long      | false    | Timestamp                                                                 |                                                                                     |               |
| order_type    | int       | false    | Order type                                                                | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |               |
| page_index    | int       | false    | Page number, default 1st page                                             |                                                                                     |               |
| page_size     | int       | false    | Default 20，no more than 50                                               |                                                                                     |               |

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
eg. the timestamp "2019/10/18 10:26:22" can be changed：1571365582123.It can
also directly obtain the timestamp（ts) from the returned ordering
interface(swap_order) to query the corresponding orders.  
Please note that created_at can't be "0"

#### Response Parameter

| Parameter                           | Data Type | Required | Description                                                                                                                                                                                                                                                                                                                                                       | Value Range                                                                                                                                                                                                                                                   |
| ----------------------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                              | string    | true     | Request Processing Result                                                                                                                                                                                                                                                                                                                                         | "ok" , "error"                                                                                                                                                                                                                                                |
| data<object>                        |           | false    |                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                               |
| symbol                              | string    | true     | Variety code                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                               |
| contract_code                       | string    | true     | Contract Code                                                                                                                                                                                                                                                                                                                                                     | "BTC-USD" ...                                                                                                                                                                                                                                                 |
| lever_rate                          | int       | true     | Leverage Rate                                                                                                                                                                                                                                                                                                                                                     | 1\\5\\10\\20                                                                                                                                                                                                                                                  |
| direction                           | string    | true     | Transaction direction                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                               |
| offset                              | string    | true     | "open": "close"                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                               |
| volume                              | decimal   | true     | Number of Order                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                               |
| price                               | decimal   | true     | Price committed                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                               |
| created_at                          | long      | true     | Creation time                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                               |
| order_source                        | string    | true     | Order Source                                                                                                                                                                                                                                                                                                                                                      | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                                         |
| order_price_type                    | string    | true     | order price type                                                                                                                                                                                                                                                                                                                                                  | "limit", "opponent","post_only" Position limit will be applied to post_only while order limit will not.                                                                                                                                                       |
| margin_frozen                       | decimal   | true     | Frozen margin                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                               |
| profit                              | decimal   | true     | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                               |
| order_id                            | long      | true     | Order ID                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                               |
| order_id_str                        | string    | true     | Order ID                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                               |
| client_order_id                     | long      | true     | Client order ID                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                               |
| order_type                          | int       | false    | Order type                                                                                                                                                                                                                                                                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                                                                                                                           |
| status                              | int       | true     | status                                                                                                                                                                                                                                                                                                                                                            | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 10.Orders failed. 11. Orders cancelling. |
| trade_volume                        | decimal   | true     | Transaction quantity                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                               |
| trade_turnover                      | decimal   | true     | Transaction aggregate amount                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                               |
| trade_avg_price                     | decimal   | true     | Transaction average price                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                               |
| total_page                          | int       | true     | Page in total                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                               |
| current_page                        | int       | true     | Current Page                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                               |
| total_size                          | int       | true     | Total Size                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                               |
| instrument_price                    | decimal   | true     | Liquidation price                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                               |
| final_interest                      | decimal   | true     | Account Balance After Liquidation                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                               |
| adjust_value                        | decimal   | true     | Adjustment Factor of Liquidating Order                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                               |
| fee_asset                           | string    | true     | the corresponding cryptocurrency to the given fee                                                                                                                                                                                                                                                                                                                 | "BTC","ETH"...                                                                                                                                                                                                                                                |
| fee                                 | decimal   | true     | total amount of fees                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                               |
| liquidation_type                    | string    | true     | Liquidation type                                                                                                                                                                                                                                                                                                                                                  | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated                                                                                                                                                                          |
| is_tpsl                             | int       | true     | whether to set take-profit and stop-loss order                                                                                                                                                                                                                                                                                                                    | 1：yes；0：no                                                                                                                                                                                                                                                 |
| real_profit                         | decimal   | true     | total real profit of order (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                               |
| canceled_source                     | string    | false    | timeout-canceled-order                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                               |
| LIST> (ATTRIBUTE NAME: TRADES_START |           | false    |                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                               |
| id                                  | string    | true     | the global unique ID of the trade.                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                               |
| trade_id                            | long      | true     | In this interface, trade_id is the same with match_id of swap-api/v1/swap_matchresults. trade_id is the result of sets of order execution and trade confirmation. NOTE: trade_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade_id. |                                                                                                                                                                                                                                                               |
| trade_price                         | decimal   | true     | Match Price                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                               |
| trade_volume                        | decimal   | true     | Transaction quantity                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                               |
| trade_turnover                      | decimal   | true     | Transaction price                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                               |
| trade_fee                           | decimal   | true     | Transaction Service fee                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                               |
| role                                | string    | true     | taker or maker                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                               |
| created_at                          | long      | true     | Creation time                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                               |
| profit                              | decimal   | true     | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                               |
| real_profit                         | decimal   | true     | real profit of the transaction (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                               |
| canceled_source                     | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                               |
| self_match_prevent                  | int       | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                  |
| LIST_END                            |           | false    |                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                               |
| OBJECT \_END                        |           | false    |                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                               |
| ts                                  | long      | true     | Timestamp                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                               |

Notes:  
The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).  
Only the real profit parameter (real_profit) of the transaction information that
orders created after 0:00 on January 30, 2021 has a value . And of the other
order transaction information that orders created before that times, the real
profit parameter is 0.

#### Request example

{

"order_id":

"456321"

"client_order_id":

"123456"

"contract_code":

"BTC-USD"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"symbol":

"THETA"

"contract_code":

"THETA-USD"

"instrument_price":

0

"final_interest":

0

"adjust_value":

0

"lever_rate":

20

"direction":

"buy"

"offset":

"close"

"volume":

10

"price":

0.66

"created_at":

1603727590740

"canceled_at":

0

"order_source":

"android"

"order_price_type":

"post_only"

"margin_frozen":

0

"profit":

1.0803950690222015

"trades":\[

0:{

"trade_id":

49637561388

"trade_price":

0.66

"trade_volume":

10

"trade_turnover":

100

"trade_fee":

\-0.030303030303030304

"created_at":

1603728041854

"role":

"maker"

"fee_asset":

"THETA"

"real_profit":

0

"profit":

1.0803950690222015

"id":

"49637561388-770434885714452480-1"

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

"THETA"

"fee":

\-0.030303030303030304

"order_id":

770434885714452500

"order_id_str":

"770434885714452480"

"client_order_id":

NULL

"order_type":

"1"

"status":

6

"trade_avg_price":

0.66

"trade_turnover":

100

"trade_volume":

10

"is_tpsl":

0

"real_profit":

0

"canceled_source":

"timeout-canceled-order"

}

"ts":

1603872939505

}
