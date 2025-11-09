# GET Query information on Tiered Margin interface

**Source:**
[Query information on Tiered Margin interface](https://www.htx.com/en-us/opend/newApiPages/?id=5d516609-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_ladder_margin (Query information on Tiered Margin interface)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                | Value Range                         | Default Value |
| ------------- | --------- | -------- | ------------------------------------------ | ----------------------------------- | ------------- |
| contract_code | string    | false    | contract code, if not filled in return all | such as: “BTC-USD”, “ETH-USD”。。。 |               |

#### Response Parameter

| Parameter            | Data Type    | Required | Description                                                                                                    | Value Range        |
| -------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------- | ------------------ |
| status               | string       | true     | the result of server handling to request                                                                       | "ok" , "error"     |
| DATA_START           | object array | true     |                                                                                                                |                    |
| symbol               | string       | true     | symbol                                                                                                         | such as: "BTC"     |
| contract_code        | string       | true     | contract code                                                                                                  | such as: "BTC-USD" |
| LIST_START           | object array | true     |                                                                                                                |                    |
| lever_rate           | int          | true     | lever rate                                                                                                     |                    |
| LADDERS_START        | object array | true     | ladders for margin                                                                                             |                    |
| min_margin_balance   | decimal      | true     | min margin balance(the starting point in this ladder, included in this ladder)                                 |                    |
| max_margin_balance   | decimal      | true     | max margin balance(the end point in this ladder, excluded in this ladder, is next ladder's min_margin_balance) |                    |
| min_margin_available | decimal      | true     | min margin available(in the range of this ladder margin balance)                                               |                    |
| max_margin_available | decimal      | true     | max margin available（not in the range of this ladder margin balance, is next ladder's min_margin_available)   |                    |
| LADDERS_END          |              | false    |                                                                                                                |                    |
| LIST_END             |              | false    |                                                                                                                |                    |
| DATA_END             |              | false    |                                                                                                                |                    |
| ts                   | long         | true     | Time of Respond Generation，Unit：Millisecond                                                                  |                    |

#### Request example

`curl"https://api.hbdm.com/swap-api/v1/swap_ladder_margin?contract_code=BTC-USD&volume=1&direction=sell&client_order_id=123456&order_price_type=lightning“`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USD"

"list":\[

0:{

"lever_rate":

20

"ladders":\[

0:{

"min_margin_balance":

0

"max_margin_balance":

10

"min_margin_available":

0

"max_margin_available":

10

}

1:{

"min_margin_balance":

10

"max_margin_balance":

50

"min_margin_available":

10

"max_margin_available":

30

}

2:{

"min_margin_balance":

50

"max_margin_balance":

250

"min_margin_available":

30

"max_margin_available":

70

}

3:{

"min_margin_balance":

250

"max_margin_balance":

950

"min_margin_available":

70

"max_margin_available":

140

}

4:{

"min_margin_balance":

950

"max_margin_balance":

NULL

"min_margin_available":

140

"max_margin_available":

NULL

}

\]

}

\]

}

\]

"ts":

1612494867085

}
