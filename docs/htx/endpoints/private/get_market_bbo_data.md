# GET Market BBO Data

**Source:**
[Get Market BBO Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d5178e2-77b6-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /swap-ex/market/bbo (Get Market BBO Data)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                 | Value Range   | Default Value |
| ------------- | --------- | -------- | ------------------------------------------- | ------------- | ------------- |
| contract_code | string    | false    | contract code，if not filled in, return all | "BTC-USD" ... |               |

#### Response Parameter

| Parameter     | Data Type    | Required | Description                                                     | Value Range            |
| ------------- | ------------ | -------- | --------------------------------------------------------------- | ---------------------- |
| status        | string       | true     | the result of server handling to request                        | "ok" , "error"         |
| TICKS_START   | object array | true     |                                                                 |                        |
| contract_code | string       | true     | contract code                                                   | "BTC-USD","ETH-USD"... |
| mrid          | long         | true     | Match ID, unique identification                                 |                        |
| ask           | array        | false    | \[Ask 1 price, Ask 1 qty (cont)\]                               |                        |
| bid           | array        | false    | \[Bid 1 price, Bid 1 qty (cont)\]                               |                        |
| ts            | long         | true     | The system detects the orderbook time point, unit: milliseconds |                        |
| TICKS_END     |              | false    |                                                                 |                        |
| ts            | long         | true     | Time of Respond Generation, Unit: Millisecond                   |                        |

#### Request example

`curl "https://api.hbdm.com/swap-ex/market/depth?contract_code=BTC-USD&type=step0"`

#### Response Example

##### Success Example

{

"status":

"ok"

"ticks":\[

0:{

"contract_code":

"LTC-USD"

"ask":\[

0

:

178

1

:

10

\]

"bid":\[

0

:

176

1

:

9

\]

"mrid":

1301759

"ts":

1616747942659

}

\]

"ts":

1616747957364

}
