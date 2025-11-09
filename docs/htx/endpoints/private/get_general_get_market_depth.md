# GET [General] Get Market Depth

**Source:**
[[General] Get Market Depth](https://www.htx.com/en-us/opend/newApiPages/?id=8cb808ad-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /linear-swap-ex/market/depth (\[General\] Get Market Depth)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                                                                                                                                                                                                                                                                                             | Value Range | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | true     | swap: "BTC-USDT"... , future: "BTC-USDT-220325" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ                                                                                                                                                                                                                                                                               |             |               |
| type          | string    | true     | Get depth data within step 150, use step0, step1, step2, step3, step4, step5, step14, step15, step16, step17（merged depth data 0-5,14-17）；when step is 0，depth data will not be merged; Get depth data within step 20, use step6, step7, step8, step9, step10, step11, step12, step13, step18, step19(merged depth data 7-13,18-19); when step is 6, depth data will not be merged. |             |               |

Notes:  
step16, step17, step18, and step19 are only for SHIB-USDT contract, and the
other contracts is not supported now.

#### Response Parameter

| Parameter    | Data Type    | Required | Description                                                                      | Value Range    |
| ------------ | ------------ | -------- | -------------------------------------------------------------------------------- | -------------- |
| ch           | string       | true     | Data belonged channel，Format： market.period                                    |                |
| status       | string       | true     | Request Processing Result                                                        |                |
| ts           | long         | true     | Time of Respond Generation，Unit：Millisecond                                    | "ok" , "error" |
| TICK>\_START | object array | false    |                                                                                  |                |
| mrid         | long         | true     | Order ID                                                                         |                |
| id           | long         | true     | tick ID                                                                          |                |
| asks         | object       | false    | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence |                |
| bids         | object       | false    | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence   |                |
| ts           | long         | true     | Time of Respond Generation, Unit: Millisecond                                    |                |
| version      | long         | true     | version ID                                                                       |                |
| ch           | string       | true     | Data channel, Format： market.period                                             |                |
| TICK>\_END   |              | false    |                                                                                  |                |

#### Request example

`curl "https://api.hbdm.com/linear-swap-ex/market/depth?contract_code=BTC-USDT&type=step0"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USDT-CQ.depth.step6"

"status":

"ok"

"tick":{

"asks":\[

0:\[

0

:

48611.5

1

:

741

\]

1:\[

0

:

48635.2

1

:

792

\]

\]

"bids":\[

0:\[

0

:

48596.4

1

:

90

\]

1:\[

0

:

48585.7

1

:

180

\]

\]

"ch":

"market.BTC-USDT-CQ.depth.step6"

"id":

1638754215

"mrid":

1250406

"ts":

1638754215640

"version":

1638754215

}

"ts":

1638754216092

}
