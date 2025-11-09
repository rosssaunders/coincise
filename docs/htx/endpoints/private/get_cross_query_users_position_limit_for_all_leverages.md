# GET [Cross]Query Users' Position Limit for All Leverages

**Source:** [[Cross]Query Users' Position Limit for All Leverages](https://www.htx.com/en-us/opend/newApiPages/?id=8cb839e5-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_lever\_position\_limit (\[Cross\]Query Users' Position Limit for All Leverages)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| business\_type | string | false | business type, NA means all | futures, swap, all |  |

Notes:  
The interface only supports cross margin mode.  
If the status of contract is Pending Listing, Listing, Suspension, or Suspending of Listing, the data of that contract will not be returned when querying all; If that contract is queried separately, error 1014 will be reported;  
pair, contract\_type and contract\_code all filled in，contract\_code is preferred  
lever\_rate must fall within the user's available leverage rate, otherwise error 1037 will be reported  
business\_type is a required parameter when querying the contract of futures. And the parameter value must be: futures or all.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| contract\_type | string | false | contract type, NA means all | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | false | pair, NA means all | such as "BTC-USDT" |
| contract\_code | string | false | contract\_code, NA means all | swap: "BTC-USDT"... future: "BTC-USDT-211231"... |
| lever\_rate | int | false | leverage rate, NA means all |  |
| status | string | true | status | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... futures: "BTC-USDT-211231"... |
| margin\_mode | string | true | margin mode | cross |
| business\_type | string | true | business type | futures, swap |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: "BTC-USDT" |
| LIST\_START | object array | true |  |  |
| lever\_rate | int | true | leverage rate |  |
| buy\_limit\_value | decimal | true | upper limit on long positions, unit: usdt |  |
| sell\_limit\_value | decimal | true | upper limit on short positions, unit: usdt |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

{

"business\_type":

"swap"

"contract\_type":

"swap"

"pair":

"BTC-USDT"

"contract\_code":

"BTC-USDT"

"lever\_rate":

20

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"business\_type":

"swap"

"contract\_type":

"swap"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"list":\[

0:{

"lever\_rate":

2

"buy\_limit\_value":

50000000

"sell\_limit\_value":

50000000

}

\]

}

1:{

"business\_type":

"futures"

"contract\_type":

"next\_week"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211217"

"margin\_mode":

"cross"

"list":\[

0:{

"lever\_rate":

2

"buy\_limit\_value":

50000000

"sell\_limit\_value":

50000000

}

\]

}

2:{

"business\_type":

"futures"

"contract\_type":

"this\_week"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"margin\_mode":

"cross"

"list":\[

0:{

"lever\_rate":

2

"buy\_limit\_value":

50000000

"sell\_limit\_value":

50000000

}

\]

}

3:{

"business\_type":

"futures"

"contract\_type":

"quarter"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211231"

"margin\_mode":

"cross"

"list":\[

0:{

"lever\_rate":

2

"buy\_limit\_value":

50000000

"sell\_limit\_value":

50000000

}

\]

}

\]

"ts":

1638769370732

}