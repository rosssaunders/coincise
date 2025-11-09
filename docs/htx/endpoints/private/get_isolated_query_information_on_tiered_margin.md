# GET [Isolated]Query information on Tiered Margin

**Source:**
[[Isolated]Query information on Tiered Margin](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f887-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_ladder_margin (\[Isolated\]Query information on Tiered Margin)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                    | Value Range                           | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------- | ------------------------------------- | ------------- |
| contract_code | string    | false    | contract code, if not filled in return all contract infomation | such as: “BTC-USDT”, “ETH-USDT”。。。 |               |

#### Response Parameter

| Parameter            | Data Type    | Required | Description                                                                                                    | Value Range         |
| -------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------- | ------------------- |
| status               | string       | true     | status                                                                                                         | "ok" , "error"      |
| DATA_START           | object array | true     |                                                                                                                |                     |
| symbol               | string       | true     | symbol                                                                                                         | such as: "BTC"      |
| contract_code        | string       | true     | contract code                                                                                                  | such as: "BTC-USDT" |
| margin_mode          | string       | true     | margin mode                                                                                                    | isolated: isolated  |
| margin_account       | string       | true     | margin account                                                                                                 | such as: “BTC-USDT” |
| LIST_START           | object array | true     |                                                                                                                |                     |
| lever_rate           | int          | true     | lever rate                                                                                                     |                     |
| LADDERS_START        | object array | true     | ladders for margin                                                                                             |                     |
| min_margin_balance   | decimal      | true     | min margin balance(the starting point in this ladder, included in this ladder)                                 |                     |
| max_margin_balance   | decimal      | true     | max margin balance(the end point in this ladder, excluded in this ladder, is next ladder's min_margin_balance) |                     |
| min_margin_available | decimal      | true     | min margin available(in the range of this ladder margin balance)                                               |                     |
| max_margin_available | decimal      | true     | max margin available（not in the range of this ladder margin balance, is next ladder's min_margin_available)   |                     |
| LADDERS_END          |              | false    |                                                                                                                |                     |
| LIST_END             |              | false    |                                                                                                                |                     |
| DATA_END             |              | false    |                                                                                                                |                     |
| ts                   | long         | true     | Time of Respond Generation，Unit：Millisecond                                                                  |                     |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_ladder_margin?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"margin_account":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_mode":

"isolated"

"list":\[

0:{

"lever_rate":

20

"ladders":\[

0:{

"min_margin_balance":

0

"max_margin_balance":

250000

"min_margin_available":

0

"max_margin_available":

250000

}

1:{

"min_margin_balance":

250000

"max_margin_balance":

2500000

"min_margin_available":

250000

"max_margin_available":

1000000

}

2:{

"min_margin_balance":

2500000

"max_margin_balance":

10000000

"min_margin_available":

1000000

"max_margin_available":

2500000

}

3:{

"min_margin_balance":

10000000

"max_margin_balance":

85000000

"min_margin_available":

2500000

"max_margin_available":

10000000

}

4:{

"min_margin_balance":

85000000

"max_margin_balance":

NULL

"min_margin_available":

10000000

"max_margin_available":

NULL

}

\]

}

\]

}

\]

"ts":

1612504906880

}
