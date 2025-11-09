# GET Query Deposit History of Sub User

**Source:**
[Query Deposit History of Sub User](https://www.htx.com/en-us/opend/newApiPages/?id=7ec5278c-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/query-deposit ( Query Deposit History of Sub User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: Parent user could query sub user's deposit history via
this endpoint.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                               | Value Range | Default Value |
| --------- | --------- | -------- | ----------------------------------------------------------------------------------------- | ----------- | ------------- |
| subUid    | long      | true     | Sub user UID                                                                              |             |               |
| currency  | string    | false    | Cryptocurrency (default value: all)                                                       |             |               |
| startTime | long      | false    | Farthest time (please refer to note 1 for valid range and default value)                  |             |               |
| endTime   | long      | false    | Nearest time (please refer to note 2 for valid range and default value)                   |             |               |
| sort      | string    | false    | Sorting order (enumerated values: asc, desc)                                              |             |               |
| limit     | int       | false    | Maximum number of items in one page (valid range:\[1-500\]; default value:100)            |             |               |
| fromId    | long      | false    | First record ID in this query (only valid for next page querying; please refer to note 3) |             |               |

Notes:  
startTime valid range: \[(endTime – 30days), endTime\]  
startTime default value: (endTime – 30days)

Note 2:  
endTime valid range: Unlimited  
endTime default value: current time

Note 3:  
Only when the number of items within the query window (between "startTime" and
"endTime") exceeded the page limitation (defined by "limit"), HTX server returns
"nextId". Once received "nextId", API user should –

1. Be aware of that, some items within the query window were not returned due to
   the page size limitation.
2. In order to get these items from HTX server, adopt the "nextId" as "fromId"
   and submit another request, with other request parameters no change.
3. "nextId" and "fromId" are for recurring query purpose and the ID itself does
   not have any business implication.

#### Response Parameter

| Parameter  | Data Type  | Required | Description                                                     | Value Range                                                                                                                                                                                                                                                                     |
| ---------- | ---------- | -------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code       | int        | false    | Status code                                                     |                                                                                                                                                                                                                                                                                 |
| message    | string     | false    | Error message (if any)                                          |                                                                                                                                                                                                                                                                                 |
| DATA_START | object     | false    |                                                                 |                                                                                                                                                                                                                                                                                 |
| id         | long       | false    | Deposit id                                                      |                                                                                                                                                                                                                                                                                 |
| currency   | string     | false    | Cryptocurrency                                                  |                                                                                                                                                                                                                                                                                 |
| txHash     | string     | false    | The on-chain transaction hash                                   |                                                                                                                                                                                                                                                                                 |
| chain      | string     | false    | Block chain name                                                |                                                                                                                                                                                                                                                                                 |
| amount     | bigdecimal | false    | The number of crypto asset transferred                          |                                                                                                                                                                                                                                                                                 |
| address    | string     | false    | The deposit source address                                      |                                                                                                                                                                                                                                                                                 |
| addressTag | string     | false    | The user defined address tag                                    |                                                                                                                                                                                                                                                                                 |
| state      | string     | false    | The state of this transfer (see below for details)              | unknown：On-chain transfer has not been received，confirming：On-chain transfer waits for first confirmation，confirmed：On-chain transfer confirmed for at least one block，safe：Multiple on-chain confirmation happened，orphan：Confirmed but currently in an orphan branch |
| createTime | long       | false    | The timestamp in milliseconds for the transfer creation         |                                                                                                                                                                                                                                                                                 |
| updateTime | long       | false    | The timestamp in milliseconds for the transfer's latest update  |                                                                                                                                                                                                                                                                                 |
| DATA_END   |            | false    |                                                                 |                                                                                                                                                                                                                                                                                 |
| nextId     | long       | false    | First record ID in next page (only valid if exceeded page size) |                                                                                                                                                                                                                                                                                 |

#### Request example

`curl"https://api.huobi.pro/v2/sub-user/query-deposit?subUid=xxxx¤cy=xxx"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"id":

33419472

"currency":

"ltc"

"chain":

"ltc"

"amount":

0.001

"address":

"LUuuPs5C5Ph3cZz76ZLN1AMLSstqG5PbAz"

"state":

"safe"

"txHash":

"847601d249861da56022323514870ddb96456ec9579526233d53e690264605a7"

"addressTag":

""

"createTime":

1587033225787

"updateTime":

1587033716616

}

\]

}
