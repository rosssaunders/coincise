# GET [Cross]Query information on Tiered Margin

**Source:** [[Cross]Query information on Tiered Margin](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f7a9-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_ladder\_margin (\[Cross\]Query information on Tiered Margin)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code, if not filled in return all contract infomation | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | result of server handled request | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | such as: "BTC" |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross |
| margin\_account | string | true | margin account | such as:USDT” |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| LIST\_START | object array | true |  |  |
| lever\_rate | int | true | lever rate |  |
| LADDERS\_START | object array | true | ladders for margin |  |
| min\_margin\_balance | decimal | true | min margin balance(the starting point in this ladder, included in this ladder) |  |
| max\_margin\_balance | decimal | true | max margin balance(the end point in this ladder, excluded in this ladder, is next ladder's min\_margin\_balance) |  |
| min\_margin\_available | decimal | true | min margin available(in the range of this ladder margin balance) |  |
| max\_margin\_available | decimal | true | max margin available（not in the range of this ladder margin balance, is next ladder's min\_margin\_available) |  |
| LADDERS\_END |  | false |  |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_ladder_margin?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"margin\_account":

"USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"list":\[

0:{

"lever\_rate":

2

"ladders":\[

0:{

"min\_margin\_balance":

0

"max\_margin\_balance":

NULL

"min\_margin\_available":

0

"max\_margin\_available":

NULL

}

\]

}

\]

"business\_type":

"swap"

"pair":

"BTC-USDT"

"contract\_type":

"swap"

}

\]

"ts":

1638755685337

}