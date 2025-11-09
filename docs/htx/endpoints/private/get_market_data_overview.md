# GET Market Data Overview

**Source:**
[Get Market Data Overview](https://www.htx.com/en-us/opend/newApiPages/?id=5d517bbc-77b6-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /swap-ex/market/detail/merged (Get Market Data Overview)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                | Value Range | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |             |               |

#### Response Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                 | Value Range    |
| ---------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| ch         | string    | true     | Data belonged channel，format： market.$contract_code.detail.merged                                                                                                         |                |
| status     | string    | true     | Request Processing Result                                                                                                                                                   | "ok" , "error" |
| ts         | long      | true     | Time of Respond Generation, Unit: Millisecond                                                                                                                               |                |
| TICK_START |           | false    | kline data (Start at 00:00(UTC+8) of the day)                                                                                                                               |                |
| id         | long      | true     | kline id,the same as kline timestamp                                                                                                                                        |                |
| vol        | string    | true     | Trade Volume(Cont.).from nowtime - 24 hours. Sum of both buy and sell sides                                                                                                 |                |
| count      | decimal   | true     | Order Quantity. from nowtime - 24 hours. Sum of both buy and sell sides                                                                                                     |                |
| open       | string    | true     | Opening Price                                                                                                                                                               |                |
| close      | string    | true     | Closing Price, the price in the last kline is the latest order price                                                                                                        |                |
| low        | string    | true     | Low                                                                                                                                                                         |                |
| high       | string    | true     | High                                                                                                                                                                        |                |
| amount     | string    | true     | Trade Amount(Coin), trade amount(coin)=sum(order quantity of a single order \* face value of the coin/order price). from nowtime - 24 hours. Sum of both buy and sell sides |                |
| ask        | object    | true     | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence                                                                                            |                |
| bid        | object    | true     | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence                                                                                              |                |
| ts         | long      | true     | Timestamp                                                                                                                                                                   |                |
| TICK_END   |           | false    |                                                                                                                                                                             |                |

#### Request example

`curl "https://api.hbdm.com/swap-ex/market/history/kline?contract_code=BTC-USD&period=1day&from=1587052800&to=1591286400"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USD.detail.merged"

"status":

"ok"

"tick":{

"amount":

"358917.5563748616647638772009932561387079078"

"ask":\[

0

:

13780.3

1

:

25907

\]

"bid":\[

0

:

13780.2

1

:

1455

\]

"close":

"13780.2"

"count":

412778

"high":

"13796.5"

"id":

1603852483

"low":

"13531.2"

"open":

"13616.9"

"ts":

1603852483765

"vol":

"48357818"

}

"ts":

1603852483765

}
