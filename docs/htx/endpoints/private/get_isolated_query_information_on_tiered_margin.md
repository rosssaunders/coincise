# GET [Isolated]Query information on Tiered Margin

**Source:** [[Isolated]Query information on Tiered Margin](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f887-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_ladder\_margin (\[Isolated\]Query information on Tiered Margin)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code, if not filled in return all contract infomation | such as: “BTC-USDT”, “ETH-USDT”。。。 |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | such as: "BTC" |
| contract\_code | string | true | contract code | such as: "BTC-USDT" |
| margin\_mode | string | true | margin mode | isolated: isolated |
| margin\_account | string | true | margin account | such as: “BTC-USDT” |
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

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_ladder_margin?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"margin\_account":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"margin\_mode":

"isolated"

"list":\[

0:{

"lever\_rate":

20

"ladders":\[

0:{

"min\_margin\_balance":

0

"max\_margin\_balance":

250000

"min\_margin\_available":

0

"max\_margin\_available":

250000

}

1:{

"min\_margin\_balance":

250000

"max\_margin\_balance":

2500000

"min\_margin\_available":

250000

"max\_margin\_available":

1000000

}

2:{

"min\_margin\_balance":

2500000

"max\_margin\_balance":

10000000

"min\_margin\_available":

1000000

"max\_margin\_available":

2500000

}

3:{

"min\_margin\_balance":

10000000

"max\_margin\_balance":

85000000

"min\_margin\_available":

2500000

"max\_margin\_available":

10000000

}

4:{

"min\_margin\_balance":

85000000

"max\_margin\_balance":

NULL

"min\_margin\_available":

10000000

"max\_margin\_available":

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