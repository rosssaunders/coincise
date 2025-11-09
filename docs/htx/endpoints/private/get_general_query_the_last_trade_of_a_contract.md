# GET [General] Query The Last Trade of a Contract

**Source:** [[General] Query The Last Trade of a Contract](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80f4c-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /linear-swap-ex/market/trade (\[General\] Query The Last Trade of a Contract)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： （1）For restful interfaces, products, (future, coin margined swap, usdt margined Contracts)800 times/second for one IP at most

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code or contract type, swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |  |
| business\_type | string | false | business type, default is swap: futures, swap, all |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data belonged channel，Format： market.$contract\_code.trade.detail |  |
| status | string | true |  | "ok","error" |
| ts | long | true | Sending time |  |
| TICK\_START |  | false |  |  |
| id | long | true | Unique Order Id(symbol level). |  |
| ts | long | true | Latest Creation Time |  |
| DATA\_START |  | false |  |  |
| id | long | true | Unique Transaction Id(symbol level) |  |
| price | string | true | Price |  |
| amount | string | true | Quantity(Cont.). Sum of both buy and sell sides |  |
| direction | string | true | The direction to buy or sell is the direction of the taker (active transaction) |  |
| ts | long | true | Order Creation Time |  |
| quantity | string | true | trading quantity(coin) |  |
| contract\_code | string | true | Contract Code or Contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |
| business\_type | string | true | business type | futures, swap |
| trade\_turnover | string | true | trade turnover(quoted currency) |  |
| DATA\_END |  | false |  |  |
| TICK\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-ex/market/trade?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"ch":

"market.\*.trade.detail"

"status":

"ok"

"tick":{

"data":\[

0:{

"amount":

"6"

"ts":

1603695230083

"id":

1314755250000

"price":

"13083"

"direction":

"buy"

"quantity":

0.006

"contract\_code":

"BTC-USDT"

"business\_type":

"swap"

"trade\_turnover":

78.498

}

\]

"id":

1603695235127

"ts":

1603695235127

}

"ts":

1603695235127

}