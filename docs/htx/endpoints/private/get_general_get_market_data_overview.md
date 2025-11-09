# GET [General] Get Market Data Overview

**Source:** [[General] Get Market Data Overview](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80ce4-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /linear-swap-ex/market/detail/merged (\[General\] Get Market Data Overview)

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
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-220325" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data belonged channel，format： market.$contract\_code.detail.merged |  |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_START | object | true | kline data (Start at 00:00(UTC+8) of the day) |  |
| id | long | true | kline id,the same as kline timestamp |  |
| vol | string | true | Trade Volume(Cont.), from nowtime - 24 hours. Sum of both buy and sell sides |  |
| count | decimal | true | Order Quantity, from nowtime - 24 hours. Sum of both buy and sell sides |  |
| open | string | true | Opening Price |  |
| close | string | true | Closing Price, the price in the last kline is the latest order price |  |
| low | string | true | Low |  |
| high | string | true | High |  |
| amount | string | true | Trade Amount(Coin), trade amount(coin)=sum(order quantity of a single order \* face value of the coin/order price),from nowtime - 24 hours. Sum of both buy and sell sides |  |
| ask | object | true | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence |  |
| bid | object | true | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence |  |
| trade\_turnover | string | true | Transaction amount, that is, sum (transaction quantity \* contract face value \* transaction price),from nowtime - 24 hours. Sum of both buy and sell sides |  |
| ts | long | true | Timestamp |  |
| TICK\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-ex/market/detail/merged?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USDT.detail.merged"

"status":

"ok"

"tick":{

"amount":

"12.526"

"ask":\[

0

:

13084.2

1

:

131

\]

"bid":\[

0

:

13082.9

1

:

38

\]

"close":

"13076.8"

"count":

2920

"high":

"13205.3"

"id":

1603695162

"low":

"12877.5"

"open":

"12916.2"

"trade\_turnover":

"163247.3982"

"ts":

1603695162580

"vol":

"12526"

}

"ts":

1603695162580

}