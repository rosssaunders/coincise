# GET [Cross] Query Information On Trade State

**Source:** [[Cross] Query Information On Trade State](https://www.htx.com/en-us/opend/newApiPages/?id=8cb841ac-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_trade\_state (\[Cross\] Query Information On Trade State)

Request type: GET

Signature verification: No

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
| margin\_account | string | true | margin account | "USDT"... |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| open | int | true | open order access：when “1”, then access available; when “0”, access unavailable"1" |  |
| close | int | true | close order access：when “1”, then access available; when “0”, access unavailable "1" |  |
| cancel | int | true | order cancellation access：when “1”, then access available; when “0”, access unavailable "1" |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_trade_state?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap"`

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

"BTC-USDT-211210"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"open":

1

"close":

1

"cancel":

1

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"this\_week"

}

1:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211217"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"open":

1

"close":

1

"cancel":

1

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"next\_week"

}

2:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211231"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"open":

1

"close":

1

"cancel":

1

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"quarter"

}

3:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"open":

1

"close":

1

"cancel":

1

"business\_type":

"swap"

"pair":

"BTC-USDT"

"contract\_type":

"swap"

}

\]

"ts":

1638756343093

}