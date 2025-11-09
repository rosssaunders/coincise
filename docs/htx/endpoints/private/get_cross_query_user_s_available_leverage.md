# GET [Cross] Query User’s Available Leverage

**Source:** [[Cross] Query User’s Available Leverage](https://www.htx.com/en-us/opend/newApiPages/?id=8cb82f42-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_available\_level\_rate (\[Cross\] Query User’s Available Leverage)

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
| contract\_code | string | false | contract code，return all contract info when null | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| available\_level\_rate | string | true | available level rate,splited by ',' | "1,5,10" |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract\_type":

"swap"

"business\_type":

"swap"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract\_code":

"ETH-USDT"

"available\_level\_rate":

"1,2,3,5"

"margin\_mode":

"cross"

"contract\_type":

"swap"

"pair":

"ETH-USDT"

"business\_type":

"swap"

}

1:{

"contract\_code":

"ETH-USDT-211210"

"available\_level\_rate":

"1,2,3,5"

"margin\_mode":

"cross"

"contract\_type":

"this\_week"

"pair":

"ETH-USDT"

"business\_type":

"futures"

}

2:{

"contract\_code":

"ETH-USDT-211217"

"available\_level\_rate":

"1,2,3,5"

"margin\_mode":

"cross"

"contract\_type":

"next\_week"

"pair":

"ETH-USDT"

"business\_type":

"futures"

}

3:{

"contract\_code":

"ETH-USDT-211231"

"available\_level\_rate":

"1,2,3,5"

"margin\_mode":

"cross"

"contract\_type":

"quarter"

"pair":

"ETH-USDT"

"business\_type":

"futures"

}

\]

"ts":

1638760001689

}