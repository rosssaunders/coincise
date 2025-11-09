# GET [Isolated] Query Trigger Order History

**Source:**
[[Isolated] Query Trigger Order History](https://www.htx.com/en-us/opend/newApiPages/?id=8cb87658-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_trigger_hisorders (\[Isolated\] Query Trigger Order History)

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

| Parameter     | Data Type | Required | Description                                                     | Value Range                                                                                                                                                                                                                                                                                 | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | Contract Code                                                   | BTC-USDT                                                                                                                                                                                                                                                                                    |               |
| trade_type    | int       | true     | Transaction type                                                | 0: All ,1: Open Long,2: Close Short,3: Open Short,4: Close Long, 17:buy(one-way mode), 18:sell(one-way mode)；the system will transfer these parameters into offset and direction and query the requested data. Please note that no data can be requested with parameter out of this range. |               |
| status        | string    | true     | Order Status                                                    | data divided with several commas, trigger orders ready to be submitted：0: All (All filled orders),4: Trigger orders successfully submitted,5: Trigger orders failed being submitted, 6: Trigger orders cancelled                                                                           |               |
| create_date   | int       | true     | Date                                                            | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default.                                                                                                                     |               |
| page_index    | int       | false    | Page, 1st page by default without given instruction             | page，1st page by default without given instruction                                                                                                                                                                                                                                         | 1             |
| page_size     | int       | false    | Page 20 by default without given instruction, ，no more than 50 | Page 20 by default without given instruction, ，no more than 50                                                                                                                                                                                                                             | 20            |
| sort_by       | string    | false    | sort fields(descending)                                         | "created_at"：descending order by order creation time, "update_time": descending order by order update time                                                                                                                                                                                 | created_at    |

Notes:  
Default to query completed orders (order status is one of 4, 5, 6);

#### Response Parameter

| Parameter         | Data Type | Required | Description                                                                                                                                              | Value Range           |
| ----------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| status            | string    | true     | Request Processing Result                                                                                                                                | "ok" , "error"        |
| DATA_START        |           | true     |                                                                                                                                                          |                       |
| total_page        | int       | true     | Total page                                                                                                                                               |                       |
| current_page      | int       | true     | Current page                                                                                                                                             |                       |
| total_size        | int       | true     | Total Size                                                                                                                                               |                       |
| ORDERS_START      |           | false    |                                                                                                                                                          |                       |
| symbol            | string    | true     | symbol                                                                                                                                                   |                       |
| contract_code     | string    | true     | Contract Code                                                                                                                                            |                       |
| trigger_type      | string    | true     | trigger： ge Equal to or Greater than；le Less than or Equal to                                                                                          |                       |
| volume            | decimal   | true     | Numbers of order placed                                                                                                                                  |                       |
| order_type        | int       | true     | Transaction type：1、Place orders 2、Cancel orders                                                                                                       |                       |
| direction         | string    | true     | order direction, \[Buy (buy), Sell(sell)\]                                                                                                               |                       |
| offset            | string    | true     | offset direction \[Open(open), Close(lose), both\]                                                                                                       |                       |
| lever_rate        | int       | true     | leverage 1\\5\\10\\20                                                                                                                                    |                       |
| order_id          | long      | true     | Trigger order ID                                                                                                                                         |                       |
| order_id_str      | string    | true     | the order ID with string                                                                                                                                 |                       |
| relation_order_id | string    | true     | Relation order ID is the string related to the limit orders The value is -1 before the trigger orders executed.                                          |                       |
| order_price_type  | string    | true     | order type "limit": Limit order price，"optimal_5": Optimal 5 price level，"optimal_10":Optimal 10 price level，"optimal_20": the Optimal 20 price level |                       |
| status            | int       | true     | Order status (4:Orders accepted、5: Orders failing being placed、6: Orders canceled )                                                                    |                       |
| order_source      | string    | true     | Order source( system、web、api、m、risk、settlement、ios、android、windows、mac、trigger)                                                                |                       |
| trigger_price     | decimal   | true     | trigger price                                                                                                                                            |                       |
| triggered_price   | decimal   | true     | the price when trigger orders executed                                                                                                                   |                       |
| order_price       | decimal   | true     | the order price preset by the client                                                                                                                     |                       |
| created_at        | long      | true     | the order creation time                                                                                                                                  |                       |
| triggered_at      | long      | true     | the execution time when orders getting triggered.                                                                                                        |                       |
| order_insert_at   | long      | true     | the time when the triggered orders filled successfully.                                                                                                  |                       |
| canceled_at       | long      | true     | Order cancelation time                                                                                                                                   |                       |
| update_time       | long      | true     | order update time，millesecond timestamp                                                                                                                 |                       |
| fail_code         | int       | true     | the error code when the triggered orders failed to be filled                                                                                             |                       |
| fail_reason       | string    | true     | the error message with failure reason when triggered orders failed to filled.                                                                            |                       |
| margin_mode       | string    | true     | margin mode                                                                                                                                              | isolated : "isolated" |
| margin_account    | string    | true     | margin account                                                                                                                                           | "BTC-USDT"...         |
| reduce_only       | int       | false    | 0: no, 1: yes                                                                                                                                            |                       |
| ORDERS_END        |           | false    |                                                                                                                                                          |                       |
| DATA_END          |           | false    |                                                                                                                                                          |                       |

#### Request example

{

"contract_code":

"BTC-USDT"

"trade_type":

0

"status":

0

"create_date":

30

"page_index":

1

"page_size":

50

"sort_by":

"created_at"

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

"trigger_type":

"ge"

"volume":

1

"order_type":

1

"direction":

"sell"

"offset":

"open"

"lever_rate":

10

"order_id":

3

"order_id_str":

"3"

"relation_order_id":

"-1"

"order_price_type":

"limit"

"status":

6

"order_source":

"api"

"trigger_price":

13900

"triggered_price":

NULL

"order_price":

13900

"created_at":

1603705155231

"triggered_at":

NULL

"order_insert_at":

0

"canceled_at":

1603705159520

"update_time":

1603705159520

"fail_code":

NULL

"fail_reason":

NULL

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"reduce_only":

0

}

\]

"total_page":

3

"current_page":

1

"total_size":

3

}

"ts":

1603705603369

}
