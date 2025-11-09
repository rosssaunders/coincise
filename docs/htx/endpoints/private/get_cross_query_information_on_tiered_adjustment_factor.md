# GET [Cross] Query Information On Tiered Adjustment Factor

**Source:**
[[Cross] Query Information On Tiered Adjustment Factor](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7fc0d-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_adjustfactor (\[Cross\] Query Information On Tiered Adjustment Factor)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

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

| Parameter     | Data Type    | Required | Description                                   | Value Range                                         |
| ------------- | ------------ | -------- | --------------------------------------------- | --------------------------------------------------- |
| status        | string       | true     | Request Processing Result                     | "ok" , "error"                                      |
| ts            | long         | true     | Time of Respond Generation, Unit: Millisecond |                                                     |
| DATA_START    | object array | true     |                                               |                                                     |
| symbol        | string       | true     | symbol                                        | "BTC","ETH"...                                      |
| contract_code | string       | true     | contract code                                 | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin_mode   | string       | true     | margin mode                                   | cross: cross margin mode                            |
| contract_type | string       | true     | contract type                                 | swap, this_week, next_week, quarter, next_quarter   |
| pair          | string       | true     | pair                                          | such as: “BTC-USDT”                                 |
| business_type | string       | true     | business type                                 | futures, swap                                       |
| LIST_START    | object array | true     |                                               |                                                     |
| lever_rate    | decimal      | true     | lever rate                                    |                                                     |
| LADDERS_START | object array | true     |                                               |                                                     |
| min_size      | decimal      | true     | min net position limit                        |                                                     |
| max_size      | decimal      | true     | max net position limit                        |                                                     |
| ladder        | int          | true     | tier                                          | from 0                                              |
| adjust_factor | decimal      | true     | adjustment factor                             |                                                     |
| LADDERS_END   |              | false    |                                               |                                                     |
| LIST_END      |              | false    |                                               |                                                     |
| DATA_END      |              | false    |                                               |                                                     |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_adjustfactor?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap"`

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

"list":\[

0:{

"lever_rate":

1

"ladders":\[

0:{

"ladder":

0

"min_size":

0

"max_size":

3999

"adjust_factor":

0.005

}

1:{

"ladder":

1

"min_size":

4000

"max_size":

39999

"adjust_factor":

0.01

}

2:{

"ladder":

2

"min_size":

40000

"max_size":

79999

"adjust_factor":

0.015

}

3:{

"ladder":

3

"min_size":

80000

"max_size":

119999

"adjust_factor":

0.02

}

4:{

"ladder":

4

"min_size":

120000

"max_size":

NULL

"adjust_factor":

0.025

}

\]

}

\]

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"this_week"

}

\]

"ts":

1638754992327

}
