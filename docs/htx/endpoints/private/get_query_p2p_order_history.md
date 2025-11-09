# GET Query P2P Order History

**Source:**
[Query P2P Order History](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-192e687b21e)

**Category:** P2P

## Authentication

Required (Private Endpoint)

### v1/api/c2c/order/history (Query P2P Order History)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: 20/2s

Interface description: This interface is used to query the orders of users' c2c
historical transaction records.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |
| Online                              | https://api.huobi.pro     |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                                                                                                                              | Value Range                          | Default Value |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- |
| side      | string    | false    | 0:buy , 1:sell                                                                                                                                                                           |                                      |               |
| startTime | long      | false    | Query start time, query by data creation. time,millisecond timestamp.                                                                                                                    | The query window is the last 90 days |               |
| endTime   | long      | false    | Query end time, query data by creation. timetime,millisecond timestamp.                                                                                                                  | The query window is the last 90 days |               |
| direct    | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev           | now           |
| fromId    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                                      |               |
| limit     | long      | false    | Number of results per request. Maximum is 100. Default is 100.                                                                                                                           |                                      |               |

#### Response Parameter

| Parameter           | Data Type | Required | Description                                                                | Value Range                                                                                                          |
| ------------------- | --------- | -------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| status              | string    | true     |                                                                            |                                                                                                                      |
| DATA_START          | object    | true     |                                                                            |                                                                                                                      |
| orderNo             | long      | true     | order number                                                               |                                                                                                                      |
| role                | string    | true     | taker or maker                                                             | taker or maker                                                                                                       |
| side                | string    | true     | Trading direction                                                          |                                                                                                                      |
| fiatCurrency        | string    | true     | legal tender                                                               |                                                                                                                      |
| counterpartNickName | string    | true     | Counterparty nickname                                                      |                                                                                                                      |
| asset               | string    | true     | Trading asset currency                                                     |                                                                                                                      |
| amount              | string    | true     | Quantity                                                                   |                                                                                                                      |
| unitPrice           | string    | true     | unit price                                                                 |                                                                                                                      |
| totalPrice          | string    | true     | total price                                                                |                                                                                                                      |
| fee                 | string    | true     | handling fee                                                               |                                                                                                                      |
| orderStatus         | string    | true     | Order Status                                                               | UNPAID(0), PAID(1), CANCEL(2), COMPLETED(3), APPEAL(4), CANCEL_APPEAL(5), PAYING(103), PAID_FAIL(104), ABNORMAL(105) |
| queryId             |           | false    |                                                                            |                                                                                                                      |
| createTime          | long      | true     | creation time                                                              |                                                                                                                      |
| DATA_END            |           | false    | Query id, which can be used as the from_id field in the next query request |                                                                                                                      |
| ts                  | long      | true     |                                                                            |                                                                                                                      |

#### Request example

`curl"https://api.huobi.pro/v1/c2c/order/history?side=true&startTime=200&endTime=Success&direct=next&fromId=55924684&limit=2"`

#### Response Example

##### Success Example

{

"success":

true

"code":

200

"message":

"Success"

"data":{

"ts":

1730169839738

"openApiC2COrderInfoVOList":\[

0:{

"orderNo":

"1281355271817359360"

"role":

"taker"

"counterpartNickName":

"yq@163.com"

"side":

"buy"

"fiatCurrency":

"USD"

"asset":

"USDT"

"totalPrice":

"2.00"

"amount":

"2.380952"

"unitPrice":

"0.84"

"fee":

"0"

"orderStatus":

2

"createTime":

"1725540503000"

"queryId":

55924686

}

\]

}

}
