# GET [General] Get KLine Data

**Source:** [[General] Get KLine Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80aca-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /linear-swap-ex/market/history/kline (\[General\] Get KLine Data)

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
| period | string | true | KLine Type | 1min, 5min, 15min, 30min, 60min, 1hour,4hour,1day, 1mon |  |
| size | int | false | Acquisition Quantity | \[1,2000\] | 150 |
| from | long | false | start timestamp seconds. |  |  |
| to | long | false | end timestamp seconds |  |  |

Notes:  
Either size field or from and to fields need to be filled.  
If size field and from/to fields are not filled, It will return error messages.  
If from field is filled, to field need to filled too.  
The api can mostly return the klines of last two years.  
If from to size are all filled,'from' and 'to' will be ignored.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data belonged channel，Format： market.period |  |
| status | string | true | Request Processing Result |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | kline data | false |  |  |
| id | long | true | kline id,the same as kline timestamp, kline start timestamp |  |
| vol | decimal | true | Trade Volume(Cont.) . Sum of both buy and sell sides |  |
| count | decimal | true | Order Quantity. Sum of both buy and sell sides |  |
| open | decimal | true | Open Price |  |
| close | decimal | true | Clos Price, the price in the last kline is the latest order price |  |
| low | decimal | true | Low Price |  |
| high | decimal | true | High Price |  |
| amount | decimal | true | Trade Amount(Coin), trade amount(coin)=sum(order quantity of a single order \* face value of the coin/order price). Sum of both buy and sell sides |  |
| trade\_turnover | decimal | true | Transaction amount, that is, sum (transaction quantity \* contract face value \* transaction price). Sum of both buy and sell sides |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-ex/market/history/kline?contract_code=BTC-USDT&period=1day&from=1587052800&to=1591286400"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USDT.kline.1min"

"data":\[

0:{

"amount":

0.004

"close":

13076.8

"count":

1

"high":

13076.8

"id":

1603695060

"low":

13076.8

"open":

13076.8

"trade\_turnover":

52.3072

"vol":

4

}

\]

"status":

"ok"

"ts":

1603695099234

}