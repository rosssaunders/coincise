# GET [Isolated] Query information on position limit

**Source:**
[[Isolated] Query information on position limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb835b7-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_position_limit (\[Isolated\] Query information on position limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description        | Value Range                                                                | Default Value |
| ------------- | --------- | -------- | ------------------ | -------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |               |

#### Response Parameter

| Parameter        | Data Type | Required | Description                                                                     | Value Range           |
| ---------------- | --------- | -------- | ------------------------------------------------------------------------------- | --------------------- |
| status           | string    | true     | Request Processing Result                                                       | "ok" , "error"        |
| ts               | long      | true     | Time of Responding Generation, Unit: Millisecond                                |                       |
| DATA_START       |           | false    |                                                                                 |                       |
| symbol           | string    | true     | symbol                                                                          | "BTC","ETH"...        |
| contract_code    | string    | true     | contract type code                                                              | "BTC-USDT",...        |
| margin_mode      | string    | true     | margin mode                                                                     | isolated : "isolated" |
| buy_limit        | decimal   | true     | max qty of position on long positions, unit: piece(calculated with mark_price)  |                       |
| sell_limit       | decimal   | true     | max qty of position on short positions, unit: piece(calculated with mark_price) |                       |
| lever_rate       | int       | true     | leverage rate                                                                   |                       |
| buy_limit_value  | decimal   | true     | upper limit on long positions, unit: usdt                                       |                       |
| sell_limit_value | decimal   | true     | upper limit on short positions, unit: usdt                                      |                       |
| mark_price       | decimal   | true     | mark price(use this price to calculate the qty of open positions)               |                       |
| DATA_END         |           | false    |                                                                                 |                       |

#### Request example

{

"contract_code":

"BTC-USDT"

}

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

"buy_limit":

1026154

"sell_limit":

1026154

"margin_mode":

"isolated"

"lever_rate":

5

"buy_limit_value":

50000000

"sell_limit_value":

50000000

"mark_price":

48725.6

}

\]

"ts":

1638770954672

}
