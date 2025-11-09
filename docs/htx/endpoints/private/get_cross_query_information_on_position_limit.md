# GET [Cross] Query Information On Position Limit

**Source:**
[[Cross] Query Information On Position Limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb836ae-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_position_limit (\[Cross\] Query Information On Position Limit)

Request type: POST

Signature verification: Yes

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

| Parameter        | Data Type    | Required | Description                                                                     | Value Range                                         |
| ---------------- | ------------ | -------- | ------------------------------------------------------------------------------- | --------------------------------------------------- |
| status           | string       | true     | Request Processing Result                                                       | "ok" , "error"                                      |
| ts               | long         | true     | Time of Respond Generation, Unit: Millisecond                                   |                                                     |
| DATA_START       | object array | true     |                                                                                 |                                                     |
| symbol           | string       | true     | symbol                                                                          | "BTC","ETH"...                                      |
| contract_code    | string       | true     | contract code                                                                   | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin_mode      | string       | true     | margin mode                                                                     | cross: cross margin mode                            |
| buy_limit        | decimal      | true     | max qty of position on long positions, unit: piece(calculated with mark_price)  |                                                     |
| sell_limit       | decimal      | true     | max qty of position on short positions, unit: piece(calculated with mark_price) |                                                     |
| contract_type    | string       | true     | contract type                                                                   | swap, this_week, next_week, quarter, next_quarter   |
| pair             | string       | true     | pair                                                                            | such as: “BTC-USDT”                                 |
| business_type    | string       | true     | business type                                                                   | futures, swap                                       |
| lever_rate       | int          | true     | leverage rate                                                                   |                                                     |
| buy_limit_value  | decimal      | true     | upper limit on long positions, unit: usdt                                       |                                                     |
| sell_limit_value | decimal      | true     | upper limit on short positions, unit: usdt                                      |                                                     |
| mark_price       | decimal      | true     | mark price(use this price to calculate the qty of open positions)               |                                                     |
| DATA_END         |              | false    |                                                                                 |                                                     |

#### Request example

`{ "contract_code": "BTC-USDT", "pair": "BTC-USDT", "contract_type": "swap" "business_type": "swap" }`

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

"BTC-USDT"

"margin_mode":

"cross"

"buy_limit":

1021671

"sell_limit":

1021671

"business_type":

"swap"

"contract_type":

"swap"

"pair":

"BTC-USDT"

"lever_rate":

5

"buy_limit_value":

50000000

"sell_limit_value":

50000000

"mark_price":

48939.4

}

1:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211217"

"margin_mode":

"cross"

"buy_limit":

1021865

"sell_limit":

1021865

"business_type":

"futures"

"contract_type":

"next_week"

"pair":

"BTC-USDT"

"lever_rate":

5

"buy_limit_value":

50000000

"sell_limit_value":

50000000

"mark_price":

48930.1

}

2:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"margin_mode":

"cross"

"buy_limit":

1023478

"sell_limit":

1023478

"business_type":

"futures"

"contract_type":

"this_week"

"pair":

"BTC-USDT"

"lever_rate":

5

"buy_limit_value":

50000000

"sell_limit_value":

50000000

"mark_price":

48853

}

3:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211231"

"margin_mode":

"cross"

"buy_limit":

1021867

"sell_limit":

1021867

"business_type":

"futures"

"contract_type":

"quarter"

"pair":

"BTC-USDT"

"lever_rate":

1

"buy_limit_value":

50000000

"sell_limit_value":

50000000

"mark_price":

48930

}

\]

"ts":

1638760890261

}
