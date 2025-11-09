# GET Request Premium Index Kline Data

**Source:**
[Request Premium Index Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d514db7-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.premium\_index.$period (Request Premium Index Kline Data)

Signature verification: Yes

Interface permission: Read

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

| Parameter     | Data Type | Required | Description                                                                                                              | Value Range                                                                      | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ------------- |
| from          | long      | true     | start time, from 3017-07-38T00:00:00+08:00 to 3050-01-01T00:00:00+08:00. timestamp unit：seconds                         |                                                                                  |               |
| to            | long      | true     | end time, from 3017-07-38T00:00:00+08:00 to 3050-01-01T00:00:00+08:00. timestamp unit：seconds. larger than 'from' value |                                                                                  |               |
| contract_code | string    | true     | contract code                                                                                                            | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USD","ETH-USD"… |               |
| period        | string    | true     | kline type                                                                                                               | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon                          |               |

Notes:  
Pushed once the index data is updated.

#### Data Update

| Parameter  | Data Type    | Required | Description                                                       | Value Range |
| ---------- | ------------ | -------- | ----------------------------------------------------------------- | ----------- |
| rep        | string       | true     | Data channel，Format： market.period                              |             |
| status     | string       | true     | Request processing result                                         |             |
| id         | string       | true     | ID                                                                |             |
| wsid       | long         | true     | wsid                                                              |             |
| ts         | long         | true     | Time of Respond Generation, Unit: Millisecond                     |             |
| DATA_START | object array | true     |                                                                   |             |
| id         | long         | true     | index kline id,the same as kline timestamp, kline start timestamp |             |
| vol        | string       | true     | Trade volume(Cont.). The value is 0.                              |             |
| count      | string       | true     | count. The value is 0.                                            |             |
| open       | string       | true     | open index price                                                  |             |
| close      | string       | true     | close index price                                                 |             |
| low        | string       | true     | lowest index price                                                |             |
| high       | string       | true     | highest index price                                               |             |
| amount     | string       | true     | amount based on coins.                                            |             |
| DATA_END   |              | false    |                                                                   |             |

#### Subscription Example

{

"req":

"market.BTC-USD.trade.detail"

"size":

50

"id":

"id8"

}

#### Example of a Successful Subscription

{

"id":

"id4"

"rep":

"market.BTC-USD.premium_index.60min"

"wsid":

2973246992

"status":

"ok"

"data":\[

0:{

"id":

1603296000

"open":

"-0.000072347706607"

"close":

"-0.0001900268622627"

"low":

"-0.001524303608041"

"high":

"0.0021789375596989"

"amount":

"0"

"vol":

"0"

"count":

"0"

}

1:{

"id":

1603299600

"open":

"-0.00003269469692"

"close":

"0.0002145326529248"

"low":

"-0.0011175492509934"

"high":

"0.0005228164202677"

"amount":

"0"

"vol":

"0"

"count":

"0"

}

\]

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
