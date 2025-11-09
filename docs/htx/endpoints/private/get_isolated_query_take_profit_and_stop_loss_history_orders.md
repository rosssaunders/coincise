# GET [Isolated]Query Take-profit and Stop-loss History Orders

**Source:** [[Isolated]Query Take-profit and Stop-loss History Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb88253-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_tpsl\_hisorders (\[Isolated\]Query Take-profit and Stop-loss History Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

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
| contract\_code | string | true | contract code | "BTC-USDT" ... |  |
| status | string | true | status | Multiple orders are separated by English commas, and the status of stop-profit and stop-loss orders is: 0:all(representing all orders in the end state), 4:Have sumbmitted the orders, 5:orders failed, 6:orders canceled, 11:expired |  |
| create\_date | long | true | days | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default. |  |
| page\_index | int | false | page index. 1 by default |  |  |
| page\_size | int | false | page size.20 by default. 50 at most |  |  |
| sort\_by | string | false | for sortting, descende order by created\_at when without value | "created\_at": descending order by order created at, "update\_time": descending order by order update time |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| current\_page | int | true | current page |  |
| ORDERS\_START | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_mode | string | true | margin mode | cross, isolated |
| margin\_account | string | true | margin account | such as “USDT”，“BTC-USDT” |
| volume | decimal | true | Numbers of orders (volume) |  |
| order\_type | int | true | Order type: 1. Quotation; 2. Cancelled order |  |
| tpsl\_order\_type | string | true | Order type(take-profit order/stop-loss order) | “tp”:take-profit order；"sl"stop-loss order |
| direction | string | true | direction | "buy", "sell" |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_type | string | true | trigger type: ge, le |  |
| trigger\_price | decimal | true | trigger price |  |
| price\_protect | boolean | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |
| created\_at | long | true | created time |  |
| order\_price\_type | string | true | order price type | market，limit, optimal\_5, optimal\_10, optimal\_20 |
| order\_price | decimal | true | order price |  |
| status | int | true | status: | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired |
| source\_order\_id | string | true | Order id of source limit order (the field will have a value only when the order placed is a take-profit and stop-loss order; it is used to indicate that a certain limit order that triggered current take-profit and stop-loss order.) |  |
| relation\_tpsl\_order\_id | string | true | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |  |
| canceled\_at | long | true | canceled time |  |
| fail\_code | int | true | fail code when triggered |  |
| fail\_reason | string | true | fail reason when triggered |  |
| triggered\_price | decimal | true | triggered price |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed. |  |
| update\_time | long | true | update time, unit: Millisecond |  |
| ORDERS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"status":

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

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"volume":

1

"order\_type":

1

"tpsl\_order\_type":

"sl"

"direction":

"sell"

"order\_id":

795714964661583900

"order\_id\_str":

"795714964661583873"

"order\_source":

"api"

"trigger\_type":

"le"

"trigger\_price":

29000

"created\_at":

1609754831244

"order\_price\_type":

"optimal\_5"

"status":

6

"source\_order\_id":

NULL

"relation\_tpsl\_order\_id":

"795714964661583872"

"canceled\_at":

1609754844420

"fail\_code":

NULL

"fail\_reason":

NULL

"triggered\_price":

NULL

"relation\_order\_id":

"-1"

"update\_time":

1609754850018

"order\_price":

0

}

\]

"total\_page":

17

"current\_page":

1

"total\_size":

17

}

"ts":

1609756931689

}