# GET Request Basis Data

**Source:** [Request Basis Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d515179-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.basis.$period.$basis\_price\_type (Request Basis Data)

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| from | long | true | start time, from 3017-07-38T00:00:00+08:00 to 3050-01-01T00:00:00+08:00. timestamp unit：seconds |  |  |
| to | long | true | end time, from 3017-07-38T00:00:00+08:00 to 3050-01-01T00:00:00+08:00. timestamp unit：seconds. larger than 'from' value |  |  |
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported..e.g."BTC-USD" |  |
| period | string | true | kline period | 1min, 5min, 15min, 30min, 60min,4hour,1day,1week, 1mon |  |
| basis\_price\_type | string | false | use basis price type to calculate the basis data | open price："open"，close price："close"，highest price："high"，lowest price："low"，avg=（high price +low price）/3："average" | Using open price default |

Notes:  
2000 data at most per request.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | Data channel，Format： market.period |  |
| status | string | true | Request processing result |  |
| id | string | true | ID |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | false |  |  |
| id | long | false | unique id |  |
| contract\_price | string | false | contract last price |  |
| index\_price | string | false | index price |  |
| basis | string | false | basis=contract\_price - index\_price |  |
| basis\_rate | string | false | basis\_rate=basis/index\_price |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

{

"sub":

"market.BTC-USD.bbo"

"id":

"id8"

}

#### Example of a Successful Subscription

{

"data":\[

0:{

"basis":

"1.4774999999990541"

"basis\_rate":

"0.0001158966923161712"

"contract\_price":

"12749.9"

"id":

1603296000

"index\_price":

"12748.4225"

}

1:{

"basis":

"-0.42999999999847205"

"basis\_rate":

"-3.347311602782099405"

"contract\_price":

"12845.7"

"id":

1603299600

"index\_price":

"12846.13"

}

\]

"id":

"id4"

"rep":

"market.BTC-USD.basis.60min.open"

"status":

"ok"

"ts":

1603877618020

"wsid":

491167614

}

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data