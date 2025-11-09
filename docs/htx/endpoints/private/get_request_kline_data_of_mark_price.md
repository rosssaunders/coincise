# GET Request Kline Data of Mark Price

**Source:**
[Request Kline Data of Mark Price](https://www.htx.com/en-us/opend/newApiPages/?id=5d515331-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.mark\_price.$period (Request Kline Data of Mark Price)

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

| Parameter     | Data Type | Required | Description   | Value Range                                             | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------------------------------- | ------------- |
| from          | long      | true     | start time    |                                                         |               |
| to            | long      | true     | end time      |                                                         |               |
| contract_code | string    | true     | contract code | "BTC-USD","ETH-USD"...                                  |               |
| period        | string    | true     | period        | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |               |

Notes:  
At one time 2000 at most  
from and to both are Required

#### Data Update

| Parameter      | Data Type    | Required | Description                                                 | Value Range |
| -------------- | ------------ | -------- | ----------------------------------------------------------- | ----------- |
| req            | string       | true     | channel, format: market.$contract\_code.mark\_price.$period |             |
| status         | string       | true     | status                                                      |             |
| id             | string       | true     | id                                                          |             |
| wsid           | long         | true     | wsid                                                        |             |
| ts             | long         | true     | Time of Respond Generation, Unit：Millisecond               |             |
| DATA_START     | object array | true     |                                                             |             |
| id             | long         | true     | kline id                                                    |             |
| vol            | string       | true     | trade vol(cont), value is 0                                 |             |
| count          | string       | true     | trade count, value is 0                                     |             |
| open           | string       | true     | open price                                                  |             |
| close          | string       | true     | close price                                                 |             |
| low            | string       | true     | low price                                                   |             |
| high           | string       | true     | high price                                                  |             |
| amount         | string       | true     | trade amount(coin), value is 0                              |             |
| trade_turnover | string       | true     | trade turnover, value is 0                                  |             |
| DATA_END       |              | false    |                                                             |             |

#### Subscription Example

{

"sub":

"market.BTC-USD.premium_index.1min"

"id":

"id7"

}

#### Example of a Successful Subscription

{

"rep":

"market.BTC-USD.mark_price.5min"

"status":

"ok"

"id":

"id4"

"wsid":

1231323423

"ts":

1579489028884

"data":\[

0:{

"vol":

"0"

"close":

"9800.12"

"count":

"0"

"high":

"9800.12"

"id":

1529898780

"low":

"9800.12"

"open":

"9800.12"

"trade_turnover":

"0"

"amount":

"0"

}

\]

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
