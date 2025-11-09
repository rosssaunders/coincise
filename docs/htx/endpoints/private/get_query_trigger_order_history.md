# GET Query Trigger Order History

**Source:**
[Query Trigger Order History](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b2f5-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_trigger_hisorders (Query Trigger Order History)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                     | Value Range                                                                                                                                                                                                                                    | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | Contract Code                                                   | BTC-USD                                                                                                                                                                                                                                        |               |
| trade_type    | int       | true     | Transaction type                                                | 0: All ,1: Open Long,2: Close Short,3: Open Short,4: Close Long；the system will transfer these parameters into offset and direction and query the requested data. Please note that no data can be requested with parameter out of this range. |               |
| status        | string    | true     | Order Status                                                    | data divided with several commas, trigger orders ready to be submitted：0: All (All filled orders),4: Trigger orders successfully submitted,5: Trigger orders failed being submitted, 6: Trigger orders cancelled                              |               |
| create_date   | int       | true     | Date                                                            | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default.                                                                        |               |
| page_index    | int       | false    | Page, 1st page by default without given instruction             | page，1st page by default without given instruction                                                                                                                                                                                            | 1             |
| page_size     | int       | false    | Page 20 by default without given instruction, ，no more than 50 | Page 20 by default without given instruction, ，no more than 50                                                                                                                                                                                | 20            |
| sort_by       | string    | false    | sort fields(descending)                                         | "created_at"：descending order by order creation time, "update_time": descending order by order update time                                                                                                                                    | created_at    |

Notes:  
Default to query completed orders (order status is one of 4, 5, 6);

#### Response Parameter

| Parameter                           | Data Type | Required | Description                                                                                                                                              | Value Range    |
| ----------------------------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| status                              | string    | true     | Request Processing Result                                                                                                                                | "ok" , "error" |
| ts                                  | long      | true     | Time of Respond Generation, Unit: Millisecond                                                                                                            |                |
| DATA_START                          |           | false    |                                                                                                                                                          |                |
| total_page                          | int       | true     | Total page                                                                                                                                               |                |
| current_page                        | int       | true     | Current page                                                                                                                                             |                |
| total_size                          | int       | true     | Total Size                                                                                                                                               |                |
| \\ <list\\>(Attribute Name: orders) |           | false    |                                                                                                                                                          |                |
| symbol                              | string    | true     | Cryptocurrency                                                                                                                                           |                |
| contract_code                       | string    | true     | Contract Code                                                                                                                                            |                |
| trigger_type                        | string    | true     | trigger： ge Equal to or Greater than；le Less than or Equal to                                                                                          |                |
| volume                              | decimal   | true     | Numbers of order placed                                                                                                                                  |                |
| order_type                          | int       | true     | Transaction type：1、Place orders 2、Cancel orders                                                                                                       |                |
| direction                           | string    | true     | order direction, \[Buy (buy), Sell(sell)\]                                                                                                               |                |
| offset                              | string    | true     | offset direction \[Open(open), Close(lose)\]                                                                                                             |                |
| lever_rate                          | int       | true     | lever rate                                                                                                                                               |                |
| order_id                            | long      | true     | Trigger order ID                                                                                                                                         |                |
| order_id_str                        | string    | true     | the order ID with string                                                                                                                                 |                |
| relation_order_id                   | string    | true     | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed.                                        |                |
| order_price_type                    | string    | true     | order type "limit": Limit order price，"optimal_5": Optimal 5 price level，"optimal_10":Optimal 10 price level，"optimal_20": the Optimal 20 price level |                |
| order_price_type                    | string    | true     | order price type "limit": limit order，"optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_20":optimal 20                                           |                |
| status                              | int       | true     | Order status (4:Orders accepted、5: Orders failing being placed、6: Orders canceled )                                                                    |                |
| order_source                        | string    | true     | Order source（system、web、api、m、risk、settlement、ios、android、windows、mac、trigger）                                                               |                |
| trigger_price                       | decimal   | true     | trigger price                                                                                                                                            |                |
| triggered_price                     | decimal   | true     | the price when trigger orders executed                                                                                                                   |                |
| order_price                         | decimal   | true     | the order price preset by the client                                                                                                                     |                |
| created_at                          | long      | true     | the order creation time                                                                                                                                  |                |
| triggered_at                        | long      | true     | the execution time when orders getting triggered.                                                                                                        |                |
| order_insert_at                     | long      | true     | the time when the triggered orders filled successfully.                                                                                                  |                |
| canceled_at                         | long      | true     | Order cancelation time                                                                                                                                   |                |
| update_time                         | long      | true     | order update time，millesecond timestamp                                                                                                                 |                |
| fail_code                           | int       | true     | the error code when the triggered orders failed to be filled                                                                                             |                |
| fail_reason                         | string    | true     | the error message with failure reason when triggered orders failed to filled.                                                                            |                |
| LIST_END                            |           | false    |                                                                                                                                                          |                |
| DATA_END                            |           | false    |                                                                                                                                                          |                |

#### Request example

{

"contract_code":

"BTC-USD"

"page_index":

1

"page_size":

20

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

"THETA"

"contract_code":

"THETA-USD"

"trigger_type":

"ge"

"volume":

25

"order_type":

1

"direction":

"sell"

"offset":

"open"

"lever_rate":

20

"order_id":

7002242

"order_id_str":

"7002242"

"relation_order_id":

"-1"

"order_price_type":

"limit"

"status":

6

"order_source":

"api"

"trigger_price":

0.72

"triggered_price":

NULL

"order_price":

0.72

"created_at":

1603874287699

"update_time":

1603874287699

"triggered_at":

NULL

"order_insert_at":

0

"canceled_at":

1603874307539

"fail_code":

NULL

"fail_reason":

NULL

}

\]

"total_page":

7

"current_page":

1

"total_size":

7

}

"ts":

1603874865911

}
