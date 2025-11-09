# GET a Batch of Market Data Overview(V2)

**Source:**
[Get a Batch of Market Data Overview(V2)](https://www.htx.com/en-us/opend/newApiPages/?id=5d517cf4-77b6-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /v2/swap-ex/market/detail/batch_merged (Get a Batch of Market Data Overview(V2))

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                | Value Range | Default Value              |
| ------------- | --------- | -------- | -------------------------------------------------------------------------- | ----------- | -------------------------- |
| contract_code | string    | false    | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USD" |             | if not filled in means all |

Notes:  
The interface data updated frequency is 50ms

#### Response Parameter

| Parameter     | Data Type    | Required | Description                                                                 | Value Range    |
| ------------- | ------------ | -------- | --------------------------------------------------------------------------- | -------------- |
| status        | string       | true     | status                                                                      | "ok" , "error" |
| TICKS_START   | object array | true     |                                                                             |                |
| contract_code | string       | true     | contract code                                                               | "BTC-USD" ...  |
| id            | long         | true     | id                                                                          |                |
| amount        | string       | true     | trade amount(coin), from nowtime - 24 hours. Sum of both buy and sell sides |                |
| ask           | array        | true     | \[ask one price, ask one vol(cont)\]                                        |                |
| bid           | array        | true     | \[bid one price, bid one vol(cont)\]                                        |                |
| open          | string       | true     | open price                                                                  |                |
| close         | string       | true     | close price                                                                 |                |
| count         | decimal      | true     | trade count, from nowtime - 24 hours. Sum of both buy and sell sides        |                |
| high          | string       | true     | hight price                                                                 |                |
| low           | string       | true     | low price                                                                   |                |
| vol           | string       | true     | Transaction amount, from nowtime - 24 hours. Sum of both buy and sell sides |                |
| number_of     | string       | true     | number of(cont), from nowtime - 24 hours. Sum of both buy and sell sides    |                |
| ts            | long         | true     | timestamp                                                                   |                |
| TICKS_END     |              | false    |                                                                             |                |
| ts            | long         | true     | Time of Respond Generation, Unit：Millisecond                               |                |

#### Request example

`curl"https://api.hbdm.com/v2/swap-ex/market/detail/batch_merged?symbol=xxxx"`

#### Response Example

##### Success Example

{

"status":

"ok"

"ticks":\[

0:{

"id":

1650792412

"ts":

1650792412926

"ask":\[

0

:

39730.5

1

:

243

\]

"bid":\[

0

:

39730.4

1

:

1869

\]

"contract_code":

"BTC-USD"

"open":

"39792.4"

"close":

"39735.2"

"low":

"39325.6"

"high":

"39980"

"amount":

"3021.6948445812255950219437567245117510294"

"count":

13571

"vol":

"119937400"

"number_of":

"1199374"

}

\]

"ts":

1650792412926

}
