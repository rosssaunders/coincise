# GET [Cross] Query Information On Position Limit

**Source:** [[Cross] Query Information On Position Limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb836ae-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_position\_limit (\[Cross\] Query Information On Position Limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

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
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| buy\_limit | decimal | true | max qty of position on long positions, unit: piece(calculated with mark\_price) |  |
| sell\_limit | decimal | true | max qty of position on short positions, unit: piece(calculated with mark\_price) |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| lever\_rate | int | true | leverage rate |  |
| buy\_limit\_value | decimal | true | upper limit on long positions, unit: usdt |  |
| sell\_limit\_value | decimal | true | upper limit on short positions, unit: usdt |  |
| mark\_price | decimal | true | mark price(use this price to calculate the qty of open positions) |  |
| DATA\_END |  | false |  |  |

#### Request example

`{ "contract_code": "BTC-USDT", "pair": "BTC-USDT", "contract_type": "swap" "business_type": "swap" }`

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

"BTC-USDT"

"margin\_mode":

"cross"

"buy\_limit":

1021671

"sell\_limit":

1021671

"business\_type":

"swap"

"contract\_type":

"swap"

"pair":

"BTC-USDT"

"lever\_rate":

5

"buy\_limit\_value":

50000000

"sell\_limit\_value":

50000000

"mark\_price":

48939.4

}

1:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211217"

"margin\_mode":

"cross"

"buy\_limit":

1021865

"sell\_limit":

1021865

"business\_type":

"futures"

"contract\_type":

"next\_week"

"pair":

"BTC-USDT"

"lever\_rate":

5

"buy\_limit\_value":

50000000

"sell\_limit\_value":

50000000

"mark\_price":

48930.1

}

2:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"margin\_mode":

"cross"

"buy\_limit":

1023478

"sell\_limit":

1023478

"business\_type":

"futures"

"contract\_type":

"this\_week"

"pair":

"BTC-USDT"

"lever\_rate":

5

"buy\_limit\_value":

50000000

"sell\_limit\_value":

50000000

"mark\_price":

48853

}

3:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211231"

"margin\_mode":

"cross"

"buy\_limit":

1021867

"sell\_limit":

1021867

"business\_type":

"futures"

"contract\_type":

"quarter"

"pair":

"BTC-USDT"

"lever\_rate":

1

"buy\_limit\_value":

50000000

"sell\_limit\_value":

50000000

"mark\_price":

48930

}

\]

"ts":

1638760890261

}