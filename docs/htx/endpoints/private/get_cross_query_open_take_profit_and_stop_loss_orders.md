# GET [Cross]Query Open Take-profit and Stop-loss Orders

**Source:**
[[Cross]Query Open Take-profit and Stop-loss Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb880ff-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_tpsl_openorders (\[Cross\]Query Open Take-profit and Stop-loss Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. when all of pair and contract_code filled in, the
contract_code is the preferred; when no one filled in, return all data in cross
mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                         | Value Range                                         | Default Value |
| ------------- | --------- | -------- | ----------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                       | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                | BTC-USDT                                            |               |
| page_index    | int       | false    | page index. 1 by default            |                                                     |               |
| page_size     | int       | false    | page size.20 by default. 50 at most |                                                     |               |
| trade_type    | int       | false    | trade type(Default:all)             | 0:all,3: buy short,4: sell long                     |               |

#### Response Parameter

| Parameter              | Data Type    | Required | Description                                                                                                                                                                                                                             | Value Range                                                                                                                                                                                                                  |
| ---------------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string       | true     | status                                                                                                                                                                                                                                  | "ok", "error"                                                                                                                                                                                                                |
| DATA_START             | object       | true     |                                                                                                                                                                                                                                         | dictionary                                                                                                                                                                                                                   |
| total_page             | int          | true     | total page                                                                                                                                                                                                                              |                                                                                                                                                                                                                              |
| total_size             | int          | true     | total size                                                                                                                                                                                                                              |                                                                                                                                                                                                                              |
| current_page           | int          | true     | current page                                                                                                                                                                                                                            |                                                                                                                                                                                                                              |
| ORDERS_START           | object array | true     |                                                                                                                                                                                                                                         |                                                                                                                                                                                                                              |
| symbol                 | string       | true     | symbol                                                                                                                                                                                                                                  |                                                                                                                                                                                                                              |
| contract_code          | string       | true     | contract code                                                                                                                                                                                                                           | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                                                                                                                          |
| margin_mode            | string       | true     | margin mode                                                                                                                                                                                                                             | cross, isolated                                                                                                                                                                                                              |
| margin_account         | string       | true     | margin account                                                                                                                                                                                                                          | such as “USDT”，“BTC-USDT”                                                                                                                                                                                                   |
| volume                 | decimal      | true     | Numbers of orders (volume)                                                                                                                                                                                                              |                                                                                                                                                                                                                              |
| order_type             | int          | true     | Order type: 1. Quotation; 2. Cancelled order                                                                                                                                                                                            |                                                                                                                                                                                                                              |
| tpsl_order_type        | string       | true     | Order type(take-profit order/stop-loss order)                                                                                                                                                                                           | “tp”:take-profit order；"sl"stop-loss order                                                                                                                                                                                  |
| direction              | string       | true     | direction                                                                                                                                                                                                                               | "buy", "sell"                                                                                                                                                                                                                |
| order_id               | long         | true     | order id                                                                                                                                                                                                                                |                                                                                                                                                                                                                              |
| order_id_str           | string       | true     | order id in string                                                                                                                                                                                                                      |                                                                                                                                                                                                                              |
| order_source           | string       | true     | order source                                                                                                                                                                                                                            | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger                                                                                                                                                   |
| trigger_type           | string       | true     | trigger type: ge, le                                                                                                                                                                                                                    |                                                                                                                                                                                                                              |
| trigger_price          | decimal      | true     | trigger price                                                                                                                                                                                                                           |                                                                                                                                                                                                                              |
| price_protect          | booleanint   | false    | price protection, default is false. This parameter is only required when setting tp/sl                                                                                                                                                  | true or false                                                                                                                                                                                                                |
| created_at             | long         | true     | created time                                                                                                                                                                                                                            |                                                                                                                                                                                                                              |
| order_price_type       | string       | true     | order price type                                                                                                                                                                                                                        | market，limit, optimal_5, optimal_10, optimal_20                                                                                                                                                                             |
| order_price            | decimal      | true     | order price                                                                                                                                                                                                                             |                                                                                                                                                                                                                              |
| status                 | int          | true     | status:                                                                                                                                                                                                                                 | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired |
| source_order_id        | string       | true     | Order id of source limit order (the field will have a value only when the order placed is a take-profit and stop-loss order; it is used to indicate that a certain limit order that triggered current take-profit and stop-loss order.) |                                                                                                                                                                                                                              |
| relation_tpsl_order_id | string       | true     | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".）                                                            |                                                                                                                                                                                                                              |
| contract_type          | string       | true     | contract type                                                                                                                                                                                                                           | swap, this_week, next_week, quarter, next_quarter                                                                                                                                                                            |
| pair                   | string       | true     | pair                                                                                                                                                                                                                                    | such as: “BTC-USDT”                                                                                                                                                                                                          |
| business_type          | string       | true     | business type                                                                                                                                                                                                                           | futures, swap                                                                                                                                                                                                                |
| ORDERS_END             |              | false    |                                                                                                                                                                                                                                         |                                                                                                                                                                                                                              |
| DATA_END               |              | false    |                                                                                                                                                                                                                                         |                                                                                                                                                                                                                              |
| ts                     | long         | true     | Time of Respond Generation，Unit: Millisecond                                                                                                                                                                                           |                                                                                                                                                                                                                              |

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

"this_week"

"business_type":

"futures"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"margin_mode":

"cross"

"margin_account":

"USDT"

"volume":

1

"order_type":

1

"direction":

"sell"

"order_id":

918816985859559400

"order_id_str":

"918816985859559425"

"order_source":

"api"

"trigger_type":

"le"

"trigger_price":

40000

"order_price":

0

"created_at":

1639104640223

"order_price_type":

"optimal_5"

"status":

2

"tpsl_order_type":

"sl"

"source_order_id":

NULL

"relation_tpsl_order_id":

"918816985859559424"

}

1:{

"contract_type":

"this_week"

"business_type":

"futures"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"margin_mode":

"cross"

"margin_account":

"USDT"

"volume":

1

"order_type":

1

"direction":

"sell"

"order_id":

918816985859559400

"order_id_str":

"918816985859559424"

"order_source":

"api"

"trigger_type":

"ge"

"trigger_price":

50000

"order_price":

0

"created_at":

1639104640223

"order_price_type":

"optimal_5"

"status":

2

"tpsl_order_type":

"tp"

"source_order_id":

NULL

"relation_tpsl_order_id":

"918816985859559425"

}

\]

"total_page":

1

"current_page":

1

"total_size":

2

}

"ts":

1639104794491

}
