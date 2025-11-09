# GET Contract Open Interest Information

**Source:**
[Get Contract Open Interest Information](https://www.htx.com/en-us/opend/newApiPages/?id=28c2d4e9-77ae-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /api/v1/contract_open_interest (Get Contract Open Interest Information)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP
(this 120 times every 3 seconds public interface rate limit is shared by all the
requests from that IP of non-marketing information, like above)

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                   | Value Range | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------------------------------------- | ----------- | ------------- |
| symbol        | string    | false    | Case-Insenstive.Both uppercase and lowercase are supported.e.g."BTC","ETH"... |             |               |
| contract_type | string    | false    | Contract Type ("this_week","next_week","quarter")                             |             |               |
| contract_code | string    | false    | BTC180914                                                                     |             |               |

Notes:  
If not any parameter is filled, the interface returns the price limitation data
of all currently available contracts. If the contract_code is filled in, query
by the contract_code; The contract_type parameter needs to together with symbol,
and can't get contract data only by contract_type

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                                    | Value Range                                       |
| -------------- | --------- | -------- | ------------------------------------------------------------------------------ | ------------------------------------------------- |
| status         | string    | true     | Request Processing Result                                                      | "ok" , "error"                                    |
| DATA_START     |           | false    |                                                                                |                                                   |
| symbol         | string    | true     | Variety code                                                                   | "BTC", "ETH" ...                                  |
| contract_type  | string    | true     | Contract Type                                                                  | "this_week","next_week","quarter", "next_quarter" |
| volume         | decimal   | true     | Position quantity(volume). Sum of both buy and sell sides                      |                                                   |
| amount         | decimal   | true     | Position quantity(Currency). Sum of both buy and sell sides                    |                                                   |
| contract_code  | string    | true     | Contract Code                                                                  | eg "BTC180914" ...                                |
| trade_amount   | decimal   | true     | trading volume within the last 24 hours (coin). Sum of both buy and sell sides |                                                   |
| trade_volume   | decimal   | true     | trading volume within the last 24 hours (cont). Sum of both buy and sell sides |                                                   |
| trade_turnover | decimal   | true     | trading amount within the last 24 hours. Sum of both buy and sell sides        |                                                   |
| DATA_END       |           | false    |                                                                                |                                                   |
| ts             | long      | true     | Time of Respond Generation, Unit: Millisecond                                  |                                                   |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_open_interest?symbol=BTC&contract_type=this_week"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"volume":

399976

"amount":

877.273288561929

"symbol":

"BTC"

"contract_type":

"this_week"

"contract_code":

"BTC210813"

"trade_amount":

4986.528002538939

"trade_volume":

2272868

"trade_turnover":

227286800

}

\]

"ts":

1628651933482

}
