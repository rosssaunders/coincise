# GET [General]Get a Batch of Market Data Overview(V2)

**Source:**
[[General]Get a Batch of Market Data Overview(V2)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80df2-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /v2/linear-swap-ex/market/detail/batch_merged (\[General\]Get a Batch of Market Data Overview(V2))

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
margin mode. The interface data updated frequency is 50ms The request parameter
"contract_code" supports the contract code of futures, in that the format is
BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW,
BTC-USDT-CQ, BTC-USDT-NQ. business_type is a required parameter when query info
of futures contract, and its value must be futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |               |
| business_type | string    | false    | business type, default is swap | futures, swap, all                                                                                        |               |

#### Response Parameter

| Parameter     | Data Type    | Required | Description                                                                 | Value Range                                                                                               |
| ------------- | ------------ | -------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| status        | string       | true     | status                                                                      | "ok" , "error"                                                                                            |
| TICKS_START   | object array | true     |                                                                             |                                                                                                           |
| contract_code | string       | true     | contract code or contract type                                              | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |
| business_type | string       | true     | business type                                                               | futures, swap                                                                                             |
| id            | long         | true     | id                                                                          |                                                                                                           |
| amount        | string       | true     | Trade Amount(Coin) ,from nowtime - 24 hours. Sum of both buy and sell sides |                                                                                                           |
| ask           | array        | true     | \[ask one price, ask one vol(cont)\]                                        |                                                                                                           |
| bid           | array        | true     | \[bid one price, bid one vol(cont)\]                                        |                                                                                                           |
| open          | string       | true     | open price                                                                  |                                                                                                           |
| close         | string       | true     | close price                                                                 |                                                                                                           |
| count         | decimal      | true     | Order Quantity, from nowtime - 24 hours. Sum of both buy and sell sides     |                                                                                                           |
| high          | string       | true     | high price                                                                  |                                                                                                           |
| low           | string       | true     | low price                                                                   |                                                                                                           |
| vol           | string       | true     | Transaction amount, from nowtime - 24 hours. Sum of both buy and sell sides |                                                                                                           |
| number_of     | string       | true     | number of(cont), from nowtime - 24 hours. Sum of both buy and sell sides    |                                                                                                           |
| ts            | long         | true     | timestamp                                                                   |                                                                                                           |
| TICKS_END     |              | false    |                                                                             |                                                                                                           |
| ts            | long         | true     | Time of Respond Generation, Unit: Millisecond                               |                                                                                                           |

#### Request example

`curl"https://api.hbdm.com/v2/linear-swap-ex/market/detail/batch_merged?contract_code=BTC-USDT&business_type=swap"`

#### Response Example

##### Success Example

{

"status":

"ok"

"ticks":\[

0:{

"id":

1650792083

"ts":

1650792083179

"ask":\[

0

:

39736.6

1

:

1285

\]

"bid":\[

0

:

39736.5

1

:

6070

\]

"business_type":

"swap"

"contract_code":

"BTC-USDT"

"open":

"39760"

"close":

"39736.6"

"low":

"39316.3"

"high":

"39971.2"

"amount":

"6891.566"

"count":

48262

"vol":

"273472535.834"

"number_of":

"6891566"

}

\]

"ts":

1650792083179

}
