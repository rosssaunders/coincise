# GET [General] Subscribe Index Kline Data

**Source:**
[[General] Subscribe Index Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7cc15-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.index.$period (\[General\] Subscribe Index Kline Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： For websocket: The rate limit for
“req” request is 50 times at once. No limit for “sub” request as the data will
be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Subscription Address

| Environment                         | Address                     |
| ----------------------------------- | --------------------------- |
| Online                              | wss://api.hbdm.com/ws_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws_index  |

#### Request Parameter

| Field Name | Type | Description |
| ---------- | ---- | ----------- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description  | Value Range                                                                          | Default Value |
| ------------- | --------- | -------- | ------------ | ------------------------------------------------------------------------------------ | ------------- |
| contract_code | string    | true     | index symbol | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USDT","ETH-USDT"... |               |
| period        | string    | true     | kline type   | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1mon                                     |               |

Notes:  
Pushed once the index data is changed.  
Periodical Push when the index data hasn't changed according to the kline
period.

#### Data Update

| Parameter  | Data Type    | Required | Description                                                      | Value Range |
| ---------- | ------------ | -------- | ---------------------------------------------------------------- | ----------- |
| ch         | string       | false    | Data channel，Format：market.$contract\_code.index.$period       |             |
| ts         | long         | false    | Time of Respond Generation, Unit: Millisecond                    |             |
| TICK_START | object array | false    |                                                                  |             |
| id         | string       | false    | index kline id,the same as kline timestamp,kline start timestamp |             |
| vol        | string       | false    | Trade Volume. The value is 0.                                    |             |
| count      | decimal      | false    | count. The value is 0.                                           |             |
| open       | string       | false    | open index price                                                 |             |
| close      | string       | false    | close index price                                                |             |
| low        | string       | false    | lowest index price                                               |             |
| high       | string       | false    | highest index price                                              |             |
| amount     | string       | false    | amount based on coins.                                           |             |
| TICK_END   |              | false    |                                                                  |             |

#### Subscription Example

{

"sub":

"market.BTC-USDT.index.1min"

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

"market.BTC-USDT.index.1min"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USDT.index.15min"

"ts":

1607309592214

"tick":{

"id":

1607309100

"open":

"19213.505"

"close":

"19242.05"

"high":

"19248.31"

"low":

"19213.505"

"amount":

"0"

"vol":

"0"

"count":

0

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USDT.index.1min"

"id":

"id1"

}
