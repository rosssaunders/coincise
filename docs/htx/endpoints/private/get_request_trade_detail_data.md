# GET Request Trade Detail Data

**Source:**
[Request Trade Detail Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d5148a5-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract_code.trade.detail (Request Trade Detail Data)

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

| Parameter     | Data Type | Required | Description | Value Range | Default Value                                                              |
| ------------- | --------- | -------- | ----------- | ----------- | -------------------------------------------------------------------------- |
| contract_code | string    | true     | swap code   |             | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |

#### Data Update

| Parameter  | Data Type | Required | Description                                                                     | Value Range |
| ---------- | --------- | -------- | ------------------------------------------------------------------------------- | ----------- |
| rep        | string    | true     | Data Channel，Format： market.$contract_code.trade.detail                       |             |
| status     | string    | true     | Request Status                                                                  |             |
| id         | long      | true     | Request ID                                                                      |             |
| DATA_START |           | false    |                                                                                 |             |
| id         | long      | true     | Unique Transaction Id(symbol level)                                             |             |
| price      | string    | true     | Price                                                                           |             |
| amount     | string    | true     | Quantity(Cont.). Sum of both buy and sell sides                                 |             |
| direction  | string    | true     | The direction to buy or sell is the direction of the taker (active transaction) |             |
| ts         | long      | true     | Order Creation Time                                                             |             |
| quantity   | string    | true     | trading quantity(coin)                                                          |             |
| DATA_END   |           | false    |                                                                                 |             |
| ts         | long      | true     | server response time                                                            |             |

Notes:  
There are "quantity" parameter in return data only after 21:00:00 on February 3,
2021

#### Subscription Example

{

"sub":

"market.BTC-USD.trade.detail"

"id":

"id7"

}

#### Example of a Successful Subscription

{

"data":\[

0:{

"amount":

"2"

"ts":

1603876250774

"id":

509977028010022

"price":

"13689.8"

"direction":

"sell"

"quantity":

"0.0031"

}

\]

"id":

"id8"

"rep":

"market.BTC-USD.trade.detail"

"status":

"ok"

"ts":

1603876266723

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data
