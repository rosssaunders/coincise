# GET [General] Query Swap Price Limitation

**Source:** [[General] Query Swap Price Limitation](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80013-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_price\_limit (\[General\] Query Swap Price Limitation)

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
| contract\_code | string | false | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |  |
| pair | string | false | pair, BTC-USDT |  |  |
| contract\_type | string | false | contract type: swap, this\_week, next\_week, quarter, next\_quarter |  |  |
| business\_type | string | false | business type, default is swap: futures, swap, all |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" ,"error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code | "BTC","ETH" ... |
| high\_limit | decimal | true | Highest Buying Price |  |
| low\_limit | decimal | true | Lowest Selling Price |  |
| contract\_code | string | true | Contract Code | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| DATA\_START |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_price_limit?contract_code=BTC-USDT"`

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

"high\_limit":

49629

"low\_limit":

47682.8

"business\_type":

"swap"

"pair":

"BTC-USDT"

"contract\_type":

"swap"

}

1:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"high\_limit":

49645.2

"low\_limit":

47698.5

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"this\_week"

}

2:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211217"

"high\_limit":

49699.7

"low\_limit":

47750.8

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"next\_week"

}

3:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211231"

"high\_limit":

50135.1

"low\_limit":

47214.8

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"quarter"

}

\]

"ts":

1638753887869

}