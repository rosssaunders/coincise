# GET Subscribe trigger orders updates(sub)

**Source:** [Subscribe trigger orders updates(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=5d515fbf-77b6-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### trigger\_order.$contract\_code (Subscribe trigger orders updates(sub))

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
| public.\*.funding\_rate | public.\*.funding\_rate | allowd |
| public.contract\_code1.funding\_rate | public.\*.funding\_rate | allowd |
| public.contract\_code1.funding\_rate | public.contract\_code1.funding\_rate | allowd |
| public.contract\_code1.funding\_rate | ublic.contract\_code2.funding\_rate | not allowed |
| public.\*.funding\_rate | public.contract\_code1.funding\_rate | not allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| op | string | true | Required； Operator Name，required subscribe value is sub |  |  |
| cid | string | false | Optional; ID Client requests unique ID |  |  |
| topic | string | true | Required；format: trigger\_order.$contract\_code; contract\_code is case-insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | Required;Operator Name，Order push value is notify |  |
| topic | string | true | Required; Order push topic |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| uid | string | true | account uid |  |
| event | string | true | Event notification description | trigger order placed successfully（order），trigger order canceled successfully（cancel），order triggered successfully（trigger\_success），order failed to be triggered（trigger\_fail） |
| DATA\_START | object array | true |  |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | contract code | "BTC-USD" ... |
| trigger\_type | string | true | trigger type： ge great than or equal to；le less than or equal to |  |
| volume | decimal | true | trigger order volume |  |
| order\_type | int | true | Transaction Type | 1\. Place orders |
| direction | string | true | order direction | \[buy,sell\] |
| offset | string | true | offset direction | \[open,close\] |
| lever\_rate | int | true | Leverage |  |
| order\_id | decimal | true | trigger order ID |  |
| order\_id\_str | string | true | the order ID with string |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders, The value is -1 before the trigger orders executed. |  |
| order\_price\_type | string | true | Order price type | "limit": limit order，"optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_30":optimal 30 |
| status | int | true | order status | 3\. Ready to submit the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; |
| order\_source | string | true | Order Source | （system、web、api、m、risk、settlement、ios、android、windows、mac、trigger ） |
| trigger\_price | decimal | true | trigger price |  |
| triggered\_price | decimal | true | the price when trigger orders executed |  |
| order\_price | decimal | true | the preset price by the client |  |
| created\_at | long | true | order creation time |  |
| triggered\_at | long | true | the execution time when orders getting triggered |  |
| order\_insert\_at | long | true | the time when the triggered orders filled successfully |  |
| canceled\_at | long | true | Order cancelation time |  |
| fail\_code | int | true | the error code when the triggered orders failed to be filled |  |
| fail\_reason | string | true | the error message with failure reason when triggered orders failed to filled |  |
| DATA\_END |  | false |  |  |

Notes:  
The intermediate states processed by the order status system will not be pushed, such as in the progress of placing an order, The descriptions of specific event notifications are as below:  
when the order status is 2（Submitted），event notification is order（trigger order placed successfully）；  
when the order status is 4（Order placed successfully），event notification is trigger\_success（trigger order triggered successfully）；  
when the order status is 6（Canceled），event notification is cancel（trigger order canceled successfully）；  
when the order status is 5（Order failed to be placed），event notification is trigger\_fail（trigger order failed to be triggered）；  
Single coin cannot be re-suscribed, and all coins subscription can cover single coin subscription; single coin cannot be subscribed after subscribing all coins.

#### Subscription Example

{

"op":

"sub"

"topic":

"trigger\_order.BTC-USD"

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

"trigger\_order.BTC-USD"

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

"trigger\_order.theta-usd"

"ts":

1603880263724

"event":

"order"

"uid":

"123456789"

"data":\[

0:{

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"trigger\_type":

"le"

"volume":

20

"order\_type":

1

"direction":

"buy"

"offset":

"open"

"lever\_rate":

20

"order\_id":

7002244

"order\_id\_str":

"7002244"

"relation\_order\_id":

"-1"

"order\_price\_type":

"limit"

"status":

2

"order\_source":

"web"

"trigger\_price":

0.59

"triggered\_price":

NULL

"order\_price":

0.59

"created\_at":

1603880263721

"triggered\_at":

0

"order\_insert\_at":

0

"canceled\_at":

0

"fail\_code":

NULL

"fail\_reason":

NULL

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"trigger\_order.BTC-USD"

"cid":

"40sG903yz80oDFWr"

}