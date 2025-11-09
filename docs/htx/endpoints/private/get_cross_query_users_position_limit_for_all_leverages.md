# GET [Cross]Query Users' Position Limit for All Leverages

**Source:**
[[Cross]Query Users' Position Limit for All Leverages](https://www.htx.com/en-us/opend/newApiPages/?id=8cb839e5-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_lever_position_limit (\[Cross\]Query Users' Position Limit for All Leverages)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                 | Value Range        | Default Value |
| ------------- | --------- | -------- | --------------------------- | ------------------ | ------------- |
| business_type | string    | false    | business type, NA means all | futures, swap, all |               |

Notes:  
The interface only supports cross margin mode.  
If the status of contract is Pending Listing, Listing, Suspension, or Suspending
of Listing, the data of that contract will not be returned when querying all; If
that contract is queried separately, error 1014 will be reported;  
pair, contract_type and contract_code all filled in，contract_code is
preferred  
lever_rate must fall within the user's available leverage rate, otherwise error
1037 will be reported  
business_type is a required parameter when querying the contract of futures. And
the parameter value must be: futures or all.

#### Response Parameter

| Parameter        | Data Type    | Required | Description                                   | Value Range                                       |
| ---------------- | ------------ | -------- | --------------------------------------------- | ------------------------------------------------- |
| contract_type    | string       | false    | contract type, NA means all                   | swap, this_week, next_week, quarter, next_quarter |
| pair             | string       | false    | pair, NA means all                            | such as "BTC-USDT"                                |
| contract_code    | string       | false    | contract_code, NA means all                   | swap: "BTC-USDT"... future: "BTC-USDT-211231"...  |
| lever_rate       | int          | false    | leverage rate, NA means all                   |                                                   |
| status           | string       | true     | status                                        | "ok" , "error"                                    |
| DATA_START       | object array | true     |                                               |                                                   |
| symbol           | string       | true     | symbol                                        | "BTC","ETH"...                                    |
| contract_code    | string       | true     | contract code                                 | swap: "BTC-USDT"... futures: "BTC-USDT-211231"... |
| margin_mode      | string       | true     | margin mode                                   | cross                                             |
| business_type    | string       | true     | business type                                 | futures, swap                                     |
| contract_type    | string       | true     | contract type                                 | swap, this_week, next_week, quarter, next_quarter |
| pair             | string       | true     | pair                                          | such as: "BTC-USDT"                               |
| LIST_START       | object array | true     |                                               |                                                   |
| lever_rate       | int          | true     | leverage rate                                 |                                                   |
| buy_limit_value  | decimal      | true     | upper limit on long positions, unit: usdt     |                                                   |
| sell_limit_value | decimal      | true     | upper limit on short positions, unit: usdt    |                                                   |
| LIST_END         |              | false    |                                               |                                                   |
| DATA_END         |              | false    |                                               |                                                   |
| ts               | long         | true     | Time of Respond Generation，Unit：Millisecond |                                                   |

#### Request example

{

"business_type":

"swap"

"contract_type":

"swap"

"pair":

"BTC-USDT"

"contract_code":

"BTC-USDT"

"lever_rate":

20

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"business_type":

"swap"

"contract_type":

"swap"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_mode":

"cross"

"list":\[

0:{

"lever_rate":

2

"buy_limit_value":

50000000

"sell_limit_value":

50000000

}

\]

}

1:{

"business_type":

"futures"

"contract_type":

"next_week"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211217"

"margin_mode":

"cross"

"list":\[

0:{

"lever_rate":

2

"buy_limit_value":

50000000

"sell_limit_value":

50000000

}

\]

}

2:{

"business_type":

"futures"

"contract_type":

"this_week"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"margin_mode":

"cross"

"list":\[

0:{

"lever_rate":

2

"buy_limit_value":

50000000

"sell_limit_value":

50000000

}

\]

}

3:{

"business_type":

"futures"

"contract_type":

"quarter"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211231"

"margin_mode":

"cross"

"list":\[

0:{

"lever_rate":

2

"buy_limit_value":

50000000

"sell_limit_value":

50000000

}

\]

}

\]

"ts":

1638769370732

}
