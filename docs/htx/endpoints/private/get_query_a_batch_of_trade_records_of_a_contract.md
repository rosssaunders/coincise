# GET Query a Batch of Trade Records of a Contract

**Source:**
[Query a Batch of Trade Records of a Contract](https://www.htx.com/en-us/opend/newApiPages/?id=5d517ef5-77b6-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /swap-ex/market/history/trade (Query a Batch of Trade Records of a Contract)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                           | Value Range                                                                | Default Value |
| ------------- | --------- | -------- | ------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code                         | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |               |
| size          | int       | true     | Number of Trading Records Acquisition | \[1, 2000\]                                                                | 1             |

#### Response Parameter

| Parameter                | Data Type | Required | Description                                                                     | Value Range   |
| ------------------------ | --------- | -------- | ------------------------------------------------------------------------------- | ------------- |
| ch                       | string    | true     | Data belonged channel，Format： market.$contract_code.trade.detail              |               |
| status                   | string    | true     |                                                                                 | "ok"，"error" |
| ts                       | long      | true     | Time of Respond Generation, Unit: Millisecond                                   |               |
| DATA> (ATTRS: DATA_START |           | false    |                                                                                 |               |
| id                       | long      | true     | Unique Order Id(symbol level)                                                   |               |
| ts                       | long      | true     | Latest Creation Time                                                            |               |
| LIST> (ATTRS: DATA_START |           | false    |                                                                                 |               |
| id                       | long      | true     | Unique Transaction Id(symbol level)                                             |               |
| price                    | decimal   | true     | Price                                                                           |               |
| amount                   | decimal   | true     | Quantity(Cont.). Sum of both buy and sell sides                                 |               |
| direction                | string    | true     | The direction to buy or sell is the direction of the taker (active transaction) |               |
| ts                       | long      | true     | Order Creation Time                                                             |               |
| quantity                 | decimal   | true     | trading quantity(coin)                                                          |               |
| LIST_END                 |           | false    |                                                                                 |               |
| DATA> (ATTRS: DATA_END   |           | false    |                                                                                 |               |

Notes:  
There are "quantity" parameter in return data only after 21:00:00 on February 3,
2021

#### Request example

`curl "https://api.hbdm.com/swap-ex/market/trade?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USD.trade.detail"

"data":\[

0:{

"data":\[

0:{

"amount":

4

"direction":

"sell"

"id":

509517815610000

"price":

13804

"ts":

1603852832106

"quantity":

0.044

}

1:{

"amount":

4

"direction":

"sell"

"id":

509517815610001

"price":

13804

"ts":

1603852832106

"quantity":

0.034

}

2:{

"amount":

2

"direction":

"sell"

"id":

509517815610002

"price":

13804

"ts":

1603852832106

"quantity":

0.0144

}

\]

"id":

50951781561

"ts":

1603852832106

}

\]

"status":

"ok"

"ts":

1603852832219

}
