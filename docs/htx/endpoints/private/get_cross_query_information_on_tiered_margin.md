# GET [Cross]Query information on Tiered Margin

**Source:**
[[Cross]Query information on Tiered Margin](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f7a9-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_ladder_margin (\[Cross\]Query information on Tiered Margin)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. When both of pair, contract_type and
contract_code filled in, the contract_code is the preferred. business_type is a
required parameter when query info of futures contract, and its value must be
futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                    | Value Range                                         | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code, if not filled in return all contract infomation | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                                           | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                                                  | swap, this_week, next_week, quarter, next_quarter   |               |
| business_type | string    | false    | business type, default is swap                                 | futures, swap, all                                  |               |

#### Response Parameter

| Parameter            | Data Type    | Required | Description                                                                                                    | Value Range                                         |
| -------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| status               | string       | true     | result of server handled request                                                                               | "ok" , "error"                                      |
| DATA_START           | object array | true     |                                                                                                                |                                                     |
| symbol               | string       | true     | symbol                                                                                                         | such as: "BTC"                                      |
| contract_code        | string       | true     | contract code                                                                                                  | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin_mode          | string       | true     | margin mode                                                                                                    | cross                                               |
| margin_account       | string       | true     | margin account                                                                                                 | such as:USDT”                                       |
| contract_type        | string       | true     | contract type                                                                                                  | swap, this_week, next_week, quarter, next_quarter   |
| pair                 | string       | true     | pair                                                                                                           | such as: “BTC-USDT”                                 |
| business_type        | string       | true     | business type                                                                                                  | futures, swap                                       |
| LIST_START           | object array | true     |                                                                                                                |                                                     |
| lever_rate           | int          | true     | lever rate                                                                                                     |                                                     |
| LADDERS_START        | object array | true     | ladders for margin                                                                                             |                                                     |
| min_margin_balance   | decimal      | true     | min margin balance(the starting point in this ladder, included in this ladder)                                 |                                                     |
| max_margin_balance   | decimal      | true     | max margin balance(the end point in this ladder, excluded in this ladder, is next ladder's min_margin_balance) |                                                     |
| min_margin_available | decimal      | true     | min margin available(in the range of this ladder margin balance)                                               |                                                     |
| max_margin_available | decimal      | true     | max margin available（not in the range of this ladder margin balance, is next ladder's min_margin_available)   |                                                     |
| LADDERS_END          |              | false    |                                                                                                                |                                                     |
| LIST_END             |              | false    |                                                                                                                |                                                     |
| DATA_END             |              | false    |                                                                                                                |                                                     |
| ts                   | long         | true     | Time of Respond Generation，Unit：Millisecond                                                                  |                                                     |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_ladder_margin?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"margin_account":

"USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_mode":

"cross"

"list":\[

0:{

"lever_rate":

2

"ladders":\[

0:{

"min_margin_balance":

0

"max_margin_balance":

NULL

"min_margin_available":

0

"max_margin_available":

NULL

}

\]

}

\]

"business_type":

"swap"

"pair":

"BTC-USDT"

"contract_type":

"swap"

}

\]

"ts":

1638755685337

}
