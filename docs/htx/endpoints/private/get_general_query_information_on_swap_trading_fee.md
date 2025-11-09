# GET [General] Query information on swap trading fee

**Source:** [[General] Query information on swap trading fee](https://www.htx.com/en-us/opend/newApiPages/?id=8cb831de-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_fee (\[General\] Query information on swap trading fee)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract type code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | contract type code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| open\_maker\_fee | string | true | Open maker order fee, decimal |  |
| open\_taker\_fee | string | true | Open taker order fee, decimal |  |
| close\_maker\_fee | string | true | Close maker order fee, decimal |  |
| close\_taker\_fee | string | true | Close taker order fee, decimal |  |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "USDT"... |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| delivery\_fee | string | true | delivery fee rate |  |
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

"open\_maker\_fee":

"0.0002"

"open\_taker\_fee":

"0.0004"

"close\_maker\_fee":

"0.0002"

"close\_taker\_fee":

"0.0004"

"fee\_asset":

"USDT"

"delivery\_fee":

"0"

"business\_type":

"swap"

"contract\_type":

"swap"

"pair":

"BTC-USDT"

}

1:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211217"

"open\_maker\_fee":

"0.0002"

"open\_taker\_fee":

"0.0005"

"close\_maker\_fee":

"0.0002"

"close\_taker\_fee":

"0.0005"

"fee\_asset":

"USDT"

"delivery\_fee":

"0.00015"

"business\_type":

"futures"

"contract\_type":

"next\_week"

"pair":

"BTC-USDT"

}

2:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"open\_maker\_fee":

"0.0002"

"open\_taker\_fee":

"0.0005"

"close\_maker\_fee":

"0.0002"

"close\_taker\_fee":

"0.0005"

"fee\_asset":

"USDT"

"delivery\_fee":

"0.00015"

"business\_type":

"futures"

"contract\_type":

"this\_week"

"pair":

"BTC-USDT"

}

3:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211231"

"open\_maker\_fee":

"0.0002"

"open\_taker\_fee":

"0.0005"

"close\_maker\_fee":

"0.0002"

"close\_taker\_fee":

"0.0005"

"fee\_asset":

"USDT"

"delivery\_fee":

"0.00015"

"business\_type":

"futures"

"contract\_type":

"quarter"

"pair":

"BTC-USDT"

}

\]

"ts":

1638760715804

}