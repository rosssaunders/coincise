# GET [Isolated] Query Trigger Order Open Orders

**Source:** [[Isolated] Query Trigger Order Open Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb873a8-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_trigger\_openorders (\[Isolated\] Query Trigger Order Open Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code "BTC-USDT"... |  |  |
| page\_index | int | false | page number，default page 1 if no given instruction |  |  |
| page\_size | int | false | default 20 if no given instruction ，no more than 50 |  |  |
| trade\_type | int | false | trade type(Default:all) 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| ORDERS\_START |  | false |  |  |
| symbol | string | true | Cryptocurrency |  |
| contract\_code | string | true | contract code |  |
| trigger\_type | string | true | trigger type： gegreat than or equal to；leless than or equal to |  |
| volume | decimal | true | trigger order volume |  |
| order\_type | int | true | Transaction Type 1. Place orders 2. cancel orders |  |
| direction | string | true | order direction \[buy,sell\] |  |
| offset | string | true | offset direction \[open,close,both\] |  |
| lever\_rate | int | true | Leverage 1\\5\\10\\20 |  |
| order\_id | long | true | trigger order ID |  |
| order\_id\_str | string | true | the order ID with string |  |
| order\_source | string | true | order source( system、web、api、m、risk、settlement、ios、android、windows、mac、trigger ) |  |
| trigger\_price | decimal | true | trigger price |  |
| order\_price | decimal | true | the preset price by the client |  |
| created\_at | long | true | order creation time |  |
| order\_price\_type | string | true | order price type "limit": limit order，"optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20 |  |
| status | int | true | order status：1:ready to submit、2:submited、3:order accepted 、8：canceled orders but not found、9：canceling order、10：failed' |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| ORDERS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time stamp of response, Unit: millisecond |  |

#### Request example

{

"contract\_code":

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

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"trigger\_type":

"ge"

"volume":

1

"order\_type":

1

"direction":

"sell"

"offset":

"open"

"lever\_rate":

10

"order\_id":

4

"order\_id\_str":

"4"

"order\_source":

"api"

"trigger\_price":

13900

"order\_price":

13900

"created\_at":

1603705215654

"order\_price\_type":

"limit"

"status":

2

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

1603705219567

}