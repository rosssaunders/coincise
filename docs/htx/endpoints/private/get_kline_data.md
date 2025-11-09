# GET KLine Data

**Source:**
[Get KLine Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d5179ae-77b6-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /swap-ex/market/history/kline (Get KLine Data)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                | Value Range                                             | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------------------- | ------------------------------------------------------- | ------------- |
| contract_code | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |                                                         |               |
| period        | string    | true     | KLine Type                                                                 | 1min, 5min, 15min, 30min, 60min, 1hour,4hour,1day, 1mon |               |
| size          | int       | false    | Acquisition Quantity                                                       | \[1,2000\]                                              | 150           |
| from          | long      | false    | start timestamp seconds.                                                   |                                                         |               |
| to            | long      | false    | end timestamp seconds                                                      |                                                         |               |

Notes:  
Either size field or from and to fields need to be filled.  
If size field and from/to fields are not filled, It will return error
messages.  
If from field is filled, to field need to filled too.  
The api can mostly return the klines of last two years.  
If from to size are all filled,'from' and 'to' will be ignored.

#### Response Parameter

| Parameter                   | Data Type  | Required | Description                                                                                                                                        | Value Range    |
| --------------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| ch                          | string     | true     | Data belonged channel，Format： market.period                                                                                                      |                |
| status                      | string     | true     | Request Processing Result                                                                                                                          | "ok" , "error" |
| ts                          | long       | true     | Time of Respond Generation, Unit: Millisecond                                                                                                      |                |
| LIST>(ATTR NAME: DATA_START | kline data | false    |                                                                                                                                                    |                |
| id                          | long       | true     | kline id,the same as kline timestamp, kline start timestamp                                                                                        |                |
| vol                         | decimal    | true     | Trade Volume(Cont.). Sum of both buy and sell sides                                                                                                |                |
| count                       | decimal    | true     | Order Quantity. Sum of both buy and sell sides                                                                                                     |                |
| open                        | decimal    | true     | Opening Price                                                                                                                                      |                |
| close                       | decimal    | true     | Closing Price, the price in the last kline is the latest order price                                                                               |                |
| low                         | decimal    | true     | Low                                                                                                                                                |                |
| high                        | decimal    | true     | High                                                                                                                                               |                |
| amount                      | decimal    | true     | Trade Amount(Coin), trade amount(coin)=sum(order quantity of a single order \* face value of the coin/order price). Sum of both buy and sell sides |                |
| LIST_END                    |            | false    |                                                                                                                                                    |                |

#### Request example

`curl "https://api.hbdm.com/swap-ex/market/history/kline?contract_code=BTC-USD&size=100"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USD.kline.5min"

"data":\[

0:{

"amount":

876.9369459997886

"close":

13782.1

"count":

1357

"high":

13782.2

"id":

1603851900

"low":

13755.8

"open":

13764.7

"vol":

120706

}

1:{

"amount":

921.6695838405225

"close":

13779

"count":

1111

"high":

13787.6

"id":

1603852200

"low":

13777.5

"open":

13782.1

"vol":

127036

}

\]

"status":

"ok"

"ts":

1603852355339

}
