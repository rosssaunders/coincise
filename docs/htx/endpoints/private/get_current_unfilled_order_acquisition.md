# GET Current unfilled order acquisition

**Source:**
[Current unfilled order acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a6ad-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_openorders (Current unfilled order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                       | Value Range                                                                                               | Default Value                                                             |
| ------------- | --------- | -------- | --------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| contract_code | string    | false    | Contract Code,If empty, query all |                                                                                                           | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |
| page_index    | int       | false    | Page, default 1st page            |                                                                                                           | 1                                                                         |
| page_size     | int       | false    | Default 20，no more than 50       |                                                                                                           | 20                                                                        |
| sort_by       | string    | false    | sort fields(descending)           | “created_at” : descending order by order created at, "update_time": descending order by order update time | created_at                                                                |
| trade_type    | int       | false    | trade type(Default:all)           | 0:all,1: buy long,2: sell short,3: buy short,4: sell long                                                 | 0                                                                         |

#### Response Parameter

| Parameter          | Data Type | Required | Description                                                                                                       | Value Range                                                                                                                                                                                                                                 |
| ------------------ | --------- | -------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status             | string    | true     | Request Processing Result                                                                                         |                                                                                                                                                                                                                                             |
| data: <list>       |           | false    |                                                                                                                   |                                                                                                                                                                                                                                             |
| orders: <list>     |           | false    |                                                                                                                   |                                                                                                                                                                                                                                             |
| symbol             | string    | true     | Variety code                                                                                                      |                                                                                                                                                                                                                                             |
| contract_code      | string    | true     | Contract Code                                                                                                     | "BTC-USD" ...                                                                                                                                                                                                                               |
| volume             | decimal   | true     | Number of Order                                                                                                   |                                                                                                                                                                                                                                             |
| price              | decimal   | true     | Price committed                                                                                                   |                                                                                                                                                                                                                                             |
| order_price_type   | string    | true     | order price type                                                                                                  | "limit", "opponent","post_only" Position limit will be applied to post_only while order limit will not.                                                                                                                                     |
| order_type         | int       | true     | Order type                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order                                                                                                                                                                 |
| direction          | string    | true     | Transaction direction                                                                                             |                                                                                                                                                                                                                                             |
| offset             | string    | true     | "open": "close"                                                                                                   |                                                                                                                                                                                                                                             |
| lever_rate         | int       | true     | Leverage Rate                                                                                                     | 1\\5\\10\\20                                                                                                                                                                                                                                |
| order_id           | long      | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                             |
| order_id_str       | string    | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                             |
| client_order_id    | long      | true     | Client order ID                                                                                                   |                                                                                                                                                                                                                                             |
| created_at         | long      | true     | Order Creation time                                                                                               |                                                                                                                                                                                                                                             |
| trade_volume       | decimal   | true     | Transaction quantity                                                                                              |                                                                                                                                                                                                                                             |
| trade_turnover     | decimal   | true     | Transaction aggregate amount                                                                                      |                                                                                                                                                                                                                                             |
| fee                | decimal   | true     | Service fee                                                                                                       |                                                                                                                                                                                                                                             |
| trade_avg_price    | decimal   | true     | Transaction average price                                                                                         |                                                                                                                                                                                                                                             |
| margin_frozen      | decimal   | true     | Frozen margin                                                                                                     |                                                                                                                                                                                                                                             |
| profit             | decimal   | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |                                                                                                                                                                                                                                             |
| status             | int       | true     | status                                                                                                            | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| order_source       | string    | true     | Order Source                                                                                                      | （system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl）                                                                                                                                                        |
| fee_asset          | string    | true     | the corresponding cryptocurrency to the given fee                                                                 | "BTC","ETH"...                                                                                                                                                                                                                              |
| is_tpsl            | int       | true     | whether to set take-profit and stop-loss order                                                                    | 1：yes；0：no                                                                                                                                                                                                                               |
| update_time        | Long      | true     | order update time ，millesecond timestamp                                                                         |                                                                                                                                                                                                                                             |
| real_profit        | decimal   | true     | real profit (calculated with the opening average price, include profit in history settlement.)                    |                                                                                                                                                                                                                                             |
| ORDERS_END         |           | false    |                                                                                                                   |                                                                                                                                                                                                                                             |
| total_page         | int       | true     | Total Pages                                                                                                       |                                                                                                                                                                                                                                             |
| current_page       | int       | true     | Current Page                                                                                                      |                                                                                                                                                                                                                                             |
| total_size         | int       | true     | Total Size                                                                                                        |                                                                                                                                                                                                                                             |
| canceled_source    | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                   |                                                                                                                                                                                                                                             |
| self_match_prevent | int       | false    | Self trading prevention                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                |
| LIST_END           |           | false    |                                                                                                                   |                                                                                                                                                                                                                                             |
| ts                 | long      | true     | Timestamp                                                                                                         |                                                                                                                                                                                                                                             |

Notes:  
The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).  
Only of the order information that orders created after 0:00 on January 30,
2021, the real profit (real_profit) parameter has a value. And in the other
orders created before that times, it is 0.

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_open_interest?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"orders":\[

0:{

"symbol":

"THETA"

"contract_code":

"THETA-USD"

"volume":

1

"price":

0.6

"order_price_type":

"post_only"

"order_type":

1

"direction":

"buy"

"offset":

"open"

"lever_rate":

20

"order_id":

771043577949732900

"client_order_id":

NULL

"created_at":

1603872714279

"trade_volume":

0

"trade_turnover":

0

"fee":

0

"trade_avg_price":

NULL

"margin_frozen":

0.8333333333333334

"profit":

0

"status":

3

"order_source":

"api"

"order_id_str":

"771043577949732864"

"fee_asset":

"THETA"

"liquidation_type":

NULL

"canceled_at":

NULL

"is_tpsl":

0

"update_time":

1606975980467

"real_profit":

0

}

\]

"total_page":

1

"current_page":

1

"total_size":

1

}

"ts":

1603873042150

}
