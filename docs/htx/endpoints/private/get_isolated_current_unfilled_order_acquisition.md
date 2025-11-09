# GET [Isolated] Current unfilled order acquisition

**Source:**
[[Isolated] Current unfilled order acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=8cb85791-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_openorders (\[Isolated\] Current unfilled order acquisition)

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

| Parameter     | Data Type | Required | Description                       | Value Range                                                                                             | Default Value |
| ------------- | --------- | -------- | --------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | Contract Code,If empty, query all | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT"                              |               |
| page_index    | int       | false    | Page, default 1st page            |                                                                                                         | 1             |
| page_size     | int       | false    | Default 20，no more than 50       |                                                                                                         | 20            |
| sort_by       | string    | false    | sort fields(descending)           | “created_at”descending order by order created at, "update_time": descending order by order update time  | created_at    |
| trade_type    | int       | false    | trade type(Default:all)           | 0:all,1: buy long,2: sell short,3: buy short,4: sell long , 17:buy(one-way mode), 18:sell(one-way mode) | 0             |

#### Response Parameter

| Parameter              | Data Type | Required | Description                                                                                                       | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string    | true     | Request Processing Result                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| DATA_START             | object    | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ORDERS_START           | array     | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| symbol                 | string    | true     | Variety code                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| contract_code          | string    | true     | Contract Code                                                                                                     | "BTC-USDT" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| volume                 | decimal   | true     | Number of Order                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| price                  | decimal   | true     | Price committed                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| order_price_type       | string    | true     | type of order price                                                                                               | "limit":Limit,"opponent":opponent,"post_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_20":optimal 20，"fok":FOK Order，"ioc":IOC Order, "opponent_ioc": opponent ioc，"lightning_ioc": lightning ioc，"optimal_5_ioc": optimal_5 ioc，"optimal_10_ioc": optimal_10 ioc，"optimal_20_ioc"：optimal_20 ioc，"opponent_fok"： opponent fok，"lightning_fok"：lightning fok，"optimal_5_fok"：optimal_5 fok，"optimal_10_fok"：optimal_10 fok，"optimal_20_fok"：optimal_20 fok |
| order_type             | int       | true     | Order type                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| direction              | string    | true     | Transaction direction                                                                                             | "buy","sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| offset                 | string    | true     | "open": "close"                                                                                                   | "open", "close", "both"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| lever_rate             | int       | true     | Leverage Rate                                                                                                     | 1\\5\\10\\20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| order_id               | long      | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| order_id_str           | string    | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| client_order_id        | long      | true     | Client order ID                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| created_at             | long      | true     | Order Creation time                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| trade_volume           | decimal   | true     | Transaction quantity                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| trade_turnover         | decimal   | true     | Transaction aggregate amount                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| fee                    | decimal   | true     | Service fee                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| trade_avg_price        | decimal   | true     | Transaction average price                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| margin_frozen          | decimal   | true     | Frozen margin                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| margin_asset           | string    | true     | margin asset                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| profit                 | decimal   | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| status                 | int       | true     | status                                                                                                            | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled;                                                                                                                                                                                                                                                                                                                                                                          |
| order_source           | string    | true     | Order Source                                                                                                      | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| fee_asset              | string    | true     | the corresponding cryptocurrency to the given fee                                                                 | "USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| liquidation_type       | string    | true     | liquidation type                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| canceled_at            | long      | true     | order Cancellation time                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| margin_mode            | string    | true     | margin mode                                                                                                       | isolated : "isolated"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| margin_account         | string    | true     | margin account                                                                                                    | "BTC-USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| is_tpsl                | int       | true     | whether to set take-profit and stop-loss order                                                                    | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| real_profit            | decimal   | true     | real profit (calculated with the opening average price, include profit in history settlement.)                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| update_time            | Long      | true     | order update time ，millesecond timestamp                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| reduce_only            | int       | true     | reduce only                                                                                                       | 0: no, 1: yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ORDERS_END             |           | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| total_page             | int       | true     | Total Pages                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| current_page           | int       | true     | Current Page                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| total_size             | int       | true     | Total Size                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| self_match_prevent     | int       | false    | Self trading prevention                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| self_match_prevent_new | string    | true     | Prevent self-trading                                                                                              | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders allow: Allow self-trading                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| canceled_source        | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| DATA_END               |           | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ts                     | long      | true     | Timestamp                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

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

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"volume":

1

"price":

13329

"order_price_type":

"limit"

"order_type":

1

"direction":

"sell"

"offset":

"open"

"lever_rate":

10

"order_id":

770326042832437200

"client_order_id":

57012021028

"created_at":

1603701640576

"trade_volume":

0

"trade_turnover":

0

"fee":

0

"trade_avg_price":

NULL

"margin_frozen":

1.3329

"profit":

0

"status":

3

"order_source":

"api"

"order_id_str":

"770326042832437248"

"fee_asset":

"USDT"

"liquidation_type":

NULL

"canceled_at":

NULL

"margin_asset":

"USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"is_tpsl":

0

"update_time":

1606975980467

"real_profit":

0

"reduce_only":

0

}

\]

"total_page":

2

"current_page":

1

"total_size":

2

"self_match_prevent_new":

"cancel_both"

}

"ts":

1603703993952

}
