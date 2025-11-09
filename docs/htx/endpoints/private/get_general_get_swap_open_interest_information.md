# GET [General] Get Swap Open Interest Information

**Source:**
[[General] Get Swap Open Interest Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80166-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_open_interest (\[General\] Get Swap Open Interest Information)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-201101; When both of pair, contract_type
and contract_code filled in, the contract_code is the preferred. business_type
is a required parameter when query info of futures contract, and its value must
be futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                      | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...           |             |               |
| pair          | string    | false    | pair, BTC-USDT                                                   |             |               |
| contract_type | string    | false    | contract type: swap, this_week, next_week, quarter, next_quarter |             |               |
| business_type | string    | false    | business type, default is swap: futures, swap, all               |             |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                                             | Value Range                                            |
| -------------- | --------- | -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| status         | string    | true     | Request Processing Result                                                               | "ok" , "error"                                         |
| DATA_START     |           | false    |                                                                                         |                                                        |
| symbol         | string    | true     | Variety code                                                                            | "BTC", "ETH" ...                                       |
| volume         | decimal   | true     | Position quantity(volume). Sum of both buy and sell sides                               |                                                        |
| amount         | decimal   | true     | Position quantity(Currency). Sum of both buy and sell sides                             |                                                        |
| contract_code  | string    | true     | Contract Code                                                                           | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| value          | decimal   | true     | Total position volume（The unit is the denominated currency of the contract. e.g:USDT） |                                                        |
| trade_amount   | decimal   | true     | trading volume within the last 24 hours (coin). Sum of both buy and sell sides          |                                                        |
| trade_volume   | decimal   | true     | trading volume within the last 24 hours (cont). Sum of both buy and sell sides          |                                                        |
| trade_turnover | decimal   | true     | trading amount within the last 24 hours. Sum of both buy and sell sides                 |                                                        |
| contract_type  | string    | true     | contract type                                                                           | swap, this_week, next_week, quarter, next_quarter      |
| pair           | string    | true     | pair                                                                                    | such as: “BTC-USDT”                                    |
| business_type  | string    | true     | business type                                                                           | futures, swap                                          |
| DATA_END       |           | false    |                                                                                         |                                                        |
| ts             | long      | true     | Time of Respond Generation, Unit: Millisecond                                           |                                                        |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_open_interest?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"volume":

78696

"amount":

78.696

"symbol":

"BTC"

"value":

3823138.2456

"contract_code":

"BTC-USDT"

"trade_amount":

0

"trade_volume":

0

"trade_turnover":

0

"business_type":

"swap"

"pair":

"BTC-USDT"

"contract_type":

"swap"

}

1:{

"volume":

10925

"amount":

10.925

"symbol":

"BTC"

"value":

530662.21

"contract_code":

"BTC-USDT-211217"

"trade_amount":

0

"trade_volume":

0

"trade_turnover":

0

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"next_week"

}

2:{

"volume":

27104

"amount":

27.104

"symbol":

"BTC"

"value":

1316937.2832

"contract_code":

"BTC-USDT-211210"

"trade_amount":

0

"trade_volume":

0

"trade_turnover":

0

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"this_week"

}

3:{

"volume":

201143

"amount":

201.143

"symbol":

"BTC"

"value":

9775067.0568

"contract_code":

"BTC-USDT-211231"

"trade_amount":

0

"trade_volume":

0

"trade_turnover":

0

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"quarter"

}

\]

"ts":

1638754059540

}
