# GET [General] Subscribe Kline data

**Source:**
[[General] Subscribe Kline data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7bf6d-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.kline.$period (\[General\] Subscribe Kline data)

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
| period        | string    | true     | Kline Period                   | 1min, 5min, 15min, 30min, 60min,4hour,1day,1week, 1mon                                                    |               |

#### Data Update

| Parameter      | Data Type | Required | Description                                                                                                                                        | Value Range |
| -------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| ch             | string    | true     | Request Parameter                                                                                                                                  |             |
| ts             | long      | true     | Time of Respond Generation，Unit：Millisecond                                                                                                      |             |
| TICK_START     |           | false    |                                                                                                                                                    |             |
| id             | long      | true     | kline id,the same as kline timestamp, kline start timestamp                                                                                        |             |
| mrid           | long      | true     | ID Order ID                                                                                                                                        |             |
| vol            | decimal   | true     | Trade Volume(Cont.). Sum of both buy and sell sides                                                                                                |             |
| count          | decimal   | true     | Order Quantity. Sum of both buy and sell sides                                                                                                     |             |
| open           | decimal   | true     | Open Price                                                                                                                                         |             |
| close          | decimal   | true     | Clos Price, the price in the last kline is the latest order price                                                                                  |             |
| low            | decimal   | true     | Low Price                                                                                                                                          |             |
| high           | decimal   | true     | High Price                                                                                                                                         |             |
| amount         | decimal   | true     | Trade Amount(Coin), trade amount(coin)=sum(order quantity of a single order \* face value of the coin/order price). Sum of both buy and sell sides |             |
| trade_turnover | decimal   | true     | Transaction amount, that is, sum (transaction quantity \* contract face value \* transaction price). Sum of both buy and sell sides                |             |
| TICK_END       |           | false    |                                                                                                                                                    |             |

#### Subscription Example

{

"sub":

"market.BTC-USDT.kline.1min"

"id":

"id1"

}

#### Example of a Successful Subscription

{

"id":

"id1"

"status":

"ok"

"subbed":

"market.BTC-USDT.kline.1min"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USDT.kline.1min"

"ts":

1603707124366

"tick":{

"id":

1603707120

"mrid":

131592424

"open":

13067.7

"close":

13067.7

"high":

13067.7

"low":

13067.7

"amount":

0.004

"vol":

4

"trade_turnover":

52.2708

"count":

1

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USDT.kline.1min"

"id":

"id1"

}
