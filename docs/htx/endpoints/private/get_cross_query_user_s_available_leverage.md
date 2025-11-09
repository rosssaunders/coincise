# GET [Cross] Query User’s Available Leverage

**Source:**
[[Cross] Query User’s Available Leverage](https://www.htx.com/en-us/opend/newApiPages/?id=8cb82f42-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_available_level_rate (\[Cross\] Query User’s Available Leverage)

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

| Parameter     | Data Type | Required | Description                                       | Value Range                                         | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code，return all contract info when null | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                              | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                                     | swap, this_week, next_week, quarter, next_quarter   |               |
| business_type | string    | false    | business type, default is swap                    | futures, swap, all                                  |               |

#### Response Parameter

| Parameter            | Data Type    | Required | Description                                   | Value Range                                         |
| -------------------- | ------------ | -------- | --------------------------------------------- | --------------------------------------------------- |
| status               | string       | true     | Request Processing Result                     | "ok" , "error"                                      |
| DATA_START           | object array | true     |                                               |                                                     |
| contract_code        | string       | true     | contract code                                 | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin_mode          | string       | true     | margin mode                                   | cross: cross margin mode                            |
| available_level_rate | string       | true     | available level rate,splited by ','           | "1,5,10"                                            |
| contract_type        | string       | true     | contract type                                 | swap, this_week, next_week, quarter, next_quarter   |
| pair                 | string       | true     | pair                                          | such as: “BTC-USDT”                                 |
| business_type        | string       | true     | business type                                 | futures, swap                                       |
| DATA_END             |              | false    |                                               |                                                     |
| ts                   | long         | true     | Time of Respond Generation, Unit: Millisecond |                                                     |

#### Request example

{

"contract_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract_type":

"swap"

"business_type":

"swap"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract_code":

"ETH-USDT"

"available_level_rate":

"1,2,3,5"

"margin_mode":

"cross"

"contract_type":

"swap"

"pair":

"ETH-USDT"

"business_type":

"swap"

}

1:{

"contract_code":

"ETH-USDT-211210"

"available_level_rate":

"1,2,3,5"

"margin_mode":

"cross"

"contract_type":

"this_week"

"pair":

"ETH-USDT"

"business_type":

"futures"

}

2:{

"contract_code":

"ETH-USDT-211217"

"available_level_rate":

"1,2,3,5"

"margin_mode":

"cross"

"contract_type":

"next_week"

"pair":

"ETH-USDT"

"business_type":

"futures"

}

3:{

"contract_code":

"ETH-USDT-211231"

"available_level_rate":

"1,2,3,5"

"margin_mode":

"cross"

"contract_type":

"quarter"

"pair":

"ETH-USDT"

"business_type":

"futures"

}

\]

"ts":

1638760001689

}
