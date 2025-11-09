# GET Query information on Tiered Margin

**Source:**
[Query information on Tiered Margin](https://www.htx.com/en-us/opend/newApiPages/?id=28c2cebf-77ae-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### api/v1/contract_ladder_margin (Query information on Tiered Margin)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP
(this 120 times every 3 seconds public interface rate limit is shared by all the
requests from that IP of non-marketing information, like above)

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description                                 | Value Range              | Default Value |
| --------- | --------- | -------- | ------------------------------------------- | ------------------------ | ------------- |
| symbol    | string    | false    | symbol, if not filled in, return all symbol | such as: “BTC”. “ETH”... |               |

#### Response Parameter

| Parameter            | Data Type   | Required | Description                                                                                                    | Value Range    |
| -------------------- | ----------- | -------- | -------------------------------------------------------------------------------------------------------------- | -------------- |
| status               | string      | true     | the result of server handling to request                                                                       | "ok" . "error" |
| DATA_START           | objectarray | true     |                                                                                                                |                |
| symbol               | string      | true     | symbol                                                                                                         | such as: "BTC" |
| LIST_START           | objectarray | true     |                                                                                                                |                |
| lever_rate           | int         | true     | lever rate                                                                                                     |                |
| LADDERS_START        | objectarray | true     | ladders for margin                                                                                             |                |
| min_margin_balance   | decimal     | true     | min margin balance(the starting point in this ladder, included in this ladder)                                 |                |
| max_margin_balance   | decimal     | true     | max margin balance(the end point in this ladder, excluded in this ladder, is next ladder's min_margin_balance) |                |
| min_margin_available | decimal     | true     | min margin available(in the range of this ladder margin balance)                                               |                |
| max_margin_available | decimal     | true     | max margin available（not in the range of this ladder margin balance, is next ladder's min_margin_available)   |                |
| LADDERS_END          |             | false    |                                                                                                                |                |
| LIST_END             |             | false    |                                                                                                                |                |
| DATA_END             |             | false    |                                                                                                                |                |
| ts                   | long        | true     | Time of Respond Generation，Unit：Millisecond                                                                  |                |

#### Request example

`curl "https://api.hbdm.com/api/v1/contract_ladder_margin?symbol=BTC"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"list":\[

0:{

"lever_rate":

20

"ladders":\[

0:{

"min_margin_balance":

0

"max_margin_balance":

20

"min_margin_available":

0

"max_margin_available":

20

}

1:{

"min_margin_balance":

20

"max_margin_balance":

80

"min_margin_available":

20

"max_margin_available":

50

}

2:{

"min_margin_balance":

80

"max_margin_balance":

380

"min_margin_available":

50

"max_margin_available":

110

}

3:{

"min_margin_balance":

380

"max_margin_balance":

980

"min_margin_available":

110

"max_margin_available":

170

}

4:{

"min_margin_balance":

980

"max_margin_balance":

NULL

"min_margin_available":

170

"max_margin_available":

NULL

}

\]

}

\]

}

\]

"ts":

1612489488052

}
