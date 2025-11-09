# GET [Cross] Query Trigger Order Open Orders

**Source:** [[Cross] Query Trigger Order Open Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb874fd-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_trigger\_openorders (\[Cross\] Query Trigger Order Open Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair and contract\_code filled in, the contract\_code is the preferred. when none any of them, it means to get the all open orders.

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
| page\_index | int | false | page index, default 1st |  |  |
| page\_size | int | false | page size default 20，no more than 50 |  |  |
| trade\_type | int | false | trade type(Default:all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| ORDERS\_START | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| trigger\_type | string | true | trigger type： gegreat than or equal to；leless than or equal to |  |
| volume | decimal | true | place volume |  |
| order\_type | int | true | order type 1. Place orders 2. cancel orders |  |
| direction | string | true | direction \[buy/sell\] |  |
| offset | string | true | offset \[open/close,both\] |  |
| lever\_rate | int | true | leverage |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_price | decimal | true | trigger price |  |
| order\_price | decimal | true | order price |  |
| created\_at | long | true | created time |  |
| order\_price\_type | string | true | type of order price "limit": limit order，"optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20 |  |
| status | int | true | order status：1:ready to submit、2:submited、3:order accepted 、8：canceled orders but not found、9：canceling order、10：failed' |  |
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

"quarter"

"business\_type":

"futures"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211231"

"trigger\_type":

"le"

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

918808635214700500

"order\_id\_str":

"918808635214700544"

"order\_source":

"api"

"trigger\_price":

40000

"order\_price":

40000

"created\_at":

1639102649275

"order\_price\_type":

"limit"

"status":

2

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

1639102667934

}