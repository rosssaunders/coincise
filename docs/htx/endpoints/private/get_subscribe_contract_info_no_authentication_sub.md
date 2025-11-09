# GET Subscribe Contract Info (no authentication)（sub）

**Source:** [Subscribe Contract Info (no authentication)（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=5d515b4a-77b6-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### public.$contract\_code.contract\_info (Subscribe Contract Info (no authentication)（sub）)

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required;Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; Client requests unique ID |
| topic | string | Subscribe topic name，Require subscribe public.$contract\_code.funding\_rate Subscribe/unsubscribe the data of a given contract code; when the $contract\_code value is \*, it stands for subscribing/unsubscribing all the funding rates of contract codes，; |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| public.\*.contract\_info | public.\*.contract\_info | Allowed |
| public.contract\_code1.funding\_rate | public.\*.contract\_info | Allowed |
| public.contract\_code1.funding\_rate | public.contract\_code1.funding\_rate | Allowed |
| public.contract\_code1.funding\_rate | public.contract\_code2.contract\_info | Not Allowed |
| public.\*.contract\_info | public.contract\_code1.funding\_rate | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| op | string | true | Required； Operator Name，required subscribe value is sub |  |  |
| cid | string | false | Optional; ID Client requests unique ID |  |  |
| topic | string | true | Required；Topic name format: public.$contract\_code.contract\_info.; contract\_code is case-insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | value: "notify"; |  |
| topic | string | true | topic subscribed |  |
| ts | long | true | timestamp of server response.unit: millionseconds |  |
| event | string | true | event ："init", "update", "snapshot" |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol,"BTC","ETH"... |  |
| contract\_code | string | true | contract\_code,"BTC-USD" |  |
| contract\_size | decimal | true | Contract Value (USD of one contract). such as 10,100 |  |
| price\_tick | decimal | true | Minimum Variation of Contract Price ： 0.001, 0.01... |  |
| settlement\_date | string | true | settlement date ：such as "1490759594753" |  |
| create\_date | string | true | Contract Listing Date ：such as "30180706" |  |
| delivery\_time | string | true | string delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |  |
| contract\_status | int | true | contract status：0: Delisting,1: Listing,3: Pending Listing,3: Suspension,4: Suspending of Listing,5: In Settlement,6: Delivering,7: Settlement Completed,8: Delivered |  |
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

"public.btc-usd.funding\_rate"

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

"public.btc-usd.contract\_info"

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

"public.BTC-USD.contract\_info"

"ts":

1603879734428

"event":

"snapshot"

"data":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USD"

"contract\_size":

100

"price\_tick":

0.1

"settlement\_date":

"1603900800000"

"create\_date":

"20200325"

"delivery\_time":

""

"contract\_status":

1

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"public.BTC-USD.contract\_info"

"cid":

"40sG903yz80oDFWr"

}