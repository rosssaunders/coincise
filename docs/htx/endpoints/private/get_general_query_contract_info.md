# GET [General] Query Contract Info

**Source:**
[[General] Query Contract Info](https://www.htx.com/en-us/opend/newApiPages/?id=8cb802c2-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_contract_info (\[General\] Query Contract Info)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "support_margin_mode" should be "all" when
querying the contract information which supports the cross margin mode and the
isolated margin mode both. The value of "cross" or "isolated" just can query the
contract information which only supports the cross margin mode or the isolated
margin mode. Please keep attention. The request parameter "contract_code"
supports the contract code of futures, in that the format is BTC-USDT-201101;
When both of pair, contract_type and contract_code filled in, the contract_code
is the preferred. business_type is a required parameter when query info of
futures contract, and its value must be futures or all. When support_margin_mode
is isolated，contract_type, business_type should not be futures type. And when
support_margin_mode is cross, the return data is future's data Notes：contract
elements it can display more futures fields, we recommend you to use it.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter           | Data Type | Required | Description                                                          | Value Range | Default Value |
| ------------------- | --------- | -------- | -------------------------------------------------------------------- | ----------- | ------------- |
| contract_code       | string    | false    | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                  |             |               |
| support_margin_mode | string    | false    | support margin mode cross："cross"；isolated："isolated"；all："all" |             |               |
| pair                | string    | false    | BTC-USDT                                                             |             |               |
| contract_type       | string    | false    | swap, this_week, next_week, quarter, next_quarter                    |             |               |
| business_type       | string    | false    | futures, swap, all(default is swap)                                  |             |               |

#### Response Parameter

| Parameter           | Data Type    | Required | Description                                                                                                                 | Value Range                                                                                                                     |
| ------------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| status              | string       | true     | Request Processing Result                                                                                                   | "ok" , "error"                                                                                                                  |
| DATA_START          |              | false    |                                                                                                                             |                                                                                                                                 |
| symbol              | string       | true     | symbol                                                                                                                      | "BTC","ETH"...                                                                                                                  |
| contract_code       | string       | true     | Contract Code                                                                                                               | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                             |
| contract_size       | decimal      | true     | Contract Value (USDT of one contract)                                                                                       | 10, 100...                                                                                                                      |
| price_tick          | decimal      | true     | Minimum Variation of Contract Price                                                                                         | 0.001, 0.01...                                                                                                                  |
| settlement_date     | string       | true     | Settlement Date                                                                                                             | eg "1490759594752"                                                                                                              |
| create_date         | string       | true     | Listing Date                                                                                                                | eg "20190808"                                                                                                                   |
| delivery_time       | string       | true     | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |                                                                                                                                 |
| contract_status     | int          | true     | Contract Status                                                                                                             | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| support_margin_mode | string       | false    | support margin mode                                                                                                         | cross："cross"；isolated："isolated"；all："all"                                                                                |
| contract_type       | string       | true     | contract type                                                                                                               | swap, this_week, next_week, quarter, next_quarter                                                                               |
| pair                | string       | true     | pair                                                                                                                        | such as: “BTC-USDT”                                                                                                             |
| business_type       | string       | true     | business type                                                                                                               | futures, swap                                                                                                                   |
| delivery_date       | string       | true     | delivery date, empty string when swap                                                                                       | such as: "20180720"                                                                                                             |
| adjust              | object array | false    | Invalid field                                                                                                               |                                                                                                                                 |
| price_estimated     | object array | false    | Invalid field                                                                                                               |                                                                                                                                 |
| open_type           | int          | false    | Invalid field                                                                                                               |                                                                                                                                 |
| DATA_END            |              | false    |                                                                                                                             |                                                                                                                                 |
| ts                  | long         | true     | Time of Respond Generation，Unit：Millisecond                                                                               |                                                                                                                                 |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_contract_info?contract_code=BTC-USDT"`

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

"BTC-USDT-211203"

"contract_size":

0.001

"price_tick":

0.1

"delivery_date":

"20211203"

"delivery_time":

"1638518400000"

"create_date":

"20211202"

"contract_status":

1

"settlement_date":

"1638518400000"

"support_margin_mode":

"cross"

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

"BTC-USDT-211210"

"contract_size":

0.001

"price_tick":

0.1

"delivery_date":

"20211210"

"delivery_time":

"1639123200000"

"create_date":

"20211202"

"contract_status":

1

"settlement_date":

"1638518400000"

"support_margin_mode":

"cross"

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

"contract_size":

0.001

"price_tick":

0.1

"delivery_date":

"20211231"

"delivery_time":

"1640937600000"

"create_date":

"20211202"

"contract_status":

1

"settlement_date":

"1638518400000"

"support_margin_mode":

"cross"

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

"contract_size":

0.001

"price_tick":

0.1

"delivery_date":

""

"delivery_time":

""

"create_date":

"20211202"

"contract_status":

1

"settlement_date":

"1638518400000"

"support_margin_mode":

"all"

"business_type":

"swap"

"pair":

"BTC-USDT"

"contract_type":

"swap"

}

\]

"ts":

1638517765776

}
