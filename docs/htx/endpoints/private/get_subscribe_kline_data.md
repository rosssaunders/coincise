# GET Subscribe Kline data

**Source:**
[Subscribe Kline data](https://www.htx.com/en-us/opend/newApiPages/?id=5d513c66-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.kline.$period (Subscribe Kline data)

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

#### Data Update

| Parameter  | Data Type | Required | Description                                                                                                                                        | Value Range |
| ---------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| ch         | string    | true     | Request Parameter                                                                                                                                  |             |
| ts         | long      | true     | Time of Respond Generation，Unit：Millisecond                                                                                                      |             |
| TICK_START |           | false    |                                                                                                                                                    |             |
| id         | long      | true     | kline id,the same as kline timestamp, kline start timestamp                                                                                        |             |
| mrid       | long      | true     | ID Order ID                                                                                                                                        |             |
| vol        | decimal   | true     | Trade Volume(Cont.). Sum of both buy and sell sides                                                                                                |             |
| count      | decimal   | true     | Order Quantity. Sum of both buy and sell sides                                                                                                     |             |
| open       | decimal   | true     | Open Price                                                                                                                                         |             |
| close      | decimal   | true     | Clos Price, the price in the last kline is the latest order price                                                                                  |             |
| low        | decimal   | true     | Low Price                                                                                                                                          |             |
| high       | decimal   | true     | High Price                                                                                                                                         |             |
| amount     | decimal   | true     | Trade Amount(Coin), trade amount(coin)=sum(order quantity of a single order \* face value of the coin/order price). Sum of both buy and sell sides |             |
| TICK_END   |           | false    |                                                                                                                                                    |             |

#### Subscription Example

{

"req":

"market.BTC-USD.kline.1min"

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

"id1"

"status":

"ok"

"subbed":

"market.BTC-USD.kline.1min"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USD.kline.1min"

"ts":

1603875561883

"tick":{

"id":

1603875540

"mrid":

50996000395

"open":

13694.9

"close":

13693

"high":

13695

"low":

13693

"amount":

312.97288610016886

"vol":

42858

"count":

312

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USD.kline.1min"

"id":

"id1"

}
