# GET Request Kline data

**Source:**
[Request Kline data](https://www.htx.com/en-us/opend/newApiPages/?id=5d51407c-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.kline.$period (Request Kline data)

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment                         | Address                    |
| ----------------------------------- | -------------------------- |
| Online                              | wss://api.hbdm.com/swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-ws  |

#### Request Parameter

| Field Name | Type | Description |
| ---------- | ---- | ----------- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description  | Value Range                                                                | Default Value |
| ------------- | --------- | -------- | ------------ | -------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | swap code    | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |               |
| period        | string    | true     | Kline Period | 1min, 5min, 15min, 30min, 60min,4hour,1day,1week, 1mon                     |               |

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

| Parameter  | Data Type | Required | Description                                                                                                                                         | Value Range |
| ---------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| rep        | string    | true     | Request Parameter                                                                                                                                   |             |
| status     | string    | true     | status                                                                                                                                              |             |
| id         | string    | true     | Request ID                                                                                                                                          |             |
| wsid       | long      | true     | wsid                                                                                                                                                |             |
| DATA_START |           | false    |                                                                                                                                                     |             |
| id         | long      | true     | kline id,the same as kline timestamp, kline start timestamp                                                                                         |             |
| vol        | decimal   | true     | Trade Volume(Cont.). Sum of both buy and sell sides                                                                                                 |             |
| count      | decimal   | true     | Order quantity. Sum of both buy and sell sides                                                                                                      |             |
| open       | decimal   | true     | Open Price                                                                                                                                          |             |
| close      | decimal   | true     | Clos Price, the price in the latest Kline is the last order price                                                                                   |             |
| low        | decimal   | true     | Low Price                                                                                                                                           |             |
| high       | decimal   | true     | High Price                                                                                                                                          |             |
| amount     | decimal   | true     | Trade Amount(Coin), trade Amount(coins)=sum(order quantity of a single order \* face value of the coin/order price). Sum of both buy and sell sides |             |
| DATA_END   |           | false    |                                                                                                                                                     |             |

#### Subscription Example

{

"sub":

"market.$contract\_code.mark\_price.$period"

"id":

"id1"

}

#### Example of a Successful Subscription

{

"id":

"id4"

"rep":

"market.BTC-USD.kline.60min"

"wsid":

2039465711

"status":

"ok"

"data":\[

0:{

"id":

1603296000

"open":

12749.9

"close":

12845.6

"low":

12732.1

"high":

12934.8

"amount":

43196.95777892503

"vol":

5547880

"count":

38975

}

1:{

"id":

1603299600

"open":

12845.7

"close":

12789.1

"low":

12745.9

"high":

12873

"amount":

15726.123646355463

"vol":

2014958

"count":

16302

}

\]

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
