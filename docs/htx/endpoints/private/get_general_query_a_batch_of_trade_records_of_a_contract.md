# GET [General] Query a Batch of Trade Records of a Contract

**Source:** [[General] Query a Batch of Trade Records of a Contract](https://www.htx.com/en-us/opend/newApiPages/?id=8cb81024-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /linear-swap-ex/market/history/trade (\[General\] Query a Batch of Trade Records of a Contract)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： （1）For restful interfaces, products, (future, coin margined swap, usdt margined Contracts)800 times/second for one IP at most

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| size | int | true | Number of Trading Records Acquisition | \[1, 2000\] |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data belonged channel，Format： market.$contract\_code.trade.detail |  |
| DATA\_START | object array | true |  |  |
| DATA\_START | object array | true |  |  |
| amount | decimal | true | Quantity(Cont.). Sum of both buy and sell sides |  |
| direction | string | true | The direction to buy or sell is the direction of the taker (active transaction) |  |
| id | long | true | Unique Transaction Id(symbol level) |  |
| price | decimal | true | Price |  |
| ts | long | true | Order Creation Time |  |
| quantity | decimal | true | trading quantity(coin) |  |
| trade\_turnover | decimal | true | trade turnover(quoted currency) |  |
| DATA\_END |  | false |  |  |
| id | long | true | Unique Order Id(symbol level). |  |
| ts | long | true | Latest transaction time |  |
| DATA\_END |  | false |  |  |
| status | string | true |  | "ok"，"error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-ex/market/history/trade?contract_code=BTC-USDT&size=100"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USDT.trade.detail"

"data":\[

0:{

"data":\[

0:{

"amount":

2

"direction":

"buy"

"id":

1314767870000

"price":

13081.3

"ts":

1603695383124

"quantity":

0.002

"trade\_turnover":

26.1626

}

\]

"id":

131476787

"ts":

1603695383124

}

\]

"status":

"ok"

"ts":

1603695388965

}