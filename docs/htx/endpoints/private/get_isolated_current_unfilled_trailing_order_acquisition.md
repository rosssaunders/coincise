# GET [Isolated]Current unfilled trailing order acquisition

**Source:** [[Isolated]Current unfilled trailing order acquisition](https://www.htx.com/en-us/opend/newApiPages/?id=8cb894b7-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_track\_openorders (\[Isolated\]Current unfilled trailing order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| trade\_type | int | false | trade type(if not filled in, means all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20, and no more than 50 |  |  |

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
| contract\_code | string | true | contract code | BTC-USDT |
| volume | decimal | true | volume |  |
| order\_type | int | true | order type: 1. Quotation; 2. Cancelled order |  |
| direction | string | true | direction | buy, sell |
| offset | string | true | offset | open, close, both |
| lever\_rate | int | true | lever rate |  |
| order\_id | long | true | trailing order id |  |
| order\_id\_str | string | true | trailing order id in string format |  |
| order\_source | string | true | order source |  |
| created\_at | long | true | created at |  |
| order\_price\_type | string | true | order price type | optimal\_5, optimal\_10, optimal\_20, formula\_price |
| status | int | true | order status | 2.Ready to submit the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |
| callback\_rate | decimal | true | callback rate | such as: 0.01 means 1% |
| active price | decimal | true | active price |  |
| is\_active | int | true | Is the active price activated? | 1: activated; 0: not activated |
| margin\_mode | string | true | margin mode | isolated |
| margin\_account | string | true | margin account | e.g：“BTC-USDT” |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| ORDERS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"trade\_type":

0

"page\_index":

1

"page\_size":

50

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

"BTC"

"contract\_code":

"BTC-USDT"

"volume":

1

"order\_type":

1

"direction":

"buy"

"offset":

"open"

"lever\_rate":

5

"order\_id":

826055066114916400

"order\_id\_str":

"826055066114916352"

"order\_source":

"api"

"created\_at":

1616988475122

"order\_price\_type":

"formula\_price"

"status":

2

"callback\_rate":

0.03

"active\_price":

48888

"is\_active":

0

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

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

1616988497109

}