# GET [General] Query information on swap trading fee

**Source:**
[[General] Query information on swap trading fee](https://www.htx.com/en-us/opend/newApiPages/?id=8cb831de-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_fee (\[General\] Query information on swap trading fee)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625. When both of pair, contract_type
and contract_code filled in, the contract_code is the preferred. business_type
is a required parameter when query info of futures contract, and its value must
be futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                         | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract type code             | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                           | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                  | swap, this_week, next_week, quarter, next_quarter   |               |
| business_type | string    | false    | business type, default is swap | futures, swap, all                                  |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description                                       | Value Range                                         |
| --------------- | --------- | -------- | ------------------------------------------------- | --------------------------------------------------- |
| status          | string    | true     | Request Processing Result                         | "ok" , "error"                                      |
| ts              | long      | true     | Time of Respond Generation, Unit: Millisecond     |                                                     |
| DATA_START      |           | false    |                                                   |                                                     |
| symbol          | string    | true     | Variety code                                      |                                                     |
| contract_code   | string    | true     | contract type code                                | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| open_maker_fee  | string    | true     | Open maker order fee, decimal                     |                                                     |
| open_taker_fee  | string    | true     | Open taker order fee, decimal                     |                                                     |
| close_maker_fee | string    | true     | Close maker order fee, decimal                    |                                                     |
| close_taker_fee | string    | true     | Close taker order fee, decimal                    |                                                     |
| fee_asset       | string    | true     | the corresponding cryptocurrency to the given fee | "USDT"...                                           |
| contract_type   | string    | true     | contract type                                     | swap, this_week, next_week, quarter, next_quarter   |
| pair            | string    | true     | pair                                              | such as: “BTC-USDT”                                 |
| business_type   | string    | true     | business type                                     | futures, swap                                       |
| delivery_fee    | string    | true     | delivery fee rate                                 |                                                     |
| DATA_END        |           | false    |                                                   |                                                     |

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

"open_maker_fee":

"0.0002"

"open_taker_fee":

"0.0004"

"close_maker_fee":

"0.0002"

"close_taker_fee":

"0.0004"

"fee_asset":

"USDT"

"delivery_fee":

"0"

"business_type":

"swap"

"contract_type":

"swap"

"pair":

"BTC-USDT"

}

1:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211217"

"open_maker_fee":

"0.0002"

"open_taker_fee":

"0.0005"

"close_maker_fee":

"0.0002"

"close_taker_fee":

"0.0005"

"fee_asset":

"USDT"

"delivery_fee":

"0.00015"

"business_type":

"futures"

"contract_type":

"next_week"

"pair":

"BTC-USDT"

}

2:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"open_maker_fee":

"0.0002"

"open_taker_fee":

"0.0005"

"close_maker_fee":

"0.0002"

"close_taker_fee":

"0.0005"

"fee_asset":

"USDT"

"delivery_fee":

"0.00015"

"business_type":

"futures"

"contract_type":

"this_week"

"pair":

"BTC-USDT"

}

3:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211231"

"open_maker_fee":

"0.0002"

"open_taker_fee":

"0.0005"

"close_maker_fee":

"0.0002"

"close_taker_fee":

"0.0005"

"fee_asset":

"USDT"

"delivery_fee":

"0.00015"

"business_type":

"futures"

"contract_type":

"quarter"

"pair":

"BTC-USDT"

}

\]

"ts":

1638760715804

}
