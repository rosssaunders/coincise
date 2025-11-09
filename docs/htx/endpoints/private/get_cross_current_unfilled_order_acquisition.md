# GET [Cross] Current unfilled order acquisition

**Source:**
[[Cross] Current unfilled order acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=8cb858fe-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_openorders (\[Cross\] Current unfilled order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. When both of pair and contract_code filled in,
the contract_code is the preferred. supports none any parameter filled in, it
means all contract code in cross mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                         | Value Range                                                                                              | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                                       | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                      |               |
| pair          | string    | false    | pair                                                | BTC-USDT                                                                                                 |               |
| page_index    | int       | false    | page index, default 1st page                        |                                                                                                          |               |
| page_size     | int       | false    | page size, default 20，no more than 50              |                                                                                                          |               |
| sort_by       | string    | false    | sort fields(Default: “created_at” descending order) | “created_at”: descending order by order created at, "update_time": descending order by order update time |               |
| trade_type    | int       | false    | trade type(Default:all)                             | 0:all,1: buy long,2: sell short,3: buy short,4: sell long , 17.buy(one-way mode), 18.sell(one-way mode)  |               |

#### Response Parameter

| Parameter              | Data Type | Required | Description                                                                                                       | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string    | true     | Request Processing Result                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| DATA_START             | object    | true     |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ORDERS_START           | object    | true     |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| symbol                 | string    | true     | symbol                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| contract_code          | string    | true     | contract code                                                                                                     | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| margin_mode            | string    | true     | margin mode                                                                                                       | cross: cross margin mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| margin_account         | string    | true     | margin account                                                                                                    | "USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| volume                 | decimal   | true     | place volume                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| price                  | decimal   | true     | place price                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| order_price_type       | string    | true     | type of order price                                                                                               | "limit":Limit,"opponent":opponent,"post_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_20":optimal 20，"fok":FOK Order，"ioc":IOC Order, "opponent_ioc": opponent ioc，"lightning_ioc": lightning ioc，"optimal_5_ioc": optimal_5 ioc，"optimal_10_ioc": optimal_10 ioc，"optimal_20_ioc"：optimal_20 ioc，"opponent_fok"： opponent fok，"lightning_fok"：lightning fok，"optimal_5_fok"：optimal_5 fok，"optimal_10_fok"：optimal_10 fok，"optimal_20_fok"：optimal_20 fok |
| order_type             | int       | true     | order type                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| direction              | string    | true     | "buy"/"sell"                                                                                                      | "buy","sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| offset                 | string    | true     | "open"/"close"                                                                                                    | "open","close","both"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| lever_rate             | int       | true     | leverage                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| order_id               | long      | true     | order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| order_id_str           | string    | true     | order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| client_order_id        | long      | true     | client order ID                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| order_source           | string    | true     | order source                                                                                                      | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| created_at             | long      | true     | created time                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| trade_volume           | decimal   | true     | trade total volume                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| trade_turnover         | decimal   | true     | trade total amount                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| fee                    | decimal   | true     | service fee                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| fee_asset              | string    | true     | fee asset                                                                                                         | （"USDT"...）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| trade_avg_price        | decimal   | true     | trade average price                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| margin_asset           | string    | true     | margin asset                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| margin_frozen          | decimal   | true     | frozen margin                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| profit                 | decimal   | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| status                 | int       | true     | order status                                                                                                      | 3\. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| liquidation_type       | string    | true     | liquidation type                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| canceled_at            | long      | true     | canceled time                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| is_tpsl                | int       | true     | whether to set take-profit and stop-loss order                                                                    | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| real_profit            | decimal   | true     | real profit (calculated with the opening average price, include profit in history settlement.)                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| update_time            | Long      | true     | order update time ，millesecond timestamp                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| contract_type          | string    | true     | contract type                                                                                                     | swap, this_week, next_week, quarter, next_quarter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| pair                   | string    | true     | pair                                                                                                              | such as: “BTC-USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| business_type          | string    | true     | business type                                                                                                     | futures, swap                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| reduce_only            | int       | true     | reduce only                                                                                                       | 0: no, 1: yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ORDERS_END             |           | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| total_page             | int       | true     | total page                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| current_page           | int       | true     | current page                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| total_size             | int       | true     | total size                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| self_match_prevent     | int       | false    | Self trading prevention                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| self_match_prevent_new | string    | true     | Prevent self-trading                                                                                              | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| canceled_source        | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| DATA_END               |           | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ts                     | long      | true     | timestamp                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

Notes:  
The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).  
Only of the order information that orders created after 0:00 on January 30,
2021, the real profit (real_profit) parameter has a value. And in the other
orders created before that times, it is 0.

#### Request example

{

"contract_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"page_index":

1

"page_size":

50

"sort_by":

"created_at"

"trade_type":

0

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"orders":\[

0:{

"update_time":

1639104153425

"business_type":

"swap"

"contract_type":

"swap"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"volume":

1

"price":

66000

"order_price_type":

"post_only"

"order_type":

1

"direction":

"sell"

"offset":

"open"

"lever_rate":

5

"order_id":

918814943964184600

"client_order_id":

NULL

"created_at":

1639104153393

"trade_volume":

0

"trade_turnover":

0

"fee":

0

"trade_avg_price":

NULL

"margin_frozen":

13.2

"profit":

0

"status":

3

"order_source":

"api"

"order_id_str":

"918814943964184578"

"fee_asset":

"USDT"

"liquidation_type":

NULL

"canceled_at":

NULL

"margin_asset":

"USDT"

"margin_account":

"USDT"

"margin_mode":

"cross"

"is_tpsl":

0

"real_profit":

0

"reduce_only":

0

}

\]

"total_page":

1

"current_page":

1

"total_size":

1

"self_match_prevent_new":

"cancel_both"

}

"ts":

1639104160523

}
