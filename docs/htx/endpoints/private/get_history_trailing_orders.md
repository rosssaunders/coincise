# GET History Trailing Orders

**Source:** [Get History Trailing Orders](https://www.htx.com/en-us/opend/newApiPages/?id=5d51c1e7-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_track\_hisorders (Get History Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USD |  |
| status | string | true | order status | Multiple separated by English commas, Trailing Order status: 0:all(representing all orders in the end state), 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |  |
| trade\_type | int | true | trade type(if not filled in, means all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long |  |
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
| contract\_code | string | true | contract code | BTC-USD |
| volume | decimal | true | volume |  |
| order\_type | int | true | order type: 1. Quotation; 2. Cancelled order |  |
| direction | string | true | direction | buy, sell |
| offset | string | true | offset | open, close |
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
| ORDERS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"trade\_type":

0

"page\_index":

1

"page\_size":

20

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"orders":\[

0:{

"symbol":

"LTC"

"contract\_code":

"LTC-USD"

"triggered\_price":

NULL

"volume":

1

"order\_type":

1

"direction":

"sell"

"offset":

"open"

"lever\_rate":

5

"order\_id":

825057948169748500

"order\_id\_str":

"825057948169748480"

"order\_source":

"api"

"created\_at":

1616750743680

"update\_time":

1616750784353

"order\_price\_type":

"formula\_price"

"status":

6

"canceled\_at":

1616750768281

"fail\_code":

NULL

"fail\_reason":

NULL

"callback\_rate":

0.003

"active\_price":

179

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

}

\]

"total\_page":

1

"current\_page":

1

"total\_size":

3

}

"ts":

1616751416065

}