# GET [General] Request Trade Detail Data

**Source:** [[General] Request Trade Detail Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7c960-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.trade.detail (\[General\] Request Trade Detail Data)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | Data Channel，Format： market.$contract\_code.trade.detail |  |
| status | string | true | Request Status |  |
| id | long | true | Request ID |  |
| DATA\_START |  | false |  |  |
| id | long | true | Unique Transaction Id(symbol level) |  |
| price | string | true | Price |  |
| amount | string | true | Quantity(Cont.). Sum of both buy and sell sides |  |
| direction | string | true | The direction to buy or sell is the direction of the taker (active transaction) |  |
| ts | long | true | Order Creation Time |  |
| quantity | string | true | trading quantity(coin) |  |
| trade\_turnover | string | true | trade turnover(quoted currency) |  |
| DATA\_END |  | false |  |  |
| ts | long | true | server response time |  |

Notes:  
There are "quantity" parameter in return data only after 21:00:00 on February 3, 2021

#### Subscription Example

{

"req":

"market.BTC-USDT.trade.detail"

"size":

50

"id":

"id8"

}

#### Example of a Successful Subscription

{

"data":\[

0:{

"amount":

"22"

"ts":

1603706942240

"id":

1315909380000

"price":

"13068.4"

"direction":

"sell"

"quantity":

"0.022"

"trade\_turnover":

"288.334"

}

1:{

"amount":

"2"

"ts":

1603706947767

"id":

1315909430000

"price":

"13068.5"

"direction":

"buy"

"quantity":

"0.002"

"trade\_turnover":

"26.334"

}

\]

"id":

"id8"

"rep":

"market.BTC-USDT.trade.detail"

"status":

"ok"

"ts":

1603708046534

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data