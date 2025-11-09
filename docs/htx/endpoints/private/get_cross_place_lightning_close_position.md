# GET [Cross] Place Lightning Close Position

**Source:**
[[Cross] Place Lightning Close Position](https://www.htx.com/en-us/opend/newApiPages/?id=8cb86a4c-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_lightning_close_position (\[Cross\] Place Lightning Close Position)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.By default,
the maximum liquidable amount of the current position is used to place a
lightning closing order. The request parameter "contract_code" supports the
contract code of futures, in that the format is BTC-USDT-210625. one of
(pair+contract_type) and contract_code must be filled in(if all of them not
filled in, will get 1014 error code); and all filled in, the contract_code is
the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description      | Value Range                                                                                                               | Default Value |
| ---------------- | --------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code    | string    | false    | contract code    | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                       |               |
| pair             | string    | false    | pair             | BTC-USDT                                                                                                                  |               |
| contract_type    | string    | false    | contract type    | swap, this_week, next_week, quarter, next_quarter                                                                         |               |
| direction        | string    | true     | direction        | “buy”/“sell”                                                                                                              |               |
| client_order_id  | long      | false    | client order ID  | \[1, 9223372036854775807\]                                                                                                |               |
| order_price_type | string    | false    | order price type | "market" by default."market": market Order type," "lightning_fok": lightning FOK type,"lightning_ioc": lightning IOC type |               |

Notes:  
Lightning Close Position，is order with rival price and optimal 30 grades. And
the unsettled part will be automatically converted into a limited price order.  
The closing price of lightning closing position has a predictable effect, which
can avoid the loss of users when the order cannot be completed when the market
price rises sharply and falls sharply.

#### Response Parameter

| Parameter       | Data Type | Required | Description                                   | Value Range  |
| --------------- | --------- | -------- | --------------------------------------------- | ------------ |
| status          | string    | true     | Request Processing Result                     | "ok"/"error" |
| ts              | long      | true     | Time of Respond Generation, Unit: Millisecond |              |
| DATA_START      | object    | true     |                                               |              |
| order_id        | long      | true     | order ID                                      |              |
| order_id_str    | string    | true     | order ID                                      |              |
| client_order_id | int       | false    | client order ID                               |              |
| DATA_END        |           | false    |                                               |              |

#### Request example

{

"contract_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract_type":

"swap"

"order_price_type":

"lightning"

"direction":

"buy"

"client_order_id":

1010222

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order_id":

784063527799226400

"order_id_str":

"784063527799226368"

}

"ts":

1606976912267

}
