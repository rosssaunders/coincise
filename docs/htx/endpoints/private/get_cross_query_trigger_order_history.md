# GET [Cross] Query Trigger Order History

**Source:**
[[Cross] Query Trigger Order History](https://www.htx.com/en-us/opend/newApiPages/?id=8cb877ac-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_trigger_hisorders (\[Cross\] Query Trigger Order History)

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

| Parameter     | Data Type | Required | Description                                         | Value Range                                                                                                                                                                                                                                                                                 | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                                       | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                                                                                                                                                                                         |               |
| pair          | string    | false    | pair                                                | BTC-USDT                                                                                                                                                                                                                                                                                    |               |
| trade_type    | int       | true     | trade type                                          | 0: All ,1: Open Long,2: Close Short,3: Open Short,4: Close Long, 17:buy(one-way mode), 18:sell(one-way mode)；the system will transfer these parameters into offset and direction and query the requested data. Please note that no data can be requested with parameter out of this range. |               |
| status        | string    | true     | order status                                        | data divided with several commas, trigger orders ready to be submitted：0: All (All filled orders),4: Trigger orders successfully submitted,5: Trigger orders failed being submitted, 6: Trigger orders cancelled                                                                           |               |
| create_date   | int       | true     | date                                                | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default.                                                                                                                     |               |
| page_index    | int       | false    | page index, default 1st page                        | page index, default 1st                                                                                                                                                                                                                                                                     |               |
| page_size     | int       | false    | default 20，no more than 50                         | default 20，no more than 50                                                                                                                                                                                                                                                                 |               |
| sort_by       | string    | false    | sort fields(Default: “created_at” descending order) | "created_at"：descending order by order creation time, "update_time": descending order by order update time                                                                                                                                                                                 |               |

Notes:  
Default to query completed orders (order status is one of 4, 5, 6);

#### Response Parameter

| Parameter         | Data Type    | Required | Description                                                                                                                                              | Value Range                                                                |
| ----------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| status            | string       | true     | Request Processing Result                                                                                                                                | "ok" , "error"                                                             |
| DATA_START        | object       | true     |                                                                                                                                                          |                                                                            |
| total_page        | int          | true     | total page                                                                                                                                               |                                                                            |
| current_page      | int          | true     | current page                                                                                                                                             |                                                                            |
| total_size        | int          | true     | total size                                                                                                                                               |                                                                            |
| ORDERS_START      | object array | true     |                                                                                                                                                          |                                                                            |
| symbol            | string       | true     | symbol                                                                                                                                                   |                                                                            |
| contract_code     | string       | true     | contract code                                                                                                                                            | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                        |
| margin_mode       | string       | true     | margin mode                                                                                                                                              | cross: cross margin mode                                                   |
| margin_account    | string       | true     | margin account                                                                                                                                           | "USDT"...                                                                  |
| trigger_type      | string       | true     | trigger type： ge: Equal to or Greater than；le: Less than or Equal to                                                                                   |                                                                            |
| volume            | decimal      | true     | place volume                                                                                                                                             |                                                                            |
| order_type        | int          | true     | order type：1、Place orders 2、Cancel orders                                                                                                             |                                                                            |
| direction         | string       | true     | direction \[buy/sell\]                                                                                                                                   |                                                                            |
| offset            | string       | true     | offset \[open,close,both\]                                                                                                                               |                                                                            |
| lever_rate        | int          | true     | leverage                                                                                                                                                 |                                                                            |
| order_id          | long         | true     | order id                                                                                                                                                 |                                                                            |
| order_id_str      | string       | true     | order id                                                                                                                                                 |                                                                            |
| relation_order_id | string       | true     | relation order ID is the string related to the limit orders The value is -1 before the trigger orders executed                                           |                                                                            |
| order_price_type  | string       | true     | order type "limit": Limit order price，"optimal_5": Optimal 5 price level，"optimal_10":Optimal 10 price level，"optimal_20": the Optimal 20 price level |                                                                            |
| status            | int          | true     | status (4:Orders accepted、5: Orders failing being placed、6: Orders canceled )                                                                          |                                                                            |
| order_source      | string       | true     | order source                                                                                                                                             | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger_price     | decimal      | true     | trigger price                                                                                                                                            |                                                                            |
| triggered_price   | decimal      | true     | triggered price                                                                                                                                          |                                                                            |
| order_price       | decimal      | true     | order price                                                                                                                                              |                                                                            |
| created_at        | long         | true     | created time                                                                                                                                             |                                                                            |
| update_time       | long         | true     | order update time，millesecond timestamp                                                                                                                 |                                                                            |
| triggered_at      | long         | true     | trigger time                                                                                                                                             |                                                                            |
| order_insert_at   | long         | true     | insert time                                                                                                                                              |                                                                            |
| canceled_at       | long         | true     | canceled time                                                                                                                                            |                                                                            |
| fail_code         | int          | true     | fail code                                                                                                                                                |                                                                            |
| fail_reason       | string       | true     | fail reason                                                                                                                                              |                                                                            |
| contract_type     | string       | true     | contract type                                                                                                                                            | swap, this_week, next_week, quarter, next_quarter                          |
| pair              | string       | true     | pair                                                                                                                                                     | such as: “BTC-USDT”                                                        |
| business_type     | string       | true     | business type                                                                                                                                            | futures, swap                                                              |
| reduce_only       | int          | true     | reduce only                                                                                                                                              | 0: no, 1: yes                                                              |
| ORDERS_END        |              | false    |                                                                                                                                                          |                                                                            |
| DATA_END          |              | false    |                                                                                                                                                          |                                                                            |
| ts                | long         | true     | Time of Respond Generation, Unit: Millisecond                                                                                                            |                                                                            |

#### Request example

{

"contract_code":

"BTC-USDT"

"pair":

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

"contract_type":

"quarter"

"business_type":

"futures"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211231"

"trigger_type":

"le"

"volume":

1

"order_type":

1

"direction":

"buy"

"offset":

"open"

"lever_rate":

1

"order_id":

918808635214700500

"order_id_str":

"918808635214700544"

"relation_order_id":

"-1"

"order_price_type":

"limit"

"status":

6

"order_source":

"api"

"trigger_price":

40000

"triggered_price":

NULL

"order_price":

40000

"created_at":

1639102649275

"triggered_at":

NULL

"order_insert_at":

0

"canceled_at":

1639103205980

"fail_code":

NULL

"fail_reason":

NULL

"margin_mode":

"cross"

"margin_account":

"USDT"

"update_time":

1639103206083

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

}

"ts":

1639103213233

}
