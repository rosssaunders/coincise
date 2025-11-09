# GET Query information on Tiered Margin interface

**Source:** [Query information on Tiered Margin interface](https://www.htx.com/en-us/opend/newApiPages/?id=5d516609-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_ladder\_margin (Query information on Tiered Margin interface)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code, if not filled in return all | such as: “BTC-USD”, “ETH-USD”。。。 |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | such as: "BTC" |
| contract\_code | string | true | contract code | such as: "BTC-USD" |
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

"contract\_code":

"BTC-USD"

"list":\[

0:{

"lever\_rate":

20

"ladders":\[

0:{

"min\_margin\_balance":

0

"max\_margin\_balance":

10

"min\_margin\_available":

0

"max\_margin\_available":

10

}

1:{

"min\_margin\_balance":

10

"max\_margin\_balance":

50

"min\_margin\_available":

10

"max\_margin\_available":

30

}

2:{

"min\_margin\_balance":

50

"max\_margin\_balance":

250

"min\_margin\_available":

30

"max\_margin\_available":

70

}

3:{

"min\_margin\_balance":

250

"max\_margin\_balance":

950

"min\_margin\_available":

70

"max\_margin\_available":

140

}

4:{

"min\_margin\_balance":

950

"max\_margin\_balance":

NULL

"min\_margin\_available":

140

"max\_margin\_available":

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