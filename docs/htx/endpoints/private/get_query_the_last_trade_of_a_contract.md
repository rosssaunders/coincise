# GET Query The Last Trade of a Contract

**Source:**
[Query The Last Trade of a Contract](https://www.htx.com/en-us/opend/newApiPages/?id=5d517dc9-77b6-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /swap-ex/market/trade (Query The Last Trade of a Contract)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                   | Value Range | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD", All swaps default |             |               |

#### Response Parameter

| Parameter                | Data Type | Required | Description                                                                     | Value Range  |
| ------------------------ | --------- | -------- | ------------------------------------------------------------------------------- | ------------ |
| ch                       | string    | true     | Data belonged channel，Format： market.$contract_code.trade.detail              |              |
| status                   | string    | true     |                                                                                 | "ok","error" |
| ts                       | long      | true     | Sending time                                                                    |              |
| TICK> (ATTRS: TICK_START |           | false    |                                                                                 |              |
| id                       | long      | true     | Unique Order Id(symbol level)                                                   |              |
| ts                       | long      | true     | Latest Creation Time                                                            |              |
| LIST> (ATTRS: DATA_START |           | false    |                                                                                 |              |
| id                       | long      | true     | Unique Transaction Id(symbol level)                                             |              |
| price                    | string    | true     | Price                                                                           |              |
| amount                   | string    | true     | Quantity(Cont.). Sum of both buy and sell sides                                 |              |
| direction                | string    | true     | The direction to buy or sell is the direction of the taker (active transaction) |              |
| ts                       | long      | true     | Order Creation Time                                                             |              |
| quantity                 | string    | true     | trading quantity(coin)                                                          |              |
| contrct_code             | string    | true     | Contract Code                                                                   |              |
| LIST_END                 |           | false    |                                                                                 |              |
| TICK_END                 |           | false    |                                                                                 |              |

#### Request example

`curl "https://api.hbdm.com/v2/swap-ex/market/detail/batch_merged?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"ch":

"market.\*.trade.detail"

"status":

"ok"

"tick":{

"data":\[

0:{

"amount":

"40"

"direction":

"sell"

"id":

509516201220000

"price":

"13789.5"

"ts":

1603852755227

"contract_code":

"BTC-USD"

"quantity":

"0.344"

}

\]

"id":

1603852755779

"ts":

1603852755779

}

"ts":

1603852755779

}
