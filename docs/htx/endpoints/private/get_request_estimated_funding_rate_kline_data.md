# GET Request Estimated Funding Rate Kline Data

**Source:**
[Request Estimated Funding Rate Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d514f61-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.estimated\_rate.$period (Request Estimated Funding Rate Kline Data)

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
| period        | string    | true     | index symbol                                                                                                             | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon                          |               |

Notes:  
Pushed once the kline data is changed.  
Periodical Push when the kline data hasn't changed according to the kline
period.

#### Data Update

| Parameter  | Data Type    | Required | Description                                   | Value Range |
| ---------- | ------------ | -------- | --------------------------------------------- | ----------- |
| rep        | string       | true     | Data channel，Format： market.period          |             |
| status     | string       | true     | Request processing result                     |             |
| id         | string       | true     | ID                                            |             |
| wsid       | long         | true     | wsid                                          |             |
| ts         | long         | true     | Time of Respond Generation, Unit: Millisecond |             |
| DATA_START | object array | true     |                                               |             |
| id         | long         | true     | kline id,the same as kline timestamp          |             |
| vol        | string       | true     | Trade volume(Cont.). The value is 0.          |             |
| count      | string       | true     | count. The value is 0.                        |             |
| open       | string       | true     | open price                                    |             |
| close      | string       | true     | close price                                   |             |
| low        | string       | true     | low price                                     |             |
| high       | string       | true     | high price                                    |             |
| amount     | string       | true     | amount based on coins.                        |             |
| DATA_END   |              | false    |                                               |             |

#### Subscription Example

{

"sub":

"market.BTC-USD.index.1min"

"id":

"id1"

}

#### Example of a Successful Subscription

{

"id":

"id4"

"rep":

"market.BTC-USD.estimated_rate.60min"

"wsid":

126577326

"status":

"ok"

"data":\[

0:{

"id":

1603296000

"open":

"0.0001"

"close":

"0.0001"

"low":

"-0.0006454418466661"

"high":

"0.0001"

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

"0.0001"

"close":

"0.0001"

"low":

"0.0001"

"high":

"0.0001"

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
