# GET [General] Query Swap Price Limitation

**Source:**
[[General] Query Swap Price Limitation](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80013-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_price_limit (\[General\] Query Swap Price Limitation)

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
| contract_code | string    | false    | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...              |             |               |
| pair          | string    | false    | pair, BTC-USDT                                                   |             |               |
| contract_type | string    | false    | contract type: swap, this_week, next_week, quarter, next_quarter |             |               |
| business_type | string    | false    | business type, default is swap: futures, swap, all               |             |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range                                            |
| ------------- | --------- | -------- | --------------------------------------------- | ------------------------------------------------------ |
| status        | string    | true     | Request Processing Result                     | "ok" ,"error"                                          |
| DATA_START    |           | false    |                                               |                                                        |
| symbol        | string    | true     | Variety code                                  | "BTC","ETH" ...                                        |
| high_limit    | decimal   | true     | Highest Buying Price                          |                                                        |
| low_limit     | decimal   | true     | Lowest Selling Price                          |                                                        |
| contract_code | string    | true     | Contract Code                                 | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| contract_type | string    | true     | contract type                                 | swap, this_week, next_week, quarter, next_quarter      |
| pair          | string    | true     | pair                                          | such as: “BTC-USDT”                                    |
| business_type | string    | true     | business type                                 | futures, swap                                          |
| DATA_START    |           | false    |                                               |                                                        |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                        |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_price_limit?contract_code=BTC-USDT"`

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

"high_limit":

49629

"low_limit":

47682.8

"business_type":

"swap"

"pair":

"BTC-USDT"

"contract_type":

"swap"

}

1:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"high_limit":

49645.2

"low_limit":

47698.5

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"this_week"

}

2:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211217"

"high_limit":

49699.7

"low_limit":

47750.8

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"next_week"

}

3:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211231"

"high_limit":

50135.1

"low_limit":

47214.8

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"quarter"

}

\]

"ts":

1638753887869

}
