# GET [Cross] Query Information On Trade State

**Source:**
[[Cross] Query Information On Trade State](https://www.htx.com/en-us/opend/newApiPages/?id=8cb841ac-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_trade_state (\[Cross\] Query Information On Trade State)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. When both of pair, contract_type and
contract_code filled in, the contract_code is the preferred. business_type is a
required parameter when query info of futures contract, and its value must be
futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                         | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                  | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                           | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                  | swap, this_week, next_week, quarter, next_quarter   |               |
| business_type | string    | false    | business type, default is swap | futures, swap, all                                  |               |

#### Response Parameter

| Parameter      | Data Type    | Required | Description                                                                                  | Value Range                                         |
| -------------- | ------------ | -------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| status         | string       | true     | Request Processing Result                                                                    | "ok" , "error"                                      |
| ts             | long         | true     | Time of Respond Generation, Unit: Millisecond                                                |                                                     |
| DATA_START     | object array | true     |                                                                                              |                                                     |
| symbol         | string       | true     | symbol                                                                                       | "BTC","ETH"...                                      |
| contract_code  | string       | true     | contract code                                                                                | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin_mode    | string       | true     | margin mode                                                                                  | cross: cross margin mode                            |
| margin_account | string       | true     | margin account                                                                               | "USDT"...                                           |
| contract_type  | string       | true     | contract type                                                                                | swap, this_week, next_week, quarter, next_quarter   |
| pair           | string       | true     | pair                                                                                         | such as: “BTC-USDT”                                 |
| business_type  | string       | true     | business type                                                                                | futures, swap                                       |
| open           | int          | true     | open order access：when “1”, then access available; when “0”, access unavailable"1"          |                                                     |
| close          | int          | true     | close order access：when “1”, then access available; when “0”, access unavailable "1"        |                                                     |
| cancel         | int          | true     | order cancellation access：when “1”, then access available; when “0”, access unavailable "1" |                                                     |
| DATA_END       |              | false    |                                                                                              |                                                     |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_trade_state?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"margin_mode":

"cross"

"margin_account":

"USDT"

"open":

1

"close":

1

"cancel":

1

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"this_week"

}

1:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211217"

"margin_mode":

"cross"

"margin_account":

"USDT"

"open":

1

"close":

1

"cancel":

1

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"next_week"

}

2:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211231"

"margin_mode":

"cross"

"margin_account":

"USDT"

"open":

1

"close":

1

"cancel":

1

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"quarter"

}

3:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_mode":

"cross"

"margin_account":

"USDT"

"open":

1

"close":

1

"cancel":

1

"business_type":

"swap"

"pair":

"BTC-USDT"

"contract_type":

"swap"

}

\]

"ts":

1638756343093

}
