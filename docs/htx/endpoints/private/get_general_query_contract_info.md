# GET [General] Query Contract Info

**Source:** [[General] Query Contract Info](https://www.htx.com/en-us/opend/newApiPages/?id=8cb802c2-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_contract\_info (\[General\] Query Contract Info)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "support\_margin\_mode" should be "all" when querying the contract information which supports the cross margin mode and the isolated margin mode both. The value of "cross" or "isolated" just can query the contract information which only supports the cross margin mode or the isolated margin mode. Please keep attention. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-201101; When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all. When support\_margin\_mode is isolated，contract\_type, business\_type should not be futures type. And when support\_margin\_mode is cross, the return data is future's data Notes：contract elements it can display more futures fields, we recommend you to use it.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |  |
| support\_margin\_mode | string | false | support margin mode cross："cross"；isolated："isolated"；all："all" |  |  |
| pair | string | false | BTC-USDT |  |  |
| contract\_type | string | false | swap, this\_week, next\_week, quarter, next\_quarter |  |  |
| business\_type | string | false | futures, swap, all(default is swap) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | Contract Code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| contract\_size | decimal | true | Contract Value (USDT of one contract) | 10, 100... |
| price\_tick | decimal | true | Minimum Variation of Contract Price | 0.001, 0.01... |
| settlement\_date | string | true | Settlement Date | eg "1490759594752" |
| create\_date | string | true | Listing Date | eg "20190808" |
| delivery\_time | string | true | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |  |
| contract\_status | int | true | Contract Status | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| support\_margin\_mode | string | false | support margin mode | cross："cross"；isolated："isolated"；all："all" |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| delivery\_date | string | true | delivery date, empty string when swap | such as: "20180720" |
| adjust | object array | false | Invalid field |  |
| price\_estimated | object array | false | Invalid field |  |
| open\_type | int | false | Invalid field |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

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

"contract\_code":

"BTC-USDT-211203"

"contract\_size":

0.001

"price\_tick":

0.1

"delivery\_date":

"20211203"

"delivery\_time":

"1638518400000"

"create\_date":

"20211202"

"contract\_status":

1

"settlement\_date":

"1638518400000"

"support\_margin\_mode":

"cross"

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"this\_week"

}

1:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"contract\_size":

0.001

"price\_tick":

0.1

"delivery\_date":

"20211210"

"delivery\_time":

"1639123200000"

"create\_date":

"20211202"

"contract\_status":

1

"settlement\_date":

"1638518400000"

"support\_margin\_mode":

"cross"

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"next\_week"

}

2:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211231"

"contract\_size":

0.001

"price\_tick":

0.1

"delivery\_date":

"20211231"

"delivery\_time":

"1640937600000"

"create\_date":

"20211202"

"contract\_status":

1

"settlement\_date":

"1638518400000"

"support\_margin\_mode":

"cross"

"business\_type":

"futures"

"pair":

"BTC-USDT"

"contract\_type":

"quarter"

}

3:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"contract\_size":

0.001

"price\_tick":

0.1

"delivery\_date":

""

"delivery\_time":

""

"create\_date":

"20211202"

"contract\_status":

1

"settlement\_date":

"1638518400000"

"support\_margin\_mode":

"all"

"business\_type":

"swap"

"pair":

"BTC-USDT"

"contract\_type":

"swap"

}

\]

"ts":

1638517765776

}