# GET [General] Get Swap Open Interest Information

**Source:** [[General] Get Swap Open Interest Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80166-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_open\_interest (\[General\] Get Swap Open Interest Information)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-201101; When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |  |
| pair | string | false | pair, BTC-USDT |  |  |
| contract\_type | string | false | contract type: swap, this\_week, next\_week, quarter, next\_quarter |  |  |
| business\_type | string | false | business type, default is swap: futures, swap, all |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code | "BTC", "ETH" ... |
| volume | decimal | true | Position quantity(volume). Sum of both buy and sell sides |  |
| amount | decimal | true | Position quantity(Currency). Sum of both buy and sell sides |  |
| contract\_code | string | true | Contract Code | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| value | decimal | true | Total position volume（The unit is the denominated currency of the contract. e.g:USDT） |  |
| trade\_amount | decimal | true | trading volume within the last 24 hours (coin). Sum of both buy and sell sides |  |
| trade\_volume | decimal | true | trading volume within the last 24 hours (cont). Sum of both buy and sell sides |  |
| trade\_turnover | decimal | true | trading amount within the last 24 hours. Sum of both buy and sell sides |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_open_interest?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"volume":

78696

"amount":

78.696

"symbol":

"BTC"

"value":

3823138.2456

"contract\_code":

"BTC-USDT"

"trade\_amount":

0

"trade\_volume":

0

"trade\_turnover":

0

"business\_type":

"swap"

"pair":

"BTC-USDT"

"contract\_type":

"swap"

}

1:{

"volume":

10925

"amount":

10.925

"symbol":

"BTC"

"value":

530662.21

"contract\_code":

"BTC-USDT-211217"

"trade\_amount":

0

"trade\_volume":

0

"trade\_turnover":

0

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"next\_week"

}

2:{

"volume":

27104

"amount":

27.104

"symbol":

"BTC"

"value":

1316937.2832

"contract\_code":

"BTC-USDT-211210"

"trade\_amount":

0

"trade\_volume":

0

"trade\_turnover":

0

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"this\_week"

}

3:{

"volume":

201143

"amount":

201.143

"symbol":

"BTC"

"value":

9775067.0568

"contract\_code":

"BTC-USDT-211231"

"trade\_amount":

0

"trade\_volume":

0

"trade\_turnover":

0

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"quarter"

}

\]

"ts":

1638754059540

}