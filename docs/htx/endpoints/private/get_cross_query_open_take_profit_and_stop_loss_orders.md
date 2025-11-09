# GET [Cross]Query Open Take-profit and Stop-loss Orders

**Source:** [[Cross]Query Open Take-profit and Stop-loss Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb880ff-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_tpsl\_openorders (\[Cross\]Query Open Take-profit and Stop-loss Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. when all of pair and contract\_code filled in, the contract\_code is the preferred; when no one filled in, return all data in cross mode.

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
| page\_index | int | false | page index. 1 by default |  |  |
| page\_size | int | false | page size.20 by default. 50 at most |  |  |
| trade\_type | int | false | trade type(Default:all) | 0:all,3: buy short,4: sell long |  |

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
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
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
| price\_protect | booleanint | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |
| created\_at | long | true | created time |  |
| order\_price\_type | string | true | order price type | market，limit, optimal\_5, optimal\_10, optimal\_20 |
| order\_price | decimal | true | order price |  |
| status | int | true | status: | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired |
| source\_order\_id | string | true | Order id of source limit order (the field will have a value only when the order placed is a take-profit and stop-loss order; it is used to indicate that a certain limit order that triggered current take-profit and stop-loss order.) |  |
| relation\_tpsl\_order\_id | string | true | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| ORDERS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"page\_index":

1

"page\_size":

50

"trade\_type":

0

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

"this\_week"

"business\_type":

"futures"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"volume":

1

"order\_type":

1

"direction":

"sell"

"order\_id":

918816985859559400

"order\_id\_str":

"918816985859559425"

"order\_source":

"api"

"trigger\_type":

"le"

"trigger\_price":

40000

"order\_price":

0

"created\_at":

1639104640223

"order\_price\_type":

"optimal\_5"

"status":

2

"tpsl\_order\_type":

"sl"

"source\_order\_id":

NULL

"relation\_tpsl\_order\_id":

"918816985859559424"

}

1:{

"contract\_type":

"this\_week"

"business\_type":

"futures"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"volume":

1

"order\_type":

1

"direction":

"sell"

"order\_id":

918816985859559400

"order\_id\_str":

"918816985859559424"

"order\_source":

"api"

"trigger\_type":

"ge"

"trigger\_price":

50000

"order\_price":

0

"created\_at":

1639104640223

"order\_price\_type":

"optimal\_5"

"status":

2

"tpsl\_order\_type":

"tp"

"source\_order\_id":

NULL

"relation\_tpsl\_order\_id":

"918816985859559425"

}

\]

"total\_page":

1

"current\_page":

1

"total\_size":

2

}

"ts":

1639104794491

}