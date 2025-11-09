# GET [General] Subscribe Contract Info (no authentication)（sub）

**Source:** [[General] Subscribe Contract Info (no authentication)（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7e49a-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### public.$contract\_code.contract\_info (\[General\] Subscribe Contract Info (no authentication)（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| public.\*.contract\_info | public.\*.contract\_info | Allowed |
| public.contract\_code1.contract\_info | public.\*.contract\_info | Allowed |
| public.contract\_code1.contract\_info | ublic.contract\_code1.contract\_info | Allowed |
| public.contract\_code1.contract\_info | ublic.contract\_code1.contract\_info | Not Allowed |
| public.\*.contract\_info | ublic.contract\_code1.contract\_info | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | all: \*(swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| cid | string | false | Current request's ID |  |  |

Notes:  
subscripting \* is ok when business\_type filled in. when business\_type is swap, subscripting \* returns all swap contracts; when business\_type is futures, subscripting \* returns all futures contracts; when business\_type is all, subscripting \* returns all swap contracts and all futures contracts.  
when business\_type is swap, subscripting contract code and will get an error msg with 2011 error code. when you have subscribed \* and business\_type is swap (it means subscripting all swap contracts), which allows you to subscribe \* and business\_type is all(it means subscripting all swap contracts and all futures contracts). but if the steps reversed, you will get error msg with 2014 error code ; It means that you are allowed to subscribe to a small scope first and then to a large scope, but you are not allowed to subscribe to a large scope and then continue to subscribe to a small scope, because it is meaningless. A large scope already includes a small scope.  
The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.  
unsubscripting \* is ok under business\_type filled in. when business\_type is swap, unsubscripting \* means to unsubscripting all swap contracts; when business\_type is futures, unsubscripting \* means to unsubscripting all futures contracts;  
unsubscription scope must be greater than or equal to the subscription scope and in that it just can be success.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | value: "notify"; |  |
| topic | string | true | topic subscribed |  |
| ts | long | true | timestamp of server response.unit: millionseconds |  |
| event | string | true | event： "init", "update", "snapshot" |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol,"BTC","ETH"... |  |
| contract\_code | string | true | contract\_code, swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| contract\_size | decimal | true | Contract Value (USDT of one contract). such as 10,100 |  |
| price\_tick | decimal | true | Minimum Variation of Contract Price |  |
| settlement\_date | string | true | settlement date：such as "1490759594752" |  |
| create\_date | string | true | Contract Listing Date ：such as "20180706" |  |
| delivery\_time | string | true | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |  |
| contract\_status | int | true | contract status | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| support\_margin\_mode | string | true | support margin mode cross："cross"；isolated："isolated"；all："all" |  |
| contract\_type | string | true | contract type swap, this\_week, next\_week, quarter, next\_quarter |  |
| pair | string | true | pair such as: “BTC-USDT” |  |
| business\_type | string | true | business type futures, swap |  |
| delivery\_date | string | true | delivery date, empty string when swap , such as: "20180720" |  |
| DATA\_END |  | false |  |  |

Notes:  
The websocket subscription of contract info event is pushed every 60 seconds, and the event is "snapshot".  
When the subscription is successful, the latest contract information will be pushed immediately, and the event is "init".  
After the subscription is successful, when the contract information changes, the latest contract information will be pushed. When multiple fields changes simultaneously, only the latest contract information will be pushed, and the event is update.  
When the contract status is "delivery completed", the next settlement time of the contract is an empty string.  
Only when the status is 1(Listing), can it be traded normally, other statuses are not tradable;

#### Subscription Example

{

"op":

"sub"

"topic":

"public.btc-usdt.contract\_info"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.btc-usdt.contract\_info"

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

"public.\*.contract\_info"

"ts":

1639122053894

"event":

"init"

"data":\[

0:{

"symbol":

"MANA"

"contract\_code":

"MANA-USDT"

"contract\_size":

10

"price\_tick":

0.0001

"settlement\_date":

"1639123200000"

"create\_date":

"20210129"

"contract\_status":

1

"support\_margin\_mode":

"all"

"delivery\_time":

""

"contract\_type":

"swap"

"business\_type":

"swap"

"pair":

"MANA-USDT"

"delivery\_date":

""

}

1:{

"symbol":

"NKN"

"contract\_code":

"NKN-USDT"

"contract\_size":

10

"price\_tick":

0.00001

"settlement\_date":

"1639123200000"

"create\_date":

"20210810"

"contract\_status":

1

"support\_margin\_mode":

"all"

"delivery\_time":

""

"contract\_type":

"swap"

"business\_type":

"swap"

"pair":

"NKN-USDT"

"delivery\_date":

""

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"public.BTC-USDT.contract\_info"

"cid":

"40sG903yz80oDFWr"

}