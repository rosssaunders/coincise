# GET [Cross]Get History Trailing Orders

**Source:** [[Cross]Get History Trailing Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8996a-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_track\_hisorders (\[Cross\]Get History Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in. and both filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| status | string | true | order status | Multiple separated by English commas, Trailing Order status: 0:all(representing all orders in the end state), 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |  |
| trade\_type | int | true | trade type(if not filled in, means all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| create\_date | long | true | days | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default. |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20, and no more than 50 |  |  |
| sort\_by | string | false | sort fields(descending), if not filled in, sort by created\_at descending | "create\_date"：descending order by order create date , "update\_time": descending order by order update time |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| current\_page | int | true | current page |  |
| ORDERS\_START | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| volume | decimal | true | volume |  |
| order\_type | int | true | order type: 1. Quotation; 2. Cancelled order |  |
| direction | string | true | direction | buy, sell |
| offset | string | true | offset | open, close, both |
| lever\_rate | int | true | lever rate |  |
| order\_id | long | true | trailing order id |  |
| order\_id\_str | string | true | trailing order id in string format |  |
| order\_source | string | true | order source |  |
| created\_at | long | true | created at |  |
| update\_time | long | true | update time, unit: millisecond |  |
| order\_price\_type | string | true | order price type | optimal\_5, optimal\_10, optimal\_20, formula\_price |
| status | int | true | order status | 2.Ready to submit the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |
| canceled\_at | long | true | canceled at |  |
| fail\_code | int | true | error code when place limit price order |  |
| fail\_reason | string | true | error reason when place limit price order |  |
| callback\_rate | decimal | true | callback rate | such as: 0.01 means 1% |
| active price | decimal | true | active price |  |
| is\_active | int | true | Is the active price activated? | 1: activated; 0: not activated |
| market\_limit\_price | decimal | true | lowest/highest market price (use the lowest price when buy. use the highest when sell) |  |
| formula\_price | decimal | true | formula price(the lowest (highest) market price\* (1 ± callback rate)) |  |
| real\_volume | decimal | true | real volume |  |
| triggered\_price | decimal | true | triggered price |  |
| relation\_order\_id | string | true | relation\_order\_id is the string related to the limit orders， The value is -1 before the trigger orders executed. |  |
| margin\_mode | string | true | margin mode | cross |
| margin\_account | string | true | margin account | e.g：“BTC-USDT” |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| ORDERS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"status":

0

"trade\_type":

0

"create\_date":

30

"page\_index":

1

"page\_size":

50

"sort\_by":

"created\_at"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"orders":\[

0:{

"contract\_type":

"quarter"

"business\_type":

"futures"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211231"

"triggered\_price":

NULL

"volume":

1

"order\_type":

1

"direction":

"buy"

"offset":

"open"

"lever\_rate":

1

"order\_id":

918819679173152800

"order\_id\_str":

"918819679173152768"

"order\_source":

"api"

"created\_at":

1639105282359

"update\_time":

1639105426243

"order\_price\_type":

"formula\_price"

"status":

6

"canceled\_at":

1639105426208

"fail\_code":

NULL

"fail\_reason":

NULL

"callback\_rate":

0.03

"active\_price":

41111

"is\_active":

0

"market\_limit\_price":

NULL

"formula\_price":

NULL

"real\_volume":

0

"relation\_order\_id":

"-1"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"reduce\_only":

0

}

\]

"total\_page":

1

"current\_page":

1

"total\_size":

1

}

"ts":

1639105441911

}