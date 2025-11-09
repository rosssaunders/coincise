# GET [General] Subscribe Liquidation Orders (no authentication) (sub)

**Source:**
[[General] Subscribe Liquidation Orders (no authentication) (sub)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7e25d-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### public.$contract_code.liquidation_orders (\[General\] Subscribe Liquidation Orders (no authentication) (sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： For websocket: The rate limit for
“req” request is 50 times at once. No limit for “sub” request as the data will
be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625.

#### Subscription Address

| Environment                         | Address                                     |
| ----------------------------------- | ------------------------------------------- |
| Online                              | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                 |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required； Operator Name，value for unsubscribe is unsub;                                                                   |
| cid        | string | Optional; ID Client requests unique ID                                                                                      |
| topic      | string | Required；Unsubscribe Topic Name, format: orders.$contract_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub)                           | Unsubscribe( unsub )                     | Rule        |
| ---------------------------------------- | ---------------------------------------- | ----------- |
| public.\*.liquidation_orders             | public.\*.liquidation_orders             | Allowed     |
| public.contract_code1.liquidation_orders | public.\*.liquidation_orders             | Allowed     |
| public.contract_code1.liquidation_orders | public.contract_code1.liquidation_orders | Allowed     |
| public.contract_code1.liquidation_orders | public.contract_code1.liquidation_orders | Not Allowed |
| public.\*.liquidation_orders             | public.contract_code1.liquidation_orders | Not Allowed |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description          | Value Range | Default Value                                                |
| ------------- | --------- | -------- | -------------------- | ----------- | ------------------------------------------------------------ |
| contract_code | string    | true     | contract code        |             | all: \*, swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| cid           | string    | false    | Current request's ID |             |                                                              |

Notes:  
subscripting \* is ok under business_type filled in. when business_type is swap,
subscripting \* returns all swap contracts; when business_type is futures,
subscripting \* returns all futures contracts; when business_type is all,
subscripting \* returns all swap contracts and all futures contracts.  
when business_type is swap, subscripting contract code and will get an error msg
with 2011 error code. when you have subscribed \* and business_type is swap (it
means subscripting all swap contracts), which allows you to subscribe \* and
business_type is all(it means subscripting all swap contracts and all futures
contracts). but if the steps reversed, you will get error msg with 2014 error
code ; It means that you are allowed to subscribe to a small scope first and
then to a large scope, but you are not allowed to subscribe to a large scope and
then continue to subscribe to a small scope, because it is meaningless. A large
scope already includes a small scope.  
The request parameter "contract_code" supports the contract code of futures, in
that the format is BTC-USDT-210625.  
unsubscripting \* is ok under business_type filled in. when business_type is
swap, unsubscripting \* means to unsubscripting all swap contracts; when
business_type is futures, unsubscripting \* means to unsubscripting all futures
contracts;  
unsubscription scope must be greater than or equal to the subscription scope and
in that it just can be success.

#### Data Update

| Parameter      | Data Type    | Required | Description                                                      | Value Range |
| -------------- | ------------ | -------- | ---------------------------------------------------------------- | ----------- |
| op             | string       | true     | value: 'notify';                                                 |             |
| topic          | string       | true     | topic subscribed                                                 |             |
| ts             | long         | true     | Time of Respond Generation，Unit：Millisecond                    |             |
| DATA_START     | array object | true     |                                                                  |             |
| symbol         | string       | true     | symbol                                                           |             |
| contract_code  | string       | true     | swap code swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...    |             |
| direction      | string       | true     | Long or short                                                    |             |
| offset         | string       | true     | Open, close, both                                                |             |
| volume         | decimal      | true     | liquidation volume (Cont.)                                       |             |
| amount         | decimal      | true     | liquidation amount (token)                                       |             |
| trade_turnover | decimal      | true     | liquidation amount (quotation token)                             |             |
| price          | decimal      | true     | bankruptcy price                                                 |             |
| created_at     | long         | true     | Order Creation Time                                              |             |
| contract_type  | string       | true     | contract type: swap, this_week, next_week, quarter, next_quarter |             |
| pair           | string       | true     | pair, such as: “BTC-USDT”                                        |             |
| business_type  | string       | true     | business type: futures, swap                                     |             |
| DATA_END       |              | false    |                                                                  |             |

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC-USDT.liquidation_orders"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC-USDT.liquidation_orders"

"ts":

1670903745088

"err-code":

0

}

#### Example of a Data Update

{

"op":

"notify"

"topic":

"public.O3-USDT.liquidation_orders"

"ts":

1639122193214

"data":\[

0:{

"symbol":

"O3"

"contract_code":

"O3-USDT"

"direction":

"sell"

"offset":

"close"

"volume":

432

"price":

0.7858

"created_at":

1639122193172

"amount":

432

"trade_turnover":

339.4656

"contract_type":

"swap"

"pair":

"O3-USDT"

"business_type":

"swap"

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"public.BTC-USDT.liquidation_orders"

"cid":

"40sG903yz80oDFWr"

}
