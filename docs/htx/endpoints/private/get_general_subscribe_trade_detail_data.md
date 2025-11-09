# GET [General] Subscribe Trade Detail Data

**Source:**
[[General] Subscribe Trade Detail Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7cab7-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract_code.trade.detail (\[General\] Subscribe Trade Detail Data)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： For websocket: The rate limit for
“req” request is 50 times at once. No limit for “sub” request as the data will
be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment                         | Address                           |
| ----------------------------------- | --------------------------------- |
| Online                              | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws  |

#### Request Parameter

| Field Name | Type | Description |
| ---------- | ---- | ----------- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |               |

#### Data Update

| Parameter      | Data Type | Required | Description                                                                     | Value Range |
| -------------- | --------- | -------- | ------------------------------------------------------------------------------- | ----------- |
| ch             | string    | true     | Data channel,format: market.$contract_code.trade.detail                         |             |
| ts             | long      | true     | Request time                                                                    |             |
| TICK_START     |           | false    |                                                                                 |             |
| id             | long      | true     | Unique Order Id(symbol level).                                                  |             |
| ts             | long      | true     | tick time                                                                       |             |
| DATA_START     |           | false    |                                                                                 |             |
| amount         | decimal   | true     | quantity(Cont.). Sum of both buy and sell sides                                 |             |
| ts             | long      | true     | trade timestamp                                                                 |             |
| id             | long      | true     | Unique Transaction Id(symbol level)                                             |             |
| price          | decimal   | true     | Price                                                                           |             |
| direction      | string    | true     | The direction to buy or sell is the direction of the taker (active transaction) |             |
| quantity       | decimal   | true     | trading quantity(coin)                                                          |             |
| trade_turnover | decimal   | true     | trade turnover(quoted currency)                                                 |             |
| DATA_END       |           | false    |                                                                                 |             |
| TICK_END       |           | false    |                                                                                 |             |

#### Subscription Example

{

"sub":

"market.BTC-USDT.trade.detail"

"id":

"id7"

}

#### Example of a Successful Subscription

{

"id":

"id7"

"status":

"ok"

"subbed":

"market.BTC-USDT.trade.detail"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USDT.trade.detail"

"ts":

1603708208346

"tick":{

"id":

131602265

"ts":

1603708208335

"data":\[

0:{

"amount":

2

"ts":

1603708208335

"id":

1316022650000

"price":

13073.3

"direction":

"buy"

"quantity":

0.002

"trade_turnover":

26.334

}

\]

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USDT.trade.detail"

"id":

"id7"

}
