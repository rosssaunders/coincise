# GET [General] Request Index Kline Data

**Source:**
[[General] Request Index Kline Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7cd6f-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.index.$period (\[General\] Request Index Kline Data)

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

#### Data Update

| Parameter  | Data Type    | Required | Description                                                      | Value Range |
| ---------- | ------------ | -------- | ---------------------------------------------------------------- | ----------- |
| req        | string       | true     | Data channel，Format：market.$contract\_code.index.$period       |             |
| status     | string       | true     | Request processing result                                        |             |
| id         | string       | true     | ID                                                               |             |
| wsid       | long         | true     | wsid                                                             |             |
| ts         | long         | true     | Time of Respond Generation, Unit: Millisecond                    |             |
| DATA_START | object array | false    | Details：data parameters                                         |             |
| id         | decimal      | false    | index kline id,the same as kline timestamp,kline start timestamp |             |
| vol        | decimal      | false    | Trade Volume. The value is 0.                                    |             |
| count      | decimal      | false    | count. The value is 0.                                           |             |
| open       | decimal      | false    | open index price                                                 |             |
| close      | decimal      | false    | close index price                                                |             |
| low        | decimal      | false    | lowest index price                                               |             |
| high       | decimal      | false    | highest index price                                              |             |
| amount     | decimal      | false    | amount based on coins.                                           |             |
| DATA_END   |              | false    |                                                                  |             |

#### Subscription Example

{

"req":

"market.btc-usdt.index.1min"

"id":

"id4"

"from":

1571000000

"to":

1573098606

}

#### Example of a Successful Subscription

{

"id":

"id4"

"rep":

"market.BTC-USDT.index.15min"

"wsid":

3673570133

"ts":

1607310136031

"status":

"ok"

"data":\[

0:{

"id":

1607309100

"open":

19213.505

"close":

19207.245

"low":

19207.245

"high":

19248.31

"amount":

0

"vol":

0

"count":

0

}

1:{

"id":

1607310000

"open":

19199.655

"close":

19174.48

"low":

19174.48

"high":

19208.11

"amount":

0

"vol":

0

"count":

0

}

\]

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
