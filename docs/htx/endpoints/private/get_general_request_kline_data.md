# GET [General] Request Kline data

**Source:**
[[General] Request Kline data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7c23e-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.kline.$period (\[General\] Request Kline data)

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

Notes:  
If between time range \[t1, t5\], there are t1-t5 KLines in quantity.  
from: t1, to: t5, return \[t1, t5\].  
from: t5, to: t1, which t5 > t1, return \[\].  
from: t5, return \[t5\].  
from: t3, return \[t3, t5\].  
to: t5, return \[t1, t5\].  
from: t which t3 < t to: t which t3 < t from: t1 and to: t2, should satisfy
1325347200 < t1 < t2 < 2524579200.  
Clients can request 2000 Klines at most in one request

#### Data Update

| Parameter      | Data Type | Required | Description                                                                                                                                         | Value Range |
| -------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| rep            | string    | true     | Request Parameter                                                                                                                                   |             |
| status         | string    | true     | status                                                                                                                                              |             |
| id             | string    | true     | Request ID                                                                                                                                          |             |
| wsid           | long      | true     | wsid                                                                                                                                                |             |
| DATA_START     |           | false    |                                                                                                                                                     |             |
| id             | long      | true     | kline id,the same as kline timestamp, kline start timestamp                                                                                         |             |
| vol            | decimal   | true     | Trade Volume(Cont.). Sum of both buy and sell sides                                                                                                 |             |
| count          | decimal   | true     | Order quantity. Sum of both buy and sell sides                                                                                                      |             |
| open           | decimal   | true     | Open Price                                                                                                                                          |             |
| close          | decimal   | true     | Clos Price, the price in the latest Kline is the last order price                                                                                   |             |
| low            | decimal   | true     | Low Price                                                                                                                                           |             |
| high           | decimal   | true     | High Price                                                                                                                                          |             |
| amount         | decimal   | true     | Trade Amount(Coin), trade amount(coins)=sum(order quantity of a single order \* face value of the coin/order price). Sum of both buy and sell sides |             |
| trade_turnover | decimal   | true     | Transaction amount, that is, sum (transaction quantity \* contract face value \* transaction price). Sum of both buy and sell sides                 |             |
| DATA_END       |           | false    |                                                                                                                                                     |             |

#### Subscription Example

{

"req":

"market.BTC-USDT.kline.1min"

"id":

"id4"

"from":

1579247342

"to":

1579247342

}

#### Example of a Successful Subscription

{

"id":

"id4"

"rep":

"market.BTC-USDT.kline.60min"

"wsid":

467277265

"status":

"ok"

"data":\[

0:{

"id":

1603270800

"open":

12198

"close":

12196.7

"low":

11715.8

"high":

12300

"amount":

0.276

"vol":

276

"trade_turnover":

3315.9104

"count":

39

}

1:{

"id":

1603274400

"open":

12196.7

"close":

12277.9

"low":

12111

"high":

12289.9

"amount":

0.198

"vol":

198

"trade_turnover":

2420.7728

"count":

21

}

\]

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
