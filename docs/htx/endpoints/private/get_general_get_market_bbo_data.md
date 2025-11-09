# GET [General]Get Market BBO Data

**Source:** [[General]Get Market BBO Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8098e-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /linear-swap-ex/market/bbo (\[General\]Get Market BBO Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： （1）For restful interfaces, products, (future, coin margined swap, usdt margined Contracts)800 times/second for one IP at most

Interface description: he interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-220325" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" , "error" |
| TICKS\_START | object array | true |  |  |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-220325" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |
| business\_type | string | true | business type | futures, swap |
| mrid | long | true | Match ID, unique identification |  |
| ask | array | false | \[Ask 1 price, Ask 1 qty (cont)\] |  |
| bid | array | false | \[Bid 1 price, Bid 1 qty (cont)\] |  |
| ts | long | true | The system detects the orderbook time point, unit: milliseconds |  |
| TICKS\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/linear-swap-ex/market/bbo?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap"`

#### Response Example

##### Success Example

{

"status":

"ok"

"ticks":\[

0:{

"business\_type":

"futures"

"contract\_code":

"BTC-USDT-CW"

"ask":\[

0

:

48637.3

1

:

746

\]

"bid":\[

0

:

48482.5

1

:

385

\]

"mrid":

1251224

"ts":

1638754357868

}

1:{

"business\_type":

"futures"

"contract\_code":

"BTC-USDT-NW"

"ask":\[

0

:

48620.1

1

:

1000

\]

"bid":\[

0

:

48461

1

:

524

\]

"mrid":

1251162

"ts":

1638754344746

}

2:{

"business\_type":

"futures"

"contract\_code":

"BTC-USDT-CQ"

"ask":\[

0

:

48630.9

1

:

868

\]

"bid":\[

0

:

48577.1

1

:

63

\]

"mrid":

1251236

"ts":

1638754359301

}

3:{

"business\_type":

"swap"

"contract\_code":

"BTC-USDT"

"ask":\[

0

:

48511.6

1

:

91

\]

"bid":\[

0

:

48508.9

1

:

95

\]

"mrid":

334931

"ts":

1638754361719

}

\]

"ts":

1638754363648

}