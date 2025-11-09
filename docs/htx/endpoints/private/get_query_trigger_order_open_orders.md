# GET Query Trigger Order Open Orders

**Source:**
[Query Trigger Order Open Orders](https://www.htx.com/en-us/opend/newApiPages/?id=5d51b225-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_trigger_openorders (Query Trigger Order Open Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                       | Value Range | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported..contract code         |             |               |
| page_index    | int       | false    | page number，default page 1 if no given instruction                               |             |               |
| page_size     | int       | false    | default 20 if no given instruction ，no more than 50                              |             |               |
| trade_type    | int       | false    | trade type(Default:all) 0:all,1: buy long,2: sell short,3: buy short,4: sell long |             |               |

#### Response Parameter

| Parameter                           | Data Type | Required | Description                                                                                                                                     | Value Range    |
| ----------------------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| status                              | string    | true     | Request Processing Result                                                                                                                       | "ok" , "error" |
| ts                                  | long      | true     | Time stamp of response, Unit: millisecond                                                                                                       |                |
| DATA_START                          |           | false    |                                                                                                                                                 |                |
| total_page                          | int       | true     | total page                                                                                                                                      |                |
| current_page                        | int       | true     | current page                                                                                                                                    |                |
| total_size                          | int       | true     | total size                                                                                                                                      |                |
| LIST> (ATTRIBUTE NAME: ORDERS_START |           | false    |                                                                                                                                                 |                |
| symbol                              | string    | true     | Cryptocurrency                                                                                                                                  |                |
| contract_code                       | string    | true     | contract code                                                                                                                                   |                |
| trigger_type                        | string    | true     | trigger type： gegreat than or equal to；leless than or equal to                                                                                |                |
| volume                              | decimal   | true     | trigger order volume                                                                                                                            |                |
| order_type                          | int       | true     | Transaction Type 1. Place orders 2. cancel orders                                                                                               |                |
| direction                           | string    | true     | order direction \[buy,sell\]                                                                                                                    |                |
| offset                              | string    | true     | offset direction \[open,close\]                                                                                                                 |                |
| lever_rate                          | int       | true     | Leverage 1\\5\\10\\20                                                                                                                           |                |
| order_id                            | long      | true     | trigger order ID                                                                                                                                |                |
| order_id_str                        | string    | true     | the order ID with string                                                                                                                        |                |
| order_source                        | string    | true     | source（system、web、api、m、risk、settlement、ios、android、windows、mac、trigger）                                                            |                |
| trigger_price                       | decimal   | true     | trigger price                                                                                                                                   |                |
| order_price                         | decimal   | true     | the preset price by the client                                                                                                                  |                |
| created_at                          | long      | true     | order creation time                                                                                                                             |                |
| order_price_type                    | string    | true     | order price type "limit": limit order，"optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_20":optimal 20                                  |                |
| status                              | int       | true     | order status：1:ready to submit、2:submited、3:order accepted、7:wrong order、8：canceled orders but not found、9：canceling order、10：failed' |                |
| LIST_END                            |           | false    |                                                                                                                                                 |                |
| DATA_END                            |           | false    |                                                                                                                                                 |                |

#### Request example

{

"contract_code":

"BTC-USD"

"trigger_type":

"le"

"trigger_price":

17000

"order_price":

16999

"order_price_type":

"limit"

"volume":

1

"direction":

"buy"

"offset":

"open"

"lever_rate":

10

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

7002243

"order_id_str":

"7002243"

"order_source":

"api"

"trigger_price":

0.72

"order_price":

0.72

"created_at":

1603874414476

"order_price_type":

"limit"

"status":

2

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

1603874421778

}
