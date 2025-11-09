# GET [Cross] Place Lightning Close Position

**Source:** [[Cross] Place Lightning Close Position](https://www.htx.com/en-us/opend/newApiPages/?id=8cb86a4c-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_lightning\_close\_position (\[Cross\] Place Lightning Close Position)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.By default, the maximum liquidable amount of the current position is used to place a lightning closing order. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

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
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| direction | string | true | direction | “buy”/“sell” |  |
| client\_order\_id | long | false | client order ID | \[1, 9223372036854775807\] |  |
| order\_price\_type | string | false | order price type | "market" by default."market": market Order type," "lightning\_fok": lightning FOK type,"lightning\_ioc": lightning IOC type |  |

Notes:  
Lightning Close Position，is order with rival price and optimal 30 grades. And the unsettled part will be automatically converted into a limited price order.  
The closing price of lightning closing position has a predictable effect, which can avoid the loss of users when the order cannot be completed when the market price rises sharply and falls sharply.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok"/"error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object | true |  |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | int | false | client order ID |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract\_type":

"swap"

"order\_price\_type":

"lightning"

"direction":

"buy"

"client\_order\_id":

1010222

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order\_id":

784063527799226400

"order\_id\_str":

"784063527799226368"

}

"ts":

1606976912267

}