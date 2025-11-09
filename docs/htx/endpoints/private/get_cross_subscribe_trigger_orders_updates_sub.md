# GET [Cross] Subscribe trigger orders updates(sub)

**Source:** [[Cross] Subscribe trigger orders updates(sub)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7e753-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### trigger\_order\_cross.$contract\_code (\[Cross\] Subscribe trigger orders updates(sub))

Signature verification: No

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

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
| trigger\_order\_cross.\* | trigger\_order\_cross.\* | Allowed |
| trigger\_order\_cross.contract\_code1 | trigger\_order\_cross.\* | Allowed |
| trigger\_order\_cross.contract\_code1 | trigger\_order\_cross.contract\_code1 | Allowed |
| trigger\_order\_cross.contract\_code1 | trigger\_order\_cross.contract\_code1 | Not Allowed |
| trigger\_order\_cross.\* | trigger\_order\_cross.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | all: \*(swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | operaton name, fixed as notify |  |
| topic | string | true | topic |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| uid | string | true | uid |  |
| event | string | true | event | order，cancel，trigger\_success，trigger\_fail |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| trigger\_type | string | true | trigger type： ge great than or equal to；le less than or equal to |  |
| volume | decimal | true | place volume |  |
| order\_type | int | true | order type | 1\. Place orders |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | "open", "close" | "open","close",both |
| lever\_rate | int | true | leverage |  |
| order\_id | decimal | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders, The value is -1 before the trigger orders executed. |  |
| order\_price\_type | string | true | type of order price | "limit"，"optimal\_5"，"optimal\_10"，"optimal\_20" |
| status | int | true | order status | 2\. Ready to submit the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_price | decimal | true | trigger price |  |
| triggered\_price | decimal | true | triggered price |  |
| order\_price | decimal | true | order price |  |
| created\_at | long | true | created time |  |
| triggered\_at | long | true | triggered time |  |
| order\_insert\_at | long | true | insert time |  |
| canceled\_at | long | true | canceled time |  |
| fail\_code | int | true | fail code |  |
| fail\_reason | string | true | fail reason |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
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

"trigger\_order\_cross.BTC-USDT"

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

"trigger\_order.BTC-USDT"

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

"trigger\_order\_cross.\*"

"ts":

1639123353369

"event":

"order"

"uid":

"123456789"

"data":\[

0:{

"contract\_type":

"swap"

"pair":

"BTC-USDT"

"business\_type":

"swap"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"trigger\_type":

"le"

"volume":

1

"order\_type":

1

"direction":

"buy"

"offset":

"open"

"lever\_rate":

1

"order\_id":

918895474461802500

"order\_id\_str":

"918895474461802496"

"relation\_order\_id":

"-1"

"order\_price\_type":

"limit"

"status":

2

"order\_source":

"api"

"trigger\_price":

40000

"triggered\_price":

NULL

"order\_price":

40000

"created\_at":

1639123353364

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

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"reduce\_only":

0

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"trigger\_order\_cross.BTC-USDT"

"cid":

"40sG903yz80oDFWr"

}