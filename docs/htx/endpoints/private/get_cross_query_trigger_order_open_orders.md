# GET [Cross] Query Trigger Order Open Orders

**Source:**
[[Cross] Query Trigger Order Open Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb874fd-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_trigger_openorders (\[Cross\] Query Trigger Order Open Orders)

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
the contract_code is the preferred. when none any of them, it means to get the
all open orders.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                           | Value Range                                                                                            | Default Value |
| ------------- | --------- | -------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------- |
| contract_code | string    | false    | contract code                         | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                    |               |
| pair          | string    | false    | pair                                  | BTC-USDT                                                                                               |               |
| page_index    | int       | false    | page index, default 1st               |                                                                                                        |               |
| page_size     | int       | false    | page size default 20，no more than 50 |                                                                                                        |               |
| trade_type    | int       | false    | trade type(Default:all)               | 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |               |

#### Response Parameter

| Parameter        | Data Type    | Required | Description                                                                                                                       | Value Range                                                                |
| ---------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| status           | string       | true     | Request Processing Result                                                                                                         | "ok" , "error"                                                             |
| DATA_START       | object       | true     |                                                                                                                                   |                                                                            |
| total_page       | int          | true     | total page                                                                                                                        |                                                                            |
| current_page     | int          | true     | current page                                                                                                                      |                                                                            |
| total_size       | int          | true     | total size                                                                                                                        |                                                                            |
| ORDERS_START     | object array | true     |                                                                                                                                   |                                                                            |
| symbol           | string       | true     | symbol                                                                                                                            |                                                                            |
| contract_code    | string       | true     | contract code                                                                                                                     | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                        |
| margin_mode      | string       | true     | margin mode                                                                                                                       | cross: cross margin mode                                                   |
| margin_account   | string       | true     | margin account                                                                                                                    | "USDT"...                                                                  |
| trigger_type     | string       | true     | trigger type： gegreat than or equal to；leless than or equal to                                                                  |                                                                            |
| volume           | decimal      | true     | place volume                                                                                                                      |                                                                            |
| order_type       | int          | true     | order type 1. Place orders 2. cancel orders                                                                                       |                                                                            |
| direction        | string       | true     | direction \[buy/sell\]                                                                                                            |                                                                            |
| offset           | string       | true     | offset \[open/close,both\]                                                                                                        |                                                                            |
| lever_rate       | int          | true     | leverage                                                                                                                          |                                                                            |
| order_id         | long         | true     | order id                                                                                                                          |                                                                            |
| order_id_str     | string       | true     | order id                                                                                                                          |                                                                            |
| order_source     | string       | true     | order source                                                                                                                      | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger_price    | decimal      | true     | trigger price                                                                                                                     |                                                                            |
| order_price      | decimal      | true     | order price                                                                                                                       |                                                                            |
| created_at       | long         | true     | created time                                                                                                                      |                                                                            |
| order_price_type | string       | true     | type of order price "limit": limit order，"optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_20":optimal 20                 |                                                                            |
| status           | int          | true     | order status：1:ready to submit、2:submited、3:order accepted 、8：canceled orders but not found、9：canceling order、10：failed' |                                                                            |
| contract_type    | string       | true     | contract type                                                                                                                     | swap, this_week, next_week, quarter, next_quarter                          |
| pair             | string       | true     | pair                                                                                                                              | such as: “BTC-USDT”                                                        |
| business_type    | string       | true     | business type                                                                                                                     | futures, swap                                                              |
| reduce_only      | int          | true     | reduce only                                                                                                                       | 0: no, 1: yes                                                              |
| ORDERS_END       |              | false    |                                                                                                                                   |                                                                            |
| DATA_END         |              | false    |                                                                                                                                   |                                                                            |
| ts               | long         | true     | Time of Respond Generation, Unit: Millisecond                                                                                     |                                                                            |

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

"order_source":

"api"

"trigger_price":

40000

"order_price":

40000

"created_at":

1639102649275

"order_price_type":

"limit"

"status":

2

"margin_mode":

"cross"

"margin_account":

"USDT"

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

1639102667934

}
